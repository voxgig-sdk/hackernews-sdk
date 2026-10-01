"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "item",
        "accessor": "Item",
        "op": "list",
        "method": "GET",
        "path": "/item/{id}.json",
        "action": "id",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {
            "print": "v1"
        },
        "headers": [],
        "query": [
            "print"
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
        "query": [
            "print"
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
        "query": [
            "print"
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
        "action": "id",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {
            "print": "v1"
        },
        "headers": [],
        "query": [
            "print"
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
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map