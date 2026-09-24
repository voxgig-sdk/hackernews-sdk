

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


describe('LiveDataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HACKERNEWS_TEST_LIVE=TRUE.
  afterEach(liveDelay('HACKERNEWS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HackernewsSDK.test()
    const ent = testsdk.LiveData()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HACKERNEWS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'live_data.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"live_data","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /maxitem.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"print","or":"print","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/maxitem.json","q":{"exist":["print"]},"r":{},"s":[{"lit":"maxitem.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"live_data","name__orig":"live_data","Name":"LiveData","name_":"live_data","name-":"live-data","NAME":"LIVE_DATA","index$":1}, {"active":true,"entity":"live_data","key$":"BasicLiveDataFlow","kind":"basic","name":"BasicLiveDataFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"live_data_ref01","srcdatavar":"live_data_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-live_data_ref01"}}],"index$":0}]}, 'LiveData', {"GET /maxitem.json":{"protocol":"http","operationId":"getMaxItem","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"integer","description":"The current largest item ID"},"example":9130260}}}},"parameters":[{"name":"print","in":"query","required":false,"description":"Format output (e.g., 'pretty' for formatted JSON)","schema":{"type":"string","enum":["pretty"]},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let live_data_ref01_data = Object.values(setup.data.existing.live_data)[0] as any

    // LOAD
    const live_data_ref01_ent = client.LiveData()
    const live_data_ref01_match_dt0: any = {}
    const live_data_ref01_data_dt0 = (await live_data_ref01_ent.load(live_data_ref01_match_dt0)).data()
    assert(null != live_data_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/live_data/LiveDataTestData.json')

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
    ['live_data01','live_data02','live_data03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HACKERNEWS_TEST_LIVE_DATA_ENTID': idmap,
    'HACKERNEWS_TEST_LIVE': 'FALSE',
    'HACKERNEWS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['HACKERNEWS_TEST_LIVE_DATA_ENTID']

  const live = 'TRUE' === env.HACKERNEWS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HACKERNEWS_TEST_LIVE_DATA_ENTID']
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
  
