import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "item",
    "accessor": "Item",
    "op": "list",
    "method": "GET",
    "path": "/item/{id}.json",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 8863
      }
    ],
    "select": {
      "print": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "print"
    ],
    "queryArgs": [
      {
        "name": "print",
        "wire": "print"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "by": "dhouston",
      "descendants": 71,
      "id": 8863,
      "kids": [
        8952,
        9224,
        8917
      ],
      "score": 111,
      "time": 1175714200,
      "title": "My YC app: Dropbox - Throw away your USB drive",
      "type": "story",
      "url": "http://www.getdropbox.com/u/2/screencast.html"
    },
    "idField": "id"
  },
  {
    "entity": "live_data",
    "accessor": "LiveData",
    "op": "load",
    "method": "GET",
    "path": "/maxitem.json",
    "args": [],
    "select": {
      "print": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "print"
    ],
    "queryArgs": [
      {
        "name": "print",
        "wire": "print"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": 9130260,
    "idField": "id"
  },
  {
    "entity": "update",
    "accessor": "Update",
    "op": "list",
    "method": "GET",
    "path": "/updates.json",
    "args": [],
    "select": {
      "print": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "print"
    ],
    "queryArgs": [
      {
        "name": "print",
        "wire": "print"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        1
      ],
      "profiles": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "list",
    "method": "GET",
    "path": "/user/{id}.json",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "pg"
      }
    ],
    "select": {
      "print": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "print"
    ],
    "queryArgs": [
      {
        "name": "print",
        "wire": "print"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "about": "This is a test",
      "created": 1173923446,
      "id": "jl",
      "karma": 2937,
      "submitted": [
        8265435,
        8168423,
        8090946
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
