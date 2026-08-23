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
| `Email` | `string` | No | Email address of the local authority |
| `EstablishmentCount` | `number` | No | Number of establishments registered with this authority |
| `FileName` | `string` | No | XML filename for the authority's data |
| `FileNameWelsh` | `string` | No | Welsh language XML filename (for Welsh authorities) |
| `FriendlyName` | `string` | No | Friendly display name of the local authority |
| `LocalAuthorityId` | `number` | No | Unique identifier for the local authority |
| `LocalAuthorityIdCode` | `string` | No | Code for the local authority |
| `Name` | `string` | No | Name of the local authority |
| `RegionName` | `string` | No | Region where the authority is located |
| `SchemeUrl` | `string` | No | URL to the local authority's food hygiene scheme page |
| `Url` | `string` | No | Website URL of the local authority |

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
| `BusinessTypeId` | `number` | No | Unique identifier for the business type |
| `BusinessTypeName` | `string` | No | Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop) |

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
| `AddressLine1` | `string` | No | First line of the address |
| `AddressLine2` | `string` | No | Second line of the address |
| `AddressLine3` | `string` | No | Third line of the address |
| `AddressLine4` | `string` | No | Fourth line of the address |
| `BusinessName` | `string` | No | Name of the food establishment |
| `BusinessType` | `string` | No | Type of food business (e.g., Restaurant, Pub, Café, Takeaway) |
| `BusinessTypeID` | `number` | No | Unique identifier for the business type |
| `FHRSID` | `number` | No | Unique identifier for the establishment in the FHRS system |
| `Geocode` | `table` | No |  |
| `LocalAuthorityBusinessID` | `string` | No | Business ID assigned by the local authority |
| `LocalAuthorityCode` | `string` | No | Code for the local authority |
| `LocalAuthorityEmailAddress` | `string` | No | Email address of the local authority |
| `LocalAuthorityName` | `string` | No | Name of the local authority |
| `LocalAuthorityWebSite` | `string` | No | Website of the local authority |
| `NewRatingPending` | `boolean` | No | Indicates if a new rating is pending |
| `PostCode` | `string` | No | Postcode of the establishment |
| `RatingDate` | `string` | No | Date the rating was issued |
| `RatingKey` | `string` | No | Key for the rating value |
| `RatingValue` | `string` | No | The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS) |
| `SchemeType` | `string` | No | Type of scheme (FHRS or FHIS) |
| `latitude` | `number` | No | Latitude coordinate of the establishment |
| `longitude` | `number` | No | Longitude coordinate of the establishment |

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
| `ratingId` | `number` | No | Unique identifier for the rating |
| `ratingKey` | `string` | No | Key for the rating value |
| `ratingName` | `string` | No | Name of the rating (e.g., '5', '4', 'Pass', 'Exempt') |
| `schemeType` | `string` | No | Scheme type this rating belongs to |

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

