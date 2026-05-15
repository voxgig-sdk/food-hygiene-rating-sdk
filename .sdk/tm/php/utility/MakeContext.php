<?php
declare(strict_types=1);

// FoodHygieneRating SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FoodHygieneRatingMakeContext
{
    public static function call(array $ctxmap, ?FoodHygieneRatingContext $basectx): FoodHygieneRatingContext
    {
        return new FoodHygieneRatingContext($ctxmap, $basectx);
    }
}
