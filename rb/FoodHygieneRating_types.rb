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
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] establishment_count
#   @return [Integer, nil]
#
# @!attribute [rw] file_name
#   @return [String, nil]
#
# @!attribute [rw] file_name_welsh
#   @return [String, nil]
#
# @!attribute [rw] friendly_name
#   @return [String, nil]
#
# @!attribute [rw] local_authority_id
#   @return [Integer, nil]
#
# @!attribute [rw] local_authority_id_code
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] region_name
#   @return [String, nil]
#
# @!attribute [rw] scheme_url
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Authority = Struct.new(
  :email,
  :establishment_count,
  :file_name,
  :file_name_welsh,
  :friendly_name,
  :local_authority_id,
  :local_authority_id_code,
  :name,
  :region_name,
  :scheme_url,
  :url,
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
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] establishment_count
#   @return [Integer, nil]
#
# @!attribute [rw] file_name
#   @return [String, nil]
#
# @!attribute [rw] file_name_welsh
#   @return [String, nil]
#
# @!attribute [rw] friendly_name
#   @return [String, nil]
#
# @!attribute [rw] local_authority_id
#   @return [Integer, nil]
#
# @!attribute [rw] local_authority_id_code
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] region_name
#   @return [String, nil]
#
# @!attribute [rw] scheme_url
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
AuthorityListMatch = Struct.new(
  :email,
  :establishment_count,
  :file_name,
  :file_name_welsh,
  :friendly_name,
  :local_authority_id,
  :local_authority_id_code,
  :name,
  :region_name,
  :scheme_url,
  :url,
  keyword_init: true
)

# BusinessType entity data model.
#
# @!attribute [rw] business_type_id
#   @return [Integer, nil]
#
# @!attribute [rw] business_type_name
#   @return [String, nil]
BusinessType = Struct.new(
  :business_type_id,
  :business_type_name,
  keyword_init: true
)

# Request payload for BusinessType#list.
#
# @!attribute [rw] business_type_id
#   @return [Integer, nil]
#
# @!attribute [rw] business_type_name
#   @return [String, nil]
BusinessTypeListMatch = Struct.new(
  :business_type_id,
  :business_type_name,
  keyword_init: true
)

# Establishment entity data model.
#
# @!attribute [rw] address_line1
#   @return [String, nil]
#
# @!attribute [rw] address_line2
#   @return [String, nil]
#
# @!attribute [rw] address_line3
#   @return [String, nil]
#
# @!attribute [rw] address_line4
#   @return [String, nil]
#
# @!attribute [rw] business_name
#   @return [String, nil]
#
# @!attribute [rw] business_type
#   @return [String, nil]
#
# @!attribute [rw] business_type_id
#   @return [Integer, nil]
#
# @!attribute [rw] fhrsid
#   @return [Integer, nil]
#
# @!attribute [rw] geocode
#   @return [Hash, nil]
#
# @!attribute [rw] local_authority_business_id
#   @return [String, nil]
#
# @!attribute [rw] local_authority_code
#   @return [String, nil]
#
# @!attribute [rw] local_authority_email_address
#   @return [String, nil]
#
# @!attribute [rw] local_authority_name
#   @return [String, nil]
#
# @!attribute [rw] local_authority_web_site
#   @return [String, nil]
#
# @!attribute [rw] new_rating_pending
#   @return [Boolean, nil]
#
# @!attribute [rw] post_code
#   @return [String, nil]
#
# @!attribute [rw] rating_date
#   @return [String, nil]
#
# @!attribute [rw] rating_key
#   @return [String, nil]
#
# @!attribute [rw] rating_value
#   @return [String, nil]
#
# @!attribute [rw] scheme_type
#   @return [String, nil]
Establishment = Struct.new(
  :address_line1,
  :address_line2,
  :address_line3,
  :address_line4,
  :business_name,
  :business_type,
  :business_type_id,
  :fhrsid,
  :geocode,
  :local_authority_business_id,
  :local_authority_code,
  :local_authority_email_address,
  :local_authority_name,
  :local_authority_web_site,
  :new_rating_pending,
  :post_code,
  :rating_date,
  :rating_key,
  :rating_value,
  :scheme_type,
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
# @!attribute [rw] address_line1
#   @return [String, nil]
#
# @!attribute [rw] address_line2
#   @return [String, nil]
#
# @!attribute [rw] address_line3
#   @return [String, nil]
#
# @!attribute [rw] address_line4
#   @return [String, nil]
#
# @!attribute [rw] business_name
#   @return [String, nil]
#
# @!attribute [rw] business_type
#   @return [String, nil]
#
# @!attribute [rw] business_type_id
#   @return [Integer, nil]
#
# @!attribute [rw] fhrsid
#   @return [Integer, nil]
#
# @!attribute [rw] geocode
#   @return [Hash, nil]
#
# @!attribute [rw] local_authority_business_id
#   @return [String, nil]
#
# @!attribute [rw] local_authority_code
#   @return [String, nil]
#
# @!attribute [rw] local_authority_email_address
#   @return [String, nil]
#
# @!attribute [rw] local_authority_name
#   @return [String, nil]
#
# @!attribute [rw] local_authority_web_site
#   @return [String, nil]
#
# @!attribute [rw] new_rating_pending
#   @return [Boolean, nil]
#
# @!attribute [rw] post_code
#   @return [String, nil]
#
# @!attribute [rw] rating_date
#   @return [String, nil]
#
# @!attribute [rw] rating_key
#   @return [String, nil]
#
# @!attribute [rw] rating_value
#   @return [String, nil]
#
# @!attribute [rw] scheme_type
#   @return [String, nil]
EstablishmentListMatch = Struct.new(
  :address_line1,
  :address_line2,
  :address_line3,
  :address_line4,
  :business_name,
  :business_type,
  :business_type_id,
  :fhrsid,
  :geocode,
  :local_authority_business_id,
  :local_authority_code,
  :local_authority_email_address,
  :local_authority_name,
  :local_authority_web_site,
  :new_rating_pending,
  :post_code,
  :rating_date,
  :rating_key,
  :rating_value,
  :scheme_type,
  keyword_init: true
)

# Rating entity data model.
#
# @!attribute [rw] rating_id
#   @return [Integer, nil]
#
# @!attribute [rw] rating_key
#   @return [String, nil]
#
# @!attribute [rw] rating_name
#   @return [String, nil]
#
# @!attribute [rw] scheme_type
#   @return [String, nil]
Rating = Struct.new(
  :rating_id,
  :rating_key,
  :rating_name,
  :scheme_type,
  keyword_init: true
)

# Request payload for Rating#list.
#
# @!attribute [rw] rating_id
#   @return [Integer, nil]
#
# @!attribute [rw] rating_key
#   @return [String, nil]
#
# @!attribute [rw] rating_name
#   @return [String, nil]
#
# @!attribute [rw] scheme_type
#   @return [String, nil]
RatingListMatch = Struct.new(
  :rating_id,
  :rating_key,
  :rating_name,
  :scheme_type,
  keyword_init: true
)

