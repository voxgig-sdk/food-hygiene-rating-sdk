# FoodHygieneRating PHP SDK



The PHP SDK for the FoodHygieneRating API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Authority()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/food-hygiene-rating-sdk/releases](https://github.com/voxgig-sdk/food-hygiene-rating-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'foodhygienerating_sdk.php';

$client = new FoodHygieneRatingSDK();
```

### 2. List authority records

```php
try {
    // list() returns an array of Authority records — iterate directly.
    $authoritys = $client->Authority()->list();
    foreach ($authoritys as $item) {
        echo $item["id"] . " " . $item["Email"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an authority

```php
try {
    // load() returns the ENTITY — call data_get() for the Authority record (throws on error).
    $authority = $client->Authority()->load(["id" => 1]);
    print_r($authority);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $authoritys = $client->Authority()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = FoodHygieneRatingSDK::test([
    "entity" => ["authority" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$authority = $client->Authority()->list();
print_r($authority);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new FoodHygieneRatingSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
FOOD_HYGIENE_RATING_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### FoodHygieneRatingSDK

```php
require_once 'foodhygienerating_sdk.php';
$client = new FoodHygieneRatingSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = FoodHygieneRatingSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### FoodHygieneRatingSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Authority` | `($data): AuthorityEntity` | Create an Authority entity instance. |
| `BusinessType` | `($data): BusinessTypeEntity` | Create a BusinessType entity instance. |
| `Establishment` | `($data): EstablishmentEntity` | Create an Establishment entity instance. |
| `Rating` | `($data): RatingEntity` | Create a Rating entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$authority = $client->Authority();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Authority record (throws on error).
$authority = $client->Authority()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Authority records (throws on error).
$authoritys = $client->Authority()->list();
```


### BusinessType

Create an instance: `$business_type = $client->BusinessType();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `BusinessTypeId` | `int` | Unique identifier for the business type |
| `BusinessTypeName` | `string` | Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop) |

#### Example: List

```php
// list() returns an array of BusinessType records (throws on error).
$business_types = $client->BusinessType()->list();
```


### Establishment

Create an instance: `$establishment = $client->Establishment();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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
| `Geocode` | `array` |  |
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
| `id` | `string` |  |
| `latitude` | `float` | Latitude coordinate of the establishment |
| `longitude` | `float` | Longitude coordinate of the establishment |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Establishment record (throws on error).
$establishment = $client->Establishment()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Establishment records (throws on error).
$establishments = $client->Establishment()->list();
```


### Rating

Create an instance: `$rating = $client->Rating();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ratingId` | `int` | Unique identifier for the rating |
| `ratingKey` | `string` | Key for the rating value |
| `ratingName` | `string` | Name of the rating (e.g., '5', '4', 'Pass', 'Exempt') |
| `schemeType` | `string` | Scheme type this rating belongs to |

#### Example: List

```php
// list() returns an array of Rating records (throws on error).
$ratings = $client->Rating()->list();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── foodhygienerating_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`foodhygienerating_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$authority = $client->Authority();
$authority->list();

// $authority->data_get() now returns the authority data from the last list
// $authority->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
