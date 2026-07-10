# FoodHygieneRating Golang SDK



The Golang SDK for the FoodHygieneRating API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Authority(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
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
| `"email"` |  |
| `"establishment_count"` |  |
| `"file_name"` |  |
| `"file_name_welsh"` |  |
| `"friendly_name"` |  |
| `"local_authority_id"` |  |
| `"local_authority_id_code"` |  |
| `"name"` |  |
| `"region_name"` |  |
| `"scheme_url"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/Authorities`

#### BusinessType

| Field | Description |
| --- | --- |
| `"business_type_id"` |  |
| `"business_type_name"` |  |

Operations: List.

API path: `/BusinessTypes`

#### Establishment

| Field | Description |
| --- | --- |
| `"address_line1"` |  |
| `"address_line2"` |  |
| `"address_line3"` |  |
| `"address_line4"` |  |
| `"business_name"` |  |
| `"business_type"` |  |
| `"business_type_id"` |  |
| `"fhrsid"` |  |
| `"geocode"` |  |
| `"local_authority_business_id"` |  |
| `"local_authority_code"` |  |
| `"local_authority_email_address"` |  |
| `"local_authority_name"` |  |
| `"local_authority_web_site"` |  |
| `"new_rating_pending"` |  |
| `"post_code"` |  |
| `"rating_date"` |  |
| `"rating_key"` |  |
| `"rating_value"` |  |
| `"scheme_type"` |  |

Operations: List, Load.

API path: `/Establishments`

#### Rating

| Field | Description |
| --- | --- |
| `"rating_id"` |  |
| `"rating_key"` |  |
| `"rating_name"` |  |
| `"scheme_type"` |  |

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
| `email` | `string` |  |
| `establishment_count` | `int` |  |
| `file_name` | `string` |  |
| `file_name_welsh` | `string` |  |
| `friendly_name` | `string` |  |
| `local_authority_id` | `int` |  |
| `local_authority_id_code` | `string` |  |
| `name` | `string` |  |
| `region_name` | `string` |  |
| `scheme_url` | `string` |  |
| `url` | `string` |  |

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
| `business_type_id` | `int` |  |
| `business_type_name` | `string` |  |

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
| `address_line1` | `string` |  |
| `address_line2` | `string` |  |
| `address_line3` | `string` |  |
| `address_line4` | `string` |  |
| `business_name` | `string` |  |
| `business_type` | `string` |  |
| `business_type_id` | `int` |  |
| `fhrsid` | `int` |  |
| `geocode` | `map[string]any` |  |
| `local_authority_business_id` | `string` |  |
| `local_authority_code` | `string` |  |
| `local_authority_email_address` | `string` |  |
| `local_authority_name` | `string` |  |
| `local_authority_web_site` | `string` |  |
| `new_rating_pending` | `bool` |  |
| `post_code` | `string` |  |
| `rating_date` | `string` |  |
| `rating_key` | `string` |  |
| `rating_value` | `string` |  |
| `scheme_type` | `string` |  |

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
| `rating_id` | `int` |  |
| `rating_key` | `string` |  |
| `rating_name` | `string` |  |
| `scheme_type` | `string` |  |

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
