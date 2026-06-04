# FoodHygieneRating SDK configuration


def make_config():
    return {
        "main": {
            "name": "FoodHygieneRating",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.ratings.food.gov.uk",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "authority": {},
                "business_type": {},
                "establishment": {},
                "rating": {},
            },
        },
        "entity": {
      "authority": {
        "fields": [
          {
            "name": "email",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "establishment_count",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "file_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "file_name_welsh",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "friendly_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "local_authority_id",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "local_authority_id_code",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "region_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "scheme_url",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "url",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 10,
          },
        ],
        "name": "authority",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/Authorities",
                "parts": [
                  "Authorities",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/Authorities/{id}",
                "parts": [
                  "Authorities",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "business_type": {
        "fields": [
          {
            "name": "business_type_id",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "business_type_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "business_type",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/BusinessTypes",
                "parts": [
                  "BusinessTypes",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "establishment": {
        "fields": [
          {
            "name": "address_line1",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "address_line2",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "address_line3",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "address_line4",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "business_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "business_type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "business_type_id",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "fhrsid",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "geocode",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "local_authority_business_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "local_authority_code",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "local_authority_email_address",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 11,
          },
          {
            "name": "local_authority_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 12,
          },
          {
            "name": "local_authority_web_site",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 13,
          },
          {
            "name": "new_rating_pending",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 14,
          },
          {
            "name": "post_code",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 15,
          },
          {
            "name": "rating_date",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 16,
          },
          {
            "name": "rating_key",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 17,
          },
          {
            "name": "rating_value",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 18,
          },
          {
            "name": "scheme_type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 19,
          },
        ],
        "name": "establishment",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "address",
                      "orig": "address",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "business_type_id",
                      "orig": "business_type_id",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "latitude",
                      "orig": "latitude",
                      "reqd": False,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "local_authority_id",
                      "orig": "local_authority_id",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "longitude",
                      "orig": "longitude",
                      "reqd": False,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "max_distance_limit",
                      "orig": "max_distance_limit",
                      "reqd": False,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page_number",
                      "orig": "page_number",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "page_size",
                      "orig": "page_size",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "rating_key",
                      "orig": "rating_key",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "sort_option_key",
                      "orig": "sort_option_key",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/Establishments",
                "parts": [
                  "Establishments",
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
                    "sort_option_key",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/Establishments/{id}",
                "parts": [
                  "Establishments",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "rating": {
        "fields": [
          {
            "name": "rating_id",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "rating_key",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "rating_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "scheme_type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "rating",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/Ratings",
                "parts": [
                  "Ratings",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
