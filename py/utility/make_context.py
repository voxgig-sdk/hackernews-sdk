# Hackernews SDK utility: make_context

from core.context import HackernewsContext


def make_context_util(ctxmap, basectx):
    return HackernewsContext(ctxmap, basectx)
