// Typed models for the FoodHygieneRating SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Authority {
  email?: string
  establishment_count?: number
  file_name?: string
  file_name_welsh?: string
  friendly_name?: string
  local_authority_id?: number
  local_authority_id_code?: string
  name?: string
  region_name?: string
  scheme_url?: string
  url?: string
}

export interface AuthorityLoadMatch {
  id: number
}

export interface AuthorityListMatch {
  email?: string
  establishment_count?: number
  file_name?: string
  file_name_welsh?: string
  friendly_name?: string
  local_authority_id?: number
  local_authority_id_code?: string
  name?: string
  region_name?: string
  scheme_url?: string
  url?: string
}

export interface BusinessType {
  business_type_id?: number
  business_type_name?: string
}

export interface BusinessTypeListMatch {
  business_type_id?: number
  business_type_name?: string
}

export interface Establishment {
  address_line1?: string
  address_line2?: string
  address_line3?: string
  address_line4?: string
  business_name?: string
  business_type?: string
  business_type_id?: number
  fhrsid?: number
  geocode?: Record<string, any>
  local_authority_business_id?: string
  local_authority_code?: string
  local_authority_email_address?: string
  local_authority_name?: string
  local_authority_web_site?: string
  new_rating_pending?: boolean
  post_code?: string
  rating_date?: string
  rating_key?: string
  rating_value?: string
  scheme_type?: string
}

export interface EstablishmentLoadMatch {
  id: number
}

export interface EstablishmentListMatch {
  address_line1?: string
  address_line2?: string
  address_line3?: string
  address_line4?: string
  business_name?: string
  business_type?: string
  business_type_id?: number
  fhrsid?: number
  geocode?: Record<string, any>
  local_authority_business_id?: string
  local_authority_code?: string
  local_authority_email_address?: string
  local_authority_name?: string
  local_authority_web_site?: string
  new_rating_pending?: boolean
  post_code?: string
  rating_date?: string
  rating_key?: string
  rating_value?: string
  scheme_type?: string
}

export interface Rating {
  rating_id?: number
  rating_key?: string
  rating_name?: string
  scheme_type?: string
}

export interface RatingListMatch {
  rating_id?: number
  rating_key?: string
  rating_name?: string
  scheme_type?: string
}

