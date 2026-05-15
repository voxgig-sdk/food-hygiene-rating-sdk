<?php
declare(strict_types=1);

// FoodHygieneRating SDK utility registration

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

FoodHygieneRatingUtility::setRegistrar(function (FoodHygieneRatingUtility $u): void {
    $u->clean = [FoodHygieneRatingClean::class, 'call'];
    $u->done = [FoodHygieneRatingDone::class, 'call'];
    $u->make_error = [FoodHygieneRatingMakeError::class, 'call'];
    $u->feature_add = [FoodHygieneRatingFeatureAdd::class, 'call'];
    $u->feature_hook = [FoodHygieneRatingFeatureHook::class, 'call'];
    $u->feature_init = [FoodHygieneRatingFeatureInit::class, 'call'];
    $u->fetcher = [FoodHygieneRatingFetcher::class, 'call'];
    $u->make_fetch_def = [FoodHygieneRatingMakeFetchDef::class, 'call'];
    $u->make_context = [FoodHygieneRatingMakeContext::class, 'call'];
    $u->make_options = [FoodHygieneRatingMakeOptions::class, 'call'];
    $u->make_request = [FoodHygieneRatingMakeRequest::class, 'call'];
    $u->make_response = [FoodHygieneRatingMakeResponse::class, 'call'];
    $u->make_result = [FoodHygieneRatingMakeResult::class, 'call'];
    $u->make_point = [FoodHygieneRatingMakePoint::class, 'call'];
    $u->make_spec = [FoodHygieneRatingMakeSpec::class, 'call'];
    $u->make_url = [FoodHygieneRatingMakeUrl::class, 'call'];
    $u->param = [FoodHygieneRatingParam::class, 'call'];
    $u->prepare_auth = [FoodHygieneRatingPrepareAuth::class, 'call'];
    $u->prepare_body = [FoodHygieneRatingPrepareBody::class, 'call'];
    $u->prepare_headers = [FoodHygieneRatingPrepareHeaders::class, 'call'];
    $u->prepare_method = [FoodHygieneRatingPrepareMethod::class, 'call'];
    $u->prepare_params = [FoodHygieneRatingPrepareParams::class, 'call'];
    $u->prepare_path = [FoodHygieneRatingPreparePath::class, 'call'];
    $u->prepare_query = [FoodHygieneRatingPrepareQuery::class, 'call'];
    $u->result_basic = [FoodHygieneRatingResultBasic::class, 'call'];
    $u->result_body = [FoodHygieneRatingResultBody::class, 'call'];
    $u->result_headers = [FoodHygieneRatingResultHeaders::class, 'call'];
    $u->transform_request = [FoodHygieneRatingTransformRequest::class, 'call'];
    $u->transform_response = [FoodHygieneRatingTransformResponse::class, 'call'];
});
