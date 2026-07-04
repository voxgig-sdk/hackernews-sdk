# Hackernews PHP SDK



The PHP SDK for the Hackernews API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/hackernews-sdk/releases](https://github.com/voxgig-sdk/hackernews-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'hackernews_sdk.php';

$client = new HackernewsSDK();
```

### 2. List item records

```php
try {
    // list() returns an array of Item records — iterate directly.
    $items = $client->Item()->list();
    foreach ($items as $item) {
        echo $item["id"] . " " . $item["name"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = HackernewsSDK::test([
    "entity" => ["item" => ["test01" => ["id" => "test01"]]],
]);

// load() returns the bare mock record (throws on error).
$item = $client->Item()->load(["id" => "test01"]);
print_r($item);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new HackernewsSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
HACKERNEWS_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### HackernewsSDK

```php
require_once 'hackernews_sdk.php';
$client = new HackernewsSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = HackernewsSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### HackernewsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Item` | `($data): ItemEntity` | Create an Item entity instance. |
| `LiveData` | `($data): LiveDataEntity` | Create a LiveData entity instance. |
| `Story` | `($data): StoryEntity` | Create a Story entity instance. |
| `Update` | `($data): UpdateEntity` | Create an Update entity instance. |
| `User` | `($data): UserEntity` | Create an User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Operations: List.

API path: `/item/{id}.json`

#### LiveData

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/maxitem.json`

#### Story

| Field | Description |
| --- | --- |

Operations: List.

API path: `/askstories.json`

#### Update

| Field | Description |
| --- | --- |
| `item` |  |
| `profile` |  |

Operations: List.

API path: `/updates.json`

#### User

| Field | Description |
| --- | --- |
| `about` |  |
| `created` |  |
| `id` |  |
| `karma` |  |
| `submitted` |  |

Operations: List.

API path: `/user/{id}.json`



## Entities


### Item

Create an instance: `$item = $client->Item();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by` | ``$STRING`` |  |
| `dead` | ``$BOOLEAN`` |  |
| `deleted` | ``$BOOLEAN`` |  |
| `descendant` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `kid` | ``$ARRAY`` |  |
| `parent` | ``$INTEGER`` |  |
| `part` | ``$ARRAY`` |  |
| `poll` | ``$INTEGER`` |  |
| `score` | ``$INTEGER`` |  |
| `text` | ``$STRING`` |  |
| `time` | ``$INTEGER`` |  |
| `title` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: List

```php
// list() returns an array of Item records (throws on error).
$items = $client->Item()->list();
```


### LiveData

Create an instance: `$live_data = $client->LiveData();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare LiveData record (throws on error).
$live_data = $client->LiveData()->load(["id" => "live_data_id"]);
```


### Story

Create an instance: `$story = $client->Story();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of Story records (throws on error).
$storys = $client->Story()->list();
```


### Update

Create an instance: `$update = $client->Update();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `item` | ``$ARRAY`` |  |
| `profile` | ``$ARRAY`` |  |

#### Example: List

```php
// list() returns an array of Update records (throws on error).
$updates = $client->Update()->list();
```


### User

Create an instance: `$user = $client->User();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `about` | ``$STRING`` |  |
| `created` | ``$INTEGER`` |  |
| `id` | ``$STRING`` |  |
| `karma` | ``$INTEGER`` |  |
| `submitted` | ``$ARRAY`` |  |

#### Example: List

```php
// list() returns an array of User records (throws on error).
$users = $client->User()->list();
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── hackernews_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`hackernews_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$item = $client->Item();
$item->load(["id" => "example_id"]);

// $item->dataGet() now returns the loaded item data
// $item->matchGet() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
