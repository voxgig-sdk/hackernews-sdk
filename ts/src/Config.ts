
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Hackernews',
        slug: "hackernews",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://hacker-news.firebaseio.com/v0",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      item: {
      },

      live_data: {
      },

      story: {
      },

      update: {
      },

      user: {
      },

    }
  }


  entity = {
    "item": {
      "fields": [
        {
          "name": "by",
          "short": "The username of the item's author",
          "type": "`$STRING`"
        },
        {
          "name": "dead",
          "short": "true if the item is dead",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "deleted",
          "short": "true if the item is deleted",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "descendants",
          "short": "In the case of stories or polls, the total comment count",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "req": true,
          "short": "The item's unique id",
          "type": "`$INTEGER`"
        },
        {
          "name": "kids",
          "short": "The ids of the item's comments, in ranked display order",
          "type": "`$ARRAY`"
        },
        {
          "name": "parent",
          "short": "The comment's parent: either another comment or the relevant story",
          "type": "`$INTEGER`"
        },
        {
          "name": "parts",
          "short": "A list of related pollopts, in display order",
          "type": "`$ARRAY`"
        },
        {
          "name": "poll",
          "short": "The pollopt's associated poll",
          "type": "`$INTEGER`"
        },
        {
          "name": "score",
          "short": "The story's score, or the votes for a pollopt",
          "type": "`$INTEGER`"
        },
        {
          "name": "text",
          "short": "The comment, story or poll text.",
          "type": "`$STRING`"
        },
        {
          "name": "time",
          "short": "Creation date of the item, in Unix Time",
          "type": "`$INTEGER`"
        },
        {
          "name": "title",
          "short": "The title of the story, poll or job.",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "short": "The type of item",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "The URL of the story",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "print",
                    "orig": "print",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/item/{id}.json",
              "segments": [
                {
                  "lit": "item"
                },
                {
                  "lit": "{id}.json"
                }
              ],
              "select": {
                "$action": "id",
                "exist": [
                  "id",
                  "print"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "item",
                "{id}.json"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/maxitem.json",
              "segments": [
                {
                  "lit": "maxitem.json"
                }
              ],
              "select": {
                "exist": [
                  "print"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "maxitem.json"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/askstories.json",
              "segments": [
                {
                  "lit": "askstories.json"
                }
              ],
              "select": {
                "exist": [
                  "print"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "askstories.json"
              ]
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "print",
                    "orig": "print",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/beststories.json",
              "segments": [
                {
                  "lit": "beststories.json"
                }
              ],
              "select": {
                "exist": [
                  "print"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "beststories.json"
              ]
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "print",
                    "orig": "print",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/jobstories.json",
              "segments": [
                {
                  "lit": "jobstories.json"
                }
              ],
              "select": {
                "exist": [
                  "print"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "jobstories.json"
              ]
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "print",
                    "orig": "print",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/newstories.json",
              "segments": [
                {
                  "lit": "newstories.json"
                }
              ],
              "select": {
                "exist": [
                  "print"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "newstories.json"
              ]
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "print",
                    "orig": "print",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/showstories.json",
              "segments": [
                {
                  "lit": "showstories.json"
                }
              ],
              "select": {
                "exist": [
                  "print"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "showstories.json"
              ]
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "print",
                    "orig": "print",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/topstories.json",
              "segments": [
                {
                  "lit": "topstories.json"
                }
              ],
              "select": {
                "exist": [
                  "print"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "topstories.json"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "update": {
      "fields": [
        {
          "name": "items",
          "short": "Array of item IDs that have been updated",
          "type": "`$ARRAY`"
        },
        {
          "name": "profiles",
          "short": "Array of usernames whose profiles have been updated",
          "type": "`$ARRAY`"
        }
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
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/updates.json",
              "segments": [
                {
                  "lit": "updates.json"
                }
              ],
              "select": {
                "exist": [
                  "print"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "updates.json"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "user": {
      "fields": [
        {
          "name": "about",
          "short": "The user's optional self-description.",
          "type": "`$STRING`"
        },
        {
          "name": "created",
          "req": true,
          "short": "Creation date of the user, in Unix Time",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "req": true,
          "short": "The user's unique username.",
          "type": "`$STRING`"
        },
        {
          "name": "karma",
          "req": true,
          "short": "The user's karma",
          "type": "`$INTEGER`"
        },
        {
          "name": "submitted",
          "short": "List of the user's stories, polls and comments",
          "type": "`$ARRAY`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "print",
                    "orig": "print",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/user/{id}.json",
              "segments": [
                {
                  "lit": "user"
                },
                {
                  "lit": "{id}.json"
                }
              ],
              "select": {
                "$action": "id",
                "exist": [
                  "id",
                  "print"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.submitted`"
              },
              "parts": [
                "user",
                "{id}.json"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

