# Hackernews SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module HackernewsFeatures
  def self.make_feature(name)
    case name
    when "base"
      HackernewsBaseFeature.new
    when "test"
      HackernewsTestFeature.new
    else
      HackernewsBaseFeature.new
    end
  end
end
