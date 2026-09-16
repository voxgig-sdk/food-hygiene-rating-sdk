

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FoodHygieneRatingSDK, BaseFeature, stdutil } from '../../..'

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


describe('RatingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FOOD_HYGIENE_RATING_TEST_LIVE=TRUE.
  afterEach(liveDelay('FOOD_HYGIENE_RATING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FoodHygieneRatingSDK.test()
    const ent = testsdk.Rating()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FOOD_HYGIENE_RATING_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'rating.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"ratingId","req":false,"short":"Unique identifier for the rating","type":"`$INTEGER`","index$":0},{"active":true,"name":"ratingKey","req":false,"short":"Key for the rating value","type":"`$STRING`","index$":1},{"active":true,"name":"ratingName","req":false,"short":"Name of the rating (e.g., '5', '4', 'Pass', 'Exempt')","type":"`$STRING`","index$":2},{"active":true,"name":"schemeType","req":false,"short":"Scheme type this rating belongs to","type":"`$STRING`","index$":3}],"name":"rating","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /Ratings","json":"{\"operationId\":\"getRatings\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"ratings\":{\"items\":{\"properties\":{\"ratingId\":{\"description\":\"Unique identifier for the rating\",\"type\":\"integer\"},\"ratingKey\":{\"description\":\"Key for the rating value\",\"type\":\"string\"},\"ratingName\":{\"description\":\"Name of the rating (e.g., '5', '4', 'Pass', 'Exempt')\",\"type\":\"string\"},\"schemeType\":{\"description\":\"Scheme type this rating belongs to\",\"enum\":[\"FHRS\",\"FHIS\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"ratings\":{\"items\":{\"properties\":{\"ratingId\":{\"description\":\"Unique identifier for the rating\",\"type\":\"integer\"},\"ratingKey\":{\"description\":\"Key for the rating value\",\"type\":\"string\"},\"ratingName\":{\"description\":\"Name of the rating (e.g., '5', '4', 'Pass', 'Exempt')\",\"type\":\"string\"},\"schemeType\":{\"description\":\"Scheme type this rating belongs to\",\"enum\":[\"FHRS\",\"FHIS\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with ratings list\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/Ratings","segments":[{"lit":"Ratings"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.ratings`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"rating","name__orig":"rating","Name":"Rating","name_":"rating","name-":"rating","NAME":"RATING","index$":3}, {"active":true,"entity":"rating","key$":"BasicRatingFlow","kind":"basic","name":"BasicRatingFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"rating_ref01"}}],"index$":0}]}, 'Rating')
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
  
