

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('StoryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HACKERNEWS_TEST_LIVE=TRUE.
  afterEach(liveDelay('HACKERNEWS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HackernewsSDK.test()
    const ent = testsdk.Story()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HACKERNEWS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'story.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"story","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /askstories.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"print","or":"print","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/askstories.json","q":{"exist":["print"]},"r":{},"s":[{"lit":"askstories.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /beststories.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"print","or":"print","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/beststories.json","q":{"exist":["print"]},"r":{},"s":[{"lit":"beststories.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /jobstories.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"print","or":"print","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/jobstories.json","q":{"exist":["print"]},"r":{},"s":[{"lit":"jobstories.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /newstories.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"print","or":"print","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/newstories.json","q":{"exist":["print"]},"r":{},"s":[{"lit":"newstories.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /showstories.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"print","or":"print","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/showstories.json","q":{"exist":["print"]},"r":{},"s":[{"lit":"showstories.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"co":{"id":"GET /topstories.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"print","or":"print","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/topstories.json","q":{"exist":["print"]},"r":{},"s":[{"lit":"topstories.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"story","name__orig":"story","Name":"Story","name_":"story","name-":"story","NAME":"STORY","index$":2}, {"active":true,"entity":"story","key$":"BasicStoryFlow","kind":"basic","name":"BasicStoryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"story_ref01"}}],"index$":0}]}, 'Story', {"GET /askstories.json":{"protocol":"http","operationId":"getAskStories","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"integer","key$":"items"},"maxItems":200,"description":"Array of item IDs"},"example":[9127232,9128437,9130049,9130144,9130064]}}}},"parameters":[{"name":"print","in":"query","required":false,"description":"Format output (e.g., 'pretty' for formatted JSON)","schema":{"type":"string","enum":["pretty"]},"index$":0}],"securitySource":"unspecified"},"GET /beststories.json":{"protocol":"http","operationId":"getBestStories","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"integer","key$":"items"},"maxItems":500,"description":"Array of item IDs"},"example":[9129911,9129199,9127761,9128141,9128264]}}}},"parameters":[{"name":"print","in":"query","required":false,"description":"Format output (e.g., 'pretty' for formatted JSON)","schema":{"type":"string","enum":["pretty"]},"index$":0}],"securitySource":"unspecified"},"GET /jobstories.json":{"protocol":"http","operationId":"getJobStories","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"integer","key$":"items"},"maxItems":200,"description":"Array of item IDs"},"example":[9127232,9128437,9130049,9130144,9130064]}}}},"parameters":[{"name":"print","in":"query","required":false,"description":"Format output (e.g., 'pretty' for formatted JSON)","schema":{"type":"string","enum":["pretty"]},"index$":0}],"securitySource":"unspecified"},"GET /newstories.json":{"protocol":"http","operationId":"getNewStories","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"integer","key$":"items"},"maxItems":500,"description":"Array of item IDs"},"example":[9129911,9129199,9127761,9128141,9128264]}}}},"parameters":[{"name":"print","in":"query","required":false,"description":"Format output (e.g., 'pretty' for formatted JSON)","schema":{"type":"string","enum":["pretty"]},"index$":0}],"securitySource":"unspecified"},"GET /showstories.json":{"protocol":"http","operationId":"getShowStories","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"integer","key$":"items"},"maxItems":200,"description":"Array of item IDs"},"example":[9127232,9128437,9130049,9130144,9130064]}}}},"parameters":[{"name":"print","in":"query","required":false,"description":"Format output (e.g., 'pretty' for formatted JSON)","schema":{"type":"string","enum":["pretty"]},"index$":0}],"securitySource":"unspecified"},"GET /topstories.json":{"protocol":"http","operationId":"getTopStories","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"integer","key$":"items"},"maxItems":500,"description":"Array of item IDs"},"example":[9129911,9129199,9127761,9128141,9128264]}}}},"parameters":[{"name":"print","in":"query","required":false,"description":"Format output (e.g., 'pretty' for formatted JSON)","schema":{"type":"string","enum":["pretty"]},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let story_ref01_data = Object.values(setup.data.existing.story)[0] as any

    // LIST
    const story_ref01_ent = client.Story()
    const story_ref01_match: any = {}

    const story_ref01_list = (await story_ref01_ent.list(story_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/story/StoryTestData.json')

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
    ['story01','story02','story03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HACKERNEWS_TEST_STORY_ENTID': idmap,
    'HACKERNEWS_TEST_LIVE': 'FALSE',
    'HACKERNEWS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['HACKERNEWS_TEST_STORY_ENTID']

  const live = 'TRUE' === env.HACKERNEWS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HACKERNEWS_TEST_STORY_ENTID']
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
  
