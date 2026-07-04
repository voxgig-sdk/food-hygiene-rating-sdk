// Typed models for the FoodHygieneRating SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Authority is the typed data model for the authority entity.
type Authority struct {
	Email *string `json:"email,omitempty"`
	EstablishmentCount *int `json:"establishment_count,omitempty"`
	FileName *string `json:"file_name,omitempty"`
	FileNameWelsh *string `json:"file_name_welsh,omitempty"`
	FriendlyName *string `json:"friendly_name,omitempty"`
	LocalAuthorityId *int `json:"local_authority_id,omitempty"`
	LocalAuthorityIdCode *string `json:"local_authority_id_code,omitempty"`
	Name *string `json:"name,omitempty"`
	RegionName *string `json:"region_name,omitempty"`
	SchemeUrl *string `json:"scheme_url,omitempty"`
	Url *string `json:"url,omitempty"`
}

// AuthorityLoadMatch is the typed request payload for Authority.LoadTyped.
type AuthorityLoadMatch struct {
	Id int `json:"id"`
}

// AuthorityListMatch mirrors the authority fields as an all-optional match
// filter (Go analog of Partial<Authority>).
type AuthorityListMatch struct {
	Email *string `json:"email,omitempty"`
	EstablishmentCount *int `json:"establishment_count,omitempty"`
	FileName *string `json:"file_name,omitempty"`
	FileNameWelsh *string `json:"file_name_welsh,omitempty"`
	FriendlyName *string `json:"friendly_name,omitempty"`
	LocalAuthorityId *int `json:"local_authority_id,omitempty"`
	LocalAuthorityIdCode *string `json:"local_authority_id_code,omitempty"`
	Name *string `json:"name,omitempty"`
	RegionName *string `json:"region_name,omitempty"`
	SchemeUrl *string `json:"scheme_url,omitempty"`
	Url *string `json:"url,omitempty"`
}

// BusinessType is the typed data model for the business_type entity.
type BusinessType struct {
	BusinessTypeId *int `json:"business_type_id,omitempty"`
	BusinessTypeName *string `json:"business_type_name,omitempty"`
}

// BusinessTypeListMatch mirrors the business_type fields as an all-optional match
// filter (Go analog of Partial<BusinessType>).
type BusinessTypeListMatch struct {
	BusinessTypeId *int `json:"business_type_id,omitempty"`
	BusinessTypeName *string `json:"business_type_name,omitempty"`
}

// Establishment is the typed data model for the establishment entity.
type Establishment struct {
	AddressLine1 *string `json:"address_line1,omitempty"`
	AddressLine2 *string `json:"address_line2,omitempty"`
	AddressLine3 *string `json:"address_line3,omitempty"`
	AddressLine4 *string `json:"address_line4,omitempty"`
	BusinessName *string `json:"business_name,omitempty"`
	BusinessType *string `json:"business_type,omitempty"`
	BusinessTypeId *int `json:"business_type_id,omitempty"`
	Fhrsid *int `json:"fhrsid,omitempty"`
	Geocode *map[string]any `json:"geocode,omitempty"`
	LocalAuthorityBusinessId *string `json:"local_authority_business_id,omitempty"`
	LocalAuthorityCode *string `json:"local_authority_code,omitempty"`
	LocalAuthorityEmailAddress *string `json:"local_authority_email_address,omitempty"`
	LocalAuthorityName *string `json:"local_authority_name,omitempty"`
	LocalAuthorityWebSite *string `json:"local_authority_web_site,omitempty"`
	NewRatingPending *bool `json:"new_rating_pending,omitempty"`
	PostCode *string `json:"post_code,omitempty"`
	RatingDate *string `json:"rating_date,omitempty"`
	RatingKey *string `json:"rating_key,omitempty"`
	RatingValue *string `json:"rating_value,omitempty"`
	SchemeType *string `json:"scheme_type,omitempty"`
}

// EstablishmentLoadMatch is the typed request payload for Establishment.LoadTyped.
type EstablishmentLoadMatch struct {
	Id int `json:"id"`
}

// EstablishmentListMatch mirrors the establishment fields as an all-optional match
// filter (Go analog of Partial<Establishment>).
type EstablishmentListMatch struct {
	AddressLine1 *string `json:"address_line1,omitempty"`
	AddressLine2 *string `json:"address_line2,omitempty"`
	AddressLine3 *string `json:"address_line3,omitempty"`
	AddressLine4 *string `json:"address_line4,omitempty"`
	BusinessName *string `json:"business_name,omitempty"`
	BusinessType *string `json:"business_type,omitempty"`
	BusinessTypeId *int `json:"business_type_id,omitempty"`
	Fhrsid *int `json:"fhrsid,omitempty"`
	Geocode *map[string]any `json:"geocode,omitempty"`
	LocalAuthorityBusinessId *string `json:"local_authority_business_id,omitempty"`
	LocalAuthorityCode *string `json:"local_authority_code,omitempty"`
	LocalAuthorityEmailAddress *string `json:"local_authority_email_address,omitempty"`
	LocalAuthorityName *string `json:"local_authority_name,omitempty"`
	LocalAuthorityWebSite *string `json:"local_authority_web_site,omitempty"`
	NewRatingPending *bool `json:"new_rating_pending,omitempty"`
	PostCode *string `json:"post_code,omitempty"`
	RatingDate *string `json:"rating_date,omitempty"`
	RatingKey *string `json:"rating_key,omitempty"`
	RatingValue *string `json:"rating_value,omitempty"`
	SchemeType *string `json:"scheme_type,omitempty"`
}

// Rating is the typed data model for the rating entity.
type Rating struct {
	RatingId *int `json:"rating_id,omitempty"`
	RatingKey *string `json:"rating_key,omitempty"`
	RatingName *string `json:"rating_name,omitempty"`
	SchemeType *string `json:"scheme_type,omitempty"`
}

// RatingListMatch mirrors the rating fields as an all-optional match
// filter (Go analog of Partial<Rating>).
type RatingListMatch struct {
	RatingId *int `json:"rating_id,omitempty"`
	RatingKey *string `json:"rating_key,omitempty"`
	RatingName *string `json:"rating_name,omitempty"`
	SchemeType *string `json:"scheme_type,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
