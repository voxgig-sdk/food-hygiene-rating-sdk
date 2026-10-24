import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "authority",
    "accessor": "Authority",
    "op": "list",
    "method": "GET",
    "path": "/Authorities",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "authorities": [
        {
          "LocalAuthorityId": 1,
          "LocalAuthorityIdCode": "x",
          "Name": "x",
          "FriendlyName": "x",
          "Url": "x",
          "SchemeUrl": "x",
          "Email": "x",
          "RegionName": "x",
          "FileName": "x",
          "FileNameWelsh": "x",
          "EstablishmentCount": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "authority",
    "accessor": "Authority",
    "op": "load",
    "method": "GET",
    "path": "/Authorities/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "LocalAuthorityId": 1,
      "LocalAuthorityIdCode": "x",
      "Name": "x",
      "FriendlyName": "x",
      "Url": "x",
      "SchemeUrl": "x",
      "Email": "x",
      "RegionName": "x",
      "FileName": "x",
      "FileNameWelsh": "x",
      "EstablishmentCount": 1
    },
    "idField": "id"
  },
  {
    "entity": "business_type",
    "accessor": "BusinessType",
    "op": "list",
    "method": "GET",
    "path": "/BusinessTypes",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "businessTypes": [
        {
          "BusinessTypeId": 1,
          "BusinessTypeName": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "establishment",
    "accessor": "Establishment",
    "op": "list",
    "method": "GET",
    "path": "/Establishments",
    "args": [],
    "select": {
      "address": "v1",
      "business_type_id": "v1",
      "latitude": "v1",
      "local_authority_id": "v1",
      "longitude": "v1",
      "max_distance_limit": "v1",
      "name": "v1",
      "page_number": 1,
      "page_size": 10,
      "rating_key": "v1",
      "sort_option_key": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml"
    ],
    "query": [
      "localAuthorityId",
      "businessTypeId",
      "ratingKey",
      "name",
      "address",
      "longitude",
      "latitude",
      "maxDistanceLimit",
      "pageNumber",
      "pageSize",
      "sortOptionKey"
    ],
    "queryArgs": [
      {
        "name": "address",
        "wire": "address"
      },
      {
        "name": "business_type_id",
        "wire": "businessTypeId"
      },
      {
        "name": "latitude",
        "wire": "latitude"
      },
      {
        "name": "local_authority_id",
        "wire": "localAuthorityId"
      },
      {
        "name": "longitude",
        "wire": "longitude"
      },
      {
        "name": "max_distance_limit",
        "wire": "maxDistanceLimit"
      },
      {
        "name": "name",
        "wire": "name"
      },
      {
        "name": "page_number",
        "wire": "pageNumber"
      },
      {
        "name": "page_size",
        "wire": "pageSize"
      },
      {
        "name": "rating_key",
        "wire": "ratingKey"
      },
      {
        "name": "sort_option_key",
        "wire": "sortOptionKey"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "establishments": [
        {
          "FHRSID": 1,
          "LocalAuthorityBusinessID": "x",
          "BusinessName": "x",
          "BusinessType": "x",
          "BusinessTypeID": 1,
          "AddressLine1": "x",
          "AddressLine2": "x",
          "AddressLine3": "x",
          "AddressLine4": "x",
          "PostCode": "x",
          "RatingValue": "x",
          "RatingKey": "x",
          "RatingDate": "2026-01-01",
          "LocalAuthorityCode": "x",
          "LocalAuthorityName": "x",
          "LocalAuthorityWebSite": "x",
          "LocalAuthorityEmailAddress": "x",
          "SchemeType": "FHRS",
          "Geocode": {
            "longitude": 1,
            "latitude": 1
          },
          "NewRatingPending": true
        }
      ],
      "meta": {
        "dataSource": "x",
        "extractDate": "2026-01-01T00:00:00Z",
        "itemCount": 1,
        "returnCode": "x",
        "totalCount": 1,
        "totalPages": 1,
        "pageSize": 1,
        "pageNumber": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "establishment",
    "accessor": "Establishment",
    "op": "load",
    "method": "GET",
    "path": "/Establishments/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "FHRSID": 1,
      "LocalAuthorityBusinessID": "x",
      "BusinessName": "x",
      "BusinessType": "x",
      "BusinessTypeID": 1,
      "AddressLine1": "x",
      "AddressLine2": "x",
      "AddressLine3": "x",
      "AddressLine4": "x",
      "PostCode": "x",
      "RatingValue": "x",
      "RatingKey": "x",
      "RatingDate": "2026-01-01",
      "LocalAuthorityCode": "x",
      "LocalAuthorityName": "x",
      "LocalAuthorityWebSite": "x",
      "LocalAuthorityEmailAddress": "x",
      "SchemeType": "FHRS",
      "Geocode": {
        "longitude": 1,
        "latitude": 1
      },
      "NewRatingPending": true
    },
    "idField": "id"
  },
  {
    "entity": "rating",
    "accessor": "Rating",
    "op": "list",
    "method": "GET",
    "path": "/Ratings",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "ratings": [
        {
          "ratingId": 1,
          "ratingName": "x",
          "ratingKey": "x",
          "schemeType": "FHRS"
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
