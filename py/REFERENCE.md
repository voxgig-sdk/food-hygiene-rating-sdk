# FoodHygieneRating Python SDK Reference

Complete API reference for the FoodHygieneRating Python SDK.


## FoodHygieneRatingSDK

### Constructor

```python
from food-hygiene-rating_sdk import FoodHygieneRatingSDK

client = FoodHygieneRatingSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
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

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## AuthorityEntity

```python
authority = client.Authority()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | No |  |
| `establishment_count` | ``$INTEGER`` | No |  |
| `file_name` | ``$STRING`` | No |  |
| `file_name_welsh` | ``$STRING`` | No |  |
| `friendly_name` | ``$STRING`` | No |  |
| `local_authority_id` | ``$INTEGER`` | No |  |
| `local_authority_id_code` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `region_name` | ``$STRING`` | No |  |
| `scheme_url` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Authority().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Authority().load({"id": "authority_id"})
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
| `business_type_id` | ``$INTEGER`` | No |  |
| `business_type_name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.BusinessType().list({})
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
| `address_line1` | ``$STRING`` | No |  |
| `address_line2` | ``$STRING`` | No |  |
| `address_line3` | ``$STRING`` | No |  |
| `address_line4` | ``$STRING`` | No |  |
| `business_name` | ``$STRING`` | No |  |
| `business_type` | ``$STRING`` | No |  |
| `business_type_id` | ``$INTEGER`` | No |  |
| `fhrsid` | ``$INTEGER`` | No |  |
| `geocode` | ``$OBJECT`` | No |  |
| `local_authority_business_id` | ``$STRING`` | No |  |
| `local_authority_code` | ``$STRING`` | No |  |
| `local_authority_email_address` | ``$STRING`` | No |  |
| `local_authority_name` | ``$STRING`` | No |  |
| `local_authority_web_site` | ``$STRING`` | No |  |
| `new_rating_pending` | ``$BOOLEAN`` | No |  |
| `post_code` | ``$STRING`` | No |  |
| `rating_date` | ``$STRING`` | No |  |
| `rating_key` | ``$STRING`` | No |  |
| `rating_value` | ``$STRING`` | No |  |
| `scheme_type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Establishment().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Establishment().load({"id": "establishment_id"})
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
| `rating_id` | ``$INTEGER`` | No |  |
| `rating_key` | ``$STRING`` | No |  |
| `rating_name` | ``$STRING`` | No |  |
| `scheme_type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Rating().list({})
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

