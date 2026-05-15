# FoodHygieneRating PHP SDK Reference

Complete API reference for the FoodHygieneRating PHP SDK.


## FoodHygieneRatingSDK

### Constructor

```php
require_once __DIR__ . '/food-hygiene-rating_sdk.php';

$client = new FoodHygieneRatingSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## AuthorityEntity

```php
$authority = $client->Authority();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | No |  |
| `establishment_count` | ``$INTEGER`` | No |  |
| `file_name` | ``$STRING`` | No |  |
| `file_name_welsh` | ``$STRING`` | No |  |
| `friendly_name` | ``$STRING`` | No |  |
| `local_authority_id` | ``$INTEGER`` | No |  |
| `local_authority_id_code` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `region_name` | ``$STRING`` | No |  |
| `scheme_url` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Authority()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Authority()->load(["id" => "authority_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AuthorityEntity`

Create a new `AuthorityEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## BusinessTypeEntity

```php
$business_type = $client->BusinessType();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business_type_id` | ``$INTEGER`` | No |  |
| `business_type_name` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->BusinessType()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): BusinessTypeEntity`

Create a new `BusinessTypeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## EstablishmentEntity

```php
$establishment = $client->Establishment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_line1` | ``$STRING`` | No |  |
| `address_line2` | ``$STRING`` | No |  |
| `address_line3` | ``$STRING`` | No |  |
| `address_line4` | ``$STRING`` | No |  |
| `business_name` | ``$STRING`` | No |  |
| `business_type` | ``$STRING`` | No |  |
| `business_type_id` | ``$INTEGER`` | No |  |
| `fhrsid` | ``$INTEGER`` | No |  |
| `geocode` | ``$OBJECT`` | No |  |
| `local_authority_business_id` | ``$STRING`` | No |  |
| `local_authority_code` | ``$STRING`` | No |  |
| `local_authority_email_address` | ``$STRING`` | No |  |
| `local_authority_name` | ``$STRING`` | No |  |
| `local_authority_web_site` | ``$STRING`` | No |  |
| `new_rating_pending` | ``$BOOLEAN`` | No |  |
| `post_code` | ``$STRING`` | No |  |
| `rating_date` | ``$STRING`` | No |  |
| `rating_key` | ``$STRING`` | No |  |
| `rating_value` | ``$STRING`` | No |  |
| `scheme_type` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Establishment()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Establishment()->load(["id" => "establishment_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): EstablishmentEntity`

Create a new `EstablishmentEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RatingEntity

```php
$rating = $client->Rating();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rating_id` | ``$INTEGER`` | No |  |
| `rating_key` | ``$STRING`` | No |  |
| `rating_name` | ``$STRING`` | No |  |
| `scheme_type` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Rating()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RatingEntity`

Create a new `RatingEntity` instance with the same client and
options.

#### `getName(): string`

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

