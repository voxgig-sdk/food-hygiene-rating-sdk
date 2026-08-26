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
| `Email` | `str` | No | Email address of the local authority |
| `EstablishmentCount` | `int` | No | Number of establishments registered with this authority |
| `FileName` | `str` | No | XML filename for the authority's data |
| `FileNameWelsh` | `str` | No | Welsh language XML filename (for Welsh authorities) |
| `FriendlyName` | `str` | No | Friendly display name of the local authority |
| `LocalAuthorityId` | `int` | No | Unique identifier for the local authority |
| `LocalAuthorityIdCode` | `str` | No | Code for the local authority |
| `Name` | `str` | No | Name of the local authority |
| `RegionName` | `str` | No | Region where the authority is located |
| `SchemeUrl` | `str` | No | URL to the local authority's food hygiene scheme page |
| `Url` | `str` | No | Website URL of the local authority |
| `id` | `str` | No |  |

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
| `BusinessTypeId` | `int` | No | Unique identifier for the business type |
| `BusinessTypeName` | `str` | No | Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop) |

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
| `AddressLine1` | `str` | No | First line of the address |
| `AddressLine2` | `str` | No | Second line of the address |
| `AddressLine3` | `str` | No | Third line of the address |
| `AddressLine4` | `str` | No | Fourth line of the address |
| `BusinessName` | `str` | No | Name of the food establishment |
| `BusinessType` | `str` | No | Type of food business (e.g., Restaurant, Pub, Café, Takeaway) |
| `BusinessTypeID` | `int` | No | Unique identifier for the business type |
| `FHRSID` | `int` | No | Unique identifier for the establishment in the FHRS system |
| `Geocode` | `dict` | No |  |
| `LocalAuthorityBusinessID` | `str` | No | Business ID assigned by the local authority |
| `LocalAuthorityCode` | `str` | No | Code for the local authority |
| `LocalAuthorityEmailAddress` | `str` | No | Email address of the local authority |
| `LocalAuthorityName` | `str` | No | Name of the local authority |
| `LocalAuthorityWebSite` | `str` | No | Website of the local authority |
| `NewRatingPending` | `bool` | No | Indicates if a new rating is pending |
| `PostCode` | `str` | No | Postcode of the establishment |
| `RatingDate` | `str` | No | Date the rating was issued |
| `RatingKey` | `str` | No | Key for the rating value |
| `RatingValue` | `str` | No | The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS) |
| `SchemeType` | `str` | No | Type of scheme (FHRS or FHIS) |
| `id` | `str` | No |  |
| `latitude` | `float` | No | Latitude coordinate of the establishment |
| `longitude` | `float` | No | Longitude coordinate of the establishment |

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
| `ratingId` | `int` | No | Unique identifier for the rating |
| `ratingKey` | `str` | No | Key for the rating value |
| `ratingName` | `str` | No | Name of the rating (e.g., '5', '4', 'Pass', 'Exempt') |
| `schemeType` | `str` | No | Scheme type this rating belongs to |

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

