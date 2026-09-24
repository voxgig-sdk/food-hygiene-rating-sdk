

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"AddressLine1":{"a":true,"h":"Address Line1","n":"AddressLine1","r":false,"sh":"First line of the address","t":"`$STRING`","key$":"AddressLine1","index$":0},"AddressLine2":{"a":true,"h":"Address Line2","n":"AddressLine2","r":false,"sh":"Second line of the address","t":"`$STRING`","key$":"AddressLine2","index$":1},"AddressLine3":{"a":true,"h":"Address Line3","n":"AddressLine3","r":false,"sh":"Third line of the address","t":"`$STRING`","key$":"AddressLine3","index$":2},"AddressLine4":{"a":true,"h":"Address Line4","n":"AddressLine4","r":false,"sh":"Fourth line of the address","t":"`$STRING`","key$":"AddressLine4","index$":3},"BusinessName":{"a":true,"h":"Business Name","n":"BusinessName","r":false,"sh":"Name of the food establishment","t":"`$STRING`","key$":"BusinessName","index$":4},"BusinessType":{"a":true,"h":"Business Type","n":"BusinessType","r":false,"sh":"Type of food business (e.g., Restaurant, Pub, Café, Takeaway)","t":"`$STRING`","key$":"BusinessType","index$":5},"BusinessTypeID":{"a":true,"h":"Business Type Id","n":"BusinessTypeID","r":false,"sh":"Unique identifier for the business type","t":"`$INTEGER`","key$":"BusinessTypeID","index$":6},"FHRSID":{"a":true,"h":"Fhrsid","n":"FHRSID","r":false,"sh":"Unique identifier for the establishment in the FHRS system","t":"`$INTEGER`","key$":"FHRSID","index$":7},"Geocode":{"a":true,"h":"Geocode","n":"Geocode","r":false,"t":"`$OBJECT`","key$":"Geocode","index$":8},"LocalAuthorityBusinessID":{"a":true,"h":"Local Authority Business Id","n":"LocalAuthorityBusinessID","r":false,"sh":"Business ID assigned by the local authority","t":"`$STRING`","key$":"LocalAuthorityBusinessID","index$":9},"LocalAuthorityCode":{"a":true,"h":"Local Authority Code","n":"LocalAuthorityCode","r":false,"sh":"Code for the local authority","t":"`$STRING`","key$":"LocalAuthorityCode","index$":10},"LocalAuthorityEmailAddress":{"a":true,"fo":"email","h":"Local Authority Email Address","n":"LocalAuthorityEmailAddress","r":false,"sh":"Email address of the local authority","t":"`$STRING`","key$":"LocalAuthorityEmailAddress","index$":11},"LocalAuthorityName":{"a":true,"h":"Local Authority Name","n":"LocalAuthorityName","r":false,"sh":"Name of the local authority","t":"`$STRING`","key$":"LocalAuthorityName","index$":12},"LocalAuthorityWebSite":{"a":true,"fo":"uri","h":"Local Authority Web Site","n":"LocalAuthorityWebSite","r":false,"sh":"Website of the local authority","t":"`$STRING`","key$":"LocalAuthorityWebSite","index$":13},"NewRatingPending":{"a":true,"h":"New Rating Pending","n":"NewRatingPending","r":false,"sh":"Indicates if a new rating is pending","t":"`$BOOLEAN`","key$":"NewRatingPending","index$":14},"PostCode":{"a":true,"h":"Post Code","n":"PostCode","r":false,"sh":"Postcode of the establishment","t":"`$STRING`","key$":"PostCode","index$":15},"RatingDate":{"a":true,"fo":"date","h":"Rating Date","n":"RatingDate","r":false,"sh":"Date the rating was issued","t":"`$STRING`","key$":"RatingDate","index$":16},"RatingKey":{"a":true,"h":"Rating Key","n":"RatingKey","r":false,"sh":"Key for the rating value","t":"`$STRING`","key$":"RatingKey","index$":17},"RatingValue":{"a":true,"h":"Rating Value","n":"RatingValue","r":false,"sh":"The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)","t":"`$STRING`","key$":"RatingValue","index$":18},"SchemeType":{"a":true,"h":"Scheme Type","n":"SchemeType","r":false,"sh":"Type of scheme (FHRS or FHIS)","t":"`$STRING`","key$":"SchemeType","index$":19},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":20},"latitude":{"a":true,"fo":"double","h":"Latitude","n":"latitude","r":false,"sh":"Latitude coordinate of the establishment","t":"`$NUMBER`","key$":"latitude","index$":21},"longitude":{"a":true,"fo":"double","h":"Longitude","n":"longitude","r":false,"sh":"Longitude coordinate of the establishment","t":"`$NUMBER`","key$":"longitude","index$":22}},"id":{"field":"id","name":"id"},"name":"establishment","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /Establishments","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"address","or":"address","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"business_type_id","or":"business_type_id","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"latitude","or":"latitude","r":false,"t":"`$NUMBER`","index$":2},{"a":true,"k":"query","n":"local_authority_id","or":"local_authority_id","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"longitude","or":"longitude","r":false,"t":"`$NUMBER`","index$":4},{"a":true,"k":"query","n":"max_distance_limit","or":"max_distance_limit","r":false,"t":"`$NUMBER`","index$":5},{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":1,"k":"query","n":"page_number","or":"page_number","r":false,"t":"`$INTEGER`","index$":7},{"a":true,"ex":10,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":8},{"a":true,"k":"query","n":"rating_key","or":"rating_key","r":false,"t":"`$STRING`","index$":9},{"a":true,"k":"query","n":"sort_option_key","or":"sort_option_key","r":false,"t":"`$STRING`","index$":10}]},"k":"http","m":"GET","o":"/Establishments","q":{"exist":["address","business_type_id","latitude","local_authority_id","longitude","max_distance_limit","name","page_number","page_size","rating_key","sort_option_key"]},"r":{},"s":[{"lit":"Establishments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /Establishments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/Establishments/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"Establishments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.Geocode`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"establishment","name__orig":"establishment","Name":"Establishment","name_":"establishment","name-":"establishment","NAME":"ESTABLISHMENT","index$":2}, {"active":true,"entity":"establishment","key$":"BasicEstablishmentFlow","kind":"basic","name":"BasicEstablishmentFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"establishment_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"establishment_ref01","srcdatavar":"establishment_ref01_data","suffix":"_dt0"},"m":{"id":"establishment01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-establishment_ref01"}}],"index$":1}]}, 'Establishment', {"GET /Establishments":{"protocol":"http","operationId":"getEstablishments","responses":{"200":{"description":"Successful response with establishment data","content":{"application/json":{"schema":{"type":"object","properties":{"establishments":{"items":{"properties":{"AddressLine1":{"description":"First line of the address","type":"string","key$":"AddressLine1"},"AddressLine2":{"description":"Second line of the address","type":"string","key$":"AddressLine2"},"AddressLine3":{"description":"Third line of the address","type":"string","key$":"AddressLine3"},"AddressLine4":{"description":"Fourth line of the address","type":"string","key$":"AddressLine4"},"BusinessName":{"description":"Name of the food establishment","type":"string","key$":"BusinessName"},"BusinessType":{"description":"Type of food business (e.g., Restaurant, Pub, Café, Takeaway)","type":"string","key$":"BusinessType"},"BusinessTypeID":{"description":"Unique identifier for the business type","type":"integer","key$":"BusinessTypeID"},"FHRSID":{"description":"Unique identifier for the establishment in the FHRS system","type":"integer","key$":"FHRSID"},"Geocode":{"properties":{"latitude":{"description":"Latitude coordinate of the establishment","format":"double","type":"number","key$":"latitude"},"longitude":{"description":"Longitude coordinate of the establishment","format":"double","type":"number","key$":"longitude"}},"type":"object","x-ref":"#/components/schemas/Geocode","key$":"Geocode"},"LocalAuthorityBusinessID":{"description":"Business ID assigned by the local authority","type":"string","key$":"LocalAuthorityBusinessID"},"LocalAuthorityCode":{"description":"Code for the local authority","type":"string","key$":"LocalAuthorityCode"},"LocalAuthorityEmailAddress":{"description":"Email address of the local authority","format":"email","type":"string","key$":"LocalAuthorityEmailAddress"},"LocalAuthorityName":{"description":"Name of the local authority","type":"string","key$":"LocalAuthorityName"},"LocalAuthorityWebSite":{"description":"Website of the local authority","format":"uri","type":"string","key$":"LocalAuthorityWebSite"},"NewRatingPending":{"description":"Indicates if a new rating is pending","type":"boolean","key$":"NewRatingPending"},"PostCode":{"description":"Postcode of the establishment","type":"string","key$":"PostCode"},"RatingDate":{"description":"Date the rating was issued","format":"date","type":"string","key$":"RatingDate"},"RatingKey":{"description":"Key for the rating value","type":"string","key$":"RatingKey"},"RatingValue":{"description":"The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)","type":"string","key$":"RatingValue"},"SchemeType":{"description":"Type of scheme (FHRS or FHIS)","enum":["FHRS","FHIS"],"type":"string","key$":"SchemeType"}},"type":"object","x-ref":"#/components/schemas/Establishment","index$":0},"key$":"establishments","type":"array"},"meta":{"key$":"meta","properties":{"dataSource":{"description":"Source of the data","type":"string"},"extractDate":{"description":"Date and time when the data was extracted","format":"date-time","type":"string"},"itemCount":{"description":"Number of items in the current response","type":"integer"},"pageNumber":{"description":"Current page number","type":"integer"},"pageSize":{"description":"Number of items per page","type":"integer"},"returnCode":{"description":"Return code for the API call","type":"string"},"totalCount":{"description":"Total number of items matching the query","type":"integer"},"totalPages":{"description":"Total number of pages available","type":"integer"}},"type":"object","x-ref":"#/components/schemas/MetaData"}},"x-ref":"#/components/schemas/EstablishmentsResponse"}},"application/xml":{"schema":{"type":"object","properties":{"establishments":{"items":{"properties":{"AddressLine1":{"description":"First line of the address","type":"string","key$":"AddressLine1"},"AddressLine2":{"description":"Second line of the address","type":"string","key$":"AddressLine2"},"AddressLine3":{"description":"Third line of the address","type":"string","key$":"AddressLine3"},"AddressLine4":{"description":"Fourth line of the address","type":"string","key$":"AddressLine4"},"BusinessName":{"description":"Name of the food establishment","type":"string","key$":"BusinessName"},"BusinessType":{"description":"Type of food business (e.g., Restaurant, Pub, Café, Takeaway)","type":"string","key$":"BusinessType"},"BusinessTypeID":{"description":"Unique identifier for the business type","type":"integer","key$":"BusinessTypeID"},"FHRSID":{"description":"Unique identifier for the establishment in the FHRS system","type":"integer","key$":"FHRSID"},"Geocode":{"properties":{"latitude":{"description":"Latitude coordinate of the establishment","format":"double","type":"number","key$":"latitude"},"longitude":{"description":"Longitude coordinate of the establishment","format":"double","type":"number","key$":"longitude"}},"type":"object","x-ref":"#/components/schemas/Geocode","key$":"Geocode"},"LocalAuthorityBusinessID":{"description":"Business ID assigned by the local authority","type":"string","key$":"LocalAuthorityBusinessID"},"LocalAuthorityCode":{"description":"Code for the local authority","type":"string","key$":"LocalAuthorityCode"},"LocalAuthorityEmailAddress":{"description":"Email address of the local authority","format":"email","type":"string","key$":"LocalAuthorityEmailAddress"},"LocalAuthorityName":{"description":"Name of the local authority","type":"string","key$":"LocalAuthorityName"},"LocalAuthorityWebSite":{"description":"Website of the local authority","format":"uri","type":"string","key$":"LocalAuthorityWebSite"},"NewRatingPending":{"description":"Indicates if a new rating is pending","type":"boolean","key$":"NewRatingPending"},"PostCode":{"description":"Postcode of the establishment","type":"string","key$":"PostCode"},"RatingDate":{"description":"Date the rating was issued","format":"date","type":"string","key$":"RatingDate"},"RatingKey":{"description":"Key for the rating value","type":"string","key$":"RatingKey"},"RatingValue":{"description":"The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)","type":"string","key$":"RatingValue"},"SchemeType":{"description":"Type of scheme (FHRS or FHIS)","enum":["FHRS","FHIS"],"type":"string","key$":"SchemeType"}},"type":"object","x-ref":"#/components/schemas/Establishment","index$":0},"key$":"establishments","type":"array"},"meta":{"key$":"meta","properties":{"dataSource":{"description":"Source of the data","type":"string"},"extractDate":{"description":"Date and time when the data was extracted","format":"date-time","type":"string"},"itemCount":{"description":"Number of items in the current response","type":"integer"},"pageNumber":{"description":"Current page number","type":"integer"},"pageSize":{"description":"Number of items per page","type":"integer"},"returnCode":{"description":"Return code for the API call","type":"string"},"totalCount":{"description":"Total number of items matching the query","type":"integer"},"totalPages":{"description":"Total number of pages available","type":"integer"}},"type":"object","x-ref":"#/components/schemas/MetaData"}},"x-ref":"#/components/schemas/EstablishmentsResponse"}}}},"400":{"description":"Bad request - invalid parameters"},"404":{"description":"No establishments found matching criteria"},"500":{"description":"Internal server error"}},"parameters":[{"name":"localAuthorityId","in":"query","description":"Filter establishments by local authority ID","required":false,"schema":{"type":"integer"},"index$":0},{"name":"businessTypeId","in":"query","description":"Filter establishments by business type ID","required":false,"schema":{"type":"integer"},"index$":1},{"name":"ratingKey","in":"query","description":"Filter establishments by rating key (e.g., 0-5, Pass/Exempt)","required":false,"schema":{"type":"string"},"index$":2},{"name":"name","in":"query","description":"Filter establishments by name (partial match supported)","required":false,"schema":{"type":"string"},"index$":3},{"name":"address","in":"query","description":"Filter establishments by address","required":false,"schema":{"type":"string"},"index$":4},{"name":"longitude","in":"query","description":"Longitude for geolocation search","required":false,"schema":{"type":"number","format":"double"},"index$":5},{"name":"latitude","in":"query","description":"Latitude for geolocation search","required":false,"schema":{"type":"number","format":"double"},"index$":6},{"name":"maxDistanceLimit","in":"query","description":"Maximum distance in miles for geolocation search","required":false,"schema":{"type":"number","format":"double"},"index$":7},{"name":"pageNumber","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","default":1},"index$":8},{"name":"pageSize","in":"query","description":"Number of results per page","required":false,"schema":{"type":"integer","default":10,"maximum":5000},"index$":9},{"name":"sortOptionKey","in":"query","description":"Sort option for results","required":false,"schema":{"type":"string","enum":["alpha","rating","distance"]},"index$":10}],"securitySource":"unspecified"},"GET /Establishments/{id}":{"protocol":"http","operationId":"getEstablishmentById","responses":{"200":{"description":"Successful response with establishment details","content":{"application/json":{"schema":{"type":"object","properties":{"FHRSID":{"description":"Unique identifier for the establishment in the FHRS system","type":"integer"},"LocalAuthorityBusinessID":{"description":"Business ID assigned by the local authority","type":"string"},"BusinessName":{"description":"Name of the food establishment","type":"string"},"BusinessType":{"description":"Type of food business (e.g., Restaurant, Pub, Café, Takeaway)","type":"string"},"BusinessTypeID":{"description":"Unique identifier for the business type","type":"integer"},"AddressLine1":{"description":"First line of the address","type":"string"},"AddressLine2":{"description":"Second line of the address","type":"string"},"AddressLine3":{"description":"Third line of the address","type":"string"},"AddressLine4":{"description":"Fourth line of the address","type":"string"},"PostCode":{"description":"Postcode of the establishment","type":"string"},"RatingValue":{"description":"The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)","type":"string"},"RatingKey":{"description":"Key for the rating value","type":"string"},"RatingDate":{"description":"Date the rating was issued","format":"date","type":"string"},"LocalAuthorityCode":{"description":"Code for the local authority","type":"string"},"LocalAuthorityName":{"description":"Name of the local authority","type":"string"},"LocalAuthorityWebSite":{"description":"Website of the local authority","format":"uri","type":"string"},"LocalAuthorityEmailAddress":{"description":"Email address of the local authority","format":"email","type":"string"},"SchemeType":{"description":"Type of scheme (FHRS or FHIS)","enum":["FHRS","FHIS"],"type":"string"},"Geocode":{"properties":{"latitude":{"description":"Latitude coordinate of the establishment","format":"double","type":"number","key$":"latitude"},"longitude":{"description":"Longitude coordinate of the establishment","format":"double","type":"number","key$":"longitude"}},"type":"object","x-ref":"#/components/schemas/Geocode","index$":0},"NewRatingPending":{"description":"Indicates if a new rating is pending","type":"boolean"}},"x-ref":"#/components/schemas/Establishment"}},"application/xml":{"schema":{"type":"object","properties":{"FHRSID":{"description":"Unique identifier for the establishment in the FHRS system","type":"integer"},"LocalAuthorityBusinessID":{"description":"Business ID assigned by the local authority","type":"string"},"BusinessName":{"description":"Name of the food establishment","type":"string"},"BusinessType":{"description":"Type of food business (e.g., Restaurant, Pub, Café, Takeaway)","type":"string"},"BusinessTypeID":{"description":"Unique identifier for the business type","type":"integer"},"AddressLine1":{"description":"First line of the address","type":"string"},"AddressLine2":{"description":"Second line of the address","type":"string"},"AddressLine3":{"description":"Third line of the address","type":"string"},"AddressLine4":{"description":"Fourth line of the address","type":"string"},"PostCode":{"description":"Postcode of the establishment","type":"string"},"RatingValue":{"description":"The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)","type":"string"},"RatingKey":{"description":"Key for the rating value","type":"string"},"RatingDate":{"description":"Date the rating was issued","format":"date","type":"string"},"LocalAuthorityCode":{"description":"Code for the local authority","type":"string"},"LocalAuthorityName":{"description":"Name of the local authority","type":"string"},"LocalAuthorityWebSite":{"description":"Website of the local authority","format":"uri","type":"string"},"LocalAuthorityEmailAddress":{"description":"Email address of the local authority","format":"email","type":"string"},"SchemeType":{"description":"Type of scheme (FHRS or FHIS)","enum":["FHRS","FHIS"],"type":"string"},"Geocode":{"properties":{"latitude":{"description":"Latitude coordinate of the establishment","format":"double","type":"number","key$":"latitude"},"longitude":{"description":"Longitude coordinate of the establishment","format":"double","type":"number","key$":"longitude"}},"type":"object","x-ref":"#/components/schemas/Geocode","index$":0},"NewRatingPending":{"description":"Indicates if a new rating is pending","type":"boolean"}},"x-ref":"#/components/schemas/Establishment"}}}},"404":{"description":"Establishment not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"id","in":"path","description":"Unique identifier for the establishment","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
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
  
