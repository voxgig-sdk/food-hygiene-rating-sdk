

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"Email":{"a":true,"fo":"email","h":"Email","n":"Email","r":false,"sh":"Email address of the local authority","t":"`$STRING`","key$":"Email","index$":0},"EstablishmentCount":{"a":true,"h":"Establishment Count","n":"EstablishmentCount","r":false,"sh":"Number of establishments registered with this authority","t":"`$INTEGER`","key$":"EstablishmentCount","index$":1},"FileName":{"a":true,"h":"File Name","n":"FileName","r":false,"sh":"XML filename for the authority's data","t":"`$STRING`","key$":"FileName","index$":2},"FileNameWelsh":{"a":true,"h":"File Name Welsh","n":"FileNameWelsh","r":false,"sh":"Welsh language XML filename (for Welsh authorities)","t":"`$STRING`","key$":"FileNameWelsh","index$":3},"FriendlyName":{"a":true,"h":"Friendly Name","n":"FriendlyName","r":false,"sh":"Friendly display name of the local authority","t":"`$STRING`","key$":"FriendlyName","index$":4},"LocalAuthorityId":{"a":true,"h":"Local Authority Id","n":"LocalAuthorityId","r":false,"sh":"Unique identifier for the local authority","t":"`$INTEGER`","key$":"LocalAuthorityId","index$":5},"LocalAuthorityIdCode":{"a":true,"h":"Local Authority Id Code","n":"LocalAuthorityIdCode","r":false,"sh":"Code for the local authority","t":"`$STRING`","key$":"LocalAuthorityIdCode","index$":6},"Name":{"a":true,"h":"Name","n":"Name","r":false,"sh":"Name of the local authority","t":"`$STRING`","key$":"Name","index$":7},"RegionName":{"a":true,"h":"Region Name","n":"RegionName","r":false,"sh":"Region where the authority is located","t":"`$STRING`","key$":"RegionName","index$":8},"SchemeUrl":{"a":true,"fo":"uri","h":"Scheme Url","n":"SchemeUrl","r":false,"sh":"URL to the local authority's food hygiene scheme page","t":"`$STRING`","key$":"SchemeUrl","index$":9},"Url":{"a":true,"fo":"uri","h":"Url","n":"Url","r":false,"sh":"Website URL of the local authority","t":"`$STRING`","key$":"Url","index$":10},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":11}},"id":{"field":"id","name":"id"},"name":"authority","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /Authorities","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/Authorities","q":{},"r":{},"s":[{"lit":"Authorities"}],"t":{"req":"`reqdata`","res":"`body.authorities`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /Authorities/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/Authorities/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"Authorities"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"authority","name__orig":"authority","Name":"Authority","name_":"authority","name-":"authority","NAME":"AUTHORITY","index$":0}, {"active":true,"entity":"authority","key$":"BasicAuthorityFlow","kind":"basic","name":"BasicAuthorityFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"authority_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"authority_ref01","srcdatavar":"authority_ref01_data","suffix":"_dt0"},"m":{"id":"authority01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-authority_ref01"}}],"index$":1}]}, 'Authority', {"GET /Authorities":{"protocol":"http","operationId":"getAuthorities","responses":{"200":{"description":"Successful response with authorities list","content":{"application/json":{"schema":{"type":"object","properties":{"authorities":{"items":{"properties":{"Email":{"description":"Email address of the local authority","format":"email","type":"string","key$":"Email"},"EstablishmentCount":{"description":"Number of establishments registered with this authority","type":"integer","key$":"EstablishmentCount"},"FileName":{"description":"XML filename for the authority's data","type":"string","key$":"FileName"},"FileNameWelsh":{"description":"Welsh language XML filename (for Welsh authorities)","type":"string","key$":"FileNameWelsh"},"FriendlyName":{"description":"Friendly display name of the local authority","type":"string","key$":"FriendlyName"},"LocalAuthorityId":{"description":"Unique identifier for the local authority","type":"integer","key$":"LocalAuthorityId"},"LocalAuthorityIdCode":{"description":"Code for the local authority","type":"string","key$":"LocalAuthorityIdCode"},"Name":{"description":"Name of the local authority","type":"string","key$":"Name"},"RegionName":{"description":"Region where the authority is located","type":"string","key$":"RegionName"},"SchemeUrl":{"description":"URL to the local authority's food hygiene scheme page","format":"uri","type":"string","key$":"SchemeUrl"},"Url":{"description":"Website URL of the local authority","format":"uri","type":"string","key$":"Url"}},"type":"object","x-ref":"#/components/schemas/Authority","index$":0},"key$":"authorities","type":"array"}},"x-ref":"#/components/schemas/AuthoritiesResponse"}},"application/xml":{"schema":{"type":"object","properties":{"authorities":{"items":{"properties":{"Email":{"description":"Email address of the local authority","format":"email","type":"string","key$":"Email"},"EstablishmentCount":{"description":"Number of establishments registered with this authority","type":"integer","key$":"EstablishmentCount"},"FileName":{"description":"XML filename for the authority's data","type":"string","key$":"FileName"},"FileNameWelsh":{"description":"Welsh language XML filename (for Welsh authorities)","type":"string","key$":"FileNameWelsh"},"FriendlyName":{"description":"Friendly display name of the local authority","type":"string","key$":"FriendlyName"},"LocalAuthorityId":{"description":"Unique identifier for the local authority","type":"integer","key$":"LocalAuthorityId"},"LocalAuthorityIdCode":{"description":"Code for the local authority","type":"string","key$":"LocalAuthorityIdCode"},"Name":{"description":"Name of the local authority","type":"string","key$":"Name"},"RegionName":{"description":"Region where the authority is located","type":"string","key$":"RegionName"},"SchemeUrl":{"description":"URL to the local authority's food hygiene scheme page","format":"uri","type":"string","key$":"SchemeUrl"},"Url":{"description":"Website URL of the local authority","format":"uri","type":"string","key$":"Url"}},"type":"object","x-ref":"#/components/schemas/Authority","index$":0},"key$":"authorities","type":"array"}},"x-ref":"#/components/schemas/AuthoritiesResponse"}}}},"500":{"description":"Internal server error"}},"parameters":[],"securitySource":"unspecified"},"GET /Authorities/{id}":{"protocol":"http","operationId":"getAuthorityById","responses":{"200":{"description":"Successful response with authority details","content":{"application/json":{"schema":{"type":"object","properties":{"LocalAuthorityId":{"description":"Unique identifier for the local authority","type":"integer","key$":"LocalAuthorityId"},"LocalAuthorityIdCode":{"description":"Code for the local authority","type":"string","key$":"LocalAuthorityIdCode"},"Name":{"description":"Name of the local authority","type":"string","key$":"Name"},"FriendlyName":{"description":"Friendly display name of the local authority","type":"string","key$":"FriendlyName"},"Url":{"description":"Website URL of the local authority","format":"uri","type":"string","key$":"Url"},"SchemeUrl":{"description":"URL to the local authority's food hygiene scheme page","format":"uri","type":"string","key$":"SchemeUrl"},"Email":{"description":"Email address of the local authority","format":"email","type":"string","key$":"Email"},"RegionName":{"description":"Region where the authority is located","type":"string","key$":"RegionName"},"FileName":{"description":"XML filename for the authority's data","type":"string","key$":"FileName"},"FileNameWelsh":{"description":"Welsh language XML filename (for Welsh authorities)","type":"string","key$":"FileNameWelsh"},"EstablishmentCount":{"description":"Number of establishments registered with this authority","type":"integer","key$":"EstablishmentCount"}},"x-ref":"#/components/schemas/Authority","index$":0}},"application/xml":{"schema":{"type":"object","properties":{"LocalAuthorityId":{"description":"Unique identifier for the local authority","type":"integer","key$":"LocalAuthorityId"},"LocalAuthorityIdCode":{"description":"Code for the local authority","type":"string","key$":"LocalAuthorityIdCode"},"Name":{"description":"Name of the local authority","type":"string","key$":"Name"},"FriendlyName":{"description":"Friendly display name of the local authority","type":"string","key$":"FriendlyName"},"Url":{"description":"Website URL of the local authority","format":"uri","type":"string","key$":"Url"},"SchemeUrl":{"description":"URL to the local authority's food hygiene scheme page","format":"uri","type":"string","key$":"SchemeUrl"},"Email":{"description":"Email address of the local authority","format":"email","type":"string","key$":"Email"},"RegionName":{"description":"Region where the authority is located","type":"string","key$":"RegionName"},"FileName":{"description":"XML filename for the authority's data","type":"string","key$":"FileName"},"FileNameWelsh":{"description":"Welsh language XML filename (for Welsh authorities)","type":"string","key$":"FileNameWelsh"},"EstablishmentCount":{"description":"Number of establishments registered with this authority","type":"integer","key$":"EstablishmentCount"}},"x-ref":"#/components/schemas/Authority"}}}},"404":{"description":"Authority not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"id","in":"path","description":"Unique identifier for the local authority","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
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
  
