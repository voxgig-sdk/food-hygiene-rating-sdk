# FoodHygieneRating TypeScript SDK



The TypeScript SDK for the FoodHygieneRating API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Authority()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/food-hygiene-rating-sdk/releases](https://github.com/voxgig-sdk/food-hygiene-rating-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { FoodHygieneRatingSDK } from '@voxgig-sdk/food-hygiene-rating'

const client = new FoodHygieneRatingSDK()
```

### 2. List authority records

`list()` resolves to an array of Authority ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const authoritys = await client.Authority().list()

for (const authority of authoritys) {
  console.log(authority)
}
```

### 3. Load an authority

`load()` returns the entity directly and throws on failure:

```ts
try {
  const authority = await client.Authority().load({ id: 1 })
  console.log(authority)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const authoritys = await client.Authority().list()
  console.log(authoritys)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = FoodHygieneRatingSDK.test()

const authority = await client.Authority().list()
// authority is the entity, populated with mock response data
// — call authority.data() for the record itself
console.log(authority)
```

You can also use the instance method:

```ts
const client = new FoodHygieneRatingSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Authority()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new FoodHygieneRatingSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FOOD_HYGIENE_RATING_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### FoodHygieneRatingSDK

#### Constructor

```ts
new FoodHygieneRatingSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Authority(data?)` | `AuthorityEntity` | Create an Authority entity instance. |
| `BusinessType(data?)` | `BusinessTypeEntity` | Create a BusinessType entity instance. |
| `Establishment(data?)` | `EstablishmentEntity` | Create an Establishment entity instance. |
| `Rating(data?)` | `RatingEntity` | Create a Rating entity instance. |
| `tester(testopts?, sdkopts?)` | `FoodHygieneRatingSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `FoodHygieneRatingSDK.test(testopts?, sdkopts?)` | `FoodHygieneRatingSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): FoodHygieneRatingSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list, load.

API path: `/Authorities`

#### BusinessType

| Field | Description |
| --- | --- |
| `BusinessTypeId` | Unique identifier for the business type |
| `BusinessTypeName` | Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop) |

Operations: list.

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
| `latitude` | Latitude coordinate of the establishment |
| `longitude` | Longitude coordinate of the establishment |

Operations: list, load.

API path: `/Establishments`

#### Rating

| Field | Description |
| --- | --- |
| `ratingId` | Unique identifier for the rating |
| `ratingKey` | Key for the rating value |
| `ratingName` | Name of the rating (e.g., '5', '4', 'Pass', 'Exempt') |
| `schemeType` | Scheme type this rating belongs to |

Operations: list.

API path: `/Ratings`



## Entities


### Authority

Create an instance: `const authority = client.Authority()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Email` | `string` | Email address of the local authority |
| `EstablishmentCount` | `number` | Number of establishments registered with this authority |
| `FileName` | `string` | XML filename for the authority's data |
| `FileNameWelsh` | `string` | Welsh language XML filename (for Welsh authorities) |
| `FriendlyName` | `string` | Friendly display name of the local authority |
| `LocalAuthorityId` | `number` | Unique identifier for the local authority |
| `LocalAuthorityIdCode` | `string` | Code for the local authority |
| `Name` | `string` | Name of the local authority |
| `RegionName` | `string` | Region where the authority is located |
| `SchemeUrl` | `string` | URL to the local authority's food hygiene scheme page |
| `Url` | `string` | Website URL of the local authority |

#### Example: Load

```ts
const authority = await client.Authority().load({ id: 1 })
```

#### Example: List

```ts
const authoritys = await client.Authority().list()
```


### BusinessType

Create an instance: `const business_type = client.BusinessType()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `BusinessTypeId` | `number` | Unique identifier for the business type |
| `BusinessTypeName` | `string` | Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop) |

#### Example: List

```ts
const business_types = await client.BusinessType().list()
```


### Establishment

Create an instance: `const establishment = client.Establishment()`

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
| `BusinessTypeID` | `number` | Unique identifier for the business type |
| `FHRSID` | `number` | Unique identifier for the establishment in the FHRS system |
| `Geocode` | `Record<string, any>` |  |
| `LocalAuthorityBusinessID` | `string` | Business ID assigned by the local authority |
| `LocalAuthorityCode` | `string` | Code for the local authority |
| `LocalAuthorityEmailAddress` | `string` | Email address of the local authority |
| `LocalAuthorityName` | `string` | Name of the local authority |
| `LocalAuthorityWebSite` | `string` | Website of the local authority |
| `NewRatingPending` | `boolean` | Indicates if a new rating is pending |
| `PostCode` | `string` | Postcode of the establishment |
| `RatingDate` | `string` | Date the rating was issued |
| `RatingKey` | `string` | Key for the rating value |
| `RatingValue` | `string` | The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS) |
| `SchemeType` | `string` | Type of scheme (FHRS or FHIS) |
| `latitude` | `number` | Latitude coordinate of the establishment |
| `longitude` | `number` | Longitude coordinate of the establishment |

#### Example: Load

```ts
const establishment = await client.Establishment().load({ id: 1 })
```

#### Example: List

```ts
const establishments = await client.Establishment().list()
```


### Rating

Create an instance: `const rating = client.Rating()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ratingId` | `number` | Unique identifier for the rating |
| `ratingKey` | `string` | Key for the rating value |
| `ratingName` | `string` | Name of the rating (e.g., '5', '4', 'Pass', 'Exempt') |
| `schemeType` | `string` | Scheme type this rating belongs to |

#### Example: List

```ts
const ratings = await client.Rating().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
food-hygiene-rating/
├── src/
│   ├── FoodHygieneRatingSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { FoodHygieneRatingSDK } from '@voxgig-sdk/food-hygiene-rating'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const authority = client.Authority()
await authority.list()

// authority.data() now returns the authority data from the last `list`
// authority.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
