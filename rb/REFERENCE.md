# Hackernews Ruby SDK Reference

Complete API reference for the Hackernews Ruby SDK.


## HackernewsSDK

### Constructor

```ruby
require_relative 'hackernews_sdk'

client = HackernewsSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HackernewsSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = HackernewsSDK.test
```


### Instance Methods

#### `Item(data = nil)`

Create a new `Item` entity instance. Pass `nil` for no initial data.

#### `LiveData(data = nil)`

Create a new `LiveData` entity instance. Pass `nil` for no initial data.

#### `Story(data = nil)`

Create a new `Story` entity instance. Pass `nil` for no initial data.

#### `Update(data = nil)`

Create a new `Update` entity instance. Pass `nil` for no initial data.

#### `User(data = nil)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ItemEntity

```ruby
item = client.Item
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by` | ``$STRING`` | No |  |
| `dead` | ``$BOOLEAN`` | No |  |
| `deleted` | ``$BOOLEAN`` | No |  |
| `descendant` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | Yes |  |
| `kid` | ``$ARRAY`` | No |  |
| `parent` | ``$INTEGER`` | No |  |
| `part` | ``$ARRAY`` | No |  |
| `poll` | ``$INTEGER`` | No |  |
| `score` | ``$INTEGER`` | No |  |
| `text` | ``$STRING`` | No |  |
| `time` | ``$INTEGER`` | No |  |
| `title` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Item.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ItemEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LiveDataEntity

```ruby
live_data = client.LiveData
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.LiveData.load({ "id" => "live_data_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LiveDataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StoryEntity

```ruby
story = client.Story
```

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Story.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StoryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UpdateEntity

```ruby
update = client.Update
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `item` | ``$ARRAY`` | No |  |
| `profile` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Update.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UpdateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserEntity

```ruby
user = client.User
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `about` | ``$STRING`` | No |  |
| `created` | ``$INTEGER`` | Yes |  |
| `id` | ``$STRING`` | Yes |  |
| `karma` | ``$INTEGER`` | Yes |  |
| `submitted` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.User.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = HackernewsSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

