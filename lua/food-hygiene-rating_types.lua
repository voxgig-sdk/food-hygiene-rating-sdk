-- Typed models for the FoodHygieneRating SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Authority
---@field email? string
---@field establishment_count? number
---@field file_name? string
---@field file_name_welsh? string
---@field friendly_name? string
---@field local_authority_id? number
---@field local_authority_id_code? string
---@field name? string
---@field region_name? string
---@field scheme_url? string
---@field url? string

---@class AuthorityLoadMatch
---@field id number

---@class AuthorityListMatch

---@class BusinessType
---@field business_type_id? number
---@field business_type_name? string

---@class BusinessTypeListMatch

---@class Establishment
---@field address_line1? string
---@field address_line2? string
---@field address_line3? string
---@field address_line4? string
---@field business_name? string
---@field business_type? string
---@field business_type_id? number
---@field fhrsid? number
---@field geocode? table
---@field local_authority_business_id? string
---@field local_authority_code? string
---@field local_authority_email_address? string
---@field local_authority_name? string
---@field local_authority_web_site? string
---@field new_rating_pending? boolean
---@field post_code? string
---@field rating_date? string
---@field rating_key? string
---@field rating_value? string
---@field scheme_type? string

---@class EstablishmentLoadMatch
---@field id number

---@class EstablishmentListMatch

---@class Rating
---@field rating_id? number
---@field rating_key? string
---@field rating_name? string
---@field scheme_type? string

---@class RatingListMatch

local M = {}

return M
