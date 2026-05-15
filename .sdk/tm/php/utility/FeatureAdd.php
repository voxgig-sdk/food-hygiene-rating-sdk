<?php
declare(strict_types=1);

// FoodHygieneRating SDK utility: feature_add

class FoodHygieneRatingFeatureAdd
{
    public static function call(FoodHygieneRatingContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
