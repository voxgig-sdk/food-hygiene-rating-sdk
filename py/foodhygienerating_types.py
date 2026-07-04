# Typed models for the FoodHygieneRating SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Authority:
    email: Optional[str] = None
    establishment_count: Optional[int] = None
    file_name: Optional[str] = None
    file_name_welsh: Optional[str] = None
    friendly_name: Optional[str] = None
    local_authority_id: Optional[int] = None
    local_authority_id_code: Optional[str] = None
    name: Optional[str] = None
    region_name: Optional[str] = None
    scheme_url: Optional[str] = None
    url: Optional[str] = None


@dataclass
class AuthorityLoadMatch:
    id: int


@dataclass
class AuthorityListMatch:
    email: Optional[str] = None
    establishment_count: Optional[int] = None
    file_name: Optional[str] = None
    file_name_welsh: Optional[str] = None
    friendly_name: Optional[str] = None
    local_authority_id: Optional[int] = None
    local_authority_id_code: Optional[str] = None
    name: Optional[str] = None
    region_name: Optional[str] = None
    scheme_url: Optional[str] = None
    url: Optional[str] = None


@dataclass
class BusinessType:
    business_type_id: Optional[int] = None
    business_type_name: Optional[str] = None


@dataclass
class BusinessTypeListMatch:
    business_type_id: Optional[int] = None
    business_type_name: Optional[str] = None


@dataclass
class Establishment:
    address_line1: Optional[str] = None
    address_line2: Optional[str] = None
    address_line3: Optional[str] = None
    address_line4: Optional[str] = None
    business_name: Optional[str] = None
    business_type: Optional[str] = None
    business_type_id: Optional[int] = None
    fhrsid: Optional[int] = None
    geocode: Optional[dict] = None
    local_authority_business_id: Optional[str] = None
    local_authority_code: Optional[str] = None
    local_authority_email_address: Optional[str] = None
    local_authority_name: Optional[str] = None
    local_authority_web_site: Optional[str] = None
    new_rating_pending: Optional[bool] = None
    post_code: Optional[str] = None
    rating_date: Optional[str] = None
    rating_key: Optional[str] = None
    rating_value: Optional[str] = None
    scheme_type: Optional[str] = None


@dataclass
class EstablishmentLoadMatch:
    id: int


@dataclass
class EstablishmentListMatch:
    address_line1: Optional[str] = None
    address_line2: Optional[str] = None
    address_line3: Optional[str] = None
    address_line4: Optional[str] = None
    business_name: Optional[str] = None
    business_type: Optional[str] = None
    business_type_id: Optional[int] = None
    fhrsid: Optional[int] = None
    geocode: Optional[dict] = None
    local_authority_business_id: Optional[str] = None
    local_authority_code: Optional[str] = None
    local_authority_email_address: Optional[str] = None
    local_authority_name: Optional[str] = None
    local_authority_web_site: Optional[str] = None
    new_rating_pending: Optional[bool] = None
    post_code: Optional[str] = None
    rating_date: Optional[str] = None
    rating_key: Optional[str] = None
    rating_value: Optional[str] = None
    scheme_type: Optional[str] = None


@dataclass
class Rating:
    rating_id: Optional[int] = None
    rating_key: Optional[str] = None
    rating_name: Optional[str] = None
    scheme_type: Optional[str] = None


@dataclass
class RatingListMatch:
    rating_id: Optional[int] = None
    rating_key: Optional[str] = None
    rating_name: Optional[str] = None
    scheme_type: Optional[str] = None

