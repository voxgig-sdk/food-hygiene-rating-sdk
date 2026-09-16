# FoodHygieneRating SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FoodHygieneRatingFeatures
  def self.make_feature(name)
    case name
    when "base"
      FoodHygieneRatingBaseFeature.new
    when "ratelimit"
      FoodHygieneRatingRatelimitFeature.new
    when "retry"
      FoodHygieneRatingRetryFeature.new
    when "test"
      FoodHygieneRatingTestFeature.new
    when "timeout"
      FoodHygieneRatingTimeoutFeature.new
    else
      FoodHygieneRatingBaseFeature.new
    end
  end
end
