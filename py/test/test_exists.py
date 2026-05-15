# ProjectName SDK exists test

import pytest
from foodhygienerating_sdk import FoodHygieneRatingSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FoodHygieneRatingSDK.test(None, None)
        assert testsdk is not None
