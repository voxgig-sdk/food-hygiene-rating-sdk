// Typed models for the FoodHygieneRating SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/food-hygiene-rating-sdk/go/core"
)

// Authority is the typed data model for the authority entity.
type Authority struct {
	Email *string `json:"Email,omitempty"`
	EstablishmentCount *int `json:"EstablishmentCount,omitempty"`
	FileName *string `json:"FileName,omitempty"`
	FileNameWelsh *string `json:"FileNameWelsh,omitempty"`
	FriendlyName *string `json:"FriendlyName,omitempty"`
	LocalAuthorityId *int `json:"LocalAuthorityId,omitempty"`
	LocalAuthorityIdCode *string `json:"LocalAuthorityIdCode,omitempty"`
	Name *string `json:"Name,omitempty"`
	RegionName *string `json:"RegionName,omitempty"`
	SchemeUrl *string `json:"SchemeUrl,omitempty"`
	Url *string `json:"Url,omitempty"`
	Id *string `json:"id,omitempty"`
}

// AuthorityLoadMatch is the typed request payload for Authority.LoadTyped.
type AuthorityLoadMatch struct {
	Id int `json:"id"`
}

// AuthorityListMatch is the typed request payload for Authority.ListTyped.
type AuthorityListMatch struct {
	Email *string `json:"Email,omitempty"`
	EstablishmentCount *int `json:"EstablishmentCount,omitempty"`
	FileName *string `json:"FileName,omitempty"`
	FileNameWelsh *string `json:"FileNameWelsh,omitempty"`
	FriendlyName *string `json:"FriendlyName,omitempty"`
	LocalAuthorityId *int `json:"LocalAuthorityId,omitempty"`
	LocalAuthorityIdCode *string `json:"LocalAuthorityIdCode,omitempty"`
	Name *string `json:"Name,omitempty"`
	RegionName *string `json:"RegionName,omitempty"`
	SchemeUrl *string `json:"SchemeUrl,omitempty"`
	Url *string `json:"Url,omitempty"`
	Id *string `json:"id,omitempty"`
}

// BusinessType is the typed data model for the business_type entity.
type BusinessType struct {
	BusinessTypeId *int `json:"BusinessTypeId,omitempty"`
	BusinessTypeName *string `json:"BusinessTypeName,omitempty"`
}

// BusinessTypeListMatch is the typed request payload for BusinessType.ListTyped.
type BusinessTypeListMatch struct {
	BusinessTypeId *int `json:"BusinessTypeId,omitempty"`
	BusinessTypeName *string `json:"BusinessTypeName,omitempty"`
}

// Establishment is the typed data model for the establishment entity.
type Establishment struct {
	AddressLine1 *string `json:"AddressLine1,omitempty"`
	AddressLine2 *string `json:"AddressLine2,omitempty"`
	AddressLine3 *string `json:"AddressLine3,omitempty"`
	AddressLine4 *string `json:"AddressLine4,omitempty"`
	BusinessName *string `json:"BusinessName,omitempty"`
	BusinessType *string `json:"BusinessType,omitempty"`
	BusinessTypeID *int `json:"BusinessTypeID,omitempty"`
	FHRSID *int `json:"FHRSID,omitempty"`
	Geocode *map[string]any `json:"Geocode,omitempty"`
	LocalAuthorityBusinessID *string `json:"LocalAuthorityBusinessID,omitempty"`
	LocalAuthorityCode *string `json:"LocalAuthorityCode,omitempty"`
	LocalAuthorityEmailAddress *string `json:"LocalAuthorityEmailAddress,omitempty"`
	LocalAuthorityName *string `json:"LocalAuthorityName,omitempty"`
	LocalAuthorityWebSite *string `json:"LocalAuthorityWebSite,omitempty"`
	NewRatingPending *bool `json:"NewRatingPending,omitempty"`
	PostCode *string `json:"PostCode,omitempty"`
	RatingDate *string `json:"RatingDate,omitempty"`
	RatingKey *string `json:"RatingKey,omitempty"`
	RatingValue *string `json:"RatingValue,omitempty"`
	SchemeType *string `json:"SchemeType,omitempty"`
	Id *string `json:"id,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
}

// EstablishmentLoadMatch is the typed request payload for Establishment.LoadTyped.
type EstablishmentLoadMatch struct {
	Id int `json:"id"`
}

// EstablishmentListMatch is the typed request payload for Establishment.ListTyped.
type EstablishmentListMatch struct {
	Address *string `json:"address,omitempty"`
	BusinessTypeId *int `json:"business_type_id,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	LocalAuthorityId *int `json:"local_authority_id,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	MaxDistanceLimit *float64 `json:"max_distance_limit,omitempty"`
	Name *string `json:"name,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	RatingKey *string `json:"rating_key,omitempty"`
	SortOptionKey *string `json:"sort_option_key,omitempty"`
}

// Rating is the typed data model for the rating entity.
type Rating struct {
	RatingId *int `json:"ratingId,omitempty"`
	RatingKey *string `json:"ratingKey,omitempty"`
	RatingName *string `json:"ratingName,omitempty"`
	SchemeType *string `json:"schemeType,omitempty"`
}

// RatingListMatch is the typed request payload for Rating.ListTyped.
type RatingListMatch struct {
	RatingId *int `json:"ratingId,omitempty"`
	RatingKey *string `json:"ratingKey,omitempty"`
	RatingName *string `json:"ratingName,omitempty"`
	SchemeType *string `json:"schemeType,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
