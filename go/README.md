# Hackernews Golang SDK



The Golang SDK for the Hackernews API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Item(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/hackernews-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/hackernews-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/hackernews-sdk/go=../hackernews-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/hackernews-sdk/go"
)

func main() {
    client := sdk.New()

    // List item records — the value is the array of records itself.
    items, err := client.Item(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range items.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
updates, err := client.Update(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = updates
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

update, err := client.Update(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(update) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewHackernewsSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
HACKERNEWS_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewHackernewsSDK

```go
func NewHackernewsSDK(options map[string]any) *HackernewsSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *HackernewsSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### HackernewsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Item` | `(data map[string]any) HackernewsEntity` | Create an Item entity instance. |
| `LiveData` | `(data map[string]any) HackernewsEntity` | Create a LiveData entity instance. |
| `Story` | `(data map[string]any) HackernewsEntity` | Create a Story entity instance. |
| `Update` | `(data map[string]any) HackernewsEntity` | Create an Update entity instance. |
| `User` | `(data map[string]any) HackernewsEntity` | Create an User entity instance. |

### Entity interface (HackernewsEntity)

All entities implement the `HackernewsEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    item, err := client.Item(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // item is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Item

| Field | Description |
| --- | --- |
| `"by"` | The username of the item's author |
| `"dead"` | true if the item is dead |
| `"deleted"` | true if the item is deleted |
| `"descendants"` | In the case of stories or polls, the total comment count |
| `"id"` | The item's unique id |
| `"kids"` | The ids of the item's comments, in ranked display order |
| `"parent"` | The comment's parent: either another comment or the relevant story |
| `"parts"` | A list of related pollopts, in display order |
| `"poll"` | The pollopt's associated poll |
| `"score"` | The story's score, or the votes for a pollopt |
| `"text"` | The comment, story or poll text. |
| `"time"` | Creation date of the item, in Unix Time |
| `"title"` | The title of the story, poll or job. |
| `"type"` | The type of item |
| `"url"` | The URL of the story |

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
| `"items"` | Array of item IDs that have been updated |
| `"profiles"` | Array of usernames whose profiles have been updated |

Operations: List.

API path: `/updates.json`

#### User

| Field | Description |
| --- | --- |
| `"about"` | The user's optional self-description. |
| `"created"` | Creation date of the user, in Unix Time |
| `"id"` | The user's unique username. |
| `"karma"` | The user's karma |
| `"submitted"` | List of the user's stories, polls and comments |

Operations: List.

API path: `/user/{id}.json`



## Entities


### Item

Create an instance: `item := client.Item(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by` | `string` | The username of the item's author |
| `dead` | `bool` | true if the item is dead |
| `deleted` | `bool` | true if the item is deleted |
| `descendants` | `int` | In the case of stories or polls, the total comment count |
| `id` | `int` | The item's unique id |
| `kids` | `[]any` | The ids of the item's comments, in ranked display order |
| `parent` | `int` | The comment's parent: either another comment or the relevant story |
| `parts` | `[]any` | A list of related pollopts, in display order |
| `poll` | `int` | The pollopt's associated poll |
| `score` | `int` | The story's score, or the votes for a pollopt |
| `text` | `string` | The comment, story or poll text. |
| `time` | `int` | Creation date of the item, in Unix Time |
| `title` | `string` | The title of the story, poll or job. |
| `type` | `string` | The type of item |
| `url` | `string` | The URL of the story |

#### Example: List

```go
items, err := client.Item(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(items) // the array of records
```


### LiveData

Create an instance: `liveData := client.LiveData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
liveData, err := client.LiveData(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(liveData) // the loaded record
```


### Story

Create an instance: `story := client.Story(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Example: List

```go
storys, err := client.Story(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(storys) // the array of records
```


### Update

Create an instance: `update := client.Update(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[]any` | Array of item IDs that have been updated |
| `profiles` | `[]any` | Array of usernames whose profiles have been updated |

#### Example: List

```go
updates, err := client.Update(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(updates) // the array of records
```


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `about` | `string` | The user's optional self-description. |
| `created` | `int` | Creation date of the user, in Unix Time |
| `id` | `string` | The user's unique username. |
| `karma` | `int` | The user's karma |
| `submitted` | `[]any` | List of the user's stories, polls and comments |

#### Example: List

```go
users, err := client.User(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(users) // the array of records
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/hackernews-sdk/go/
├── hackernews.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/hackernews-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
update := client.Update(nil)
update.List(nil, nil)

// update.Data() now returns the update data from the last list
// update.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
