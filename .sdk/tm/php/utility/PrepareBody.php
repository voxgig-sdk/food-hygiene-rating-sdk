<?php
declare(strict_types=1);

// FoodHygieneRating SDK utility: prepare_body

class FoodHygieneRatingPrepareBody
{
    public static function call(FoodHygieneRatingContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
