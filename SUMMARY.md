# HackerNews API

Provides public Hacker News data in near real time. Accessible via Firebase client libraries for Android, iOS, and web. Includes information on stories, comments, jobs, Ask HNs, polls, and users.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 5 entities and 10 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Item

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `by`: The username of the item&#39;s author
- `dead`: true if the item is dead
- `deleted`: true if the item is deleted
- `descendants`: In the case of stories or polls, the total comment count
- `id`: The item&#39;s unique id

### LiveData

Results: Successful response.

SDK operations: `load`.

### Story

Results: Successful response.

SDK operations: `list`.

### Update

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `items`: Array of item IDs that have been updated
- `profiles`: Array of usernames whose profiles have been updated

### User

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `about`: The user&#39;s optional self-description. HTML.
- `created`: Creation date of the user, in Unix Time
- `id`: The user&#39;s unique username. Case-sensitive.
- `karma`: The user&#39;s karma
- `submitted`: List of the user&#39;s stories, polls and comments

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Item | `list` | `GET /item/{id}.json` | See reference |
| LiveData | `load` | `GET /maxitem.json` | See reference |
| Story | `list` | `GET /askstories.json` | See reference |
| Story | `list` | `GET /beststories.json` | See reference |
| Story | `list` | `GET /jobstories.json` | See reference |
| Story | `list` | `GET /newstories.json` | See reference |
| Story | `list` | `GET /showstories.json` | See reference |
| Story | `list` | `GET /topstories.json` | See reference |
| Update | `list` | `GET /updates.json` | See reference |
| User | `list` | `GET /user/{id}.json` | See reference |

## Connect to the API

- HackerNews API v0: `https://hacker-news.firebaseio.com/v0`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `hackernews_list`: List records for an entity. Supported entities: `item`, `story`, `update`, `user`.
- `hackernews_load`: Load one record for an entity. Supported entities: `live_data`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

