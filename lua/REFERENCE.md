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
| `Email` | `string` | No |  |
| `EstablishmentCount` | `number` | No |  |
| `FileName` | `string` | No |  |
| `FileNameWelsh` | `string` | No |  |
| `FriendlyName` | `string` | No |  |
| `LocalAuthorityId` | `number` | No |  |
| `LocalAuthorityIdCode` | `string` | No |  |
| `Name` | `string` | No |  |
| `RegionName` | `string` | No |  |
| `SchemeUrl` | `string` | No |  |
| `Url` | `string` | No |  |

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
| `BusinessTypeId` | `number` | No |  |
| `BusinessTypeName` | `string` | No |  |

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
| `AddressLine1` | `string` | No |  |
| `AddressLine2` | `string` | No |  |
| `AddressLine3` | `string` | No |  |
| `AddressLine4` | `string` | No |  |
| `BusinessName` | `string` | No |  |
| `BusinessType` | `string` | No |  |
| `BusinessTypeID` | `number` | No |  |
| `FHRSID` | `number` | No |  |
| `Geocode` | `table` | No |  |
| `LocalAuthorityBusinessID` | `string` | No |  |
| `LocalAuthorityCode` | `string` | No |  |
| `LocalAuthorityEmailAddress` | `string` | No |  |
| `LocalAuthorityName` | `string` | No |  |
| `LocalAuthorityWebSite` | `string` | No |  |
| `NewRatingPending` | `boolean` | No |  |
| `PostCode` | `string` | No |  |
| `RatingDate` | `string` | No |  |
| `RatingKey` | `string` | No |  |
| `RatingValue` | `string` | No |  |
| `SchemeType` | `string` | No |  |
| `latitude` | `number` | No |  |
| `longitude` | `number` | No |  |

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
| `ratingId` | `number` | No |  |
| `ratingKey` | `string` | No |  |
| `ratingName` | `string` | No |  |
| `schemeType` | `string` | No |  |

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

