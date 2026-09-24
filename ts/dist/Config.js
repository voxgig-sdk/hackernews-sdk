"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Hackernews',
        slug: "hackernews",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
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
        retry: {
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
        test: {
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
        timeout: {
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
    };
    options = {
        base: "https://hacker-news.firebaseio.com/v0",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            item: {},
            live_data: {},
            story: {},
            update: {},
            user: {},
        }
    };
    entity = {
        "item": {
            "fields": [
                {
                    "name": "by",
                    "title": "By",
                    "type": "`$STRING`",
                    "short": "The username of the item's author"
                },
                {
                    "name": "dead",
                    "title": "Dead",
                    "type": "`$BOOLEAN`",
                    "short": "true if the item is dead"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "true if the item is deleted"
                },
                {
                    "name": "descendants",
                    "title": "Descendants",
                    "type": "`$INTEGER`",
                    "short": "In the case of stories or polls, the total comment count"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The item's unique id"
                },
                {
                    "name": "kids",
                    "title": "Kids",
                    "type": "`$ARRAY`",
                    "short": "The ids of the item's comments, in ranked display order"
                },
                {
                    "name": "parent",
                    "title": "Parent",
                    "type": "`$INTEGER`",
                    "short": "The comment's parent: either another comment or the relevant story"
                },
                {
                    "name": "parts",
                    "title": "Parts",
                    "type": "`$ARRAY`",
                    "short": "A list of related pollopts, in display order"
                },
                {
                    "name": "poll",
                    "title": "Poll",
                    "type": "`$INTEGER`",
                    "short": "The pollopt's associated poll"
                },
                {
                    "name": "score",
                    "title": "Score",
                    "type": "`$INTEGER`",
                    "short": "The story's score, or the votes for a pollopt"
                },
                {
                    "name": "text",
                    "title": "Text",
                    "type": "`$STRING`",
                    "short": "The comment, story or poll text."
                },
                {
                    "name": "time",
                    "title": "Time",
                    "type": "`$INTEGER`",
                    "short": "Creation date of the item, in Unix Time"
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`",
                    "short": "The title of the story, poll or job."
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "short": "The type of item"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "short": "The URL of the story"
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
                            "parts": [
                                "item",
                                "{id}.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "print",
                                        "orig": "print",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "id",
                                "exist": [
                                    "id",
                                    "print"
                                ]
                            }
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/maxitem.json",
                            "segments": [
                                {
                                    "lit": "maxitem.json"
                                }
                            ],
                            "parts": [
                                "maxitem.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "print",
                                        "orig": "print",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "print"
                                ]
                            }
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/askstories.json",
                            "segments": [
                                {
                                    "lit": "askstories.json"
                                }
                            ],
                            "parts": [
                                "askstories.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "print",
                                        "orig": "print",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "print"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/beststories.json",
                            "segments": [
                                {
                                    "lit": "beststories.json"
                                }
                            ],
                            "parts": [
                                "beststories.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "print",
                                        "orig": "print",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "print"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/jobstories.json",
                            "segments": [
                                {
                                    "lit": "jobstories.json"
                                }
                            ],
                            "parts": [
                                "jobstories.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "print",
                                        "orig": "print",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "print"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/newstories.json",
                            "segments": [
                                {
                                    "lit": "newstories.json"
                                }
                            ],
                            "parts": [
                                "newstories.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "print",
                                        "orig": "print",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "print"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/showstories.json",
                            "segments": [
                                {
                                    "lit": "showstories.json"
                                }
                            ],
                            "parts": [
                                "showstories.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "print",
                                        "orig": "print",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "print"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/topstories.json",
                            "segments": [
                                {
                                    "lit": "topstories.json"
                                }
                            ],
                            "parts": [
                                "topstories.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "print",
                                        "orig": "print",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "print"
                                ]
                            }
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
                    "title": "Items",
                    "type": "`$ARRAY`",
                    "short": "Array of item IDs that have been updated"
                },
                {
                    "name": "profiles",
                    "title": "Profiles",
                    "type": "`$ARRAY`",
                    "short": "Array of usernames whose profiles have been updated"
                }
            ],
            "name": "update",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/updates.json",
                            "segments": [
                                {
                                    "lit": "updates.json"
                                }
                            ],
                            "parts": [
                                "updates.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "print",
                                        "orig": "print",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "print"
                                ]
                            }
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
                    "title": "About",
                    "type": "`$STRING`",
                    "short": "The user's optional self-description."
                },
                {
                    "name": "created",
                    "title": "Created",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Creation date of the user, in Unix Time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The user's unique username."
                },
                {
                    "name": "karma",
                    "title": "Karma",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The user's karma"
                },
                {
                    "name": "submitted",
                    "title": "Submitted",
                    "type": "`$ARRAY`",
                    "short": "List of the user's stories, polls and comments"
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
                            "parts": [
                                "user",
                                "{id}.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.submitted`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "print",
                                        "orig": "print",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "id",
                                "exist": [
                                    "id",
                                    "print"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map