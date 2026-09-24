

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


describe('UserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HACKERNEWS_TEST_LIVE=TRUE.
  afterEach(liveDelay('HACKERNEWS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HackernewsSDK.test()
    const ent = testsdk.User()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HACKERNEWS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"about":{"a":true,"h":"About","n":"about","r":false,"sh":"The user's optional self-description.","t":"`$STRING`","key$":"about","index$":0},"created":{"a":true,"h":"Created","n":"created","r":true,"sh":"Creation date of the user, in Unix Time","t":"`$INTEGER`","key$":"created","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The user's unique username.","t":"`$STRING`","key$":"id","index$":2},"karma":{"a":true,"h":"Karma","n":"karma","r":true,"sh":"The user's karma","t":"`$INTEGER`","key$":"karma","index$":3},"submitted":{"a":true,"h":"Submitted","n":"submitted","r":false,"sh":"List of the user's stories, polls and comments","t":"`$ARRAY`","key$":"submitted","index$":4}},"id":{"field":"id","name":"id"},"name":"user","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /user/{id}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"print","or":"print","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/user/{id}.json","q":{"$action":"id","exist":["id","print"]},"r":{},"s":[{"lit":"user"},{"lit":"{id}.json"}],"t":{"req":"`reqdata`","res":"`body.submitted`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"user","name__orig":"user","Name":"User","name_":"user","name-":"user","NAME":"USER","index$":4}, {"active":true,"entity":"user","key$":"BasicUserFlow","kind":"basic","name":"BasicUserFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"user_ref01"}}],"index$":0}]}, 'User', {"GET /user/{id}.json":{"protocol":"http","operationId":"getUser","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","description":"Represents a Hacker News user","required":["id","created","karma"],"properties":{"id":{"description":"The user's unique username. Case-sensitive.","key$":"id","type":"string"},"created":{"description":"Creation date of the user, in Unix Time","key$":"created","type":"integer"},"karma":{"description":"The user's karma","key$":"karma","type":"integer"},"about":{"description":"The user's optional self-description. HTML.","key$":"about","type":"string"},"submitted":{"description":"List of the user's stories, polls and comments","items":{"type":"integer"},"key$":"submitted","type":"array"}},"x-ref":"#/components/schemas/User","index$":0},"example":{"about":"This is a test","created":1173923446,"id":"jl","karma":2937,"submitted":[8265435,8168423,8090946,8090326,7699907]}}}},"404":{"description":"User not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"The user's unique username (case-sensitive)","schema":{"type":"string"},"index$":0},{"name":"print","in":"query","required":false,"description":"Format output (e.g., 'pretty' for formatted JSON)","schema":{"type":"string","enum":["pretty"]},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let user_ref01_data = Object.values(setup.data.existing.user)[0] as any

    // LIST
    const user_ref01_ent = client.User()
    const user_ref01_match: any = {}

    const user_ref01_list = (await user_ref01_ent.list(user_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/user/UserTestData.json')

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
    ['user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HACKERNEWS_TEST_USER_ENTID': idmap,
    'HACKERNEWS_TEST_LIVE': 'FALSE',
    'HACKERNEWS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['HACKERNEWS_TEST_USER_ENTID']

  const live = 'TRUE' === env.HACKERNEWS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HACKERNEWS_TEST_USER_ENTID']
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
  
