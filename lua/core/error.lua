-- FoodHygieneRating SDK error

local json = require("dkjson")

local FoodHygieneRatingError = {}
FoodHygieneRatingError.__index = FoodHygieneRatingError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function FoodHygieneRatingError.new(code, msg, ctx)
  local self = setmetatable({}, FoodHygieneRatingError)
  self.is_sdk_error = true
  self.sdk = "FoodHygieneRating"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function FoodHygieneRatingError:context()
  return CONTEXT[self]
end


function FoodHygieneRatingError:error()
  return self.msg
end


function FoodHygieneRatingError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function FoodHygieneRatingError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function FoodHygieneRatingError:to_json()
  return json.encode(self:to_table())
end


function FoodHygieneRatingError:__tostring()
  return self.msg
end


function FoodHygieneRatingError.__tojson(self)
  return self:to_json()
end


return FoodHygieneRatingError
