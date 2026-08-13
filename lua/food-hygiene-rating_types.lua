-- Typed models for the FoodHygieneRating SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Authority
---@field Email? string
---@field EstablishmentCount? number
---@field FileName? string
---@field FileNameWelsh? string
---@field FriendlyName? string
---@field LocalAuthorityId? number
---@field LocalAuthorityIdCode? string
---@field Name? string
---@field RegionName? string
---@field SchemeUrl? string
---@field Url? string

---@class AuthorityLoadMatch
---@field id number

---@class AuthorityListMatch
---@field Email? string
---@field EstablishmentCount? number
---@field FileName? string
---@field FileNameWelsh? string
---@field FriendlyName? string
---@field LocalAuthorityId? number
---@field LocalAuthorityIdCode? string
---@field Name? string
---@field RegionName? string
---@field SchemeUrl? string
---@field Url? string

---@class BusinessType
---@field BusinessTypeId? number
---@field BusinessTypeName? string

---@class BusinessTypeListMatch
---@field BusinessTypeId? number
---@field BusinessTypeName? string

---@class Establishment
---@field AddressLine1? string
---@field AddressLine2? string
---@field AddressLine3? string
---@field AddressLine4? string
---@field BusinessName? string
---@field BusinessType? string
---@field BusinessTypeID? number
---@field FHRSID? number
---@field Geocode? table
---@field LocalAuthorityBusinessID? string
---@field LocalAuthorityCode? string
---@field LocalAuthorityEmailAddress? string
---@field LocalAuthorityName? string
---@field LocalAuthorityWebSite? string
---@field NewRatingPending? boolean
---@field PostCode? string
---@field RatingDate? string
---@field RatingKey? string
---@field RatingValue? string
---@field SchemeType? string
---@field latitude? number
---@field longitude? number

---@class EstablishmentLoadMatch
---@field id number

---@class EstablishmentListMatch
---@field AddressLine1? string
---@field AddressLine2? string
---@field AddressLine3? string
---@field AddressLine4? string
---@field BusinessName? string
---@field BusinessType? string
---@field BusinessTypeID? number
---@field FHRSID? number
---@field Geocode? table
---@field LocalAuthorityBusinessID? string
---@field LocalAuthorityCode? string
---@field LocalAuthorityEmailAddress? string
---@field LocalAuthorityName? string
---@field LocalAuthorityWebSite? string
---@field NewRatingPending? boolean
---@field PostCode? string
---@field RatingDate? string
---@field RatingKey? string
---@field RatingValue? string
---@field SchemeType? string
---@field latitude? number
---@field longitude? number

---@class Rating
---@field ratingId? number
---@field ratingKey? string
---@field ratingName? string
---@field schemeType? string

---@class RatingListMatch
---@field ratingId? number
---@field ratingKey? string
---@field ratingName? string
---@field schemeType? string

local M = {}

return M
