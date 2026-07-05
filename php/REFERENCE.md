# Hackernews PHP SDK Reference

Complete API reference for the Hackernews PHP SDK.


## HackernewsSDK

### Constructor

```php
require_once __DIR__ . '/hackernews_sdk.php';

$client = new HackernewsSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HackernewsSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = HackernewsSDK::test();
```


### Instance Methods

#### `Item($data = null)`

Create a new `ItemEntity` instance. Pass `null` for no initial data.

#### `LiveData($data = null)`

Create a new `LiveDataEntity` instance. Pass `null` for no initial data.

#### `Story($data = null)`

Create a new `StoryEntity` instance. Pass `null` for no initial data.

#### `Update($data = null)`

Create a new `UpdateEntity` instance. Pass `null` for no initial data.

#### `User($data = null)`

Create a new `UserEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): HackernewsUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

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

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ItemEntity

```php
$item = $client->Item();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by` | `string` | No |  |
| `dead` | `bool` | No |  |
| `deleted` | `bool` | No |  |
| `descendant` | `int` | No |  |
| `id` | `int` | Yes |  |
| `kid` | `array` | No |  |
| `parent` | `int` | No |  |
| `part` | `array` | No |  |
| `poll` | `int` | No |  |
| `score` | `int` | No |  |
| `text` | `string` | No |  |
| `time` | `int` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Item()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ItemEntity`

Create a new `ItemEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LiveDataEntity

```php
$live_data = $client->LiveData();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->LiveData()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LiveDataEntity`

Create a new `LiveDataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StoryEntity

```php
$story = $client->Story();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Story()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StoryEntity`

Create a new `StoryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UpdateEntity

```php
$update = $client->Update();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `item` | `array` | No |  |
| `profile` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Update()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UpdateEntity`

Create a new `UpdateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->User();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `about` | `string` | No |  |
| `created` | `int` | Yes |  |
| `id` | `string` | Yes |  |
| `karma` | `int` | Yes |  |
| `submitted` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->User()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new HackernewsSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

