# ProjectName SDK exists test

import pytest
from hackernews_sdk import HackernewsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = HackernewsSDK.test(None, None)
        assert testsdk is not None
