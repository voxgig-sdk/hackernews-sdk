# Hackernews SDK utility: prepare_body
require_relative 'media'
module HackernewsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return HackernewsUtilities.raw_body(ctx.reqdata) if HackernewsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
