# Hackernews SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Hackernews",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://hacker-news.firebaseio.com/v0",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "item": {},
                "live_data": {},
                "story": {},
                "update": {},
                "user": {},
            },
        },
        "entity": {
      "item": {
        "fields": [
          {
            "name": "by",
            "type": "`$STRING`",
          },
          {
            "name": "dead",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "deleted",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "descendants",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "kids",
            "type": "`$ARRAY`",
          },
          {
            "name": "parent",
            "type": "`$INTEGER`",
          },
          {
            "name": "parts",
            "type": "`$ARRAY`",
          },
          {
            "name": "poll",
            "type": "`$INTEGER`",
          },
          {
            "name": "score",
            "type": "`$INTEGER`",
          },
          {
            "name": "text",
            "type": "`$STRING`",
          },
          {
            "name": "time",
            "type": "`$INTEGER`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "item",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "print",
                      "orig": "print",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/item/{id}.json",
                "parts": [
                  "item",
                  "{id}.json",
                ],
                "select": {
                  "$action": "id",
                  "exist": [
                    "id",
                    "print",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "item",
            ],
          ],
        },
      },
      "live_data": {
        "fields": [],
        "name": "live_data",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "print",
                      "orig": "print",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/maxitem.json",
                "parts": [
                  "maxitem.json",
                ],
                "select": {
                  "exist": [
                    "print",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "story": {
        "fields": [],
        "name": "story",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "print",
                      "orig": "print",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/askstories.json",
                "parts": [
                  "askstories.json",
                ],
                "select": {
                  "exist": [
                    "print",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "print",
                      "orig": "print",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/beststories.json",
                "parts": [
                  "beststories.json",
                ],
                "select": {
                  "exist": [
                    "print",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "print",
                      "orig": "print",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/jobstories.json",
                "parts": [
                  "jobstories.json",
                ],
                "select": {
                  "exist": [
                    "print",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "print",
                      "orig": "print",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/newstories.json",
                "parts": [
                  "newstories.json",
                ],
                "select": {
                  "exist": [
                    "print",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "print",
                      "orig": "print",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/showstories.json",
                "parts": [
                  "showstories.json",
                ],
                "select": {
                  "exist": [
                    "print",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "print",
                      "orig": "print",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/topstories.json",
                "parts": [
                  "topstories.json",
                ],
                "select": {
                  "exist": [
                    "print",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "update": {
        "fields": [
          {
            "name": "items",
            "type": "`$ARRAY`",
          },
          {
            "name": "profiles",
            "type": "`$ARRAY`",
          },
        ],
        "name": "update",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "print",
                      "orig": "print",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/updates.json",
                "parts": [
                  "updates.json",
                ],
                "select": {
                  "exist": [
                    "print",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "user": {
        "fields": [
          {
            "name": "about",
            "type": "`$STRING`",
          },
          {
            "name": "created",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "karma",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "submitted",
            "type": "`$ARRAY`",
          },
        ],
        "name": "user",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "print",
                      "orig": "print",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/user/{id}.json",
                "parts": [
                  "user",
                  "{id}.json",
                ],
                "select": {
                  "$action": "id",
                  "exist": [
                    "id",
                    "print",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.submitted`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "user",
            ],
          ],
        },
      },
    },
    }
