# FoodHygieneRating SDK utility: make_context
require_relative '../core/context'
module FoodHygieneRatingUtilities
  MakeContext = ->(ctxmap, basectx) {
    FoodHygieneRatingContext.new(ctxmap, basectx)
  }
end
