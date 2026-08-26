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
    Email: str
    EstablishmentCount: int
    FileName: str
    FileNameWelsh: str
    FriendlyName: str
    LocalAuthorityId: int
    LocalAuthorityIdCode: str
    Name: str
    RegionName: str
    SchemeUrl: str
    Url: str
    id: str


class AuthorityLoadMatch(TypedDict):
    id: int


class AuthorityListMatch(TypedDict, total=False):
    Email: str
    EstablishmentCount: int
    FileName: str
    FileNameWelsh: str
    FriendlyName: str
    LocalAuthorityId: int
    LocalAuthorityIdCode: str
    Name: str
    RegionName: str
    SchemeUrl: str
    Url: str
    id: str


class BusinessType(TypedDict, total=False):
    BusinessTypeId: int
    BusinessTypeName: str


class BusinessTypeListMatch(TypedDict, total=False):
    BusinessTypeId: int
    BusinessTypeName: str


class Establishment(TypedDict, total=False):
    AddressLine1: str
    AddressLine2: str
    AddressLine3: str
    AddressLine4: str
    BusinessName: str
    BusinessType: str
    BusinessTypeID: int
    FHRSID: int
    Geocode: dict
    LocalAuthorityBusinessID: str
    LocalAuthorityCode: str
    LocalAuthorityEmailAddress: str
    LocalAuthorityName: str
    LocalAuthorityWebSite: str
    NewRatingPending: bool
    PostCode: str
    RatingDate: str
    RatingKey: str
    RatingValue: str
    SchemeType: str
    id: str
    latitude: float
    longitude: float


class EstablishmentLoadMatch(TypedDict):
    id: int


class EstablishmentListMatch(TypedDict, total=False):
    AddressLine1: str
    AddressLine2: str
    AddressLine3: str
    AddressLine4: str
    BusinessName: str
    BusinessType: str
    BusinessTypeID: int
    FHRSID: int
    Geocode: dict
    LocalAuthorityBusinessID: str
    LocalAuthorityCode: str
    LocalAuthorityEmailAddress: str
    LocalAuthorityName: str
    LocalAuthorityWebSite: str
    NewRatingPending: bool
    PostCode: str
    RatingDate: str
    RatingKey: str
    RatingValue: str
    SchemeType: str
    id: str
    latitude: float
    longitude: float


class Rating(TypedDict, total=False):
    ratingId: int
    ratingKey: str
    ratingName: str
    schemeType: str


class RatingListMatch(TypedDict, total=False):
    ratingId: int
    ratingKey: str
    ratingName: str
    schemeType: str
