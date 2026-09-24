package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Hackernews",
			"slug": "hackernews",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://hacker-news.firebaseio.com/v0",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"item": map[string]any{},
				"live_data": map[string]any{},
				"story": map[string]any{},
				"update": map[string]any{},
				"user": map[string]any{},
			},
		},
		"entity": map[string]any{
			"item": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "by",
						"title": "By",
						"type": "`$STRING`",
						"short": "The username of the item's author",
					},
					map[string]any{
						"name": "dead",
						"title": "Dead",
						"type": "`$BOOLEAN`",
						"short": "true if the item is dead",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"short": "true if the item is deleted",
					},
					map[string]any{
						"name": "descendants",
						"title": "Descendants",
						"type": "`$INTEGER`",
						"short": "In the case of stories or polls, the total comment count",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The item's unique id",
					},
					map[string]any{
						"name": "kids",
						"title": "Kids",
						"type": "`$ARRAY`",
						"short": "The ids of the item's comments, in ranked display order",
					},
					map[string]any{
						"name": "parent",
						"title": "Parent",
						"type": "`$INTEGER`",
						"short": "The comment's parent: either another comment or the relevant story",
					},
					map[string]any{
						"name": "parts",
						"title": "Parts",
						"type": "`$ARRAY`",
						"short": "A list of related pollopts, in display order",
					},
					map[string]any{
						"name": "poll",
						"title": "Poll",
						"type": "`$INTEGER`",
						"short": "The pollopt's associated poll",
					},
					map[string]any{
						"name": "score",
						"title": "Score",
						"type": "`$INTEGER`",
						"short": "The story's score, or the votes for a pollopt",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"short": "The comment, story or poll text.",
					},
					map[string]any{
						"name": "time",
						"title": "Time",
						"type": "`$INTEGER`",
						"short": "Creation date of the item, in Unix Time",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "The title of the story, poll or job.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The type of item",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "The URL of the story",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "item",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/item/{id}.json",
								"segments": []any{
									map[string]any{
										"lit": "item",
									},
									map[string]any{
										"lit": "{id}.json",
									},
								},
								"parts": []any{
									"item",
									"{id}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "print",
											"orig": "print",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "id",
									"exist": []any{
										"id",
										"print",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"live_data": map[string]any{
				"fields": []any{},
				"name": "live_data",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/maxitem.json",
								"segments": []any{
									map[string]any{
										"lit": "maxitem.json",
									},
								},
								"parts": []any{
									"maxitem.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "print",
											"orig": "print",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"print",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"story": map[string]any{
				"fields": []any{},
				"name": "story",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/askstories.json",
								"segments": []any{
									map[string]any{
										"lit": "askstories.json",
									},
								},
								"parts": []any{
									"askstories.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "print",
											"orig": "print",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"print",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/beststories.json",
								"segments": []any{
									map[string]any{
										"lit": "beststories.json",
									},
								},
								"parts": []any{
									"beststories.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "print",
											"orig": "print",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"print",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/jobstories.json",
								"segments": []any{
									map[string]any{
										"lit": "jobstories.json",
									},
								},
								"parts": []any{
									"jobstories.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "print",
											"orig": "print",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"print",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/newstories.json",
								"segments": []any{
									map[string]any{
										"lit": "newstories.json",
									},
								},
								"parts": []any{
									"newstories.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "print",
											"orig": "print",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"print",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/showstories.json",
								"segments": []any{
									map[string]any{
										"lit": "showstories.json",
									},
								},
								"parts": []any{
									"showstories.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "print",
											"orig": "print",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"print",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/topstories.json",
								"segments": []any{
									map[string]any{
										"lit": "topstories.json",
									},
								},
								"parts": []any{
									"topstories.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "print",
											"orig": "print",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"print",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"update": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "items",
						"title": "Items",
						"type": "`$ARRAY`",
						"short": "Array of item IDs that have been updated",
					},
					map[string]any{
						"name": "profiles",
						"title": "Profiles",
						"type": "`$ARRAY`",
						"short": "Array of usernames whose profiles have been updated",
					},
				},
				"name": "update",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/updates.json",
								"segments": []any{
									map[string]any{
										"lit": "updates.json",
									},
								},
								"parts": []any{
									"updates.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "print",
											"orig": "print",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"print",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "about",
						"title": "About",
						"type": "`$STRING`",
						"short": "The user's optional self-description.",
					},
					map[string]any{
						"name": "created",
						"title": "Created",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Creation date of the user, in Unix Time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The user's unique username.",
					},
					map[string]any{
						"name": "karma",
						"title": "Karma",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The user's karma",
					},
					map[string]any{
						"name": "submitted",
						"title": "Submitted",
						"type": "`$ARRAY`",
						"short": "List of the user's stories, polls and comments",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "user",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/user/{id}.json",
								"segments": []any{
									map[string]any{
										"lit": "user",
									},
									map[string]any{
										"lit": "{id}.json",
									},
								},
								"parts": []any{
									"user",
									"{id}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.submitted`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "print",
											"orig": "print",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "id",
									"exist": []any{
										"id",
										"print",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
