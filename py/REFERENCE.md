# Hackernews Python SDK Reference

Complete API reference for the Hackernews Python SDK.


## HackernewsSDK

### Constructor

```python
from hackernews_sdk import HackernewsSDK

client = HackernewsSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HackernewsSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = HackernewsSDK.test()
```


### Instance Methods

#### `Item(data=None)`

Create a new `ItemEntity` instance. Pass `None` for no initial data.

#### `LiveData(data=None)`

Create a new `LiveDataEntity` instance. Pass `None` for no initial data.

#### `Story(data=None)`

Create a new `StoryEntity` instance. Pass `None` for no initial data.

#### `Update(data=None)`

Create a new `UpdateEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ItemEntity

```python
item = client.Item()
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

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Item().list({})
for item in results:
    print(item)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ItemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LiveDataEntity

```python
live_data = client.LiveData()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.LiveData().load({"id": "live_data_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LiveDataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StoryEntity

```python
story = client.Story()
```

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Story().list({})
for story in results:
    print(story)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StoryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UpdateEntity

```python
update = client.Update()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `item` | ``$ARRAY`` | No |  |
| `profile` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Update().list({})
for update in results:
    print(update)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UpdateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
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

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.User().list({})
for user in results:
    print(user)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = HackernewsSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

