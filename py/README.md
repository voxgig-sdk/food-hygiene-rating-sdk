# FoodHygieneRating Python SDK



The Python SDK for the FoodHygieneRating API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Authority()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/food-hygiene-rating-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from foodhygienerating_sdk import FoodHygieneRatingSDK

client = FoodHygieneRatingSDK()
```

### 2. List authority records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    authoritys = client.Authority().list()
    for authority in authoritys:
        print(authority)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an authority

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    authority = client.Authority().load({"id": 1})
    print(authority)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    authoritys = client.Authority().list()
    print(authoritys)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = FoodHygieneRatingSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
authority = client.Authority().list()
# authority contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = FoodHygieneRatingSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FOOD_HYGIENE_RATING_TEST_LIVE=TRUE
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### FoodHygieneRatingSDK

```python
from foodhygienerating_sdk import FoodHygieneRatingSDK

client = FoodHygieneRatingSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = FoodHygieneRatingSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### FoodHygieneRatingSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Authority` | `(data) -> AuthorityEntity` | Create an Authority entity instance. |
| `BusinessType` | `(data) -> BusinessTypeEntity` | Create a BusinessType entity instance. |
| `Establishment` | `(data) -> EstablishmentEntity` | Create an Establishment entity instance. |
| `Rating` | `(data) -> RatingEntity` | Create a Rating entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Authority

| Field | Description |
| --- | --- |
| `Email` |  |
| `EstablishmentCount` |  |
| `FileName` |  |
| `FileNameWelsh` |  |
| `FriendlyName` |  |
| `LocalAuthorityId` |  |
| `LocalAuthorityIdCode` |  |
| `Name` |  |
| `RegionName` |  |
| `SchemeUrl` |  |
| `Url` |  |

Operations: List, Load.

API path: `/Authorities`

#### BusinessType

| Field | Description |
| --- | --- |
| `BusinessTypeId` |  |
| `BusinessTypeName` |  |

Operations: List.

API path: `/BusinessTypes`

#### Establishment

| Field | Description |
| --- | --- |
| `AddressLine1` |  |
| `AddressLine2` |  |
| `AddressLine3` |  |
| `AddressLine4` |  |
| `BusinessName` |  |
| `BusinessType` |  |
| `BusinessTypeID` |  |
| `FHRSID` |  |
| `Geocode` |  |
| `LocalAuthorityBusinessID` |  |
| `LocalAuthorityCode` |  |
| `LocalAuthorityEmailAddress` |  |
| `LocalAuthorityName` |  |
| `LocalAuthorityWebSite` |  |
| `NewRatingPending` |  |
| `PostCode` |  |
| `RatingDate` |  |
| `RatingKey` |  |
| `RatingValue` |  |
| `SchemeType` |  |
| `latitude` |  |
| `longitude` |  |

Operations: List, Load.

API path: `/Establishments`

#### Rating

| Field | Description |
| --- | --- |
| `ratingId` |  |
| `ratingKey` |  |
| `ratingName` |  |
| `schemeType` |  |

Operations: List.

API path: `/Ratings`



## Entities


### Authority

Create an instance: `authority = client.Authority()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Email` | `str` |  |
| `EstablishmentCount` | `int` |  |
| `FileName` | `str` |  |
| `FileNameWelsh` | `str` |  |
| `FriendlyName` | `str` |  |
| `LocalAuthorityId` | `int` |  |
| `LocalAuthorityIdCode` | `str` |  |
| `Name` | `str` |  |
| `RegionName` | `str` |  |
| `SchemeUrl` | `str` |  |
| `Url` | `str` |  |

#### Example: Load

```python
authority = client.Authority().load({"id": 1})
```

#### Example: List

```python
authoritys = client.Authority().list()
```


### BusinessType

Create an instance: `business_type = client.BusinessType()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `BusinessTypeId` | `int` |  |
| `BusinessTypeName` | `str` |  |

#### Example: List

```python
business_types = client.BusinessType().list()
```


### Establishment

Create an instance: `establishment = client.Establishment()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `AddressLine1` | `str` |  |
| `AddressLine2` | `str` |  |
| `AddressLine3` | `str` |  |
| `AddressLine4` | `str` |  |
| `BusinessName` | `str` |  |
| `BusinessType` | `str` |  |
| `BusinessTypeID` | `int` |  |
| `FHRSID` | `int` |  |
| `Geocode` | `dict` |  |
| `LocalAuthorityBusinessID` | `str` |  |
| `LocalAuthorityCode` | `str` |  |
| `LocalAuthorityEmailAddress` | `str` |  |
| `LocalAuthorityName` | `str` |  |
| `LocalAuthorityWebSite` | `str` |  |
| `NewRatingPending` | `bool` |  |
| `PostCode` | `str` |  |
| `RatingDate` | `str` |  |
| `RatingKey` | `str` |  |
| `RatingValue` | `str` |  |
| `SchemeType` | `str` |  |
| `latitude` | `float` |  |
| `longitude` | `float` |  |

#### Example: Load

```python
establishment = client.Establishment().load({"id": 1})
```

#### Example: List

```python
establishments = client.Establishment().list()
```


### Rating

Create an instance: `rating = client.Rating()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ratingId` | `int` |  |
| `ratingKey` | `str` |  |
| `ratingName` | `str` |  |
| `schemeType` | `str` |  |

#### Example: List

```python
ratings = client.Rating().list()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── foodhygienerating_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`foodhygienerating_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
authority = client.Authority()
authority.list()

# authority.data_get() now returns the authority data from the last list
# authority.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
