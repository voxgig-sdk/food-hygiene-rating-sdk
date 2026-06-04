# FoodHygieneRating SDK configuration

module FoodHygieneRatingConfig
  def self.make_config
    {
      "main" => {
        "name" => "FoodHygieneRating",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.ratings.food.gov.uk",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "authority" => {},
          "business_type" => {},
          "establishment" => {},
          "rating" => {},
        },
      },
      "entity" => {
        "authority" => {
          "fields" => [
            {
              "name" => "email",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "establishment_count",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "file_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "file_name_welsh",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "friendly_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "local_authority_id",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "local_authority_id_code",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "region_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "scheme_url",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "url",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 10,
            },
          ],
          "name" => "authority",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/Authorities",
                  "parts" => [
                    "Authorities",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/Authorities/{id}",
                  "parts" => [
                    "Authorities",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "business_type" => {
          "fields" => [
            {
              "name" => "business_type_id",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "business_type_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
          ],
          "name" => "business_type",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/BusinessTypes",
                  "parts" => [
                    "BusinessTypes",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "establishment" => {
          "fields" => [
            {
              "name" => "address_line1",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "address_line2",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "address_line3",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "address_line4",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "business_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "business_type",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "business_type_id",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "fhrsid",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "geocode",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "local_authority_business_id",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "local_authority_code",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 10,
            },
            {
              "name" => "local_authority_email_address",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 11,
            },
            {
              "name" => "local_authority_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 12,
            },
            {
              "name" => "local_authority_web_site",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 13,
            },
            {
              "name" => "new_rating_pending",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "active" => true,
              "index$" => 14,
            },
            {
              "name" => "post_code",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 15,
            },
            {
              "name" => "rating_date",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 16,
            },
            {
              "name" => "rating_key",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 17,
            },
            {
              "name" => "rating_value",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 18,
            },
            {
              "name" => "scheme_type",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 19,
            },
          ],
          "name" => "establishment",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "address",
                        "orig" => "address",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "business_type_id",
                        "orig" => "business_type_id",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "latitude",
                        "orig" => "latitude",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "local_authority_id",
                        "orig" => "local_authority_id",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "longitude",
                        "orig" => "longitude",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "max_distance_limit",
                        "orig" => "max_distance_limit",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "name",
                        "orig" => "name",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page_number",
                        "orig" => "page_number",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "page_size",
                        "orig" => "page_size",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "rating_key",
                        "orig" => "rating_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "sort_option_key",
                        "orig" => "sort_option_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/Establishments",
                  "parts" => [
                    "Establishments",
                  ],
                  "select" => {
                    "exist" => [
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/Establishments/{id}",
                  "parts" => [
                    "Establishments",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "rating" => {
          "fields" => [
            {
              "name" => "rating_id",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "rating_key",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "rating_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "scheme_type",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
          ],
          "name" => "rating",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/Ratings",
                  "parts" => [
                    "Ratings",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    FoodHygieneRatingFeatures.make_feature(name)
  end
end
