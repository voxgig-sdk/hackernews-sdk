<?php
declare(strict_types=1);

// Hackernews SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

HackernewsUtility::setRegistrar(function (HackernewsUtility $u): void {
    $u->clean = [HackernewsClean::class, 'call'];
    $u->done = [HackernewsDone::class, 'call'];
    $u->make_error = [HackernewsMakeError::class, 'call'];
    $u->feature_add = [HackernewsFeatureAdd::class, 'call'];
    $u->feature_hook = [HackernewsFeatureHook::class, 'call'];
    $u->feature_init = [HackernewsFeatureInit::class, 'call'];
    $u->fetcher = [HackernewsFetcher::class, 'call'];
    $u->make_fetch_def = [HackernewsMakeFetchDef::class, 'call'];
    $u->make_context = [HackernewsMakeContext::class, 'call'];
    $u->make_options = [HackernewsMakeOptions::class, 'call'];
    $u->make_request = [HackernewsMakeRequest::class, 'call'];
    $u->make_response = [HackernewsMakeResponse::class, 'call'];
    $u->make_result = [HackernewsMakeResult::class, 'call'];
    $u->make_point = [HackernewsMakePoint::class, 'call'];
    $u->make_spec = [HackernewsMakeSpec::class, 'call'];
    $u->make_url = [HackernewsMakeUrl::class, 'call'];
    $u->param = [HackernewsParam::class, 'call'];
    $u->prepare_auth = [HackernewsPrepareAuth::class, 'call'];
    $u->prepare_body = [HackernewsPrepareBody::class, 'call'];
    $u->prepare_headers = [HackernewsPrepareHeaders::class, 'call'];
    $u->prepare_method = [HackernewsPrepareMethod::class, 'call'];
    $u->prepare_params = [HackernewsPrepareParams::class, 'call'];
    $u->prepare_path = [HackernewsPreparePath::class, 'call'];
    $u->prepare_query = [HackernewsPrepareQuery::class, 'call'];
    $u->result_basic = [HackernewsResultBasic::class, 'call'];
    $u->result_body = [HackernewsResultBody::class, 'call'];
    $u->result_headers = [HackernewsResultHeaders::class, 'call'];
    $u->transform_request = [HackernewsTransformRequest::class, 'call'];
    $u->transform_response = [HackernewsTransformResponse::class, 'call'];
});
