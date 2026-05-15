-- Hackernews SDK error

local HackernewsError = {}
HackernewsError.__index = HackernewsError


function HackernewsError.new(code, msg, ctx)
  local self = setmetatable({}, HackernewsError)
  self.is_sdk_error = true
  self.sdk = "Hackernews"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function HackernewsError:error()
  return self.msg
end


function HackernewsError:__tostring()
  return self.msg
end


return HackernewsError
