# FoodHygieneRating Golang SDK



The Golang SDK for the FoodHygieneRating API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

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
    authority, err := client.Authority(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(authority)
}
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

authority, err := client.Authority(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(authority) // the loaded mock data
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
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    authority, err := client.Authority(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // authority is the loaded record

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
| `email` | ``$STRING`` |  |
| `establishment_count` | ``$INTEGER`` |  |
| `file_name` | ``$STRING`` |  |
| `file_name_welsh` | ``$STRING`` |  |
| `friendly_name` | ``$STRING`` |  |
| `local_authority_id` | ``$INTEGER`` |  |
| `local_authority_id_code` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `region_name` | ``$STRING`` |  |
| `scheme_url` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
authority, err := client.Authority(nil).Load(map[string]any{"id": "authority_id"}, nil)
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

Create an instance: `business_type := client.BusinessType(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `business_type_id` | ``$INTEGER`` |  |
| `business_type_name` | ``$STRING`` |  |

#### Example: List

```go
business_types, err := client.BusinessType(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(business_types) // the array of records
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
| `address_line1` | ``$STRING`` |  |
| `address_line2` | ``$STRING`` |  |
| `address_line3` | ``$STRING`` |  |
| `address_line4` | ``$STRING`` |  |
| `business_name` | ``$STRING`` |  |
| `business_type` | ``$STRING`` |  |
| `business_type_id` | ``$INTEGER`` |  |
| `fhrsid` | ``$INTEGER`` |  |
| `geocode` | ``$OBJECT`` |  |
| `local_authority_business_id` | ``$STRING`` |  |
| `local_authority_code` | ``$STRING`` |  |
| `local_authority_email_address` | ``$STRING`` |  |
| `local_authority_name` | ``$STRING`` |  |
| `local_authority_web_site` | ``$STRING`` |  |
| `new_rating_pending` | ``$BOOLEAN`` |  |
| `post_code` | ``$STRING`` |  |
| `rating_date` | ``$STRING`` |  |
| `rating_key` | ``$STRING`` |  |
| `rating_value` | ``$STRING`` |  |
| `scheme_type` | ``$STRING`` |  |

#### Example: Load

```go
establishment, err := client.Establishment(nil).Load(map[string]any{"id": "establishment_id"}, nil)
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
| `rating_id` | ``$INTEGER`` |  |
| `rating_key` | ``$STRING`` |  |
| `rating_name` | ``$STRING`` |  |
| `scheme_type` | ``$STRING`` |  |

#### Example: List

```go
ratings, err := client.Rating(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(ratings) // the array of records
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
authority := client.Authority(nil)
authority.Load(map[string]any{"id": "example_id"}, nil)

// authority.Data() now returns the loaded authority data
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
