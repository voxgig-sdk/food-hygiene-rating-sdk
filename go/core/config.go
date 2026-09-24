package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "FoodHygieneRating",
			"slug": "food-hygiene-rating",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.ratings.food.gov.uk",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"authority": map[string]any{},
				"business_type": map[string]any{},
				"establishment": map[string]any{},
				"rating": map[string]any{},
			},
		},
		"entity": map[string]any{
			"authority": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "Email",
						"title": "Email",
						"type": "`$STRING`",
						"short": "Email address of the local authority",
						"format": "email",
					},
					map[string]any{
						"name": "EstablishmentCount",
						"title": "Establishment Count",
						"type": "`$INTEGER`",
						"short": "Number of establishments registered with this authority",
					},
					map[string]any{
						"name": "FileName",
						"title": "File Name",
						"type": "`$STRING`",
						"short": "XML filename for the authority's data",
					},
					map[string]any{
						"name": "FileNameWelsh",
						"title": "File Name Welsh",
						"type": "`$STRING`",
						"short": "Welsh language XML filename (for Welsh authorities)",
					},
					map[string]any{
						"name": "FriendlyName",
						"title": "Friendly Name",
						"type": "`$STRING`",
						"short": "Friendly display name of the local authority",
					},
					map[string]any{
						"name": "LocalAuthorityId",
						"title": "Local Authority Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the local authority",
					},
					map[string]any{
						"name": "LocalAuthorityIdCode",
						"title": "Local Authority Id Code",
						"type": "`$STRING`",
						"short": "Code for the local authority",
					},
					map[string]any{
						"name": "Name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the local authority",
					},
					map[string]any{
						"name": "RegionName",
						"title": "Region Name",
						"type": "`$STRING`",
						"short": "Region where the authority is located",
					},
					map[string]any{
						"name": "SchemeUrl",
						"title": "Scheme Url",
						"type": "`$STRING`",
						"short": "URL to the local authority's food hygiene scheme page",
						"format": "uri",
					},
					map[string]any{
						"name": "Url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "Website URL of the local authority",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "authority",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Authorities",
								"segments": []any{
									map[string]any{
										"lit": "Authorities",
									},
								},
								"parts": []any{
									"Authorities",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.authorities`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Authorities/{id}",
								"segments": []any{
									map[string]any{
										"lit": "Authorities",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"Authorities",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"business_type": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "BusinessTypeId",
						"title": "Business Type Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the business type",
					},
					map[string]any{
						"name": "BusinessTypeName",
						"title": "Business Type Name",
						"type": "`$STRING`",
						"short": "Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop)",
					},
				},
				"name": "business_type",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/BusinessTypes",
								"segments": []any{
									map[string]any{
										"lit": "BusinessTypes",
									},
								},
								"parts": []any{
									"BusinessTypes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.businessTypes`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"establishment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "AddressLine1",
						"title": "Address Line1",
						"type": "`$STRING`",
						"short": "First line of the address",
					},
					map[string]any{
						"name": "AddressLine2",
						"title": "Address Line2",
						"type": "`$STRING`",
						"short": "Second line of the address",
					},
					map[string]any{
						"name": "AddressLine3",
						"title": "Address Line3",
						"type": "`$STRING`",
						"short": "Third line of the address",
					},
					map[string]any{
						"name": "AddressLine4",
						"title": "Address Line4",
						"type": "`$STRING`",
						"short": "Fourth line of the address",
					},
					map[string]any{
						"name": "BusinessName",
						"title": "Business Name",
						"type": "`$STRING`",
						"short": "Name of the food establishment",
					},
					map[string]any{
						"name": "BusinessType",
						"title": "Business Type",
						"type": "`$STRING`",
						"short": "Type of food business (e.g., Restaurant, Pub, Café, Takeaway)",
					},
					map[string]any{
						"name": "BusinessTypeID",
						"title": "Business Type Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the business type",
					},
					map[string]any{
						"name": "FHRSID",
						"title": "Fhrsid",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the establishment in the FHRS system",
					},
					map[string]any{
						"name": "Geocode",
						"title": "Geocode",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "LocalAuthorityBusinessID",
						"title": "Local Authority Business Id",
						"type": "`$STRING`",
						"short": "Business ID assigned by the local authority",
					},
					map[string]any{
						"name": "LocalAuthorityCode",
						"title": "Local Authority Code",
						"type": "`$STRING`",
						"short": "Code for the local authority",
					},
					map[string]any{
						"name": "LocalAuthorityEmailAddress",
						"title": "Local Authority Email Address",
						"type": "`$STRING`",
						"short": "Email address of the local authority",
						"format": "email",
					},
					map[string]any{
						"name": "LocalAuthorityName",
						"title": "Local Authority Name",
						"type": "`$STRING`",
						"short": "Name of the local authority",
					},
					map[string]any{
						"name": "LocalAuthorityWebSite",
						"title": "Local Authority Web Site",
						"type": "`$STRING`",
						"short": "Website of the local authority",
						"format": "uri",
					},
					map[string]any{
						"name": "NewRatingPending",
						"title": "New Rating Pending",
						"type": "`$BOOLEAN`",
						"short": "Indicates if a new rating is pending",
					},
					map[string]any{
						"name": "PostCode",
						"title": "Post Code",
						"type": "`$STRING`",
						"short": "Postcode of the establishment",
					},
					map[string]any{
						"name": "RatingDate",
						"title": "Rating Date",
						"type": "`$STRING`",
						"short": "Date the rating was issued",
						"format": "date",
					},
					map[string]any{
						"name": "RatingKey",
						"title": "Rating Key",
						"type": "`$STRING`",
						"short": "Key for the rating value",
					},
					map[string]any{
						"name": "RatingValue",
						"title": "Rating Value",
						"type": "`$STRING`",
						"short": "The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)",
					},
					map[string]any{
						"name": "SchemeType",
						"title": "Scheme Type",
						"type": "`$STRING`",
						"short": "Type of scheme (FHRS or FHIS)",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"short": "Latitude coordinate of the establishment",
						"format": "double",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"short": "Longitude coordinate of the establishment",
						"format": "double",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "establishment",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Establishments",
								"segments": []any{
									map[string]any{
										"lit": "Establishments",
									},
								},
								"parts": []any{
									"Establishments",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "address",
											"orig": "address",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "business_type_id",
											"orig": "business_type_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "latitude",
											"orig": "latitude",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "local_authority_id",
											"orig": "local_authority_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "longitude",
											"orig": "longitude",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_distance_limit",
											"orig": "max_distance_limit",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "rating_key",
											"orig": "rating_key",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_option_key",
											"orig": "sort_option_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Establishments/{id}",
								"segments": []any{
									map[string]any{
										"lit": "Establishments",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"Establishments",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.Geocode`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"rating": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ratingId",
						"title": "Rating Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the rating",
					},
					map[string]any{
						"name": "ratingKey",
						"title": "Rating Key",
						"type": "`$STRING`",
						"short": "Key for the rating value",
					},
					map[string]any{
						"name": "ratingName",
						"title": "Rating Name",
						"type": "`$STRING`",
						"short": "Name of the rating (e.g., '5', '4', 'Pass', 'Exempt')",
					},
					map[string]any{
						"name": "schemeType",
						"title": "Scheme Type",
						"type": "`$STRING`",
						"short": "Scheme type this rating belongs to",
					},
				},
				"name": "rating",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Ratings",
								"segments": []any{
									map[string]any{
										"lit": "Ratings",
									},
								},
								"parts": []any{
									"Ratings",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.ratings`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
