# Hackernews TypeScript SDK



The TypeScript SDK for the Hackernews API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Item()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/hackernews-sdk/releases](https://github.com/voxgig-sdk/hackernews-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { HackernewsSDK } from '@voxgig-sdk/hackernews'

const client = new HackernewsSDK()
```

### 2. List item records

`list()` resolves to an array of Item objects — iterate it directly:

```ts
const items = await client.Item().list()

for (const item of items) {
  console.log(item)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const items = await client.Item().list()
  console.log(items)
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
const client = HackernewsSDK.test()

const item = await client.Item().list()
// item is a bare entity populated with mock response data
console.log(item)
```

You can also use the instance method:

```ts
const client = new HackernewsSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Item()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
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

const client = new HackernewsSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
HACKERNEWS_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### HackernewsSDK

#### Constructor

```ts
new HackernewsSDK(options?: {
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
| `Item(data?)` | `ItemEntity` | Create an Item entity instance. |
| `LiveData(data?)` | `LiveDataEntity` | Create a LiveData entity instance. |
| `Story(data?)` | `StoryEntity` | Create a Story entity instance. |
| `Update(data?)` | `UpdateEntity` | Create an Update entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `tester(testopts?, sdkopts?)` | `HackernewsSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `HackernewsSDK.test(testopts?, sdkopts?)` | `HackernewsSDK` | Create a test-mode client. |

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
| `client` | `client(): HackernewsSDK` | Return the parent SDK client. |
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

#### Item

| Field | Description |
| --- | --- |
| `by` |  |
| `dead` |  |
| `deleted` |  |
| `descendant` |  |
| `id` |  |
| `kid` |  |
| `parent` |  |
| `part` |  |
| `poll` |  |
| `score` |  |
| `text` |  |
| `time` |  |
| `title` |  |
| `type` |  |
| `url` |  |

Operations: list.

API path: `/item/{id}.json`

#### LiveData

| Field | Description |
| --- | --- |

Operations: load.

API path: `/maxitem.json`

#### Story

| Field | Description |
| --- | --- |

Operations: list.

API path: `/askstories.json`

#### Update

| Field | Description |
| --- | --- |
| `item` |  |
| `profile` |  |

Operations: list.

API path: `/updates.json`

#### User

| Field | Description |
| --- | --- |
| `about` |  |
| `created` |  |
| `id` |  |
| `karma` |  |
| `submitted` |  |

Operations: list.

API path: `/user/{id}.json`



## Entities


### Item

Create an instance: `const item = client.Item()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by` | `string` |  |
| `dead` | `boolean` |  |
| `deleted` | `boolean` |  |
| `descendant` | `number` |  |
| `id` | `number` |  |
| `kid` | `any[]` |  |
| `parent` | `number` |  |
| `part` | `any[]` |  |
| `poll` | `number` |  |
| `score` | `number` |  |
| `text` | `string` |  |
| `time` | `number` |  |
| `title` | `string` |  |
| `type` | `string` |  |
| `url` | `string` |  |

#### Example: List

```ts
const items = await client.Item().list()
```


### LiveData

Create an instance: `const live_data = client.LiveData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const live_data = await client.LiveData().load()
```


### Story

Create an instance: `const story = client.Story()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const storys = await client.Story().list()
```


### Update

Create an instance: `const update = client.Update()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `item` | `any[]` |  |
| `profile` | `any[]` |  |

#### Example: List

```ts
const updates = await client.Update().list()
```


### User

Create an instance: `const user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `about` | `string` |  |
| `created` | `number` |  |
| `id` | `string` |  |
| `karma` | `number` |  |
| `submitted` | `any[]` |  |

#### Example: List

```ts
const users = await client.User().list()
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
hackernews/
├── src/
│   ├── HackernewsSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { HackernewsSDK } from '@voxgig-sdk/hackernews'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const item = client.Item()
await item.list()

// item.data() now returns the item data from the last `list`
// item.match() returns the last match criteria
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
