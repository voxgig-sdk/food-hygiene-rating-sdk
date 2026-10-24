

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FoodHygieneRatingSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('RatingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FOOD_HYGIENE_RATING_TEST_LIVE=TRUE.
  afterEach(liveDelay('FOOD_HYGIENE_RATING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FoodHygieneRatingSDK.test()
    const ent = testsdk.Rating()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('rating hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of FoodHygieneRatingSDK.test(offline).Rating().stream('list')) { }
    }, /offline/)

    for await (const _item of FoodHygieneRatingSDK.test(offline).Rating()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = FoodHygieneRatingSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Rating().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of FoodHygieneRatingSDK.test().Rating().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new FoodHygieneRatingSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Rating().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Rating().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FoodHygieneRatingSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Rating().list({"ratingId":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FOOD_HYGIENE_RATING_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'rating.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ratingId":{"a":true,"h":"Rating Id","n":"ratingId","r":false,"sh":"Unique identifier for the rating","t":"`$INTEGER`","key$":"ratingId","index$":0},"ratingKey":{"a":true,"h":"Rating Key","n":"ratingKey","r":false,"sh":"Key for the rating value","t":"`$STRING`","key$":"ratingKey","index$":1},"ratingName":{"a":true,"h":"Rating Name","n":"ratingName","r":false,"sh":"Name of the rating (e.g., '5', '4', 'Pass', 'Exempt')","t":"`$STRING`","key$":"ratingName","index$":2},"schemeType":{"a":true,"h":"Scheme Type","n":"schemeType","r":false,"sh":"Scheme type this rating belongs to","t":"`$STRING`","key$":"schemeType","index$":3}},"name":"rating","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /Ratings","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/Ratings","q":{},"r":{},"rs":{"alternatives":[{"kind":"raw","media":"application/xml"}],"kind":"json","media":"application/json"},"s":[{"lit":"Ratings"}],"t":{"req":"`reqdata`","res":"`body.ratings`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"rating","name__orig":"rating","Name":"Rating","name_":"rating","name-":"rating","NAME":"RATING","index$":3}, {"active":true,"entity":"rating","key$":"BasicRatingFlow","kind":"basic","name":"BasicRatingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"rating_ref01"}}],"index$":0}]}, 'Rating', {"GET /Ratings":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let rating_ref01_data = Object.values(setup.data.existing.rating)[0] as any

    // LIST
    const rating_ref01_ent = client.Rating()
    const rating_ref01_match: any = {}

    const rating_ref01_list = (await rating_ref01_ent.list(rating_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/rating/RatingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FoodHygieneRatingSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['rating01','rating02','rating03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FOOD_HYGIENE_RATING_TEST_RATING_ENTID': idmap,
    'FOOD_HYGIENE_RATING_TEST_LIVE': 'FALSE',
    'FOOD_HYGIENE_RATING_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FOOD_HYGIENE_RATING_TEST_RATING_ENTID']

  const live = 'TRUE' === env.FOOD_HYGIENE_RATING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FOOD_HYGIENE_RATING_TEST_RATING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FoodHygieneRatingSDK(merge([
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
    explain: 'TRUE' === env.FOOD_HYGIENE_RATING_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
