"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'FoodHygieneRating',
        slug: "food-hygiene-rating",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.ratings.food.gov.uk",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            authority: {},
            business_type: {},
            establishment: {},
            rating: {},
        }
    };
    entity = {
        "authority": {
            "fields": [
                {
                    "name": "Email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "short": "Email address of the local authority",
                    "format": "email"
                },
                {
                    "name": "EstablishmentCount",
                    "title": "Establishment Count",
                    "type": "`$INTEGER`",
                    "short": "Number of establishments registered with this authority"
                },
                {
                    "name": "FileName",
                    "title": "File Name",
                    "type": "`$STRING`",
                    "short": "XML filename for the authority's data"
                },
                {
                    "name": "FileNameWelsh",
                    "title": "File Name Welsh",
                    "type": "`$STRING`",
                    "short": "Welsh language XML filename (for Welsh authorities)"
                },
                {
                    "name": "FriendlyName",
                    "title": "Friendly Name",
                    "type": "`$STRING`",
                    "short": "Friendly display name of the local authority"
                },
                {
                    "name": "LocalAuthorityId",
                    "title": "Local Authority Id",
                    "type": "`$INTEGER`",
                    "short": "Unique identifier for the local authority"
                },
                {
                    "name": "LocalAuthorityIdCode",
                    "title": "Local Authority Id Code",
                    "type": "`$STRING`",
                    "short": "Code for the local authority"
                },
                {
                    "name": "Name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Name of the local authority"
                },
                {
                    "name": "RegionName",
                    "title": "Region Name",
                    "type": "`$STRING`",
                    "short": "Region where the authority is located"
                },
                {
                    "name": "SchemeUrl",
                    "title": "Scheme Url",
                    "type": "`$STRING`",
                    "short": "URL to the local authority's food hygiene scheme page",
                    "format": "uri"
                },
                {
                    "name": "Url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "short": "Website URL of the local authority",
                    "format": "uri"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "authority",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/Authorities",
                            "segments": [
                                {
                                    "lit": "Authorities"
                                }
                            ],
                            "parts": [
                                "Authorities"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.authorities`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/Authorities/{id}",
                            "segments": [
                                {
                                    "lit": "Authorities"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "Authorities",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "business_type": {
            "fields": [
                {
                    "name": "BusinessTypeId",
                    "title": "Business Type Id",
                    "type": "`$INTEGER`",
                    "short": "Unique identifier for the business type"
                },
                {
                    "name": "BusinessTypeName",
                    "title": "Business Type Name",
                    "type": "`$STRING`",
                    "short": "Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop)"
                }
            ],
            "name": "business_type",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/BusinessTypes",
                            "segments": [
                                {
                                    "lit": "BusinessTypes"
                                }
                            ],
                            "parts": [
                                "BusinessTypes"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.businessTypes`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "establishment": {
            "fields": [
                {
                    "name": "AddressLine1",
                    "title": "Address Line1",
                    "type": "`$STRING`",
                    "short": "First line of the address"
                },
                {
                    "name": "AddressLine2",
                    "title": "Address Line2",
                    "type": "`$STRING`",
                    "short": "Second line of the address"
                },
                {
                    "name": "AddressLine3",
                    "title": "Address Line3",
                    "type": "`$STRING`",
                    "short": "Third line of the address"
                },
                {
                    "name": "AddressLine4",
                    "title": "Address Line4",
                    "type": "`$STRING`",
                    "short": "Fourth line of the address"
                },
                {
                    "name": "BusinessName",
                    "title": "Business Name",
                    "type": "`$STRING`",
                    "short": "Name of the food establishment"
                },
                {
                    "name": "BusinessType",
                    "title": "Business Type",
                    "type": "`$STRING`",
                    "short": "Type of food business (e.g., Restaurant, Pub, Café, Takeaway)"
                },
                {
                    "name": "BusinessTypeID",
                    "title": "Business Type Id",
                    "type": "`$INTEGER`",
                    "short": "Unique identifier for the business type"
                },
                {
                    "name": "FHRSID",
                    "title": "Fhrsid",
                    "type": "`$INTEGER`",
                    "short": "Unique identifier for the establishment in the FHRS system"
                },
                {
                    "name": "Geocode",
                    "title": "Geocode",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "LocalAuthorityBusinessID",
                    "title": "Local Authority Business Id",
                    "type": "`$STRING`",
                    "short": "Business ID assigned by the local authority"
                },
                {
                    "name": "LocalAuthorityCode",
                    "title": "Local Authority Code",
                    "type": "`$STRING`",
                    "short": "Code for the local authority"
                },
                {
                    "name": "LocalAuthorityEmailAddress",
                    "title": "Local Authority Email Address",
                    "type": "`$STRING`",
                    "short": "Email address of the local authority",
                    "format": "email"
                },
                {
                    "name": "LocalAuthorityName",
                    "title": "Local Authority Name",
                    "type": "`$STRING`",
                    "short": "Name of the local authority"
                },
                {
                    "name": "LocalAuthorityWebSite",
                    "title": "Local Authority Web Site",
                    "type": "`$STRING`",
                    "short": "Website of the local authority",
                    "format": "uri"
                },
                {
                    "name": "NewRatingPending",
                    "title": "New Rating Pending",
                    "type": "`$BOOLEAN`",
                    "short": "Indicates if a new rating is pending"
                },
                {
                    "name": "PostCode",
                    "title": "Post Code",
                    "type": "`$STRING`",
                    "short": "Postcode of the establishment"
                },
                {
                    "name": "RatingDate",
                    "title": "Rating Date",
                    "type": "`$STRING`",
                    "short": "Date the rating was issued",
                    "format": "date"
                },
                {
                    "name": "RatingKey",
                    "title": "Rating Key",
                    "type": "`$STRING`",
                    "short": "Key for the rating value"
                },
                {
                    "name": "RatingValue",
                    "title": "Rating Value",
                    "type": "`$STRING`",
                    "short": "The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)"
                },
                {
                    "name": "SchemeType",
                    "title": "Scheme Type",
                    "type": "`$STRING`",
                    "short": "Type of scheme (FHRS or FHIS)"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "latitude",
                    "title": "Latitude",
                    "type": "`$NUMBER`",
                    "short": "Latitude coordinate of the establishment",
                    "format": "double"
                },
                {
                    "name": "longitude",
                    "title": "Longitude",
                    "type": "`$NUMBER`",
                    "short": "Longitude coordinate of the establishment",
                    "format": "double"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "establishment",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/Establishments",
                            "segments": [
                                {
                                    "lit": "Establishments"
                                }
                            ],
                            "parts": [
                                "Establishments"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "address",
                                        "orig": "address",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "business_type_id",
                                        "orig": "business_type_id",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "latitude",
                                        "orig": "latitude",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "local_authority_id",
                                        "orig": "local_authority_id",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "longitude",
                                        "orig": "longitude",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "max_distance_limit",
                                        "orig": "max_distance_limit",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page_number",
                                        "orig": "page_number",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "page_size",
                                        "orig": "page_size",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "rating_key",
                                        "orig": "rating_key",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_option_key",
                                        "orig": "sort_option_key",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "address",
                                    "business_type_id",
                                    "latitude",
                                    "local_authority_id",
                                    "longitude",
                                    "max_distance_limit",
                                    "name",
                                    "page_number",
                                    "page_size",
                                    "rating_key",
                                    "sort_option_key"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/Establishments/{id}",
                            "segments": [
                                {
                                    "lit": "Establishments"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "Establishments",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.Geocode`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "rating": {
            "fields": [
                {
                    "name": "ratingId",
                    "title": "Rating Id",
                    "type": "`$INTEGER`",
                    "short": "Unique identifier for the rating"
                },
                {
                    "name": "ratingKey",
                    "title": "Rating Key",
                    "type": "`$STRING`",
                    "short": "Key for the rating value"
                },
                {
                    "name": "ratingName",
                    "title": "Rating Name",
                    "type": "`$STRING`",
                    "short": "Name of the rating (e.g., '5', '4', 'Pass', 'Exempt')"
                },
                {
                    "name": "schemeType",
                    "title": "Scheme Type",
                    "type": "`$STRING`",
                    "short": "Scheme type this rating belongs to"
                }
            ],
            "name": "rating",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/Ratings",
                            "segments": [
                                {
                                    "lit": "Ratings"
                                }
                            ],
                            "parts": [
                                "Ratings"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.ratings`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map