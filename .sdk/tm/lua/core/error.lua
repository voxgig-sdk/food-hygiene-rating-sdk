-- FoodHygieneRating SDK error

local FoodHygieneRatingError = {}
FoodHygieneRatingError.__index = FoodHygieneRatingError


function FoodHygieneRatingError.new(code, msg, ctx)
  local self = setmetatable({}, FoodHygieneRatingError)
  self.is_sdk_error = true
  self.sdk = "FoodHygieneRating"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FoodHygieneRatingError:error()
  return self.msg
end


function FoodHygieneRatingError:__tostring()
  return self.msg
end


return FoodHygieneRatingError
