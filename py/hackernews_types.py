# Typed models for the Hackernews SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ItemRequired(TypedDict):
    id: int


class Item(ItemRequired, total=False):
    by: str
    dead: bool
    deleted: bool
    descendant: int
    kid: list
    parent: int
    part: list
    poll: int
    score: int
    text: str
    time: int
    title: str
    type: str
    url: str


class ItemListMatch(TypedDict):
    id: int


class LiveData(TypedDict):
    pass


class LiveDataLoadMatch(TypedDict):
    pass


class Story(TypedDict):
    pass


class StoryListMatch(TypedDict):
    pass


class Update(TypedDict, total=False):
    item: list
    profile: list


class UpdateListMatch(TypedDict, total=False):
    item: list
    profile: list


class UserRequired(TypedDict):
    created: int
    id: str
    karma: int


class User(UserRequired, total=False):
    about: str
    submitted: list


class UserListMatch(TypedDict):
    id: str
