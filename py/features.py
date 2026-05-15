# FoodHygieneRating SDK feature factory

from feature.base_feature import FoodHygieneRatingBaseFeature
from feature.test_feature import FoodHygieneRatingTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FoodHygieneRatingBaseFeature(),
        "test": lambda: FoodHygieneRatingTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
