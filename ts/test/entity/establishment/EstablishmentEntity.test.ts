

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


describe('EstablishmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FOOD_HYGIENE_RATING_TEST_LIVE=TRUE.
  afterEach(liveDelay('FOOD_HYGIENE_RATING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FoodHygieneRatingSDK.test()
    const ent = testsdk.Establishment()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FOOD_HYGIENE_RATING_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'establishment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"AddressLine1","req":false,"short":"First line of the address","type":"`$STRING`","index$":0},{"active":true,"name":"AddressLine2","req":false,"short":"Second line of the address","type":"`$STRING`","index$":1},{"active":true,"name":"AddressLine3","req":false,"short":"Third line of the address","type":"`$STRING`","index$":2},{"active":true,"name":"AddressLine4","req":false,"short":"Fourth line of the address","type":"`$STRING`","index$":3},{"active":true,"name":"BusinessName","req":false,"short":"Name of the food establishment","type":"`$STRING`","index$":4},{"active":true,"name":"BusinessType","req":false,"short":"Type of food business (e.g., Restaurant, Pub, Café, Takeaway)","type":"`$STRING`","index$":5},{"active":true,"name":"BusinessTypeID","req":false,"short":"Unique identifier for the business type","type":"`$INTEGER`","index$":6},{"active":true,"name":"FHRSID","req":false,"short":"Unique identifier for the establishment in the FHRS system","type":"`$INTEGER`","index$":7},{"active":true,"name":"Geocode","req":false,"type":"`$OBJECT`","index$":8},{"active":true,"name":"LocalAuthorityBusinessID","req":false,"short":"Business ID assigned by the local authority","type":"`$STRING`","index$":9},{"active":true,"name":"LocalAuthorityCode","req":false,"short":"Code for the local authority","type":"`$STRING`","index$":10},{"active":true,"format":"email","name":"LocalAuthorityEmailAddress","req":false,"short":"Email address of the local authority","type":"`$STRING`","index$":11},{"active":true,"name":"LocalAuthorityName","req":false,"short":"Name of the local authority","type":"`$STRING`","index$":12},{"active":true,"format":"uri","name":"LocalAuthorityWebSite","req":false,"short":"Website of the local authority","type":"`$STRING`","index$":13},{"active":true,"name":"NewRatingPending","req":false,"short":"Indicates if a new rating is pending","type":"`$BOOLEAN`","index$":14},{"active":true,"name":"PostCode","req":false,"short":"Postcode of the establishment","type":"`$STRING`","index$":15},{"active":true,"format":"date","name":"RatingDate","req":false,"short":"Date the rating was issued","type":"`$STRING`","index$":16},{"active":true,"name":"RatingKey","req":false,"short":"Key for the rating value","type":"`$STRING`","index$":17},{"active":true,"name":"RatingValue","req":false,"short":"The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)","type":"`$STRING`","index$":18},{"active":true,"name":"SchemeType","req":false,"short":"Type of scheme (FHRS or FHIS)","type":"`$STRING`","index$":19},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":20},{"active":true,"format":"double","name":"latitude","req":false,"short":"Latitude coordinate of the establishment","type":"`$NUMBER`","index$":21},{"active":true,"format":"double","name":"longitude","req":false,"short":"Longitude coordinate of the establishment","type":"`$NUMBER`","index$":22}],"id":{"field":"id","name":"id"},"name":"establishment","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"address","orig":"address","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"business_type_id","orig":"business_type_id","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"latitude","orig":"latitude","reqd":false,"type":"`$NUMBER`","index$":2},{"active":true,"kind":"query","name":"local_authority_id","orig":"local_authority_id","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"longitude","orig":"longitude","reqd":false,"type":"`$NUMBER`","index$":4},{"active":true,"kind":"query","name":"max_distance_limit","orig":"max_distance_limit","reqd":false,"type":"`$NUMBER`","index$":5},{"active":true,"kind":"query","name":"name","orig":"name","reqd":false,"type":"`$STRING`","index$":6},{"active":true,"example":1,"kind":"query","name":"page_number","orig":"page_number","reqd":false,"type":"`$INTEGER`","index$":7},{"active":true,"example":10,"kind":"query","name":"page_size","orig":"page_size","reqd":false,"type":"`$INTEGER`","index$":8},{"active":true,"kind":"query","name":"rating_key","orig":"rating_key","reqd":false,"type":"`$STRING`","index$":9},{"active":true,"kind":"query","name":"sort_option_key","orig":"sort_option_key","reqd":false,"type":"`$STRING`","index$":10}]},"contract":{"id":"GET /Establishments","json":"{\"operationId\":\"getEstablishments\",\"parameters\":[{\"description\":\"Filter establishments by local authority ID\",\"in\":\"query\",\"name\":\"localAuthorityId\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Filter establishments by business type ID\",\"in\":\"query\",\"name\":\"businessTypeId\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Filter establishments by rating key (e.g., 0-5, Pass/Exempt)\",\"in\":\"query\",\"name\":\"ratingKey\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter establishments by name (partial match supported)\",\"in\":\"query\",\"name\":\"name\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter establishments by address\",\"in\":\"query\",\"name\":\"address\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Longitude for geolocation search\",\"in\":\"query\",\"name\":\"longitude\",\"required\":false,\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"Latitude for geolocation search\",\"in\":\"query\",\"name\":\"latitude\",\"required\":false,\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"Maximum distance in miles for geolocation search\",\"in\":\"query\",\"name\":\"maxDistanceLimit\",\"required\":false,\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"pageNumber\",\"required\":false,\"schema\":{\"default\":1,\"type\":\"integer\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"pageSize\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":5000,\"type\":\"integer\"}},{\"description\":\"Sort option for results\",\"in\":\"query\",\"name\":\"sortOptionKey\",\"required\":false,\"schema\":{\"enum\":[\"alpha\",\"rating\",\"distance\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"establishments\":{\"items\":{\"properties\":{\"AddressLine1\":{\"description\":\"First line of the address\",\"type\":\"string\"},\"AddressLine2\":{\"description\":\"Second line of the address\",\"type\":\"string\"},\"AddressLine3\":{\"description\":\"Third line of the address\",\"type\":\"string\"},\"AddressLine4\":{\"description\":\"Fourth line of the address\",\"type\":\"string\"},\"BusinessName\":{\"description\":\"Name of the food establishment\",\"type\":\"string\"},\"BusinessType\":{\"description\":\"Type of food business (e.g., Restaurant, Pub, Café, Takeaway)\",\"type\":\"string\"},\"BusinessTypeID\":{\"description\":\"Unique identifier for the business type\",\"type\":\"integer\"},\"FHRSID\":{\"description\":\"Unique identifier for the establishment in the FHRS system\",\"type\":\"integer\"},\"Geocode\":{\"properties\":{\"latitude\":{\"description\":\"Latitude coordinate of the establishment\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate of the establishment\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"LocalAuthorityBusinessID\":{\"description\":\"Business ID assigned by the local authority\",\"type\":\"string\"},\"LocalAuthorityCode\":{\"description\":\"Code for the local authority\",\"type\":\"string\"},\"LocalAuthorityEmailAddress\":{\"description\":\"Email address of the local authority\",\"format\":\"email\",\"type\":\"string\"},\"LocalAuthorityName\":{\"description\":\"Name of the local authority\",\"type\":\"string\"},\"LocalAuthorityWebSite\":{\"description\":\"Website of the local authority\",\"format\":\"uri\",\"type\":\"string\"},\"NewRatingPending\":{\"description\":\"Indicates if a new rating is pending\",\"type\":\"boolean\"},\"PostCode\":{\"description\":\"Postcode of the establishment\",\"type\":\"string\"},\"RatingDate\":{\"description\":\"Date the rating was issued\",\"format\":\"date\",\"type\":\"string\"},\"RatingKey\":{\"description\":\"Key for the rating value\",\"type\":\"string\"},\"RatingValue\":{\"description\":\"The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)\",\"type\":\"string\"},\"SchemeType\":{\"description\":\"Type of scheme (FHRS or FHIS)\",\"enum\":[\"FHRS\",\"FHIS\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"meta\":{\"properties\":{\"dataSource\":{\"description\":\"Source of the data\",\"type\":\"string\"},\"extractDate\":{\"description\":\"Date and time when the data was extracted\",\"format\":\"date-time\",\"type\":\"string\"},\"itemCount\":{\"description\":\"Number of items in the current response\",\"type\":\"integer\"},\"pageNumber\":{\"description\":\"Current page number\",\"type\":\"integer\"},\"pageSize\":{\"description\":\"Number of items per page\",\"type\":\"integer\"},\"returnCode\":{\"description\":\"Return code for the API call\",\"type\":\"string\"},\"totalCount\":{\"description\":\"Total number of items matching the query\",\"type\":\"integer\"},\"totalPages\":{\"description\":\"Total number of pages available\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"establishments\":{\"items\":{\"properties\":{\"AddressLine1\":{\"description\":\"First line of the address\",\"type\":\"string\"},\"AddressLine2\":{\"description\":\"Second line of the address\",\"type\":\"string\"},\"AddressLine3\":{\"description\":\"Third line of the address\",\"type\":\"string\"},\"AddressLine4\":{\"description\":\"Fourth line of the address\",\"type\":\"string\"},\"BusinessName\":{\"description\":\"Name of the food establishment\",\"type\":\"string\"},\"BusinessType\":{\"description\":\"Type of food business (e.g., Restaurant, Pub, Café, Takeaway)\",\"type\":\"string\"},\"BusinessTypeID\":{\"description\":\"Unique identifier for the business type\",\"type\":\"integer\"},\"FHRSID\":{\"description\":\"Unique identifier for the establishment in the FHRS system\",\"type\":\"integer\"},\"Geocode\":{\"properties\":{\"latitude\":{\"description\":\"Latitude coordinate of the establishment\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate of the establishment\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"LocalAuthorityBusinessID\":{\"description\":\"Business ID assigned by the local authority\",\"type\":\"string\"},\"LocalAuthorityCode\":{\"description\":\"Code for the local authority\",\"type\":\"string\"},\"LocalAuthorityEmailAddress\":{\"description\":\"Email address of the local authority\",\"format\":\"email\",\"type\":\"string\"},\"LocalAuthorityName\":{\"description\":\"Name of the local authority\",\"type\":\"string\"},\"LocalAuthorityWebSite\":{\"description\":\"Website of the local authority\",\"format\":\"uri\",\"type\":\"string\"},\"NewRatingPending\":{\"description\":\"Indicates if a new rating is pending\",\"type\":\"boolean\"},\"PostCode\":{\"description\":\"Postcode of the establishment\",\"type\":\"string\"},\"RatingDate\":{\"description\":\"Date the rating was issued\",\"format\":\"date\",\"type\":\"string\"},\"RatingKey\":{\"description\":\"Key for the rating value\",\"type\":\"string\"},\"RatingValue\":{\"description\":\"The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)\",\"type\":\"string\"},\"SchemeType\":{\"description\":\"Type of scheme (FHRS or FHIS)\",\"enum\":[\"FHRS\",\"FHIS\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"meta\":{\"properties\":{\"dataSource\":{\"description\":\"Source of the data\",\"type\":\"string\"},\"extractDate\":{\"description\":\"Date and time when the data was extracted\",\"format\":\"date-time\",\"type\":\"string\"},\"itemCount\":{\"description\":\"Number of items in the current response\",\"type\":\"integer\"},\"pageNumber\":{\"description\":\"Current page number\",\"type\":\"integer\"},\"pageSize\":{\"description\":\"Number of items per page\",\"type\":\"integer\"},\"returnCode\":{\"description\":\"Return code for the API call\",\"type\":\"string\"},\"totalCount\":{\"description\":\"Total number of items matching the query\",\"type\":\"integer\"},\"totalPages\":{\"description\":\"Total number of pages available\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with establishment data\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"404\":{\"description\":\"No establishments found matching criteria\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/Establishments","segments":[{"lit":"Establishments"}],"select":{"exist":["address","business_type_id","latitude","local_authority_id","longitude","max_distance_limit","name","page_number","page_size","rating_key","sort_option_key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /Establishments/{id}","json":"{\"operationId\":\"getEstablishmentById\",\"parameters\":[{\"description\":\"Unique identifier for the establishment\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"AddressLine1\":{\"description\":\"First line of the address\",\"type\":\"string\"},\"AddressLine2\":{\"description\":\"Second line of the address\",\"type\":\"string\"},\"AddressLine3\":{\"description\":\"Third line of the address\",\"type\":\"string\"},\"AddressLine4\":{\"description\":\"Fourth line of the address\",\"type\":\"string\"},\"BusinessName\":{\"description\":\"Name of the food establishment\",\"type\":\"string\"},\"BusinessType\":{\"description\":\"Type of food business (e.g., Restaurant, Pub, Café, Takeaway)\",\"type\":\"string\"},\"BusinessTypeID\":{\"description\":\"Unique identifier for the business type\",\"type\":\"integer\"},\"FHRSID\":{\"description\":\"Unique identifier for the establishment in the FHRS system\",\"type\":\"integer\"},\"Geocode\":{\"properties\":{\"latitude\":{\"description\":\"Latitude coordinate of the establishment\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate of the establishment\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"LocalAuthorityBusinessID\":{\"description\":\"Business ID assigned by the local authority\",\"type\":\"string\"},\"LocalAuthorityCode\":{\"description\":\"Code for the local authority\",\"type\":\"string\"},\"LocalAuthorityEmailAddress\":{\"description\":\"Email address of the local authority\",\"format\":\"email\",\"type\":\"string\"},\"LocalAuthorityName\":{\"description\":\"Name of the local authority\",\"type\":\"string\"},\"LocalAuthorityWebSite\":{\"description\":\"Website of the local authority\",\"format\":\"uri\",\"type\":\"string\"},\"NewRatingPending\":{\"description\":\"Indicates if a new rating is pending\",\"type\":\"boolean\"},\"PostCode\":{\"description\":\"Postcode of the establishment\",\"type\":\"string\"},\"RatingDate\":{\"description\":\"Date the rating was issued\",\"format\":\"date\",\"type\":\"string\"},\"RatingKey\":{\"description\":\"Key for the rating value\",\"type\":\"string\"},\"RatingValue\":{\"description\":\"The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)\",\"type\":\"string\"},\"SchemeType\":{\"description\":\"Type of scheme (FHRS or FHIS)\",\"enum\":[\"FHRS\",\"FHIS\"],\"type\":\"string\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"AddressLine1\":{\"description\":\"First line of the address\",\"type\":\"string\"},\"AddressLine2\":{\"description\":\"Second line of the address\",\"type\":\"string\"},\"AddressLine3\":{\"description\":\"Third line of the address\",\"type\":\"string\"},\"AddressLine4\":{\"description\":\"Fourth line of the address\",\"type\":\"string\"},\"BusinessName\":{\"description\":\"Name of the food establishment\",\"type\":\"string\"},\"BusinessType\":{\"description\":\"Type of food business (e.g., Restaurant, Pub, Café, Takeaway)\",\"type\":\"string\"},\"BusinessTypeID\":{\"description\":\"Unique identifier for the business type\",\"type\":\"integer\"},\"FHRSID\":{\"description\":\"Unique identifier for the establishment in the FHRS system\",\"type\":\"integer\"},\"Geocode\":{\"properties\":{\"latitude\":{\"description\":\"Latitude coordinate of the establishment\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate of the establishment\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"LocalAuthorityBusinessID\":{\"description\":\"Business ID assigned by the local authority\",\"type\":\"string\"},\"LocalAuthorityCode\":{\"description\":\"Code for the local authority\",\"type\":\"string\"},\"LocalAuthorityEmailAddress\":{\"description\":\"Email address of the local authority\",\"format\":\"email\",\"type\":\"string\"},\"LocalAuthorityName\":{\"description\":\"Name of the local authority\",\"type\":\"string\"},\"LocalAuthorityWebSite\":{\"description\":\"Website of the local authority\",\"format\":\"uri\",\"type\":\"string\"},\"NewRatingPending\":{\"description\":\"Indicates if a new rating is pending\",\"type\":\"boolean\"},\"PostCode\":{\"description\":\"Postcode of the establishment\",\"type\":\"string\"},\"RatingDate\":{\"description\":\"Date the rating was issued\",\"format\":\"date\",\"type\":\"string\"},\"RatingKey\":{\"description\":\"Key for the rating value\",\"type\":\"string\"},\"RatingValue\":{\"description\":\"The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)\",\"type\":\"string\"},\"SchemeType\":{\"description\":\"Type of scheme (FHRS or FHIS)\",\"enum\":[\"FHRS\",\"FHIS\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with establishment details\"},\"404\":{\"description\":\"Establishment not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/Establishments/{id}","segments":[{"lit":"Establishments"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.Geocode`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"establishment","name__orig":"establishment","Name":"Establishment","name_":"establishment","name-":"establishment","NAME":"ESTABLISHMENT","index$":2}, {"active":true,"entity":"establishment","key$":"BasicEstablishmentFlow","kind":"basic","name":"BasicEstablishmentFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"establishment_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"establishment_ref01","srcdatavar":"establishment_ref01_data","suffix":"_dt0"},"match":{"id":"establishment01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-establishment_ref01"}}],"index$":1}]}, 'Establishment')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let establishment_ref01_data = Object.values(setup.data.existing.establishment)[0] as any

    // LIST
    const establishment_ref01_ent = client.Establishment()
    const establishment_ref01_match: any = {}

    const establishment_ref01_list = (await establishment_ref01_ent.list(establishment_ref01_match)).map((e: any) => e.data())


    // LOAD
    const establishment_ref01_match_dt0: any = {}
    establishment_ref01_match_dt0.id = establishment_ref01_data.id
    const establishment_ref01_data_dt0 = (await establishment_ref01_ent.load(establishment_ref01_match_dt0)).data()
    assert(establishment_ref01_data_dt0.id === establishment_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/establishment/EstablishmentTestData.json')

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
    ['establishment01','establishment02','establishment03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FOOD_HYGIENE_RATING_TEST_ESTABLISHMENT_ENTID': idmap,
    'FOOD_HYGIENE_RATING_TEST_LIVE': 'FALSE',
    'FOOD_HYGIENE_RATING_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FOOD_HYGIENE_RATING_TEST_ESTABLISHMENT_ENTID']

  const live = 'TRUE' === env.FOOD_HYGIENE_RATING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FOOD_HYGIENE_RATING_TEST_ESTABLISHMENT_ENTID']
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
  
