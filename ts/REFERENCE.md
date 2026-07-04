# FoodHygieneRating TypeScript SDK Reference

Complete API reference for the FoodHygieneRating TypeScript SDK.


## FoodHygieneRatingSDK

### Constructor

```ts
new FoodHygieneRatingSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FoodHygieneRatingSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = FoodHygieneRatingSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `FoodHygieneRatingSDK` instance in test mode.


### Instance Methods

#### `Authority(data?: object)`

Create a new `Authority` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AuthorityEntity` instance.

#### `BusinessType(data?: object)`

Create a new `BusinessType` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BusinessTypeEntity` instance.

#### `Establishment(data?: object)`

Create a new `Establishment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EstablishmentEntity` instance.

#### `Rating(data?: object)`

Create a new `Rating` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RatingEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `FoodHygieneRatingSDK.test()`.

**Returns:** `FoodHygieneRatingSDK` instance in test mode.


---

## AuthorityEntity

```ts
const authority = client.authority
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.authority.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.authority.load({ id: 'authority_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AuthorityEntity` instance with the same client and
options.

#### `client()`

Return the parent `FoodHygieneRatingSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BusinessTypeEntity

```ts
const business_type = client.business_type
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business_type_id` | ``$INTEGER`` | No |  |
| `business_type_name` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.business_type.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BusinessTypeEntity` instance with the same client and
options.

#### `client()`

Return the parent `FoodHygieneRatingSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EstablishmentEntity

```ts
const establishment = client.establishment
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.establishment.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.establishment.load({ id: 'establishment_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EstablishmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `FoodHygieneRatingSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RatingEntity

```ts
const rating = client.rating
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rating_id` | ``$INTEGER`` | No |  |
| `rating_key` | ``$STRING`` | No |  |
| `rating_name` | ``$STRING`` | No |  |
| `scheme_type` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.rating.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RatingEntity` instance with the same client and
options.

#### `client()`

Return the parent `FoodHygieneRatingSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new FoodHygieneRatingSDK({
  feature: {
    test: { active: true },
  }
})
```

