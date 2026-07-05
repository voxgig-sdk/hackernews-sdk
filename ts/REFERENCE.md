# Hackernews TypeScript SDK Reference

Complete API reference for the Hackernews TypeScript SDK.


## HackernewsSDK

### Constructor

```ts
new HackernewsSDK(options?: object)
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

#### `HackernewsSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = HackernewsSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `HackernewsSDK` instance in test mode.


### Instance Methods

#### `Item(data?: object)`

Create a new `Item` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ItemEntity` instance.

#### `LiveData(data?: object)`

Create a new `LiveData` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LiveDataEntity` instance.

#### `Story(data?: object)`

Create a new `Story` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StoryEntity` instance.

#### `Update(data?: object)`

Create a new `Update` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UpdateEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

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

Alias for `HackernewsSDK.test()`.

**Returns:** `HackernewsSDK` instance in test mode.


---

## ItemEntity

```ts
const item = client.Item()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by` | `string` | No |  |
| `dead` | `boolean` | No |  |
| `deleted` | `boolean` | No |  |
| `descendant` | `number` | No |  |
| `id` | `number` | Yes |  |
| `kid` | `any[]` | No |  |
| `parent` | `number` | No |  |
| `part` | `any[]` | No |  |
| `poll` | `number` | No |  |
| `score` | `number` | No |  |
| `text` | `string` | No |  |
| `time` | `number` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Item().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ItemEntity` instance with the same client and
options.

#### `client()`

Return the parent `HackernewsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LiveDataEntity

```ts
const live_data = client.LiveData()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.LiveData().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LiveDataEntity` instance with the same client and
options.

#### `client()`

Return the parent `HackernewsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StoryEntity

```ts
const story = client.Story()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Story().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `HackernewsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UpdateEntity

```ts
const update = client.Update()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `item` | `any[]` | No |  |
| `profile` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Update().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UpdateEntity` instance with the same client and
options.

#### `client()`

Return the parent `HackernewsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `about` | `string` | No |  |
| `created` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `karma` | `number` | Yes |  |
| `submitted` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.User().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `HackernewsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new HackernewsSDK({
  feature: {
    test: { active: true },
  }
})
```

