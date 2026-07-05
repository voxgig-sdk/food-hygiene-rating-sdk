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
| `email` | `string` | No |  |
| `establishment_count` | `int` | No |  |
| `file_name` | `string` | No |  |
| `file_name_welsh` | `string` | No |  |
| `friendly_name` | `string` | No |  |
| `local_authority_id` | `int` | No |  |
| `local_authority_id_code` | `string` | No |  |
| `name` | `string` | No |  |
| `region_name` | `string` | No |  |
| `scheme_url` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Authority()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Authority()->load(["id" => "authority_id"]);
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
| `business_type_id` | `int` | No |  |
| `business_type_name` | `string` | No |  |

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
| `address_line1` | `string` | No |  |
| `address_line2` | `string` | No |  |
| `address_line3` | `string` | No |  |
| `address_line4` | `string` | No |  |
| `business_name` | `string` | No |  |
| `business_type` | `string` | No |  |
| `business_type_id` | `int` | No |  |
| `fhrsid` | `int` | No |  |
| `geocode` | `array` | No |  |
| `local_authority_business_id` | `string` | No |  |
| `local_authority_code` | `string` | No |  |
| `local_authority_email_address` | `string` | No |  |
| `local_authority_name` | `string` | No |  |
| `local_authority_web_site` | `string` | No |  |
| `new_rating_pending` | `bool` | No |  |
| `post_code` | `string` | No |  |
| `rating_date` | `string` | No |  |
| `rating_key` | `string` | No |  |
| `rating_value` | `string` | No |  |
| `scheme_type` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Establishment()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Establishment()->load(["id" => "establishment_id"]);
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
| `rating_id` | `int` | No |  |
| `rating_key` | `string` | No |  |
| `rating_name` | `string` | No |  |
| `scheme_type` | `string` | No |  |

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

