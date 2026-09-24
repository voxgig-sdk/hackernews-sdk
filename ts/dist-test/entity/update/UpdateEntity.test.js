"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('UpdateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HACKERNEWS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HACKERNEWS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HackernewsSDK.test();
        const ent = testsdk.Update();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HACKERNEWS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'update.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "items": { "a": true, "h": "Items", "n": "items", "r": false, "sh": "Array of item IDs that have been updated", "t": "`$ARRAY`", "key$": "items", "index$": 0 }, "profiles": { "a": true, "h": "Profiles", "n": "profiles", "r": false, "sh": "Array of usernames whose profiles have been updated", "t": "`$ARRAY`", "key$": "profiles", "index$": 1 } }, "name": "update", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /updates.json", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "print", "or": "print", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/updates.json", "q": { "exist": ["print"] }, "r": {}, "s": [{ "lit": "updates.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "update", "name__orig": "update", "Name": "Update", "name_": "update", "name-": "update", "NAME": "UPDATE", "index$": 3 }, { "active": true, "entity": "update", "key$": "BasicUpdateFlow", "kind": "basic", "name": "BasicUpdateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "update_ref01" } }], "index$": 0 }] }, 'Update', { "GET /updates.json": { "protocol": "http", "operationId": "getUpdates", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "description": "Contains lists of changed items and profiles", "properties": { "items": { "description": "Array of item IDs that have been updated", "items": { "type": "integer" }, "key$": "items", "type": "array" }, "profiles": { "description": "Array of usernames whose profiles have been updated", "items": { "type": "string" }, "key$": "profiles", "type": "array" } }, "x-ref": "#/components/schemas/Updates", "index$": 0 } } } } }, "parameters": [{ "name": "print", "in": "query", "required": false, "description": "Format output (e.g., 'pretty' for formatted JSON)", "schema": { "type": "string", "enum": ["pretty"] }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let update_ref01_data = Object.values(setup.data.existing.update)[0];
        // LIST
        const update_ref01_ent = client.Update();
        const update_ref01_match = {};
        const update_ref01_list = (await update_ref01_ent.list(update_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/update/UpdateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HackernewsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['update01', 'update02', 'update03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HACKERNEWS_TEST_UPDATE_ENTID': idmap,
        'HACKERNEWS_TEST_LIVE': 'FALSE',
        'HACKERNEWS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['HACKERNEWS_TEST_UPDATE_ENTID'];
    const live = 'TRUE' === env.HACKERNEWS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HACKERNEWS_TEST_UPDATE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.HackernewsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.HACKERNEWS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=UpdateEntity.test.js.map