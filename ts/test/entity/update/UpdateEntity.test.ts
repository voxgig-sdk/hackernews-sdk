

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


describe('UpdateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HACKERNEWS_TEST_LIVE=TRUE.
  afterEach(liveDelay('HACKERNEWS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HackernewsSDK.test()
    const ent = testsdk.Update()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HACKERNEWS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'update.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"items":{"a":true,"h":"Items","n":"items","r":false,"sh":"Array of item IDs that have been updated","t":"`$ARRAY`","key$":"items","index$":0},"profiles":{"a":true,"h":"Profiles","n":"profiles","r":false,"sh":"Array of usernames whose profiles have been updated","t":"`$ARRAY`","key$":"profiles","index$":1}},"name":"update","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /updates.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"print","or":"print","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/updates.json","q":{"exist":["print"]},"r":{},"s":[{"lit":"updates.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"update","name__orig":"update","Name":"Update","name_":"update","name-":"update","NAME":"UPDATE","index$":3}, {"active":true,"entity":"update","key$":"BasicUpdateFlow","kind":"basic","name":"BasicUpdateFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"update_ref01"}}],"index$":0}]}, 'Update', {"GET /updates.json":{"protocol":"http","operationId":"getUpdates","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","description":"Contains lists of changed items and profiles","properties":{"items":{"description":"Array of item IDs that have been updated","items":{"type":"integer"},"key$":"items","type":"array"},"profiles":{"description":"Array of usernames whose profiles have been updated","items":{"type":"string"},"key$":"profiles","type":"array"}},"x-ref":"#/components/schemas/Updates","index$":0}}}}},"parameters":[{"name":"print","in":"query","required":false,"description":"Format output (e.g., 'pretty' for formatted JSON)","schema":{"type":"string","enum":["pretty"]},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let update_ref01_data = Object.values(setup.data.existing.update)[0] as any

    // LIST
    const update_ref01_ent = client.Update()
    const update_ref01_match: any = {}

    const update_ref01_list = (await update_ref01_ent.list(update_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/update/UpdateTestData.json')

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
    ['update01','update02','update03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HACKERNEWS_TEST_UPDATE_ENTID': idmap,
    'HACKERNEWS_TEST_LIVE': 'FALSE',
    'HACKERNEWS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['HACKERNEWS_TEST_UPDATE_ENTID']

  const live = 'TRUE' === env.HACKERNEWS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HACKERNEWS_TEST_UPDATE_ENTID']
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
  
