# FoodHygieneRating Lua SDK



The Lua SDK for the FoodHygieneRating API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Authority()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/food-hygiene-rating-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("food-hygiene-rating_sdk")

local client = sdk.new()
```

### 2. List authority records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local authoritys, err = client:Authority():list()
if err then error(err) end

for _, item in ipairs(authoritys) do
  print(item["id"], item["Email"])
end
```

### 3. Load an authority

```lua
local authority, err = client:Authority():load({ id = 1 })
if err then error(err) end
print(authority)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local authoritys, err = client:Authority():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Authority():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### FoodHygieneRatingSDK

```lua
local sdk = require("food-hygiene-rating_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FoodHygieneRatingSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Authority` | `(data) -> AuthorityEntity` | Create an Authority entity instance. |
| `BusinessType` | `(data) -> BusinessTypeEntity` | Create a BusinessType entity instance. |
| `Establishment` | `(data) -> EstablishmentEntity` | Create an Establishment entity instance. |
| `Rating` | `(data) -> RatingEntity` | Create a Rating entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local authority, err = client:Authority():load({ id = "example_id" })
    if err then error(err) end
    -- authority is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Authority

| Field | Description |
| --- | --- |
| `Email` | Email address of the local authority |
| `EstablishmentCount` | Number of establishments registered with this authority |
| `FileName` | XML filename for the authority's data |
| `FileNameWelsh` | Welsh language XML filename (for Welsh authorities) |
| `FriendlyName` | Friendly display name of the local authority |
| `LocalAuthorityId` | Unique identifier for the local authority |
| `LocalAuthorityIdCode` | Code for the local authority |
| `Name` | Name of the local authority |
| `RegionName` | Region where the authority is located |
| `SchemeUrl` | URL to the local authority's food hygiene scheme page |
| `Url` | Website URL of the local authority |
| `id` |  |

Operations: List, Load.

API path: `/Authorities`

#### BusinessType

| Field | Description |
| --- | --- |
| `BusinessTypeId` | Unique identifier for the business type |
| `BusinessTypeName` | Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop) |

Operations: List.

API path: `/BusinessTypes`

#### Establishment

| Field | Description |
| --- | --- |
| `AddressLine1` | First line of the address |
| `AddressLine2` | Second line of the address |
| `AddressLine3` | Third line of the address |
| `AddressLine4` | Fourth line of the address |
| `BusinessName` | Name of the food establishment |
| `BusinessType` | Type of food business (e.g., Restaurant, Pub, Café, Takeaway) |
| `BusinessTypeID` | Unique identifier for the business type |
| `FHRSID` | Unique identifier for the establishment in the FHRS system |
| `Geocode` |  |
| `LocalAuthorityBusinessID` | Business ID assigned by the local authority |
| `LocalAuthorityCode` | Code for the local authority |
| `LocalAuthorityEmailAddress` | Email address of the local authority |
| `LocalAuthorityName` | Name of the local authority |
| `LocalAuthorityWebSite` | Website of the local authority |
| `NewRatingPending` | Indicates if a new rating is pending |
| `PostCode` | Postcode of the establishment |
| `RatingDate` | Date the rating was issued |
| `RatingKey` | Key for the rating value |
| `RatingValue` | The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS) |
| `SchemeType` | Type of scheme (FHRS or FHIS) |
| `id` |  |
| `latitude` | Latitude coordinate of the establishment |
| `longitude` | Longitude coordinate of the establishment |

Operations: List, Load.

API path: `/Establishments`

#### Rating

| Field | Description |
| --- | --- |
| `ratingId` | Unique identifier for the rating |
| `ratingKey` | Key for the rating value |
| `ratingName` | Name of the rating (e.g., '5', '4', 'Pass', 'Exempt') |
| `schemeType` | Scheme type this rating belongs to |

Operations: List.

API path: `/Ratings`



## Entities


### Authority

Create an instance: `local authority = client:Authority(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Email` | `string` | Email address of the local authority |
| `EstablishmentCount` | `number` | Number of establishments registered with this authority |
| `FileName` | `string` | XML filename for the authority's data |
| `FileNameWelsh` | `string` | Welsh language XML filename (for Welsh authorities) |
| `FriendlyName` | `string` | Friendly display name of the local authority |
| `LocalAuthorityId` | `number` | Unique identifier for the local authority |
| `LocalAuthorityIdCode` | `string` | Code for the local authority |
| `Name` | `string` | Name of the local authority |
| `RegionName` | `string` | Region where the authority is located |
| `SchemeUrl` | `string` | URL to the local authority's food hygiene scheme page |
| `Url` | `string` | Website URL of the local authority |
| `id` | `string` |  |

#### Example: Load

```lua
local authority, err = client:Authority():load({ id = 1 })
```

#### Example: List

```lua
local authoritys, err = client:Authority():list()
```


### BusinessType

Create an instance: `local business_type = client:BusinessType(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `BusinessTypeId` | `number` | Unique identifier for the business type |
| `BusinessTypeName` | `string` | Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop) |

#### Example: List

```lua
local business_types, err = client:BusinessType():list()
```


### Establishment

Create an instance: `local establishment = client:Establishment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `AddressLine1` | `string` | First line of the address |
| `AddressLine2` | `string` | Second line of the address |
| `AddressLine3` | `string` | Third line of the address |
| `AddressLine4` | `string` | Fourth line of the address |
| `BusinessName` | `string` | Name of the food establishment |
| `BusinessType` | `string` | Type of food business (e.g., Restaurant, Pub, Café, Takeaway) |
| `BusinessTypeID` | `number` | Unique identifier for the business type |
| `FHRSID` | `number` | Unique identifier for the establishment in the FHRS system |
| `Geocode` | `table` |  |
| `LocalAuthorityBusinessID` | `string` | Business ID assigned by the local authority |
| `LocalAuthorityCode` | `string` | Code for the local authority |
| `LocalAuthorityEmailAddress` | `string` | Email address of the local authority |
| `LocalAuthorityName` | `string` | Name of the local authority |
| `LocalAuthorityWebSite` | `string` | Website of the local authority |
| `NewRatingPending` | `boolean` | Indicates if a new rating is pending |
| `PostCode` | `string` | Postcode of the establishment |
| `RatingDate` | `string` | Date the rating was issued |
| `RatingKey` | `string` | Key for the rating value |
| `RatingValue` | `string` | The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS) |
| `SchemeType` | `string` | Type of scheme (FHRS or FHIS) |
| `id` | `string` |  |
| `latitude` | `number` | Latitude coordinate of the establishment |
| `longitude` | `number` | Longitude coordinate of the establishment |

#### Example: Load

```lua
local establishment, err = client:Establishment():load({ id = 1 })
```

#### Example: List

```lua
local establishments, err = client:Establishment():list()
```


### Rating

Create an instance: `local rating = client:Rating(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ratingId` | `number` | Unique identifier for the rating |
| `ratingKey` | `string` | Key for the rating value |
| `ratingName` | `string` | Name of the rating (e.g., '5', '4', 'Pass', 'Exempt') |
| `schemeType` | `string` | Scheme type this rating belongs to |

#### Example: List

```lua
local ratings, err = client:Rating():list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── food-hygiene-rating_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`food-hygiene-rating_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local authority = client:Authority()
authority:list()

-- authority:data_get() now returns the authority data from the last list
-- authority:match_get() returns the last match criteria
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
