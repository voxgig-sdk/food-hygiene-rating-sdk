"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "authority",
        "accessor": "Authority",
        "op": "list",
        "method": "GET",
        "path": "/Authorities",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "authorities": [
                {
                    "Email": "x",
                    "EstablishmentCount": 1,
                    "FileName": "x",
                    "FileNameWelsh": "x",
                    "FriendlyName": "x",
                    "LocalAuthorityId": 1,
                    "LocalAuthorityIdCode": "x",
                    "Name": "x",
                    "RegionName": "x",
                    "SchemeUrl": "x",
                    "Url": "x"
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
        "query": [],
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
        "query": [],
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
            "page_number": "v1",
            "page_size": "v1",
            "rating_key": "v1",
            "sort_option_key": "v1"
        },
        "headers": [],
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
        "auth": null,
        "status": 200,
        "sample": {
            "establishments": [
                {
                    "AddressLine1": "x",
                    "AddressLine2": "x",
                    "AddressLine3": "x",
                    "AddressLine4": "x",
                    "BusinessName": "x",
                    "BusinessType": "x",
                    "BusinessTypeID": 1,
                    "FHRSID": 1,
                    "Geocode": {
                        "latitude": 1,
                        "longitude": 1
                    },
                    "LocalAuthorityBusinessID": "x",
                    "LocalAuthorityCode": "x",
                    "LocalAuthorityEmailAddress": "x",
                    "LocalAuthorityName": "x",
                    "LocalAuthorityWebSite": "x",
                    "NewRatingPending": true,
                    "PostCode": "x",
                    "RatingDate": "2026-01-01",
                    "RatingKey": "x",
                    "RatingValue": "x",
                    "SchemeType": "FHRS"
                }
            ],
            "meta": {
                "dataSource": "x",
                "extractDate": "2026-01-01T00:00:00Z",
                "itemCount": 1,
                "pageNumber": 1,
                "pageSize": 1,
                "returnCode": "x",
                "totalCount": 1,
                "totalPages": 1
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
        "query": [],
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
                "latitude": 1,
                "longitude": 1
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
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "ratings": [
                {
                    "ratingId": 1,
                    "ratingKey": "x",
                    "ratingName": "x",
                    "schemeType": "FHRS"
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map