<?php
declare(strict_types=1);

// Typed models for the FoodHygieneRating SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Authority entity data model. */
class Authority
{
    public ?string $Email = null;
    public ?int $EstablishmentCount = null;
    public ?string $FileName = null;
    public ?string $FileNameWelsh = null;
    public ?string $FriendlyName = null;
    public ?int $LocalAuthorityId = null;
    public ?string $LocalAuthorityIdCode = null;
    public ?string $Name = null;
    public ?string $RegionName = null;
    public ?string $SchemeUrl = null;
    public ?string $Url = null;
}

/** Request payload for Authority#load. */
class AuthorityLoadMatch
{
    public int $id;
}

/** Request payload for Authority#list. */
class AuthorityListMatch
{
    public ?string $Email = null;
    public ?int $EstablishmentCount = null;
    public ?string $FileName = null;
    public ?string $FileNameWelsh = null;
    public ?string $FriendlyName = null;
    public ?int $LocalAuthorityId = null;
    public ?string $LocalAuthorityIdCode = null;
    public ?string $Name = null;
    public ?string $RegionName = null;
    public ?string $SchemeUrl = null;
    public ?string $Url = null;
}

/** BusinessType entity data model. */
class BusinessType
{
    public ?int $BusinessTypeId = null;
    public ?string $BusinessTypeName = null;
}

/** Request payload for BusinessType#list. */
class BusinessTypeListMatch
{
    public ?int $BusinessTypeId = null;
    public ?string $BusinessTypeName = null;
}

/** Establishment entity data model. */
class Establishment
{
    public ?string $AddressLine1 = null;
    public ?string $AddressLine2 = null;
    public ?string $AddressLine3 = null;
    public ?string $AddressLine4 = null;
    public ?string $BusinessName = null;
    public ?string $BusinessType = null;
    public ?int $BusinessTypeID = null;
    public ?int $FHRSID = null;
    public ?array $Geocode = null;
    public ?string $LocalAuthorityBusinessID = null;
    public ?string $LocalAuthorityCode = null;
    public ?string $LocalAuthorityEmailAddress = null;
    public ?string $LocalAuthorityName = null;
    public ?string $LocalAuthorityWebSite = null;
    public ?bool $NewRatingPending = null;
    public ?string $PostCode = null;
    public ?string $RatingDate = null;
    public ?string $RatingKey = null;
    public ?string $RatingValue = null;
    public ?string $SchemeType = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
}

/** Request payload for Establishment#load. */
class EstablishmentLoadMatch
{
    public int $id;
}

/** Request payload for Establishment#list. */
class EstablishmentListMatch
{
    public ?string $AddressLine1 = null;
    public ?string $AddressLine2 = null;
    public ?string $AddressLine3 = null;
    public ?string $AddressLine4 = null;
    public ?string $BusinessName = null;
    public ?string $BusinessType = null;
    public ?int $BusinessTypeID = null;
    public ?int $FHRSID = null;
    public ?array $Geocode = null;
    public ?string $LocalAuthorityBusinessID = null;
    public ?string $LocalAuthorityCode = null;
    public ?string $LocalAuthorityEmailAddress = null;
    public ?string $LocalAuthorityName = null;
    public ?string $LocalAuthorityWebSite = null;
    public ?bool $NewRatingPending = null;
    public ?string $PostCode = null;
    public ?string $RatingDate = null;
    public ?string $RatingKey = null;
    public ?string $RatingValue = null;
    public ?string $SchemeType = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
}

/** Rating entity data model. */
class Rating
{
    public ?int $ratingId = null;
    public ?string $ratingKey = null;
    public ?string $ratingName = null;
    public ?string $schemeType = null;
}

/** Request payload for Rating#list. */
class RatingListMatch
{
    public ?int $ratingId = null;
    public ?string $ratingKey = null;
    public ?string $ratingName = null;
    public ?string $schemeType = null;
}

