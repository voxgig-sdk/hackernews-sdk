

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HackernewsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ItemEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HACKERNEWS_TEST_LIVE=TRUE.
  afterEach(liveDelay('HACKERNEWS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HackernewsSDK.test()
    const ent = testsdk.Item()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HACKERNEWS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'item.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"by","req":false,"short":"The username of the item's author","type":"`$STRING`","index$":0},{"active":true,"name":"dead","req":false,"short":"true if the item is dead","type":"`$BOOLEAN`","index$":1},{"active":true,"name":"deleted","req":false,"short":"true if the item is deleted","type":"`$BOOLEAN`","index$":2},{"active":true,"name":"descendants","req":false,"short":"In the case of stories or polls, the total comment count","type":"`$INTEGER`","index$":3},{"active":true,"name":"id","req":true,"short":"The item's unique id","type":"`$INTEGER`","index$":4},{"active":true,"name":"kids","req":false,"short":"The ids of the item's comments, in ranked display order","type":"`$ARRAY`","index$":5},{"active":true,"name":"parent","req":false,"short":"The comment's parent: either another comment or the relevant story","type":"`$INTEGER`","index$":6},{"active":true,"name":"parts","req":false,"short":"A list of related pollopts, in display order","type":"`$ARRAY`","index$":7},{"active":true,"name":"poll","req":false,"short":"The pollopt's associated poll","type":"`$INTEGER`","index$":8},{"active":true,"name":"score","req":false,"short":"The story's score, or the votes for a pollopt","type":"`$INTEGER`","index$":9},{"active":true,"name":"text","req":false,"short":"The comment, story or poll text.","type":"`$STRING`","index$":10},{"active":true,"name":"time","req":false,"short":"Creation date of the item, in Unix Time","type":"`$INTEGER`","index$":11},{"active":true,"name":"title","req":false,"short":"The title of the story, poll or job.","type":"`$STRING`","index$":12},{"active":true,"name":"type","req":false,"short":"The type of item","type":"`$STRING`","index$":13},{"active":true,"name":"url","req":false,"short":"The URL of the story","type":"`$STRING`","index$":14}],"id":{"field":"id","name":"id"},"name":"item","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"print","orig":"print","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /item/{id}.json","json":"{\"operationId\":\"getItem\",\"parameters\":[{\"description\":\"The item's unique ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Format output (e.g., 'pretty' for formatted JSON)\",\"in\":\"query\",\"name\":\"print\",\"required\":false,\"schema\":{\"enum\":[\"pretty\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"comment\":{\"summary\":\"Comment example\",\"value\":{\"by\":\"norvig\",\"id\":2921983,\"kids\":[2922097,2922429,2924562],\"parent\":2921506,\"text\":\"Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?\",\"time\":1314211127,\"type\":\"comment\"}},\"job\":{\"summary\":\"Job example\",\"value\":{\"by\":\"justin\",\"id\":192327,\"score\":6,\"text\":\"Justin.tv is the biggest live video site online...\",\"time\":1210981217,\"title\":\"Justin.tv is looking for a Lead Flash Engineer!\",\"type\":\"job\",\"url\":\"\"}},\"poll\":{\"summary\":\"Poll example\",\"value\":{\"by\":\"pg\",\"descendants\":54,\"id\":126809,\"kids\":[126822,126823,126993],\"parts\":[126810,126811,126812],\"score\":46,\"text\":\"\",\"time\":1204403652,\"title\":\"Poll: What would happen if News.YC had explicit support for polls?\",\"type\":\"poll\"}},\"pollopt\":{\"summary\":\"Poll option example\",\"value\":{\"by\":\"pg\",\"id\":160705,\"poll\":160704,\"score\":335,\"text\":\"Yes, ban them; I'm tired of seeing Valleywag stories on News.YC.\",\"time\":1207886576,\"type\":\"pollopt\"}},\"story\":{\"summary\":\"Story example\",\"value\":{\"by\":\"dhouston\",\"descendants\":71,\"id\":8863,\"kids\":[8952,9224,8917,8884,8887],\"score\":111,\"time\":1175714200,\"title\":\"My YC app: Dropbox - Throw away your USB drive\",\"type\":\"story\",\"url\":\"http://www.getdropbox.com/u/2/screencast.html\"}}},\"schema\":{\"description\":\"Represents a story, comment, job, Ask HN, poll, or poll option\",\"properties\":{\"by\":{\"description\":\"The username of the item's author\",\"type\":\"string\"},\"dead\":{\"description\":\"true if the item is dead\",\"type\":\"boolean\"},\"deleted\":{\"description\":\"true if the item is deleted\",\"type\":\"boolean\"},\"descendants\":{\"description\":\"In the case of stories or polls, the total comment count\",\"type\":\"integer\"},\"id\":{\"description\":\"The item's unique id\",\"type\":\"integer\"},\"kids\":{\"description\":\"The ids of the item's comments, in ranked display order\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"parent\":{\"description\":\"The comment's parent: either another comment or the relevant story\",\"type\":\"integer\"},\"parts\":{\"description\":\"A list of related pollopts, in display order\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"poll\":{\"description\":\"The pollopt's associated poll\",\"type\":\"integer\"},\"score\":{\"description\":\"The story's score, or the votes for a pollopt\",\"type\":\"integer\"},\"text\":{\"description\":\"The comment, story or poll text. HTML.\",\"type\":\"string\"},\"time\":{\"description\":\"Creation date of the item, in Unix Time\",\"type\":\"integer\"},\"title\":{\"description\":\"The title of the story, poll or job. HTML.\",\"type\":\"string\"},\"type\":{\"description\":\"The type of item\",\"enum\":[\"job\",\"story\",\"comment\",\"poll\",\"pollopt\"],\"type\":\"string\"},\"url\":{\"description\":\"The URL of the story\",\"type\":\"string\"}},\"required\":[\"id\"],\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Item not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/item/{id}.json","segments":[{"lit":"item"},{"lit":"{id}.json"}],"select":{"$action":"id","exist":["id","print"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"item","name__orig":"item","Name":"Item","name_":"item","name-":"item","NAME":"ITEM","index$":0}, {"active":true,"entity":"item","key$":"BasicItemFlow","kind":"basic","name":"BasicItemFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"item_ref01"}}],"index$":0}]}, 'Item')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let item_ref01_data = Object.values(setup.data.existing.item)[0] as any

    // LIST
    const item_ref01_ent = client.Item()
    const item_ref01_match: any = {}

    const item_ref01_list = (await item_ref01_ent.list(item_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/item/ItemTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = HackernewsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['item01','item02','item03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HACKERNEWS_TEST_ITEM_ENTID': idmap,
    'HACKERNEWS_TEST_LIVE': 'FALSE',
    'HACKERNEWS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['HACKERNEWS_TEST_ITEM_ENTID']

  const live = 'TRUE' === env.HACKERNEWS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HACKERNEWS_TEST_ITEM_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new HackernewsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
