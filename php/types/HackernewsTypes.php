<?php
declare(strict_types=1);

// Typed models for the Hackernews SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Item entity data model. */
class Item
{
    public ?string $by = null;
    public ?bool $dead = null;
    public ?bool $deleted = null;
    public ?int $descendant = null;
    public int $id;
    public ?array $kid = null;
    public ?int $parent = null;
    public ?array $part = null;
    public ?int $poll = null;
    public ?int $score = null;
    public ?string $text = null;
    public ?int $time = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?string $url = null;
}

/** Request payload for Item#list. */
class ItemListMatch
{
    public int $id;
}

/** LiveData entity data model. */
class LiveData
{
}

/** Match filter for LiveData#load (any subset of LiveData fields). */
class LiveDataLoadMatch
{
}

/** Story entity data model. */
class Story
{
}

/** Match filter for Story#list (any subset of Story fields). */
class StoryListMatch
{
}

/** Update entity data model. */
class Update
{
    public ?array $item = null;
    public ?array $profile = null;
}

/** Match filter for Update#list (any subset of Update fields). */
class UpdateListMatch
{
    public ?array $item = null;
    public ?array $profile = null;
}

/** User entity data model. */
class User
{
    public ?string $about = null;
    public int $created;
    public string $id;
    public int $karma;
    public ?array $submitted = null;
}

/** Request payload for User#list. */
class UserListMatch
{
    public string $id;
}

