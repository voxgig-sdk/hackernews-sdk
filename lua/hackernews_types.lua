-- Typed models for the Hackernews SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Item
---@field by? string
---@field dead? boolean
---@field deleted? boolean
---@field descendants? number
---@field id number
---@field kids? table
---@field parent? number
---@field parts? table
---@field poll? number
---@field score? number
---@field text? string
---@field time? number
---@field title? string
---@field type? string
---@field url? string

---@class ItemListMatch
---@field id number
---@field print? string

---@class LiveData

---@class LiveDataLoadMatch
---@field print? string

---@class Story

---@class StoryListMatch
---@field print? string

---@class Update
---@field items? table
---@field profiles? table

---@class UpdateListMatch
---@field print? string

---@class User
---@field about? string
---@field created number
---@field id string
---@field karma number
---@field submitted? table

---@class UserListMatch
---@field id string
---@field print? string

local M = {}

return M
