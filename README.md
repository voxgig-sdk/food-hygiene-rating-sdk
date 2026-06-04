# FoodHygieneRating SDK

Query UK food hygiene ratings issued by local authorities under the Food Standards Agency scheme

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Food Hygiene Rating API

This SDK wraps the [Food Hygiene Rating API](https://api.ratings.food.gov.uk/help) operated by the UK [Food Standards Agency](https://www.food.gov.uk). It exposes the same data that powers the public [ratings.food.gov.uk](https://ratings.food.gov.uk) site, covering food businesses inspected by local authorities across England, Wales, Scotland and Northern Ireland.

What you get from the API:
- Establishments — search food businesses by name, address, local authority, business type, rating value, or geographic radius, with paging and sorting.
- Lookup data — authorities, business types, ratings, schemes and other reference values used to filter and interpret establishment records.
- Both basic and detailed views of lookup data, returned in JSON or XML.

No authentication is required, but every request must include the `x-api-version: 2` header — requests without it return no data. Send `Accept-Language: cy-GB` to receive Welsh translations; English is the default. Northern Ireland and Scotland use the Food Hygiene Information Scheme (FHIS) rather than the star-rated FHRS, so rating values differ between schemes.

## Try it

**TypeScript**
```bash
npm install food-hygiene-rating
```

**Python**
```bash
pip install food-hygiene-rating-sdk
```

**PHP**
```bash
composer require voxgig/food-hygiene-rating-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/food-hygiene-rating-sdk/go
```

**Ruby**
```bash
gem install food-hygiene-rating-sdk
```

**Lua**
```bash
luarocks install food-hygiene-rating-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { FoodHygieneRatingSDK } from 'food-hygiene-rating'

const client = new FoodHygieneRatingSDK({})

// List all authoritys
const authoritys = await client.Authority().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o food-hygiene-rating-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "food-hygiene-rating": {
      "command": "/abs/path/to/food-hygiene-rating-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Authority** | A local authority responsible for inspecting and rating food businesses in its area; exposed as lookup data used to filter establishments. | `/Authorities` |
| **BusinessType** | A category of food business (for example restaurant, takeaway, retailer) used to classify and filter establishments. | `/BusinessTypes` |
| **Establishment** | An individual food business with its address, geolocation, local authority, business type and most recent hygiene rating; queried via the `Establishments` endpoint. | `/Establishments` |
| **Rating** | A hygiene rating value issued under FHRS (0–5 stars in England, Wales, Northern Ireland) or FHIS (Pass / Improvement Required in Scotland). | `/Ratings` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from foodhygienerating_sdk import FoodHygieneRatingSDK

client = FoodHygieneRatingSDK({})

# List all authoritys
authoritys, err = client.Authority(None).list(None, None)

# Load a specific authority
authority, err = client.Authority(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'foodhygienerating_sdk.php';

$client = new FoodHygieneRatingSDK([]);

// List all authoritys
[$authoritys, $err] = $client->Authority(null)->list(null, null);

// Load a specific authority
[$authority, $err] = $client->Authority(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/food-hygiene-rating-sdk/go"

client := sdk.NewFoodHygieneRatingSDK(map[string]any{})

// List all authoritys
authoritys, err := client.Authority(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "FoodHygieneRating_sdk"

client = FoodHygieneRatingSDK.new({})

# List all authoritys
authoritys, err = client.Authority(nil).list(nil, nil)

# Load a specific authority
authority, err = client.Authority(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("food-hygiene-rating_sdk")

local client = sdk.new({})

-- List all authoritys
local authoritys, err = client:Authority(nil):list(nil, nil)

-- Load a specific authority
local authority, err = client:Authority(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = FoodHygieneRatingSDK.test()
const result = await client.Authority().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = FoodHygieneRatingSDK.test(None, None)
result, err = client.Authority(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = FoodHygieneRatingSDK::test(null, null);
[$result, $err] = $client->Authority(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Authority(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FoodHygieneRatingSDK.test(nil, nil)
result, err = client.Authority(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Authority(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Food Hygiene Rating API

- Upstream: [https://ratings.food.gov.uk](https://ratings.food.gov.uk)
- API docs: [https://api.ratings.food.gov.uk/help](https://api.ratings.food.gov.uk/help)

- Free programmatic access provided by the UK Food Standards Agency (FSA); no sign-up, API keys, or login required.
- Data is published as open government information; reuse should credit the Food Standards Agency as the source.
- Ratings reflect the official Food Hygiene Rating Scheme (FHRS) and Food Hygiene Information Scheme (FHIS) at the time of inspection.

---

Generated from the Food Hygiene Rating API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
