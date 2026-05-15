# FoodHygieneRating SDK utility: make_context

from core.context import FoodHygieneRatingContext


def make_context_util(ctxmap, basectx):
    return FoodHygieneRatingContext(ctxmap, basectx)
