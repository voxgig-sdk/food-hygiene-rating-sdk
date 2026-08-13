# frozen_string_literal: true

# Typed models for the FoodHygieneRating SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Authority entity data model.
#
# @!attribute [rw] Email
#   @return [String, nil]
#
# @!attribute [rw] EstablishmentCount
#   @return [Integer, nil]
#
# @!attribute [rw] FileName
#   @return [String, nil]
#
# @!attribute [rw] FileNameWelsh
#   @return [String, nil]
#
# @!attribute [rw] FriendlyName
#   @return [String, nil]
#
# @!attribute [rw] LocalAuthorityId
#   @return [Integer, nil]
#
# @!attribute [rw] LocalAuthorityIdCode
#   @return [String, nil]
#
# @!attribute [rw] Name
#   @return [String, nil]
#
# @!attribute [rw] RegionName
#   @return [String, nil]
#
# @!attribute [rw] SchemeUrl
#   @return [String, nil]
#
# @!attribute [rw] Url
#   @return [String, nil]
Authority = Struct.new(
  :Email,
  :EstablishmentCount,
  :FileName,
  :FileNameWelsh,
  :FriendlyName,
  :LocalAuthorityId,
  :LocalAuthorityIdCode,
  :Name,
  :RegionName,
  :SchemeUrl,
  :Url,
  keyword_init: true
)

# Request payload for Authority#load.
#
# @!attribute [rw] id
#   @return [Integer]
AuthorityLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Authority#list.
#
# @!attribute [rw] Email
#   @return [String, nil]
#
# @!attribute [rw] EstablishmentCount
#   @return [Integer, nil]
#
# @!attribute [rw] FileName
#   @return [String, nil]
#
# @!attribute [rw] FileNameWelsh
#   @return [String, nil]
#
# @!attribute [rw] FriendlyName
#   @return [String, nil]
#
# @!attribute [rw] LocalAuthorityId
#   @return [Integer, nil]
#
# @!attribute [rw] LocalAuthorityIdCode
#   @return [String, nil]
#
# @!attribute [rw] Name
#   @return [String, nil]
#
# @!attribute [rw] RegionName
#   @return [String, nil]
#
# @!attribute [rw] SchemeUrl
#   @return [String, nil]
#
# @!attribute [rw] Url
#   @return [String, nil]
AuthorityListMatch = Struct.new(
  :Email,
  :EstablishmentCount,
  :FileName,
  :FileNameWelsh,
  :FriendlyName,
  :LocalAuthorityId,
  :LocalAuthorityIdCode,
  :Name,
  :RegionName,
  :SchemeUrl,
  :Url,
  keyword_init: true
)

# BusinessType entity data model.
#
# @!attribute [rw] BusinessTypeId
#   @return [Integer, nil]
#
# @!attribute [rw] BusinessTypeName
#   @return [String, nil]
BusinessType = Struct.new(
  :BusinessTypeId,
  :BusinessTypeName,
  keyword_init: true
)

# Request payload for BusinessType#list.
#
# @!attribute [rw] BusinessTypeId
#   @return [Integer, nil]
#
# @!attribute [rw] BusinessTypeName
#   @return [String, nil]
BusinessTypeListMatch = Struct.new(
  :BusinessTypeId,
  :BusinessTypeName,
  keyword_init: true
)

