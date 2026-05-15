# FoodHygieneRating SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FoodHygieneRatingFeatures
  def self.make_feature(name)
    case name
    when "base"
      FoodHygieneRatingBaseFeature.new
    when "test"
      FoodHygieneRatingTestFeature.new
    else
      FoodHygieneRatingBaseFeature.new
    end
  end
end
