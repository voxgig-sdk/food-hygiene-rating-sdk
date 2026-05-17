package voxgigfoodhygieneratingsdk

import (
	"github.com/voxgig-sdk/food-hygiene-rating-sdk/go/core"
	"github.com/voxgig-sdk/food-hygiene-rating-sdk/go/entity"
	"github.com/voxgig-sdk/food-hygiene-rating-sdk/go/feature"
	_ "github.com/voxgig-sdk/food-hygiene-rating-sdk/go/utility"
)

// Type aliases preserve external API.
type FoodHygieneRatingSDK = core.FoodHygieneRatingSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FoodHygieneRatingEntity = core.FoodHygieneRatingEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FoodHygieneRatingError = core.FoodHygieneRatingError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAuthorityEntityFunc = func(client *core.FoodHygieneRatingSDK, entopts map[string]any) core.FoodHygieneRatingEntity {
		return entity.NewAuthorityEntity(client, entopts)
	}
	core.NewBusinessTypeEntityFunc = func(client *core.FoodHygieneRatingSDK, entopts map[string]any) core.FoodHygieneRatingEntity {
		return entity.NewBusinessTypeEntity(client, entopts)
	}
	core.NewEstablishmentEntityFunc = func(client *core.FoodHygieneRatingSDK, entopts map[string]any) core.FoodHygieneRatingEntity {
		return entity.NewEstablishmentEntity(client, entopts)
	}
	core.NewRatingEntityFunc = func(client *core.FoodHygieneRatingSDK, entopts map[string]any) core.FoodHygieneRatingEntity {
		return entity.NewRatingEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFoodHygieneRatingSDK = core.NewFoodHygieneRatingSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
