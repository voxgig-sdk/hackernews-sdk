# Hackernews SDK feature factory

from feature.base_feature import HackernewsBaseFeature
from feature.test_feature import HackernewsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: HackernewsBaseFeature(),
        "test": lambda: HackernewsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
