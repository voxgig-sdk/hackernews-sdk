# Hackernews SDK utility: make_context
require_relative '../core/context'
module HackernewsUtilities
  MakeContext = ->(ctxmap, basectx) {
    HackernewsContext.new(ctxmap, basectx)
  }
end
