<?php
declare(strict_types=1);

// FoodHygieneRating SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FoodHygieneRatingFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FoodHygieneRatingBaseFeature();
            case "test":
                return new FoodHygieneRatingTestFeature();
            default:
                return new FoodHygieneRatingBaseFeature();
        }
    }
}
