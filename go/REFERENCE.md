# Hackernews Golang SDK Reference

Complete API reference for the Hackernews Golang SDK.


## HackernewsSDK

### Constructor

```go
func NewHackernewsSDK(options map[string]any) *HackernewsSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *HackernewsSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *HackernewsSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Item(data map[string]any) HackernewsEntity`

Create a new `Item` entity instance. Pass `nil` for no initial data.

#### `LiveData(data map[string]any) HackernewsEntity`

Create a new `LiveData` entity instance. Pass `nil` for no initial data.

#### `Story(data map[string]any) HackernewsEntity`

Create a new `Story` entity instance. Pass `nil` for no initial data.

#### `Update(data map[string]any) HackernewsEntity`

Create a new `Update` entity instance. Pass `nil` for no initial data.

#### `User(data map[string]any) HackernewsEntity`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ItemEntity

```go
item := client.Item(nil)
fmt.Println(item.GetName()) // "item"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by` | `string` | No | The username of the item's author |
| `dead` | `bool` | No | true if the item is dead |
| `deleted` | `bool` | No | true if the item is deleted |
| `descendants` | `int` | No | In the case of stories or polls, the total comment count |
| `id` | `int` | Yes | The item's unique id |
| `kids` | `[]any` | No | The ids of the item's comments, in ranked display order |
| `parent` | `int` | No | The comment's parent: either another comment or the relevant story |
| `parts` | `[]any` | No | A list of related pollopts, in display order |
| `poll` | `int` | No | The pollopt's associated poll |
| `score` | `int` | No | The story's score, or the votes for a pollopt |
| `text` | `string` | No | The comment, story or poll text. |
| `time` | `int` | No | Creation date of the item, in Unix Time |
| `title` | `string` | No | The title of the story, poll or job. |
| `type` | `string` | No | The type of item |
| `url` | `string` | No | The URL of the story |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Item(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ItemEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LiveDataEntity

```go
liveData := client.LiveData(nil)
fmt.Println(liveData.GetName()) // "live_data"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.LiveData(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LiveDataEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StoryEntity

```go
story := client.Story(nil)
fmt.Println(story.GetName()) // "story"
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Story(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StoryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UpdateEntity

```go
update := client.Update(nil)
fmt.Println(update.GetName()) // "update"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | `[]any` | No | Array of item IDs that have been updated |
| `profiles` | `[]any` | No | Array of usernames whose profiles have been updated |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Update(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UpdateEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserEntity

```go
user := client.User(nil)
fmt.Println(user.GetName()) // "user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `about` | `string` | No | The user's optional self-description. |
| `created` | `int` | Yes | Creation date of the user, in Unix Time |
| `id` | `string` | Yes | The user's unique username. |
| `karma` | `int` | Yes | The user's karma |
| `submitted` | `[]any` | No | List of the user's stories, polls and comments |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.User(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewHackernewsSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

