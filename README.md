# Hackernews SDK

Read Hacker News stories, comments, jobs, polls, and user profiles in near real time

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About HackerNews API

The [Hacker News API](https://github.com/HackerNews/API) exposes the public data of [Hacker News](https://news.ycombinator.com) — stories, comments, jobs, Ask HN posts, polls, and user profiles — in near real time. It is operated by Y Combinator and served through Firebase, so the same endpoints work from Firebase client libraries (Android, iOS, web) as well as plain HTTPS.

What you get from the API:

- **Items** (`/v0/item/<id>.json`) — a unified object covering stories, comments, jobs, Ask HN, Show HN, and polls, with fields such as `id`, `type`, `by`, `time`, `text`, `url`, `score`, `title`, `kids`, `parent`, and `descendants`.
- **Users** (`/v0/user/<id>.json`) — profile data including `id`, `created`, `karma`, `about`, and `submitted` items.
- **Story lists** — `/v0/topstories.json`, `/v0/newstories.json`, `/v0/beststories.json`, `/v0/askstories.json`, `/v0/showstories.json`, `/v0/jobstories.json`.
- **Live data** — `/v0/maxitem.json` for the current largest item ID and `/v0/updates.json` for recently changed items and profiles.

No authentication is required and CORS is enabled, so the endpoints work directly from browsers. There are no documented rate limits, but treat the service as a shared public resource. Questions go to api@ycombinator.com.

## Try it

**TypeScript**
```bash
npm install hackernews
```

**Python**
```bash
pip install hackernews-sdk
```

**PHP**
```bash
composer require voxgig/hackernews-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/hackernews-sdk/go
```

**Ruby**
```bash
gem install hackernews-sdk
```

**Lua**
```bash
luarocks install hackernews-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { HackernewsSDK } from 'hackernews'

const client = new HackernewsSDK({})

// List all items
const items = await client.Item().list()
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
cd go-mcp && go build -o hackernews-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "hackernews": {
      "command": "/abs/path/to/hackernews-mcp"
    }
  }
}
```

## Entities

The API exposes 5 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Item** | A single piece of Hacker News content — story, comment, job, Ask HN, Show HN, or poll — fetched at `/v0/item/<id>.json`. | `/item/{id}.json` |
| **LiveData** | Real-time pointers into the dataset: `/v0/maxitem.json` returns the current largest item ID and `/v0/updates.json` lists items and profiles that have recently changed. | `/maxitem.json` |
| **Story** | Curated lists of front-page-style submissions, available as `/v0/topstories.json`, `/v0/newstories.json`, `/v0/beststories.json`, `/v0/askstories.json`, `/v0/showstories.json`, and `/v0/jobstories.json`. | `/askstories.json` |
| **Update** | The `/v0/updates.json` feed of items and user profiles modified recently, used to keep mirrors in sync. | `/updates.json` |
| **User** | A Hacker News account fetched at `/v0/user/<id>.json`, with creation date, karma, bio, and submission history. | `/user/{id}.json` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from hackernews_sdk import HackernewsSDK

client = HackernewsSDK({})

# List all items
items, err = client.Item(None).list(None, None)
```

### PHP

```php
<?php
require_once 'hackernews_sdk.php';

$client = new HackernewsSDK([]);

// List all items
[$items, $err] = $client->Item(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/hackernews-sdk/go"

client := sdk.NewHackernewsSDK(map[string]any{})

// List all items
items, err := client.Item(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Hackernews_sdk"

client = HackernewsSDK.new({})

# List all items
items, err = client.Item(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("hackernews_sdk")

local client = sdk.new({})

-- List all items
local items, err = client:Item(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = HackernewsSDK.test()
const result = await client.Item().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = HackernewsSDK.test(None, None)
result, err = client.Item(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = HackernewsSDK::test(null, null);
[$result, $err] = $client->Item(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Item(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = HackernewsSDK.test(nil, nil)
result, err = client.Item(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Item(nil):load(
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

## Using the HackerNews API

- Upstream: [https://github.com/HackerNews/API](https://github.com/HackerNews/API)

- Released under the **MIT License** by Y Combinator / Hacker News.
- Free to use for any purpose including commercial; attribution appreciated.
- Data is user-generated; respect the original authors and HN's community guidelines when reusing content.

---

Generated from the HackerNews API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
