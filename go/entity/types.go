// Typed models for the Hackernews SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Item is the typed data model for the item entity.
type Item struct {
	By *string `json:"by,omitempty"`
	Dead *bool `json:"dead,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Descendant *int `json:"descendant,omitempty"`
	Id int `json:"id"`
	Kid *[]any `json:"kid,omitempty"`
	Parent *int `json:"parent,omitempty"`
	Part *[]any `json:"part,omitempty"`
	Poll *int `json:"poll,omitempty"`
	Score *int `json:"score,omitempty"`
	Text *string `json:"text,omitempty"`
	Time *int `json:"time,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *string `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// ItemListMatch is the typed request payload for Item.ListTyped.
type ItemListMatch struct {
	Id int `json:"id"`
}

// LiveData is the typed data model for the live_data entity.
type LiveData struct {
}

// LiveDataLoadMatch is the typed request payload for LiveData.LoadTyped.
type LiveDataLoadMatch struct {
}

// Story is the typed data model for the story entity.
type Story struct {
}

// StoryListMatch is the typed request payload for Story.ListTyped.
type StoryListMatch struct {
}

// Update is the typed data model for the update entity.
type Update struct {
	Item *[]any `json:"item,omitempty"`
	Profile *[]any `json:"profile,omitempty"`
}

// UpdateListMatch is the typed request payload for Update.ListTyped.
type UpdateListMatch struct {
	Item *[]any `json:"item,omitempty"`
	Profile *[]any `json:"profile,omitempty"`
}

// User is the typed data model for the user entity.
type User struct {
	About *string `json:"about,omitempty"`
	Created int `json:"created"`
	Id string `json:"id"`
	Karma int `json:"karma"`
	Submitted *[]any `json:"submitted,omitempty"`
}

// UserListMatch is the typed request payload for User.ListTyped.
type UserListMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
