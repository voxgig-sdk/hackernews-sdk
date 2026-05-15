# Hackernews SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

HackernewsUtility.registrar = ->(u) {
  u.clean = HackernewsUtilities::Clean
  u.done = HackernewsUtilities::Done
  u.make_error = HackernewsUtilities::MakeError
  u.feature_add = HackernewsUtilities::FeatureAdd
  u.feature_hook = HackernewsUtilities::FeatureHook
  u.feature_init = HackernewsUtilities::FeatureInit
  u.fetcher = HackernewsUtilities::Fetcher
  u.make_fetch_def = HackernewsUtilities::MakeFetchDef
  u.make_context = HackernewsUtilities::MakeContext
  u.make_options = HackernewsUtilities::MakeOptions
  u.make_request = HackernewsUtilities::MakeRequest
  u.make_response = HackernewsUtilities::MakeResponse
  u.make_result = HackernewsUtilities::MakeResult
  u.make_point = HackernewsUtilities::MakePoint
  u.make_spec = HackernewsUtilities::MakeSpec
  u.make_url = HackernewsUtilities::MakeUrl
  u.param = HackernewsUtilities::Param
  u.prepare_auth = HackernewsUtilities::PrepareAuth
  u.prepare_body = HackernewsUtilities::PrepareBody
  u.prepare_headers = HackernewsUtilities::PrepareHeaders
  u.prepare_method = HackernewsUtilities::PrepareMethod
  u.prepare_params = HackernewsUtilities::PrepareParams
  u.prepare_path = HackernewsUtilities::PreparePath
  u.prepare_query = HackernewsUtilities::PrepareQuery
  u.result_basic = HackernewsUtilities::ResultBasic
  u.result_body = HackernewsUtilities::ResultBody
  u.result_headers = HackernewsUtilities::ResultHeaders
  u.transform_request = HackernewsUtilities::TransformRequest
  u.transform_response = HackernewsUtilities::TransformResponse
}
