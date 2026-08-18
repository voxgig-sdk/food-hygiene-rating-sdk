
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'FoodHygieneRating',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.ratings.food.gov.uk",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      authority: {
      },

      business_type: {
      },

      establishment: {
      },

      rating: {
      },

    }
  }


  entity = {
    "authority": {
      "fields": [
        {
          "name": "Email",
          "type": "`$STRING`"
        },
        {
          "name": "EstablishmentCount",
          "type": "`$INTEGER`"
        },
        {
          "name": "FileName",
          "type": "`$STRING`"
        },
        {
          "name": "FileNameWelsh",
          "type": "`$STRING`"
        },
        {
          "name": "FriendlyName",
          "type": "`$STRING`"
        },
        {
          "name": "LocalAuthorityId",
          "type": "`$INTEGER`"
        },
        {
          "name": "LocalAuthorityIdCode",
          "type": "`$STRING`"
        },
        {
          "name": "Name",
          "type": "`$STRING`"
        },
        {
          "name": "RegionName",
          "type": "`$STRING`"
        },
        {
          "name": "SchemeUrl",
          "type": "`$STRING`"
        },
        {
          "name": "Url",
          "type": "`$STRING`"
        }
      ],
      "name": "authority",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/Authorities",
              "parts": [
                "Authorities"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.authorities`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/Authorities/{id}",
              "parts": [
                "Authorities",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
          "type": "`$INTEGER`"
        },
        {
          "name": "BusinessTypeName",
          "type": "`$STRING`"
        }
      ],
      "name": "business_type",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/BusinessTypes",
              "parts": [
                "BusinessTypes"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.businessTypes`"
              }
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
          "type": "`$STRING`"
        },
        {
          "name": "AddressLine2",
          "type": "`$STRING`"
        },
        {
          "name": "AddressLine3",
          "type": "`$STRING`"
        },
        {
          "name": "AddressLine4",
          "type": "`$STRING`"
        },
        {
          "name": "BusinessName",
          "type": "`$STRING`"
        },
        {
          "name": "BusinessType",
          "type": "`$STRING`"
        },
        {
          "name": "BusinessTypeID",
          "type": "`$INTEGER`"
        },
        {
          "name": "FHRSID",
          "type": "`$INTEGER`"
        },
        {
          "name": "Geocode",
          "type": "`$OBJECT`"
        },
        {
          "name": "LocalAuthorityBusinessID",
          "type": "`$STRING`"
        },
        {
          "name": "LocalAuthorityCode",
          "type": "`$STRING`"
        },
        {
          "name": "LocalAuthorityEmailAddress",
          "type": "`$STRING`"
        },
        {
          "name": "LocalAuthorityName",
          "type": "`$STRING`"
        },
        {
          "name": "LocalAuthorityWebSite",
          "type": "`$STRING`"
        },
        {
          "name": "NewRatingPending",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "PostCode",
          "type": "`$STRING`"
        },
        {
          "name": "RatingDate",
          "type": "`$STRING`"
        },
        {
          "name": "RatingKey",
          "type": "`$STRING`"
        },
        {
          "name": "RatingValue",
          "type": "`$STRING`"
        },
        {
          "name": "SchemeType",
          "type": "`$STRING`"
        },
        {
          "name": "latitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "longitude",
          "type": "`$NUMBER`"
        }
      ],
      "name": "establishment",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "address",
                    "orig": "address",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "business_type_id",
                    "orig": "business_type_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "latitude",
                    "orig": "latitude",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "local_authority_id",
                    "orig": "local_authority_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "longitude",
                    "orig": "longitude",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "max_distance_limit",
                    "orig": "max_distance_limit",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page_number",
                    "orig": "page_number",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "page_size",
                    "orig": "page_size",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "rating_key",
                    "orig": "rating_key",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort_option_key",
                    "orig": "sort_option_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/Establishments",
              "parts": [
                "Establishments"
              ],
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
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/Establishments/{id}",
              "parts": [
                "Establishments",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Geocode`"
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
          "type": "`$INTEGER`"
        },
        {
          "name": "ratingKey",
          "type": "`$STRING`"
        },
        {
          "name": "ratingName",
          "type": "`$STRING`"
        },
        {
          "name": "schemeType",
          "type": "`$STRING`"
        }
      ],
      "name": "rating",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/Ratings",
              "parts": [
                "Ratings"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.ratings`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

