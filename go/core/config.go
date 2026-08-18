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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "EstablishmentCount",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "FileName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "FileNameWelsh",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "FriendlyName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "LocalAuthorityId",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "LocalAuthorityIdCode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RegionName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "SchemeUrl",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Url",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"Authorities",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.authorities`",
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
								"parts": []any{
									"Authorities",
									"{id}",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "BusinessTypeName",
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
								"parts": []any{
									"BusinessTypes",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.businessTypes`",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "AddressLine2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "AddressLine3",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "AddressLine4",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "BusinessName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "BusinessType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "BusinessTypeID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "FHRSID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Geocode",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "LocalAuthorityBusinessID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "LocalAuthorityCode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "LocalAuthorityEmailAddress",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "LocalAuthorityName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "LocalAuthorityWebSite",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "NewRatingPending",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "PostCode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RatingDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RatingKey",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RatingValue",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "SchemeType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"type": "`$NUMBER`",
					},
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
								"parts": []any{
									"Establishments",
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
								"parts": []any{
									"Establishments",
									"{id}",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "ratingKey",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ratingName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "schemeType",
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
								"parts": []any{
									"Ratings",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.ratings`",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