# Establishment entity data model.
#
# @!attribute [rw] AddressLine1
#   @return [String, nil]
#
# @!attribute [rw] AddressLine2
#   @return [String, nil]
#
# @!attribute [rw] AddressLine3
#   @return [String, nil]
#
# @!attribute [rw] AddressLine4
#   @return [String, nil]
#
# @!attribute [rw] BusinessName
#   @return [String, nil]
#
# @!attribute [rw] BusinessType
#   @return [String, nil]
#
# @!attribute [rw] BusinessTypeID
#   @return [Integer, nil]
#
# @!attribute [rw] FHRSID
#   @return [Integer, nil]
#
# @!attribute [rw] Geocode
#   @return [Hash, nil]
#
# @!attribute [rw] LocalAuthorityBusinessID
#   @return [String, nil]
#
# @!attribute [rw] LocalAuthorityCode
#   @return [String, nil]
#
# @!attribute [rw] LocalAuthorityEmailAddress
#   @return [String, nil]
#
# @!attribute [rw] LocalAuthorityName
#   @return [String, nil]
#
# @!attribute [rw] LocalAuthorityWebSite
#   @return [String, nil]
#
# @!attribute [rw] NewRatingPending
#   @return [Boolean, nil]
#
# @!attribute [rw] PostCode
#   @return [String, nil]
#
# @!attribute [rw] RatingDate
#   @return [String, nil]
#
# @!attribute [rw] RatingKey
#   @return [String, nil]
#
# @!attribute [rw] RatingValue
#   @return [String, nil]
#
# @!attribute [rw] SchemeType
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
Establishment = Struct.new(
  :AddressLine1,
  :AddressLine2,
  :AddressLine3,
  :AddressLine4,
  :BusinessName,
  :BusinessType,
  :BusinessTypeID,
  :FHRSID,
  :Geocode,
  :LocalAuthorityBusinessID,
  :LocalAuthorityCode,
  :LocalAuthorityEmailAddress,
  :LocalAuthorityName,
  :LocalAuthorityWebSite,
  :NewRatingPending,
  :PostCode,
  :RatingDate,
  :RatingKey,
  :RatingValue,
  :SchemeType,
  :latitude,
  :longitude,
  keyword_init: true
)

# Request payload for Establishment#load.
#
# @!attribute [rw] id
#   @return [Integer]
EstablishmentLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Establishment#list.
#
# @!attribute [rw] AddressLine1
#   @return [String, nil]
#
# @!attribute [rw] AddressLine2
#   @return [String, nil]
#
# @!attribute [rw] AddressLine3
#   @return [String, nil]
#
# @!attribute [rw] AddressLine4
#   @return [String, nil]
#
# @!attribute [rw] BusinessName
#   @return [String, nil]
#
# @!attribute [rw] BusinessType
#   @return [String, nil]
#
# @!attribute [rw] BusinessTypeID
#   @return [Integer, nil]
#
# @!attribute [rw] FHRSID
#   @return [Integer, nil]
#
# @!attribute [rw] Geocode
#   @return [Hash, nil]
#
# @!attribute [rw] LocalAuthorityBusinessID
#   @return [String, nil]
#
# @!attribute [rw] LocalAuthorityCode
#   @return [String, nil]
#
# @!attribute [rw] LocalAuthorityEmailAddress
#   @return [String, nil]
#
# @!attribute [rw] LocalAuthorityName
#   @return [String, nil]
#
# @!attribute [rw] LocalAuthorityWebSite
#   @return [String, nil]
#
# @!attribute [rw] NewRatingPending
#   @return [Boolean, nil]
#
# @!attribute [rw] PostCode
#   @return [String, nil]
#
# @!attribute [rw] RatingDate
#   @return [String, nil]
#
# @!attribute [rw] RatingKey
#   @return [String, nil]
#
# @!attribute [rw] RatingValue
#   @return [String, nil]
#
# @!attribute [rw] SchemeType
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
EstablishmentListMatch = Struct.new(
  :AddressLine1,
  :AddressLine2,
  :AddressLine3,
  :AddressLine4,
  :BusinessName,
  :BusinessType,
  :BusinessTypeID,
  :FHRSID,
  :Geocode,
  :LocalAuthorityBusinessID,
  :LocalAuthorityCode,
  :LocalAuthorityEmailAddress,
  :LocalAuthorityName,
  :LocalAuthorityWebSite,
  :NewRatingPending,
  :PostCode,
  :RatingDate,
  :RatingKey,
  :RatingValue,
  :SchemeType,
  :latitude,
  :longitude,
  keyword_init: true
)

# Rating entity data model.
#
# @!attribute [rw] ratingId
#   @return [Integer, nil]
#
# @!attribute [rw] ratingKey
#   @return [String, nil]
#
# @!attribute [rw] ratingName
#   @return [String, nil]
#
# @!attribute [rw] schemeType
#   @return [String, nil]
Rating = Struct.new(
  :ratingId,
  :ratingKey,
  :ratingName,
  :schemeType,
  keyword_init: true
)

# Request payload for Rating#list.
#
# @!attribute [rw] ratingId
#   @return [Integer, nil]
#
# @!attribute [rw] ratingKey
#   @return [String, nil]
#
# @!attribute [rw] ratingName
#   @return [String, nil]
#
# @!attribute [rw] schemeType
#   @return [String, nil]
RatingListMatch = Struct.new(
  :ratingId,
  :ratingKey,
  :ratingName,
  :schemeType,
  keyword_init: true
)

