<?php
declare(strict_types=1);

// FoodHygieneRating SDK base feature

class FoodHygieneRatingBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FoodHygieneRatingContext $ctx, array $options): void {}
    public function PostConstruct(FoodHygieneRatingContext $ctx): void {}
    public function PostConstructEntity(FoodHygieneRatingContext $ctx): void {}
    public function SetData(FoodHygieneRatingContext $ctx): void {}
    public function GetData(FoodHygieneRatingContext $ctx): void {}
    public function GetMatch(FoodHygieneRatingContext $ctx): void {}
    public function SetMatch(FoodHygieneRatingContext $ctx): void {}
    public function PrePoint(FoodHygieneRatingContext $ctx): void {}
    public function PreSpec(FoodHygieneRatingContext $ctx): void {}
    public function PreRequest(FoodHygieneRatingContext $ctx): void {}
    public function PreResponse(FoodHygieneRatingContext $ctx): void {}
    public function PreResult(FoodHygieneRatingContext $ctx): void {}
    public function PreDone(FoodHygieneRatingContext $ctx): void {}
    public function PreUnexpected(FoodHygieneRatingContext $ctx): void {}
}
