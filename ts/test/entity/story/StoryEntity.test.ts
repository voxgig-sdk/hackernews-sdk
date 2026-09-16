

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"story","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"print","orig":"print","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /askstories.json","json":"{\"operationId\":\"getAskStories\",\"parameters\":[{\"description\":\"Format output (e.g., 'pretty' for formatted JSON)\",\"in\":\"query\",\"name\":\"print\",\"required\":false,\"schema\":{\"enum\":[\"pretty\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[9127232,9128437,9130049,9130144,9130064],\"schema\":{\"description\":\"Array of item IDs\",\"items\":{\"type\":\"integer\"},\"maxItems\":200,\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/askstories.json","segments":[{"lit":"askstories.json"}],"select":{"exist":["print"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"print","orig":"print","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /beststories.json","json":"{\"operationId\":\"getBestStories\",\"parameters\":[{\"description\":\"Format output (e.g., 'pretty' for formatted JSON)\",\"in\":\"query\",\"name\":\"print\",\"required\":false,\"schema\":{\"enum\":[\"pretty\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[9129911,9129199,9127761,9128141,9128264],\"schema\":{\"description\":\"Array of item IDs\",\"items\":{\"type\":\"integer\"},\"maxItems\":500,\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/beststories.json","segments":[{"lit":"beststories.json"}],"select":{"exist":["print"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"print","orig":"print","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /jobstories.json","json":"{\"operationId\":\"getJobStories\",\"parameters\":[{\"description\":\"Format output (e.g., 'pretty' for formatted JSON)\",\"in\":\"query\",\"name\":\"print\",\"required\":false,\"schema\":{\"enum\":[\"pretty\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[9127232,9128437,9130049,9130144,9130064],\"schema\":{\"description\":\"Array of item IDs\",\"items\":{\"type\":\"integer\"},\"maxItems\":200,\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/jobstories.json","segments":[{"lit":"jobstories.json"}],"select":{"exist":["print"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"print","orig":"print","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /newstories.json","json":"{\"operationId\":\"getNewStories\",\"parameters\":[{\"description\":\"Format output (e.g., 'pretty' for formatted JSON)\",\"in\":\"query\",\"name\":\"print\",\"required\":false,\"schema\":{\"enum\":[\"pretty\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[9129911,9129199,9127761,9128141,9128264],\"schema\":{\"description\":\"Array of item IDs\",\"items\":{\"type\":\"integer\"},\"maxItems\":500,\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/newstories.json","segments":[{"lit":"newstories.json"}],"select":{"exist":["print"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":3},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"print","orig":"print","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /showstories.json","json":"{\"operationId\":\"getShowStories\",\"parameters\":[{\"description\":\"Format output (e.g., 'pretty' for formatted JSON)\",\"in\":\"query\",\"name\":\"print\",\"required\":false,\"schema\":{\"enum\":[\"pretty\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[9127232,9128437,9130049,9130144,9130064],\"schema\":{\"description\":\"Array of item IDs\",\"items\":{\"type\":\"integer\"},\"maxItems\":200,\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/showstories.json","segments":[{"lit":"showstories.json"}],"select":{"exist":["print"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":4},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"print","orig":"print","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /topstories.json","json":"{\"operationId\":\"getTopStories\",\"parameters\":[{\"description\":\"Format output (e.g., 'pretty' for formatted JSON)\",\"in\":\"query\",\"name\":\"print\",\"required\":false,\"schema\":{\"enum\":[\"pretty\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[9129911,9129199,9127761,9128141,9128264],\"schema\":{\"description\":\"Array of item IDs\",\"items\":{\"type\":\"integer\"},\"maxItems\":500,\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/topstories.json","segments":[{"lit":"topstories.json"}],"select":{"exist":["print"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":5}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"story","name__orig":"story","Name":"Story","name_":"story","name-":"story","NAME":"STORY","index$":2}, {"active":true,"entity":"story","key$":"BasicStoryFlow","kind":"basic","name":"BasicStoryFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"story_ref01"}}],"index$":0}]}, 'Story')
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
  
