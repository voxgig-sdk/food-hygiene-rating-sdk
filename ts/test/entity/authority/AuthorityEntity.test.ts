

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


describe('AuthorityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FOOD_HYGIENE_RATING_TEST_LIVE=TRUE.
  afterEach(liveDelay('FOOD_HYGIENE_RATING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FoodHygieneRatingSDK.test()
    const ent = testsdk.Authority()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FOOD_HYGIENE_RATING_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'authority.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"email","name":"Email","req":false,"short":"Email address of the local authority","type":"`$STRING`","index$":0},{"active":true,"name":"EstablishmentCount","req":false,"short":"Number of establishments registered with this authority","type":"`$INTEGER`","index$":1},{"active":true,"name":"FileName","req":false,"short":"XML filename for the authority's data","type":"`$STRING`","index$":2},{"active":true,"name":"FileNameWelsh","req":false,"short":"Welsh language XML filename (for Welsh authorities)","type":"`$STRING`","index$":3},{"active":true,"name":"FriendlyName","req":false,"short":"Friendly display name of the local authority","type":"`$STRING`","index$":4},{"active":true,"name":"LocalAuthorityId","req":false,"short":"Unique identifier for the local authority","type":"`$INTEGER`","index$":5},{"active":true,"name":"LocalAuthorityIdCode","req":false,"short":"Code for the local authority","type":"`$STRING`","index$":6},{"active":true,"name":"Name","req":false,"short":"Name of the local authority","type":"`$STRING`","index$":7},{"active":true,"name":"RegionName","req":false,"short":"Region where the authority is located","type":"`$STRING`","index$":8},{"active":true,"format":"uri","name":"SchemeUrl","req":false,"short":"URL to the local authority's food hygiene scheme page","type":"`$STRING`","index$":9},{"active":true,"format":"uri","name":"Url","req":false,"short":"Website URL of the local authority","type":"`$STRING`","index$":10},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":11}],"id":{"field":"id","name":"id"},"name":"authority","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /Authorities","json":"{\"operationId\":\"getAuthorities\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"authorities\":{\"items\":{\"properties\":{\"Email\":{\"description\":\"Email address of the local authority\",\"format\":\"email\",\"type\":\"string\"},\"EstablishmentCount\":{\"description\":\"Number of establishments registered with this authority\",\"type\":\"integer\"},\"FileName\":{\"description\":\"XML filename for the authority's data\",\"type\":\"string\"},\"FileNameWelsh\":{\"description\":\"Welsh language XML filename (for Welsh authorities)\",\"type\":\"string\"},\"FriendlyName\":{\"description\":\"Friendly display name of the local authority\",\"type\":\"string\"},\"LocalAuthorityId\":{\"description\":\"Unique identifier for the local authority\",\"type\":\"integer\"},\"LocalAuthorityIdCode\":{\"description\":\"Code for the local authority\",\"type\":\"string\"},\"Name\":{\"description\":\"Name of the local authority\",\"type\":\"string\"},\"RegionName\":{\"description\":\"Region where the authority is located\",\"type\":\"string\"},\"SchemeUrl\":{\"description\":\"URL to the local authority's food hygiene scheme page\",\"format\":\"uri\",\"type\":\"string\"},\"Url\":{\"description\":\"Website URL of the local authority\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"authorities\":{\"items\":{\"properties\":{\"Email\":{\"description\":\"Email address of the local authority\",\"format\":\"email\",\"type\":\"string\"},\"EstablishmentCount\":{\"description\":\"Number of establishments registered with this authority\",\"type\":\"integer\"},\"FileName\":{\"description\":\"XML filename for the authority's data\",\"type\":\"string\"},\"FileNameWelsh\":{\"description\":\"Welsh language XML filename (for Welsh authorities)\",\"type\":\"string\"},\"FriendlyName\":{\"description\":\"Friendly display name of the local authority\",\"type\":\"string\"},\"LocalAuthorityId\":{\"description\":\"Unique identifier for the local authority\",\"type\":\"integer\"},\"LocalAuthorityIdCode\":{\"description\":\"Code for the local authority\",\"type\":\"string\"},\"Name\":{\"description\":\"Name of the local authority\",\"type\":\"string\"},\"RegionName\":{\"description\":\"Region where the authority is located\",\"type\":\"string\"},\"SchemeUrl\":{\"description\":\"URL to the local authority's food hygiene scheme page\",\"format\":\"uri\",\"type\":\"string\"},\"Url\":{\"description\":\"Website URL of the local authority\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with authorities list\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/Authorities","segments":[{"lit":"Authorities"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.authorities`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /Authorities/{id}","json":"{\"operationId\":\"getAuthorityById\",\"parameters\":[{\"description\":\"Unique identifier for the local authority\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"Email\":{\"description\":\"Email address of the local authority\",\"format\":\"email\",\"type\":\"string\"},\"EstablishmentCount\":{\"description\":\"Number of establishments registered with this authority\",\"type\":\"integer\"},\"FileName\":{\"description\":\"XML filename for the authority's data\",\"type\":\"string\"},\"FileNameWelsh\":{\"description\":\"Welsh language XML filename (for Welsh authorities)\",\"type\":\"string\"},\"FriendlyName\":{\"description\":\"Friendly display name of the local authority\",\"type\":\"string\"},\"LocalAuthorityId\":{\"description\":\"Unique identifier for the local authority\",\"type\":\"integer\"},\"LocalAuthorityIdCode\":{\"description\":\"Code for the local authority\",\"type\":\"string\"},\"Name\":{\"description\":\"Name of the local authority\",\"type\":\"string\"},\"RegionName\":{\"description\":\"Region where the authority is located\",\"type\":\"string\"},\"SchemeUrl\":{\"description\":\"URL to the local authority's food hygiene scheme page\",\"format\":\"uri\",\"type\":\"string\"},\"Url\":{\"description\":\"Website URL of the local authority\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"Email\":{\"description\":\"Email address of the local authority\",\"format\":\"email\",\"type\":\"string\"},\"EstablishmentCount\":{\"description\":\"Number of establishments registered with this authority\",\"type\":\"integer\"},\"FileName\":{\"description\":\"XML filename for the authority's data\",\"type\":\"string\"},\"FileNameWelsh\":{\"description\":\"Welsh language XML filename (for Welsh authorities)\",\"type\":\"string\"},\"FriendlyName\":{\"description\":\"Friendly display name of the local authority\",\"type\":\"string\"},\"LocalAuthorityId\":{\"description\":\"Unique identifier for the local authority\",\"type\":\"integer\"},\"LocalAuthorityIdCode\":{\"description\":\"Code for the local authority\",\"type\":\"string\"},\"Name\":{\"description\":\"Name of the local authority\",\"type\":\"string\"},\"RegionName\":{\"description\":\"Region where the authority is located\",\"type\":\"string\"},\"SchemeUrl\":{\"description\":\"URL to the local authority's food hygiene scheme page\",\"format\":\"uri\",\"type\":\"string\"},\"Url\":{\"description\":\"Website URL of the local authority\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with authority details\"},\"404\":{\"description\":\"Authority not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/Authorities/{id}","segments":[{"lit":"Authorities"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"authority","name__orig":"authority","Name":"Authority","name_":"authority","name-":"authority","NAME":"AUTHORITY","index$":0}, {"active":true,"entity":"authority","key$":"BasicAuthorityFlow","kind":"basic","name":"BasicAuthorityFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"authority_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"authority_ref01","srcdatavar":"authority_ref01_data","suffix":"_dt0"},"match":{"id":"authority01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-authority_ref01"}}],"index$":1}]}, 'Authority')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let authority_ref01_data = Object.values(setup.data.existing.authority)[0] as any

    // LIST
    const authority_ref01_ent = client.Authority()
    const authority_ref01_match: any = {}

    const authority_ref01_list = (await authority_ref01_ent.list(authority_ref01_match)).map((e: any) => e.data())


    // LOAD
    const authority_ref01_match_dt0: any = {}
    authority_ref01_match_dt0.id = authority_ref01_data.id
    const authority_ref01_data_dt0 = (await authority_ref01_ent.load(authority_ref01_match_dt0)).data()
    assert(authority_ref01_data_dt0.id === authority_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/authority/AuthorityTestData.json')

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
    ['authority01','authority02','authority03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FOOD_HYGIENE_RATING_TEST_AUTHORITY_ENTID': idmap,
    'FOOD_HYGIENE_RATING_TEST_LIVE': 'FALSE',
    'FOOD_HYGIENE_RATING_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FOOD_HYGIENE_RATING_TEST_AUTHORITY_ENTID']

  const live = 'TRUE' === env.FOOD_HYGIENE_RATING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FOOD_HYGIENE_RATING_TEST_AUTHORITY_ENTID']
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
  
