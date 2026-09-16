# Hackernews SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module HackernewsFeatures
  def self.make_feature(name)
    case name
    when "base"
      HackernewsBaseFeature.new
    when "ratelimit"
      HackernewsRatelimitFeature.new
    when "retry"
      HackernewsRetryFeature.new
    when "test"
      HackernewsTestFeature.new
    when "timeout"
      HackernewsTimeoutFeature.new
    else
      HackernewsBaseFeature.new
    end
  end
end
