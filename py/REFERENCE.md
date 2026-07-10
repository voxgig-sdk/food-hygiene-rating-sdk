# FoodHygieneRating Python SDK Reference

Complete API reference for the FoodHygieneRating Python SDK.


## FoodHygieneRatingSDK

### Constructor

```python
from foodhygienerating_sdk import FoodHygieneRatingSDK

client = FoodHygieneRatingSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FoodHygieneRatingSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = FoodHygieneRatingSDK.test()
```


### Instance Methods

#### `Authority(data=None)`

Create a new `AuthorityEntity` instance. Pass `None` for no initial data.

#### `BusinessType(data=None)`

Create a new `BusinessTypeEntity` instance. Pass `None` for no initial data.

#### `Establishment(data=None)`

Create a new `EstablishmentEntity` instance. Pass `None` for no initial data.

#### `Rating(data=None)`

Create a new `RatingEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AuthorityEntity

```python
authority = client.Authority()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | No |  |
| `establishment_count` | `int` | No |  |
| `file_name` | `str` | No |  |
| `file_name_welsh` | `str` | No |  |
| `friendly_name` | `str` | No |  |
| `local_authority_id` | `int` | No |  |
| `local_authority_id_code` | `str` | No |  |
| `name` | `str` | No |  |
| `region_name` | `str` | No |  |
| `scheme_url` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Authority().list()
for authority in results:
    print(authority)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Authority().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AuthorityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BusinessTypeEntity

```python
business_type = client.BusinessType()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business_type_id` | `int` | No |  |
| `business_type_name` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.BusinessType().list()
for business_type in results:
    print(business_type)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BusinessTypeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EstablishmentEntity

```python
establishment = client.Establishment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_line1` | `str` | No |  |
| `address_line2` | `str` | No |  |
| `address_line3` | `str` | No |  |
| `address_line4` | `str` | No |  |
| `business_name` | `str` | No |  |
| `business_type` | `str` | No |  |
| `business_type_id` | `int` | No |  |
| `fhrsid` | `int` | No |  |
| `geocode` | `dict` | No |  |
| `local_authority_business_id` | `str` | No |  |
| `local_authority_code` | `str` | No |  |
| `local_authority_email_address` | `str` | No |  |
| `local_authority_name` | `str` | No |  |
| `local_authority_web_site` | `str` | No |  |
| `new_rating_pending` | `bool` | No |  |
| `post_code` | `str` | No |  |
| `rating_date` | `str` | No |  |
| `rating_key` | `str` | No |  |
| `rating_value` | `str` | No |  |
| `scheme_type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Establishment().list()
for establishment in results:
    print(establishment)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Establishment().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EstablishmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RatingEntity

```python
rating = client.Rating()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rating_id` | `int` | No |  |
| `rating_key` | `str` | No |  |
| `rating_name` | `str` | No |  |
| `scheme_type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Rating().list()
for rating in results:
    print(rating)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RatingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = FoodHygieneRatingSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

