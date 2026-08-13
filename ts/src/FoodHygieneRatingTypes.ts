// Typed models for the FoodHygieneRating SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Authority {
  Email?: string
  EstablishmentCount?: number
  FileName?: string
  FileNameWelsh?: string
  FriendlyName?: string
  LocalAuthorityId?: number
  LocalAuthorityIdCode?: string
  Name?: string
  RegionName?: string
  SchemeUrl?: string
  Url?: string
}

export interface AuthorityLoadMatch {
  id: number
}

export interface AuthorityListMatch {
  Email?: string
  EstablishmentCount?: number
  FileName?: string
  FileNameWelsh?: string
  FriendlyName?: string
  LocalAuthorityId?: number
  LocalAuthorityIdCode?: string
  Name?: string
  RegionName?: string
  SchemeUrl?: string
  Url?: string
}

export interface BusinessType {
  BusinessTypeId?: number
  BusinessTypeName?: string
}

export interface BusinessTypeListMatch {
  BusinessTypeId?: number
  BusinessTypeName?: string
}

export interface Establishment {
  AddressLine1?: string
  AddressLine2?: string
  AddressLine3?: string
  AddressLine4?: string
  BusinessName?: string
  BusinessType?: string
  BusinessTypeID?: number
  FHRSID?: number
  Geocode?: Record<string, any>
  LocalAuthorityBusinessID?: string
  LocalAuthorityCode?: string
  LocalAuthorityEmailAddress?: string
  LocalAuthorityName?: string
  LocalAuthorityWebSite?: string
  NewRatingPending?: boolean
  PostCode?: string
  RatingDate?: string
  RatingKey?: string
  RatingValue?: string
  SchemeType?: string
  latitude?: number
  longitude?: number
}

export interface EstablishmentLoadMatch {
  id: number
}

export interface EstablishmentListMatch {
  AddressLine1?: string
  AddressLine2?: string
  AddressLine3?: string
  AddressLine4?: string
  BusinessName?: string
  BusinessType?: string
  BusinessTypeID?: number
  FHRSID?: number
  Geocode?: Record<string, any>
  LocalAuthorityBusinessID?: string
  LocalAuthorityCode?: string
  LocalAuthorityEmailAddress?: string
  LocalAuthorityName?: string
  LocalAuthorityWebSite?: string
  NewRatingPending?: boolean
  PostCode?: string
  RatingDate?: string
  RatingKey?: string
  RatingValue?: string
  SchemeType?: string
  latitude?: number
  longitude?: number
}

export interface Rating {
  ratingId?: number
  ratingKey?: string
  ratingName?: string
  schemeType?: string
}

export interface RatingListMatch {
  ratingId?: number
  ratingKey?: string
  ratingName?: string
  schemeType?: string
}

