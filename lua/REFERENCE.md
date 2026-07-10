# FoodHygieneRating Lua SDK Reference

Complete API reference for the FoodHygieneRating Lua SDK.


## FoodHygieneRatingSDK

### Constructor

```lua
local sdk = require("food-hygiene-rating_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Authority(data)`

Create a new `Authority` entity instance. Pass `nil` for no initial data.

#### `BusinessType(data)`

Create a new `BusinessType` entity instance. Pass `nil` for no initial data.

#### `Establishment(data)`

Create a new `Establishment` entity instance. Pass `nil` for no initial data.

#### `Rating(data)`

Create a new `Rating` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AuthorityEntity

```lua
local authority = client:Authority(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No |  |
| `establishment_count` | `number` | No |  |
| `file_name` | `string` | No |  |
| `file_name_welsh` | `string` | No |  |
| `friendly_name` | `string` | No |  |
| `local_authority_id` | `number` | No |  |
| `local_authority_id_code` | `string` | No |  |
| `name` | `string` | No |  |
| `region_name` | `string` | No |  |
| `scheme_url` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Authority():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Authority():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AuthorityEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BusinessTypeEntity

```lua
local business_type = client:BusinessType(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business_type_id` | `number` | No |  |
| `business_type_name` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:BusinessType():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BusinessTypeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EstablishmentEntity

```lua
local establishment = client:Establishment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_line1` | `string` | No |  |
| `address_line2` | `string` | No |  |
| `address_line3` | `string` | No |  |
| `address_line4` | `string` | No |  |
| `business_name` | `string` | No |  |
| `business_type` | `string` | No |  |
| `business_type_id` | `number` | No |  |
| `fhrsid` | `number` | No |  |
| `geocode` | `table` | No |  |
| `local_authority_business_id` | `string` | No |  |
| `local_authority_code` | `string` | No |  |
| `local_authority_email_address` | `string` | No |  |
| `local_authority_name` | `string` | No |  |
| `local_authority_web_site` | `string` | No |  |
| `new_rating_pending` | `boolean` | No |  |
| `post_code` | `string` | No |  |
| `rating_date` | `string` | No |  |
| `rating_key` | `string` | No |  |
| `rating_value` | `string` | No |  |
| `scheme_type` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Establishment():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Establishment():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EstablishmentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RatingEntity

```lua
local rating = client:Rating(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rating_id` | `number` | No |  |
| `rating_key` | `string` | No |  |
| `rating_name` | `string` | No |  |
| `scheme_type` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Rating():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RatingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

