<?php
declare(strict_types=1);

// FoodHygieneRating SDK utility: result_body

class FoodHygieneRatingResultBody
{
    public static function call(FoodHygieneRatingContext $ctx): ?FoodHygieneRatingResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
