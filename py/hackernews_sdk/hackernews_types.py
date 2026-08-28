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
    descendants: int
    kids: list
    parent: int
    parts: list
    poll: int
    score: int
    text: str
    time: int
    title: str
    type: str
    url: str


class ItemListMatchRequired(TypedDict):
    id: int


class ItemListMatch(ItemListMatchRequired, total=False):
    print: str


class LiveData(TypedDict):
    pass


class LiveDataLoadMatch(TypedDict, total=False):
    print: str


class Story(TypedDict):
    pass


class StoryListMatch(TypedDict, total=False):
    print: str


class Update(TypedDict, total=False):
    items: list
    profiles: list


class UpdateListMatch(TypedDict, total=False):
    print: str


class UserRequired(TypedDict):
    created: int
    id: str
    karma: int


class User(UserRequired, total=False):
    about: str
    submitted: list


class UserListMatchRequired(TypedDict):
    id: str


class UserListMatch(UserListMatchRequired, total=False):
    print: str
