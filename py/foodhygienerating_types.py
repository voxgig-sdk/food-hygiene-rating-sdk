# Typed models for the FoodHygieneRating SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Authority(TypedDict, total=False):
    email: str
    establishment_count: int
    file_name: str
    file_name_welsh: str
    friendly_name: str
    local_authority_id: int
    local_authority_id_code: str
    name: str
    region_name: str
    scheme_url: str
    url: str


class AuthorityLoadMatch(TypedDict):
    id: int


class AuthorityListMatch(TypedDict, total=False):
    email: str
    establishment_count: int
    file_name: str
    file_name_welsh: str
    friendly_name: str
    local_authority_id: int
    local_authority_id_code: str
    name: str
    region_name: str
    scheme_url: str
    url: str


class BusinessType(TypedDict, total=False):
    business_type_id: int
    business_type_name: str


class BusinessTypeListMatch(TypedDict, total=False):
    business_type_id: int
    business_type_name: str


class Establishment(TypedDict, total=False):
    address_line1: str
    address_line2: str
    address_line3: str
    address_line4: str
    business_name: str
    business_type: str
    business_type_id: int
    fhrsid: int
    geocode: dict
    local_authority_business_id: str
    local_authority_code: str
    local_authority_email_address: str
    local_authority_name: str
    local_authority_web_site: str
    new_rating_pending: bool
    post_code: str
    rating_date: str
    rating_key: str
    rating_value: str
    scheme_type: str


class EstablishmentLoadMatch(TypedDict):
    id: int


class EstablishmentListMatch(TypedDict, total=False):
    address_line1: str
    address_line2: str
    address_line3: str
    address_line4: str
    business_name: str
    business_type: str
    business_type_id: int
    fhrsid: int
    geocode: dict
    local_authority_business_id: str
    local_authority_code: str
    local_authority_email_address: str
    local_authority_name: str
    local_authority_web_site: str
    new_rating_pending: bool
    post_code: str
    rating_date: str
    rating_key: str
    rating_value: str
    scheme_type: str


class Rating(TypedDict, total=False):
    rating_id: int
    rating_key: str
    rating_name: str
    scheme_type: str


class RatingListMatch(TypedDict, total=False):
    rating_id: int
    rating_key: str
    rating_name: str
    scheme_type: str
