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
const authority = client.Authority()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Email` | `string` | No |  |
| `EstablishmentCount` | `number` | No |  |
| `FileName` | `string` | No |  |
| `FileNameWelsh` | `string` | No |  |
| `FriendlyName` | `string` | No |  |
| `LocalAuthorityId` | `number` | No |  |
| `LocalAuthorityIdCode` | `string` | No |  |
| `Name` | `string` | No |  |
| `RegionName` | `string` | No |  |
| `SchemeUrl` | `string` | No |  |
| `Url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Authority().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Authority().load({ id: 1 })
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
const business_type = client.BusinessType()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `BusinessTypeId` | `number` | No |  |
| `BusinessTypeName` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.BusinessType().list()
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
const establishment = client.Establishment()
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
| `BusinessTypeID` | `number` | No |  |
| `FHRSID` | `number` | No |  |
| `Geocode` | `Record<string, any>` | No |  |
| `LocalAuthorityBusinessID` | `string` | No |  |
| `LocalAuthorityCode` | `string` | No |  |
| `LocalAuthorityEmailAddress` | `string` | No |  |
| `LocalAuthorityName` | `string` | No |  |
| `LocalAuthorityWebSite` | `string` | No |  |
| `NewRatingPending` | `boolean` | No |  |
| `PostCode` | `string` | No |  |
| `RatingDate` | `string` | No |  |
| `RatingKey` | `string` | No |  |
| `RatingValue` | `string` | No |  |
| `SchemeType` | `string` | No |  |
| `latitude` | `number` | No |  |
| `longitude` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Establishment().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Establishment().load({ id: 1 })
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
const rating = client.Rating()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ratingId` | `number` | No |  |
| `ratingKey` | `string` | No |  |
| `ratingName` | `string` | No |  |
| `schemeType` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Rating().list()
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

