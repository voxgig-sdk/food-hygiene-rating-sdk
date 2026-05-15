<?php
declare(strict_types=1);

// FoodHygieneRating SDK utility: result_headers

class FoodHygieneRatingResultHeaders
{
    public static function call(FoodHygieneRatingContext $ctx): ?FoodHygieneRatingResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
