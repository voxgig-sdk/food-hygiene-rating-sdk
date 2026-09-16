# FoodHygieneRating SDK feature factory

from foodhygienerating_sdk.feature.base_feature import FoodHygieneRatingBaseFeature
from foodhygienerating_sdk.feature.ratelimit_feature import FoodHygieneRatingRatelimitFeature
from foodhygienerating_sdk.feature.retry_feature import FoodHygieneRatingRetryFeature
from foodhygienerating_sdk.feature.test_feature import FoodHygieneRatingTestFeature
from foodhygienerating_sdk.feature.timeout_feature import FoodHygieneRatingTimeoutFeature


_FEATURES = {
    "base": lambda: FoodHygieneRatingBaseFeature(),
    "ratelimit": lambda: FoodHygieneRatingRatelimitFeature(),
    "retry": lambda: FoodHygieneRatingRetryFeature(),
    "test": lambda: FoodHygieneRatingTestFeature(),
    "timeout": lambda: FoodHygieneRatingTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
