# FoodHygieneRating PHP SDK Reference

Complete API reference for the FoodHygieneRating PHP SDK.


## FoodHygieneRatingSDK

### Constructor

```php
require_once __DIR__ . '/foodhygienerating_sdk.php';

$client = new FoodHygieneRatingSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FoodHygieneRatingSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = FoodHygieneRatingSDK::test();
```


### Instance Methods

#### `Authority($data = null)`

Create a new `AuthorityEntity` instance. Pass `null` for no initial data.

#### `BusinessType($data = null)`

Create a new `BusinessTypeEntity` instance. Pass `null` for no initial data.

#### `Establishment($data = null)`

Create a new `EstablishmentEntity` instance. Pass `null` for no initial data.

#### `Rating($data = null)`

Create a new `RatingEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): FoodHygieneRatingUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AuthorityEntity

```php
$authority = $client->Authority();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Email` | `string` | No |  |
| `EstablishmentCount` | `int` | No |  |
| `FileName` | `string` | No |  |
| `FileNameWelsh` | `string` | No |  |
| `FriendlyName` | `string` | No |  |
| `LocalAuthorityId` | `int` | No |  |
| `LocalAuthorityIdCode` | `string` | No |  |
| `Name` | `string` | No |  |
| `RegionName` | `string` | No |  |
| `SchemeUrl` | `string` | No |  |
| `Url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Authority()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Authority()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AuthorityEntity`

Create a new `AuthorityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BusinessTypeEntity

```php
$business_type = $client->BusinessType();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `BusinessTypeId` | `int` | No |  |
| `BusinessTypeName` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->BusinessType()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BusinessTypeEntity`

Create a new `BusinessTypeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EstablishmentEntity

```php
$establishment = $client->Establishment();
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
| `BusinessTypeID` | `int` | No |  |
| `FHRSID` | `int` | No |  |
| `Geocode` | `array` | No |  |
| `LocalAuthorityBusinessID` | `string` | No |  |
| `LocalAuthorityCode` | `string` | No |  |
| `LocalAuthorityEmailAddress` | `string` | No |  |
| `LocalAuthorityName` | `string` | No |  |
| `LocalAuthorityWebSite` | `string` | No |  |
| `NewRatingPending` | `bool` | No |  |
| `PostCode` | `string` | No |  |
| `RatingDate` | `string` | No |  |
| `RatingKey` | `string` | No |  |
| `RatingValue` | `string` | No |  |
| `SchemeType` | `string` | No |  |
| `latitude` | `float` | No |  |
| `longitude` | `float` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Establishment()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Establishment()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EstablishmentEntity`

Create a new `EstablishmentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RatingEntity

```php
$rating = $client->Rating();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ratingId` | `int` | No |  |
| `ratingKey` | `string` | No |  |
| `ratingName` | `string` | No |  |
| `schemeType` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Rating()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RatingEntity`

Create a new `RatingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new FoodHygieneRatingSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

