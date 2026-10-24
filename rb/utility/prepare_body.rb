# FoodHygieneRating SDK utility: prepare_body
require_relative 'media'
module FoodHygieneRatingUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return FoodHygieneRatingUtilities.raw_body(ctx.reqdata) if FoodHygieneRatingUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
