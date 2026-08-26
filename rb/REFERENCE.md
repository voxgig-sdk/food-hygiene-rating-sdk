# FoodHygieneRating Ruby SDK Reference

Complete API reference for the FoodHygieneRating Ruby SDK.


## FoodHygieneRatingSDK

### Constructor

```ruby
require_relative 'FoodHygieneRating_sdk'

client = FoodHygieneRatingSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FoodHygieneRatingSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = FoodHygieneRatingSDK.test
```


### Instance Methods

#### `Authority(data = nil)`

Create a new `Authority` entity instance. Pass `nil` for no initial data.

#### `BusinessType(data = nil)`

Create a new `BusinessType` entity instance. Pass `nil` for no initial data.

#### `Establishment(data = nil)`

Create a new `Establishment` entity instance. Pass `nil` for no initial data.

#### `Rating(data = nil)`

Create a new `Rating` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AuthorityEntity

```ruby
authority = client.Authority
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Email` | `String` | No | Email address of the local authority |
| `EstablishmentCount` | `Integer` | No | Number of establishments registered with this authority |
| `FileName` | `String` | No | XML filename for the authority's data |
| `FileNameWelsh` | `String` | No | Welsh language XML filename (for Welsh authorities) |
| `FriendlyName` | `String` | No | Friendly display name of the local authority |
| `LocalAuthorityId` | `Integer` | No | Unique identifier for the local authority |
| `LocalAuthorityIdCode` | `String` | No | Code for the local authority |
| `Name` | `String` | No | Name of the local authority |
| `RegionName` | `String` | No | Region where the authority is located |
| `SchemeUrl` | `String` | No | URL to the local authority's food hygiene scheme page |
| `Url` | `String` | No | Website URL of the local authority |
| `id` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Authority.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Authority.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AuthorityEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BusinessTypeEntity

```ruby
business_type = client.BusinessType
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `BusinessTypeId` | `Integer` | No | Unique identifier for the business type |
| `BusinessTypeName` | `String` | No | Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop) |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.BusinessType.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BusinessTypeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EstablishmentEntity

```ruby
establishment = client.Establishment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `AddressLine1` | `String` | No | First line of the address |
| `AddressLine2` | `String` | No | Second line of the address |
| `AddressLine3` | `String` | No | Third line of the address |
| `AddressLine4` | `String` | No | Fourth line of the address |
| `BusinessName` | `String` | No | Name of the food establishment |
| `BusinessType` | `String` | No | Type of food business (e.g., Restaurant, Pub, Café, Takeaway) |
| `BusinessTypeID` | `Integer` | No | Unique identifier for the business type |
| `FHRSID` | `Integer` | No | Unique identifier for the establishment in the FHRS system |
| `Geocode` | `Hash` | No |  |
| `LocalAuthorityBusinessID` | `String` | No | Business ID assigned by the local authority |
| `LocalAuthorityCode` | `String` | No | Code for the local authority |
| `LocalAuthorityEmailAddress` | `String` | No | Email address of the local authority |
| `LocalAuthorityName` | `String` | No | Name of the local authority |
| `LocalAuthorityWebSite` | `String` | No | Website of the local authority |
| `NewRatingPending` | `Boolean` | No | Indicates if a new rating is pending |
| `PostCode` | `String` | No | Postcode of the establishment |
| `RatingDate` | `String` | No | Date the rating was issued |
| `RatingKey` | `String` | No | Key for the rating value |
| `RatingValue` | `String` | No | The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS) |
| `SchemeType` | `String` | No | Type of scheme (FHRS or FHIS) |
| `id` | `String` | No |  |
| `latitude` | `Float` | No | Latitude coordinate of the establishment |
| `longitude` | `Float` | No | Longitude coordinate of the establishment |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Establishment.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Establishment.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EstablishmentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RatingEntity

```ruby
rating = client.Rating
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ratingId` | `Integer` | No | Unique identifier for the rating |
| `ratingKey` | `String` | No | Key for the rating value |
| `ratingName` | `String` | No | Name of the rating (e.g., '5', '4', 'Pass', 'Exempt') |
| `schemeType` | `String` | No | Scheme type this rating belongs to |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Rating.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RatingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = FoodHygieneRatingSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

