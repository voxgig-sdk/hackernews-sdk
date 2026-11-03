

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HackernewsSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HackernewsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Item().list({"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HACKERNEWS_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'item.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"by":{"a":true,"h":"By","n":"by","r":false,"sh":"The username of the item's author","t":"`$STRING`","key$":"by","index$":0},"dead":{"a":true,"h":"Dead","n":"dead","r":false,"sh":"true if the item is dead","t":"`$BOOLEAN`","key$":"dead","index$":1},"deleted":{"a":true,"h":"Deleted","n":"deleted","r":false,"sh":"true if the item is deleted","t":"`$BOOLEAN`","key$":"deleted","index$":2},"descendants":{"a":true,"h":"Descendants","n":"descendants","r":false,"sh":"In the case of stories or polls, the total comment count","t":"`$INTEGER`","key$":"descendants","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The item's unique id","t":"`$INTEGER`","key$":"id","index$":4},"kids":{"a":true,"h":"Kids","n":"kids","r":false,"sh":"The ids of the item's comments, in ranked display order","t":"`$ARRAY`","key$":"kids","index$":5},"parent":{"a":true,"h":"Parent","n":"parent","r":false,"sh":"The comment's parent: either another comment or the relevant story","t":"`$INTEGER`","key$":"parent","index$":6},"parts":{"a":true,"h":"Parts","n":"parts","r":false,"sh":"A list of related pollopts, in display order","t":"`$ARRAY`","key$":"parts","index$":7},"poll":{"a":true,"h":"Poll","n":"poll","r":false,"sh":"The pollopt's associated poll","t":"`$INTEGER`","key$":"poll","index$":8},"score":{"a":true,"h":"Score","n":"score","r":false,"sh":"The story's score, or the votes for a pollopt","t":"`$INTEGER`","key$":"score","index$":9},"text":{"a":true,"h":"Text","n":"text","r":false,"sh":"The comment, story or poll text.","t":"`$STRING`","key$":"text","index$":10},"time":{"a":true,"h":"Time","n":"time","r":false,"sh":"Creation date of the item, in Unix Time","t":"`$INTEGER`","key$":"time","index$":11},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"The title of the story, poll or job.","t":"`$STRING`","key$":"title","index$":12},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"The type of item","t":"`$STRING`","key$":"type","index$":13},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"The URL of the story","t":"`$STRING`","key$":"url","index$":14}},"id":{"field":"id","name":"id"},"name":"item","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /item/{id}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":8863,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"print","or":"print","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/item/{id}.json","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"item"},{"lit":"{id}.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"item","name__orig":"item","Name":"Item","name_":"item","name-":"item","NAME":"ITEM","index$":0}, {"active":true,"entity":"item","key$":"BasicItemFlow","kind":"basic","name":"BasicItemFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"item_ref01"}}],"unreachable":true}]}, 'Item', {"GET /item/{id}.json":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"The item's unique ID","schema":{"type":"integer"},"example":8863,"index$":0},{"name":"print","in":"query","required":false,"description":"Format output (e.g., 'pretty' for formatted JSON)","schema":{"type":"string","enum":["pretty"]},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let item_ref01_data = Object.values(setup.data.existing.item)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
