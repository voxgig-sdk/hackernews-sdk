// Typed models for the Hackernews SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/hackernews-sdk/go/core"
)

// Item is the typed data model for the item entity.
type Item struct {
	By *string `json:"by,omitempty"`
	Dead *bool `json:"dead,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Descendants *int `json:"descendants,omitempty"`
	Id int `json:"id"`
	Kids *[]any `json:"kids,omitempty"`
	Parent *int `json:"parent,omitempty"`
	Parts *[]any `json:"parts,omitempty"`
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
	Items *[]any `json:"items,omitempty"`
	Profiles *[]any `json:"profiles,omitempty"`
}

// UpdateListMatch is the typed request payload for Update.ListTyped.
type UpdateListMatch struct {
	Items *[]any `json:"items,omitempty"`
	Profiles *[]any `json:"profiles,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
