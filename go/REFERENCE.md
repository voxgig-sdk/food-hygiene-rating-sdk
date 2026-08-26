# FoodHygieneRating Golang SDK Reference

Complete API reference for the FoodHygieneRating Golang SDK.


## FoodHygieneRatingSDK

### Constructor

```go
func NewFoodHygieneRatingSDK(options map[string]any) *FoodHygieneRatingSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *FoodHygieneRatingSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *FoodHygieneRatingSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Authority(data map[string]any) FoodHygieneRatingEntity`

Create a new `Authority` entity instance. Pass `nil` for no initial data.

#### `BusinessType(data map[string]any) FoodHygieneRatingEntity`

Create a new `BusinessType` entity instance. Pass `nil` for no initial data.

#### `Establishment(data map[string]any) FoodHygieneRatingEntity`

Create a new `Establishment` entity instance. Pass `nil` for no initial data.

#### `Rating(data map[string]any) FoodHygieneRatingEntity`

Create a new `Rating` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AuthorityEntity

```go
authority := client.Authority(nil)
fmt.Println(authority.GetName()) // "authority"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Email` | `string` | No | Email address of the local authority |
| `EstablishmentCount` | `int` | No | Number of establishments registered with this authority |
| `FileName` | `string` | No | XML filename for the authority's data |
| `FileNameWelsh` | `string` | No | Welsh language XML filename (for Welsh authorities) |
| `FriendlyName` | `string` | No | Friendly display name of the local authority |
| `LocalAuthorityId` | `int` | No | Unique identifier for the local authority |
| `LocalAuthorityIdCode` | `string` | No | Code for the local authority |
| `Name` | `string` | No | Name of the local authority |
| `RegionName` | `string` | No | Region where the authority is located |
| `SchemeUrl` | `string` | No | URL to the local authority's food hygiene scheme page |
| `Url` | `string` | No | Website URL of the local authority |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Authority(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Authority(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AuthorityEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BusinessTypeEntity

```go
businessType := client.BusinessType(nil)
fmt.Println(businessType.GetName()) // "business_type"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `BusinessTypeId` | `int` | No | Unique identifier for the business type |
| `BusinessTypeName` | `string` | No | Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop) |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.BusinessType(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BusinessTypeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EstablishmentEntity

```go
establishment := client.Establishment(nil)
fmt.Println(establishment.GetName()) // "establishment"
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
| `BusinessTypeID` | `int` | No | Unique identifier for the business type |
| `FHRSID` | `int` | No | Unique identifier for the establishment in the FHRS system |
| `Geocode` | `map[string]any` | No |  |
| `LocalAuthorityBusinessID` | `string` | No | Business ID assigned by the local authority |
| `LocalAuthorityCode` | `string` | No | Code for the local authority |
| `LocalAuthorityEmailAddress` | `string` | No | Email address of the local authority |
| `LocalAuthorityName` | `string` | No | Name of the local authority |
| `LocalAuthorityWebSite` | `string` | No | Website of the local authority |
| `NewRatingPending` | `bool` | No | Indicates if a new rating is pending |
| `PostCode` | `string` | No | Postcode of the establishment |
| `RatingDate` | `string` | No | Date the rating was issued |
| `RatingKey` | `string` | No | Key for the rating value |
| `RatingValue` | `string` | No | The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS) |
| `SchemeType` | `string` | No | Type of scheme (FHRS or FHIS) |
| `id` | `string` | No |  |
| `latitude` | `float64` | No | Latitude coordinate of the establishment |
| `longitude` | `float64` | No | Longitude coordinate of the establishment |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Establishment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Establishment(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EstablishmentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RatingEntity

```go
rating := client.Rating(nil)
fmt.Println(rating.GetName()) // "rating"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ratingId` | `int` | No | Unique identifier for the rating |
| `ratingKey` | `string` | No | Key for the rating value |
| `ratingName` | `string` | No | Name of the rating (e.g., '5', '4', 'Pass', 'Exempt') |
| `schemeType` | `string` | No | Scheme type this rating belongs to |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Rating(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RatingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewFoodHygieneRatingSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

