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
    public ?string $email = null;
    public ?int $establishment_count = null;
    public ?string $file_name = null;
    public ?string $file_name_welsh = null;
    public ?string $friendly_name = null;
    public ?int $local_authority_id = null;
    public ?string $local_authority_id_code = null;
    public ?string $name = null;
    public ?string $region_name = null;
    public ?string $scheme_url = null;
    public ?string $url = null;
}

/** Request payload for Authority#load. */
class AuthorityLoadMatch
{
    public int $id;
}

/** Request payload for Authority#list. */
class AuthorityListMatch
{
    public ?string $email = null;
    public ?int $establishment_count = null;
    public ?string $file_name = null;
    public ?string $file_name_welsh = null;
    public ?string $friendly_name = null;
    public ?int $local_authority_id = null;
    public ?string $local_authority_id_code = null;
    public ?string $name = null;
    public ?string $region_name = null;
    public ?string $scheme_url = null;
    public ?string $url = null;
}

/** BusinessType entity data model. */
class BusinessType
{
    public ?int $business_type_id = null;
    public ?string $business_type_name = null;
}

/** Request payload for BusinessType#list. */
class BusinessTypeListMatch
{
    public ?int $business_type_id = null;
    public ?string $business_type_name = null;
}

/** Establishment entity data model. */
class Establishment
{
    public ?string $address_line1 = null;
    public ?string $address_line2 = null;
    public ?string $address_line3 = null;
    public ?string $address_line4 = null;
    public ?string $business_name = null;
    public ?string $business_type = null;
    public ?int $business_type_id = null;
    public ?int $fhrsid = null;
    public ?array $geocode = null;
    public ?string $local_authority_business_id = null;
    public ?string $local_authority_code = null;
    public ?string $local_authority_email_address = null;
    public ?string $local_authority_name = null;
    public ?string $local_authority_web_site = null;
    public ?bool $new_rating_pending = null;
    public ?string $post_code = null;
    public ?string $rating_date = null;
    public ?string $rating_key = null;
    public ?string $rating_value = null;
    public ?string $scheme_type = null;
}

/** Request payload for Establishment#load. */
class EstablishmentLoadMatch
{
    public int $id;
}

/** Request payload for Establishment#list. */
class EstablishmentListMatch
{
    public ?string $address_line1 = null;
    public ?string $address_line2 = null;
    public ?string $address_line3 = null;
    public ?string $address_line4 = null;
    public ?string $business_name = null;
    public ?string $business_type = null;
    public ?int $business_type_id = null;
    public ?int $fhrsid = null;
    public ?array $geocode = null;
    public ?string $local_authority_business_id = null;
    public ?string $local_authority_code = null;
    public ?string $local_authority_email_address = null;
    public ?string $local_authority_name = null;
    public ?string $local_authority_web_site = null;
    public ?bool $new_rating_pending = null;
    public ?string $post_code = null;
    public ?string $rating_date = null;
    public ?string $rating_key = null;
    public ?string $rating_value = null;
    public ?string $scheme_type = null;
}

/** Rating entity data model. */
class Rating
{
    public ?int $rating_id = null;
    public ?string $rating_key = null;
    public ?string $rating_name = null;
    public ?string $scheme_type = null;
}

/** Request payload for Rating#list. */
class RatingListMatch
{
    public ?int $rating_id = null;
    public ?string $rating_key = null;
    public ?string $rating_name = null;
    public ?string $scheme_type = null;
}

