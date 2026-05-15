# FoodHygieneRating SDK utility: feature_add
module FoodHygieneRatingUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
