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
---@field descendant? number
---@field id number
---@field kid? table
---@field parent? number
---@field part? table
---@field poll? number
---@field score? number
---@field text? string
---@field time? number
---@field title? string
---@field type? string
---@field url? string

---@class ItemListMatch
---@field id number

---@class LiveData

---@class LiveDataLoadMatch

---@class Story

---@class StoryListMatch

---@class Update
---@field item? table
---@field profile? table

---@class UpdateListMatch
---@field item? table
---@field profile? table

---@class User
---@field about? string
---@field created number
---@field id string
---@field karma number
---@field submitted? table

---@class UserListMatch
---@field id string

local M = {}

return M
