# FoodHygieneRating Ruby SDK Reference

Complete API reference for the FoodHygieneRating Ruby SDK.


## FoodHygieneRatingSDK

### Constructor

```ruby
require_relative 'food-hygiene-rating_sdk'

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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Authority.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Authority.load({ "id" => "authority_id" })
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
| `business_type_id` | ``$INTEGER`` | No |  |
| `business_type_name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.BusinessType.list(nil)
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Establishment.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Establishment.load({ "id" => "establishment_id" })
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
| `rating_id` | ``$INTEGER`` | No |  |
| `rating_key` | ``$STRING`` | No |  |
| `rating_name` | ``$STRING`` | No |  |
| `scheme_type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Rating.list(nil)
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

