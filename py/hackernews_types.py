# Typed models for the Hackernews SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Item:
    id: int
    by: Optional[str] = None
    dead: Optional[bool] = None
    deleted: Optional[bool] = None
    descendant: Optional[int] = None
    kid: Optional[list] = None
    parent: Optional[int] = None
    part: Optional[list] = None
    poll: Optional[int] = None
    score: Optional[int] = None
    text: Optional[str] = None
    time: Optional[int] = None
    title: Optional[str] = None
    type: Optional[str] = None
    url: Optional[str] = None


@dataclass
class ItemListMatch:
    id: int


@dataclass
class LiveData:
    pass


@dataclass
class LiveDataLoadMatch:
    pass


@dataclass
class Story:
    pass


@dataclass
class StoryListMatch:
    pass


@dataclass
class Update:
    item: Optional[list] = None
    profile: Optional[list] = None


@dataclass
class UpdateListMatch:
    item: Optional[list] = None
    profile: Optional[list] = None


@dataclass
class User:
    created: int
    id: str
    karma: int
    about: Optional[str] = None
    submitted: Optional[list] = None


@dataclass
class UserListMatch:
    id: str

