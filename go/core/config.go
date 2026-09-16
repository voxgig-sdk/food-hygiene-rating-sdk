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
						"format": "email",
						"name": "Email",
						"short": "Email address of the local authority",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "EstablishmentCount",
						"short": "Number of establishments registered with this authority",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "FileName",
						"short": "XML filename for the authority's data",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "FileNameWelsh",
						"short": "Welsh language XML filename (for Welsh authorities)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "FriendlyName",
						"short": "Friendly display name of the local authority",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "LocalAuthorityId",
						"short": "Unique identifier for the local authority",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "LocalAuthorityIdCode",
						"short": "Code for the local authority",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Name",
						"short": "Name of the local authority",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RegionName",
						"short": "Region where the authority is located",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "SchemeUrl",
						"short": "URL to the local authority's food hygiene scheme page",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "Url",
						"short": "Website URL of the local authority",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Authorities",
								"segments": []any{
									map[string]any{
										"lit": "Authorities",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.authorities`",
								},
								"parts": []any{
									"Authorities",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"Authorities",
									"{id}",
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
						"short": "Unique identifier for the business type",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "BusinessTypeName",
						"short": "Name of the business type (e.g., Restaurant/Cafe/Canteen, Pub/bar/nightclub, Takeaway/sandwich shop)",
						"type": "`$STRING`",
					},
				},
				"name": "business_type",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/BusinessTypes",
								"segments": []any{
									map[string]any{
										"lit": "BusinessTypes",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.businessTypes`",
								},
								"parts": []any{
									"BusinessTypes",
								},
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
						"short": "First line of the address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "AddressLine2",
						"short": "Second line of the address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "AddressLine3",
						"short": "Third line of the address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "AddressLine4",
						"short": "Fourth line of the address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "BusinessName",
						"short": "Name of the food establishment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "BusinessType",
						"short": "Type of food business (e.g., Restaurant, Pub, Café, Takeaway)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "BusinessTypeID",
						"short": "Unique identifier for the business type",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "FHRSID",
						"short": "Unique identifier for the establishment in the FHRS system",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Geocode",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "LocalAuthorityBusinessID",
						"short": "Business ID assigned by the local authority",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "LocalAuthorityCode",
						"short": "Code for the local authority",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "email",
						"name": "LocalAuthorityEmailAddress",
						"short": "Email address of the local authority",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "LocalAuthorityName",
						"short": "Name of the local authority",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "LocalAuthorityWebSite",
						"short": "Website of the local authority",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "NewRatingPending",
						"short": "Indicates if a new rating is pending",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "PostCode",
						"short": "Postcode of the establishment",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "RatingDate",
						"short": "Date the rating was issued",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RatingKey",
						"short": "Key for the rating value",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RatingValue",
						"short": "The food hygiene rating (0-5 for FHRS, Pass/Improvement Required/Exempt for FHIS)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "SchemeType",
						"short": "Type of scheme (FHRS or FHIS)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "double",
						"name": "latitude",
						"short": "Latitude coordinate of the establishment",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "double",
						"name": "longitude",
						"short": "Longitude coordinate of the establishment",
						"type": "`$NUMBER`",
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
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "address",
											"orig": "address",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "business_type_id",
											"orig": "business_type_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "latitude",
											"orig": "latitude",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "local_authority_id",
											"orig": "local_authority_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "longitude",
											"orig": "longitude",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_distance_limit",
											"orig": "max_distance_limit",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "rating_key",
											"orig": "rating_key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort_option_key",
											"orig": "sort_option_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/Establishments",
								"segments": []any{
									map[string]any{
										"lit": "Establishments",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"Establishments",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.Geocode`",
								},
								"parts": []any{
									"Establishments",
									"{id}",
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
						"short": "Unique identifier for the rating",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "ratingKey",
						"short": "Key for the rating value",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ratingName",
						"short": "Name of the rating (e.g., '5', '4', 'Pass', 'Exempt')",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "schemeType",
						"short": "Scheme type this rating belongs to",
						"type": "`$STRING`",
					},
				},
				"name": "rating",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Ratings",
								"segments": []any{
									map[string]any{
										"lit": "Ratings",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.ratings`",
								},
								"parts": []any{
									"Ratings",
								},
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
