-- FoodHygieneRating SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "FoodHygieneRating",
      slug = "food-hygiene-rating",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.ratings.food.gov.uk",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["authority"] = {},
        ["business_type"] = {},
        ["establishment"] = {},
        ["rating"] = {},
      },
    },
    entity = {
      ["authority"] = {
        ["fields"] = {
          {
            ["name"] = "Email",
            ["short"] = "Email address of the local authority",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "EstablishmentCount",
            ["short"] = "Number of establishments registered with this authority",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "FileName",
            ["short"] = "XML filename for the authority's data",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "FileNameWelsh",
            ["short"] = "Welsh language XML filename (for Welsh authorities)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "FriendlyName",
            ["short"] = "Friendly display name of the local authority",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "LocalAuthorityId",
            ["short"] = "Unique identifier for the local authority",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "LocalAuthorityIdCode",
            ["short"] = "Code for the local authority",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Name",
            ["short"] = "Name of the local authority",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "RegionName",
            ["short"] = "Region where the authority is located",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "SchemeUrl",
            ["short"] = "URL to the local authority's food hygiene scheme page",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Url",
            ["short"] = "Website URL of the local authority",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "authority",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Authorities",
                ["parts"] = {
                  "Authorities",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.authorities`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Authorities/{id}",
                ["parts"] = {
                  "Authorities",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["business_type"] = {
        ["fields"] = {
          {
            ["name"] = "BusinessTypeId",
            ["short"] = "Unique identifier for the business type",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "BusinessTypeName",
            ["short"] = "Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop)",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "business_type",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/BusinessTypes",
                ["parts"] = {
                  "BusinessTypes",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.businessTypes`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["establishment"] = {
        ["fields"] = {
          {
            ["name"] = "AddressLine1",
            ["short"] = "First line of the address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "AddressLine2",
            ["short"] = "Second line of the address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "AddressLine3",
            ["short"] = "Third line of the address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "AddressLine4",
            ["short"] = "Fourth line of the address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "BusinessName",
            ["short"] = "Name of the food establishment",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "BusinessType",
            ["short"] = "Type of food business (e.g., Restaurant, Pub, Café, Takeaway)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "BusinessTypeID",
            ["short"] = "Unique identifier for the business type",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "FHRSID",
            ["short"] = "Unique identifier for the establishment in the FHRS system",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "Geocode",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "LocalAuthorityBusinessID",
            ["short"] = "Business ID assigned by the local authority",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "LocalAuthorityCode",
            ["short"] = "Code for the local authority",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "LocalAuthorityEmailAddress",
            ["short"] = "Email address of the local authority",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "LocalAuthorityName",
            ["short"] = "Name of the local authority",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "LocalAuthorityWebSite",
            ["short"] = "Website of the local authority",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "NewRatingPending",
            ["short"] = "Indicates if a new rating is pending",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "PostCode",
            ["short"] = "Postcode of the establishment",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "RatingDate",
            ["short"] = "Date the rating was issued",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "RatingKey",
            ["short"] = "Key for the rating value",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "RatingValue",
            ["short"] = "The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "SchemeType",
            ["short"] = "Type of scheme (FHRS or FHIS)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "latitude",
            ["short"] = "Latitude coordinate of the establishment",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "longitude",
            ["short"] = "Longitude coordinate of the establishment",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "establishment",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "address",
                      ["orig"] = "address",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "business_type_id",
                      ["orig"] = "business_type_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "latitude",
                      ["orig"] = "latitude",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "local_authority_id",
                      ["orig"] = "local_authority_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "longitude",
                      ["orig"] = "longitude",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "max_distance_limit",
                      ["orig"] = "max_distance_limit",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 10,
                      ["kind"] = "query",
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "rating_key",
                      ["orig"] = "rating_key",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "sort_option_key",
                      ["orig"] = "sort_option_key",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Establishments",
                ["parts"] = {
                  "Establishments",
                },
                ["select"] = {
                  ["exist"] = {
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
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Establishments/{id}",
                ["parts"] = {
                  "Establishments",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.Geocode`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["rating"] = {
        ["fields"] = {
          {
            ["name"] = "ratingId",
            ["short"] = "Unique identifier for the rating",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "ratingKey",
            ["short"] = "Key for the rating value",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ratingName",
            ["short"] = "Name of the rating (e.g., '5', '4', 'Pass', 'Exempt')",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "schemeType",
            ["short"] = "Scheme type this rating belongs to",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "rating",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Ratings",
                ["parts"] = {
                  "Ratings",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.ratings`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
