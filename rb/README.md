# FoodHygieneRating Ruby SDK



The Ruby SDK for the FoodHygieneRating API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Authority` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/food-hygiene-rating-sdk/releases](https://github.com/voxgig-sdk/food-hygiene-rating-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "FoodHygieneRating_sdk"

client = FoodHygieneRatingSDK.new
```

### 2. List authority records

```ruby
begin
  # list returns an Array of Authority records — iterate directly.
  authoritys = client.Authority.list
  authoritys.each do |item|
    puts "#{item["id"]} #{item["Email"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an authority

```ruby
begin
  # load returns the ENTITY — call data_get for the Authority record (raises on error).
  authority = client.Authority.load({ "id" => 1 })
  puts authority
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  authoritys = client.Authority.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = FoodHygieneRatingSDK.test({
  "entity" => { "authority" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
authority = client.Authority.list()
puts authority
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = FoodHygieneRatingSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### FoodHygieneRatingSDK

```ruby
require_relative "FoodHygieneRating_sdk"
client = FoodHygieneRatingSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = FoodHygieneRatingSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FoodHygieneRatingSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Authority` | `(data) -> AuthorityEntity` | Create an Authority entity instance. |
| `BusinessType` | `(data) -> BusinessTypeEntity` | Create a BusinessType entity instance. |
| `Establishment` | `(data) -> EstablishmentEntity` | Create an Establishment entity instance. |
| `Rating` | `(data) -> RatingEntity` | Create a Rating entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `FoodHygieneRatingError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Authority

| Field | Description |
| --- | --- |
| `Email` | Email address of the local authority |
| `EstablishmentCount` | Number of establishments registered with this authority |
| `FileName` | XML filename for the authority's data |
| `FileNameWelsh` | Welsh language XML filename (for Welsh authorities) |
| `FriendlyName` | Friendly display name of the local authority |
| `LocalAuthorityId` | Unique identifier for the local authority |
| `LocalAuthorityIdCode` | Code for the local authority |
| `Name` | Name of the local authority |
| `RegionName` | Region where the authority is located |
| `SchemeUrl` | URL to the local authority's food hygiene scheme page |
| `Url` | Website URL of the local authority |
| `id` |  |

Operations: List, Load.

API path: `/Authorities`

#### BusinessType

| Field | Description |
| --- | --- |
| `BusinessTypeId` | Unique identifier for the business type |
| `BusinessTypeName` | Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop) |

Operations: List.

API path: `/BusinessTypes`

#### Establishment

| Field | Description |
| --- | --- |
| `AddressLine1` | First line of the address |
| `AddressLine2` | Second line of the address |
| `AddressLine3` | Third line of the address |
| `AddressLine4` | Fourth line of the address |
| `BusinessName` | Name of the food establishment |
| `BusinessType` | Type of food business (e.g., Restaurant, Pub, Café, Takeaway) |
| `BusinessTypeID` | Unique identifier for the business type |
| `FHRSID` | Unique identifier for the establishment in the FHRS system |
| `Geocode` |  |
| `LocalAuthorityBusinessID` | Business ID assigned by the local authority |
| `LocalAuthorityCode` | Code for the local authority |
| `LocalAuthorityEmailAddress` | Email address of the local authority |
| `LocalAuthorityName` | Name of the local authority |
| `LocalAuthorityWebSite` | Website of the local authority |
| `NewRatingPending` | Indicates if a new rating is pending |
| `PostCode` | Postcode of the establishment |
| `RatingDate` | Date the rating was issued |
| `RatingKey` | Key for the rating value |
| `RatingValue` | The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS) |
| `SchemeType` | Type of scheme (FHRS or FHIS) |
| `id` |  |
| `latitude` | Latitude coordinate of the establishment |
| `longitude` | Longitude coordinate of the establishment |

Operations: List, Load.

API path: `/Establishments`

#### Rating

| Field | Description |
| --- | --- |
| `ratingId` | Unique identifier for the rating |
| `ratingKey` | Key for the rating value |
| `ratingName` | Name of the rating (e.g., '5', '4', 'Pass', 'Exempt') |
| `schemeType` | Scheme type this rating belongs to |

Operations: List.

API path: `/Ratings`



## Entities


### Authority

Create an instance: `authority = client.Authority`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Email` | `String` | Email address of the local authority |
| `EstablishmentCount` | `Integer` | Number of establishments registered with this authority |
| `FileName` | `String` | XML filename for the authority's data |
| `FileNameWelsh` | `String` | Welsh language XML filename (for Welsh authorities) |
| `FriendlyName` | `String` | Friendly display name of the local authority |
| `LocalAuthorityId` | `Integer` | Unique identifier for the local authority |
| `LocalAuthorityIdCode` | `String` | Code for the local authority |
| `Name` | `String` | Name of the local authority |
| `RegionName` | `String` | Region where the authority is located |
| `SchemeUrl` | `String` | URL to the local authority's food hygiene scheme page |
| `Url` | `String` | Website URL of the local authority |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Authority record (raises on error).
authority = client.Authority.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Authority records (raises on error).
authoritys = client.Authority.list
```


### BusinessType

Create an instance: `business_type = client.BusinessType`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `BusinessTypeId` | `Integer` | Unique identifier for the business type |
| `BusinessTypeName` | `String` | Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop) |

#### Example: List

```ruby
# list returns an Array of BusinessType records (raises on error).
business_types = client.BusinessType.list
```


### Establishment

Create an instance: `establishment = client.Establishment`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `AddressLine1` | `String` | First line of the address |
| `AddressLine2` | `String` | Second line of the address |
| `AddressLine3` | `String` | Third line of the address |
| `AddressLine4` | `String` | Fourth line of the address |
| `BusinessName` | `String` | Name of the food establishment |
| `BusinessType` | `String` | Type of food business (e.g., Restaurant, Pub, Café, Takeaway) |
| `BusinessTypeID` | `Integer` | Unique identifier for the business type |
| `FHRSID` | `Integer` | Unique identifier for the establishment in the FHRS system |
| `Geocode` | `Hash` |  |
| `LocalAuthorityBusinessID` | `String` | Business ID assigned by the local authority |
| `LocalAuthorityCode` | `String` | Code for the local authority |
| `LocalAuthorityEmailAddress` | `String` | Email address of the local authority |
| `LocalAuthorityName` | `String` | Name of the local authority |
| `LocalAuthorityWebSite` | `String` | Website of the local authority |
| `NewRatingPending` | `Boolean` | Indicates if a new rating is pending |
| `PostCode` | `String` | Postcode of the establishment |
| `RatingDate` | `String` | Date the rating was issued |
| `RatingKey` | `String` | Key for the rating value |
| `RatingValue` | `String` | The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS) |
| `SchemeType` | `String` | Type of scheme (FHRS or FHIS) |
| `id` | `String` |  |
| `latitude` | `Float` | Latitude coordinate of the establishment |
| `longitude` | `Float` | Longitude coordinate of the establishment |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Establishment record (raises on error).
establishment = client.Establishment.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Establishment records (raises on error).
establishments = client.Establishment.list
```


### Rating

Create an instance: `rating = client.Rating`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ratingId` | `Integer` | Unique identifier for the rating |
| `ratingKey` | `String` | Key for the rating value |
| `ratingName` | `String` | Name of the rating (e.g., '5', '4', 'Pass', 'Exempt') |
| `schemeType` | `String` | Scheme type this rating belongs to |

#### Example: List

```ruby
# list returns an Array of Rating records (raises on error).
ratings = client.Rating.list
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── FoodHygieneRating_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`FoodHygieneRating_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
authority = client.Authority
authority.list()

# authority.data_get now returns the authority data from the last list
# authority.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
