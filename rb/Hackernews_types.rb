# frozen_string_literal: true

# Typed models for the Hackernews SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Item entity data model.
#
# @!attribute [rw] by
#   @return [String, nil]
#
# @!attribute [rw] dead
#   @return [Boolean, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] descendant
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] kid
#   @return [Array, nil]
#
# @!attribute [rw] parent
#   @return [Integer, nil]
#
# @!attribute [rw] part
#   @return [Array, nil]
#
# @!attribute [rw] poll
#   @return [Integer, nil]
#
# @!attribute [rw] score
#   @return [Integer, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
#
# @!attribute [rw] time
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Item = Struct.new(
  :by,
  :dead,
  :deleted,
  :descendant,
  :id,
  :kid,
  :parent,
  :part,
  :poll,
  :score,
  :text,
  :time,
  :title,
  :type,
  :url,
  keyword_init: true
)

# Request payload for Item#list.
#
# @!attribute [rw] id
#   @return [Integer]
ItemListMatch = Struct.new(
  :id,
  keyword_init: true
)

# LiveData entity data model.
class LiveData
end

# Match filter for LiveData#load (any subset of LiveData fields).
class LiveDataLoadMatch
end

# Story entity data model.
class Story
end

# Match filter for Story#list (any subset of Story fields).
class StoryListMatch
end

# Update entity data model.
#
# @!attribute [rw] item
#   @return [Array, nil]
#
# @!attribute [rw] profile
#   @return [Array, nil]
Update = Struct.new(
  :item,
  :profile,
  keyword_init: true
)

# Match filter for Update#list (any subset of Update fields).
#
# @!attribute [rw] item
#   @return [Array, nil]
#
# @!attribute [rw] profile
#   @return [Array, nil]
UpdateListMatch = Struct.new(
  :item,
  :profile,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] about
#   @return [String, nil]
#
# @!attribute [rw] created
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] karma
#   @return [Integer]
#
# @!attribute [rw] submitted
#   @return [Array, nil]
User = Struct.new(
  :about,
  :created,
  :id,
  :karma,
  :submitted,
  keyword_init: true
)

# Request payload for User#list.
#
# @!attribute [rw] id
#   @return [String]
UserListMatch = Struct.new(
  :id,
  keyword_init: true
)

