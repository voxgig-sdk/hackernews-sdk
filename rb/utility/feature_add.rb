# Hackernews SDK utility: feature_add
module HackernewsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
