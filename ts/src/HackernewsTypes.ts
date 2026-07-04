// Typed models for the Hackernews SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Item {
  by?: string
  dead?: boolean
  deleted?: boolean
  descendant?: number
  id: number
  kid?: any[]
  parent?: number
  part?: any[]
  poll?: number
  score?: number
  text?: string
  time?: number
  title?: string
  type?: string
  url?: string
}

export interface ItemListMatch {
  id: number
}

export interface LiveData {
}

export type LiveDataLoadMatch = Partial<LiveData>

export interface Story {
}

export type StoryListMatch = Partial<Story>

export interface Update {
  item?: any[]
  profile?: any[]
}

export type UpdateListMatch = Partial<Update>

export interface User {
  about?: string
  created: number
  id: string
  karma: number
  submitted?: any[]
}

export interface UserListMatch {
  id: string
}

