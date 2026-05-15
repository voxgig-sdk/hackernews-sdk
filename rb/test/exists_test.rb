# Hackernews SDK exists test

require "minitest/autorun"
require_relative "../Hackernews_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = HackernewsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
