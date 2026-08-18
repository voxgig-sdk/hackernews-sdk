# Hackernews SDK configuration

module HackernewsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Hackernews",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://hacker-news.firebaseio.com/v0",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "item" => {},
          "live_data" => {},
          "story" => {},
          "update" => {},
          "user" => {},
        },
      },
      "entity" => {
        "item" => {
          "fields" => [
            {
              "name" => "by",
              "type" => "`$STRING`",
            },
            {
              "name" => "dead",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "deleted",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "descendants",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "kids",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "parent",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "parts",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "poll",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "score",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "text",
              "type" => "`$STRING`",
            },
            {
              "name" => "time",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "title",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "type" => "`$STRING`",
            },
          ],
          "name" => "item",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "print",
                        "orig" => "print",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/item/{id}.json",
                  "parts" => [
                    "item",
                    "{id}.json",
                  ],
                  "select" => {
                    "$action" => "id",
                    "exist" => [
                      "id",
                      "print",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "item",
              ],
            ],
          },
        },
        "live_data" => {
          "fields" => [],
          "name" => "live_data",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "print",
                        "orig" => "print",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/maxitem.json",
                  "parts" => [
                    "maxitem.json",
                  ],
                  "select" => {
                    "exist" => [
                      "print",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "story" => {
          "fields" => [],
          "name" => "story",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "print",
                        "orig" => "print",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/askstories.json",
                  "parts" => [
                    "askstories.json",
                  ],
                  "select" => {
                    "exist" => [
                      "print",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "print",
                        "orig" => "print",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/beststories.json",
                  "parts" => [
                    "beststories.json",
                  ],
                  "select" => {
                    "exist" => [
                      "print",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "print",
                        "orig" => "print",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/jobstories.json",
                  "parts" => [
                    "jobstories.json",
                  ],
                  "select" => {
                    "exist" => [
                      "print",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "print",
                        "orig" => "print",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/newstories.json",
                  "parts" => [
                    "newstories.json",
                  ],
                  "select" => {
                    "exist" => [
                      "print",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "print",
                        "orig" => "print",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/showstories.json",
                  "parts" => [
                    "showstories.json",
                  ],
                  "select" => {
                    "exist" => [
                      "print",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "print",
                        "orig" => "print",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/topstories.json",
                  "parts" => [
                    "topstories.json",
                  ],
                  "select" => {
                    "exist" => [
                      "print",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "update" => {
          "fields" => [
            {
              "name" => "items",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "profiles",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "update",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "print",
                        "orig" => "print",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/updates.json",
                  "parts" => [
                    "updates.json",
                  ],
                  "select" => {
                    "exist" => [
                      "print",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "user" => {
          "fields" => [
            {
              "name" => "about",
              "type" => "`$STRING`",
            },
            {
              "name" => "created",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "karma",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "submitted",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "user",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "print",
                        "orig" => "print",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/user/{id}.json",
                  "parts" => [
                    "user",
                    "{id}.json",
                  ],
                  "select" => {
                    "$action" => "id",
                    "exist" => [
                      "id",
                      "print",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.submitted`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "user",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    HackernewsFeatures.make_feature(name)
  end
end
