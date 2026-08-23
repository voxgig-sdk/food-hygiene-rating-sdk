# FoodHygieneRating Golang SDK



The Golang SDK for the FoodHygieneRating API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Authority(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/food-hygiene-rating-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/food-hygiene-rating-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/food-hygiene-rating-sdk/go=../food-hygiene-rating-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/food-hygiene-rating-sdk/go"
)

func main() {
    client := sdk.New()

    // List authority records — the value is the array of records itself.
    authoritys, err := client.Authority(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range authoritys.([]any) {
        fmt.Println(item)
    }

    // Load a single authority — the value is the loaded record.
    authority, err := client.Authority(nil).Load(map[string]any{"id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(authority)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
authoritys, err := client.Authority(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = authoritys
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

authority, err := client.Authority(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(authority) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewFoodHygieneRatingSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewFoodHygieneRatingSDK

```go
func NewFoodHygieneRatingSDK(options map[string]any) *FoodHygieneRatingSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *FoodHygieneRatingSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FoodHygieneRatingSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Authority` | `(data map[string]any) FoodHygieneRatingEntity` | Create an Authority entity instance. |
| `BusinessType` | `(data map[string]any) FoodHygieneRatingEntity` | Create a BusinessType entity instance. |
| `Establishment` | `(data map[string]any) FoodHygieneRatingEntity` | Create an Establishment entity instance. |
| `Rating` | `(data map[string]any) FoodHygieneRatingEntity` | Create a Rating entity instance. |

### Entity interface (FoodHygieneRatingEntity)

All entities implement the `FoodHygieneRatingEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    authority, err := client.Authority(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // authority is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Authority

| Field | Description |
| --- | --- |
| `"Email"` | Email address of the local authority |
| `"EstablishmentCount"` | Number of establishments registered with this authority |
| `"FileName"` | XML filename for the authority's data |
| `"FileNameWelsh"` | Welsh language XML filename (for Welsh authorities) |
| `"FriendlyName"` | Friendly display name of the local authority |
| `"LocalAuthorityId"` | Unique identifier for the local authority |
| `"LocalAuthorityIdCode"` | Code for the local authority |
| `"Name"` | Name of the local authority |
| `"RegionName"` | Region where the authority is located |
| `"SchemeUrl"` | URL to the local authority's food hygiene scheme page |
| `"Url"` | Website URL of the local authority |

Operations: List, Load.

API path: `/Authorities`

#### BusinessType

| Field | Description |
| --- | --- |
| `"BusinessTypeId"` | Unique identifier for the business type |
| `"BusinessTypeName"` | Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop) |

Operations: List.

API path: `/BusinessTypes`

#### Establishment

| Field | Description |
| --- | --- |
| `"AddressLine1"` | First line of the address |
| `"AddressLine2"` | Second line of the address |
| `"AddressLine3"` | Third line of the address |
| `"AddressLine4"` | Fourth line of the address |
| `"BusinessName"` | Name of the food establishment |
| `"BusinessType"` | Type of food business (e.g., Restaurant, Pub, Café, Takeaway) |
| `"BusinessTypeID"` | Unique identifier for the business type |
| `"FHRSID"` | Unique identifier for the establishment in the FHRS system |
| `"Geocode"` |  |
| `"LocalAuthorityBusinessID"` | Business ID assigned by the local authority |
| `"LocalAuthorityCode"` | Code for the local authority |
| `"LocalAuthorityEmailAddress"` | Email address of the local authority |
| `"LocalAuthorityName"` | Name of the local authority |
| `"LocalAuthorityWebSite"` | Website of the local authority |
| `"NewRatingPending"` | Indicates if a new rating is pending |
| `"PostCode"` | Postcode of the establishment |
| `"RatingDate"` | Date the rating was issued |
| `"RatingKey"` | Key for the rating value |
| `"RatingValue"` | The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS) |
| `"SchemeType"` | Type of scheme (FHRS or FHIS) |
| `"latitude"` | Latitude coordinate of the establishment |
| `"longitude"` | Longitude coordinate of the establishment |

Operations: List, Load.

API path: `/Establishments`

#### Rating

| Field | Description |
| --- | --- |
| `"ratingId"` | Unique identifier for the rating |
| `"ratingKey"` | Key for the rating value |
| `"ratingName"` | Name of the rating (e.g., '5', '4', 'Pass', 'Exempt') |
| `"schemeType"` | Scheme type this rating belongs to |

Operations: List.

API path: `/Ratings`



## Entities


### Authority

Create an instance: `authority := client.Authority(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Email` | `string` | Email address of the local authority |
| `EstablishmentCount` | `int` | Number of establishments registered with this authority |
| `FileName` | `string` | XML filename for the authority's data |
| `FileNameWelsh` | `string` | Welsh language XML filename (for Welsh authorities) |
| `FriendlyName` | `string` | Friendly display name of the local authority |
| `LocalAuthorityId` | `int` | Unique identifier for the local authority |
| `LocalAuthorityIdCode` | `string` | Code for the local authority |
| `Name` | `string` | Name of the local authority |
| `RegionName` | `string` | Region where the authority is located |
| `SchemeUrl` | `string` | URL to the local authority's food hygiene scheme page |
| `Url` | `string` | Website URL of the local authority |

#### Example: Load

```go
authority, err := client.Authority(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(authority) // the loaded record
```

#### Example: List

```go
authoritys, err := client.Authority(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(authoritys) // the array of records
```


### BusinessType

Create an instance: `businessType := client.BusinessType(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `BusinessTypeId` | `int` | Unique identifier for the business type |
| `BusinessTypeName` | `string` | Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop) |

#### Example: List

```go
businessTypes, err := client.BusinessType(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(businessTypes) // the array of records
```


### Establishment

Create an instance: `establishment := client.Establishment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `AddressLine1` | `string` | First line of the address |
| `AddressLine2` | `string` | Second line of the address |
| `AddressLine3` | `string` | Third line of the address |
| `AddressLine4` | `string` | Fourth line of the address |
| `BusinessName` | `string` | Name of the food establishment |
| `BusinessType` | `string` | Type of food business (e.g., Restaurant, Pub, Café, Takeaway) |
| `BusinessTypeID` | `int` | Unique identifier for the business type |
| `FHRSID` | `int` | Unique identifier for the establishment in the FHRS system |
| `Geocode` | `map[string]any` |  |
| `LocalAuthorityBusinessID` | `string` | Business ID assigned by the local authority |
| `LocalAuthorityCode` | `string` | Code for the local authority |
| `LocalAuthorityEmailAddress` | `string` | Email address of the local authority |
| `LocalAuthorityName` | `string` | Name of the local authority |
| `LocalAuthorityWebSite` | `string` | Website of the local authority |
| `NewRatingPending` | `bool` | Indicates if a new rating is pending |
| `PostCode` | `string` | Postcode of the establishment |
| `RatingDate` | `string` | Date the rating was issued |
| `RatingKey` | `string` | Key for the rating value |
| `RatingValue` | `string` | The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS) |
| `SchemeType` | `string` | Type of scheme (FHRS or FHIS) |
| `latitude` | `float64` | Latitude coordinate of the establishment |
| `longitude` | `float64` | Longitude coordinate of the establishment |

#### Example: Load

```go
establishment, err := client.Establishment(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(establishment) // the loaded record
```

#### Example: List

```go
establishments, err := client.Establishment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(establishments) // the array of records
```


### Rating

Create an instance: `rating := client.Rating(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ratingId` | `int` | Unique identifier for the rating |
| `ratingKey` | `string` | Key for the rating value |
| `ratingName` | `string` | Name of the rating (e.g., '5', '4', 'Pass', 'Exempt') |
| `schemeType` | `string` | Scheme type this rating belongs to |

#### Example: List

```go
ratings, err := client.Rating(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(ratings) // the array of records
```


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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/food-hygiene-rating-sdk/go/
├── food-hygiene-rating.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/food-hygiene-rating-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
authority := client.Authority(nil)
authority.List(nil, nil)

// authority.Data() now returns the authority data from the last list
// authority.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
