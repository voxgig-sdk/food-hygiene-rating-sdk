package core

type FoodHygieneRatingError struct {
	IsFoodHygieneRatingError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFoodHygieneRatingError(code string, msg string, ctx *Context) *FoodHygieneRatingError {
	return &FoodHygieneRatingError{
		IsFoodHygieneRatingError: true,
		Sdk:              "FoodHygieneRating",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FoodHygieneRatingError) Error() string {
	return e.Msg
}
