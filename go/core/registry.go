package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAuthorityEntityFunc func(client *FoodHygieneRatingSDK, entopts map[string]any) FoodHygieneRatingEntity

var NewBusinessTypeEntityFunc func(client *FoodHygieneRatingSDK, entopts map[string]any) FoodHygieneRatingEntity

var NewEstablishmentEntityFunc func(client *FoodHygieneRatingSDK, entopts map[string]any) FoodHygieneRatingEntity

var NewRatingEntityFunc func(client *FoodHygieneRatingSDK, entopts map[string]any) FoodHygieneRatingEntity

