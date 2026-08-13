# FoodHygieneRating SDK utility: make_context

from foodhygienerating_sdk.core.context import FoodHygieneRatingContext


def make_context_util(ctxmap, basectx):
    return FoodHygieneRatingContext(ctxmap, basectx)
