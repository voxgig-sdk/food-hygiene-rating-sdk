<?php
declare(strict_types=1);

// FoodHygieneRating SDK exists test

require_once __DIR__ . '/../foodhygienerating_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FoodHygieneRatingSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
