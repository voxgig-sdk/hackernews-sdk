package voxgighackernewssdk

import (
	"github.com/voxgig-sdk/hackernews-sdk/core"
	"github.com/voxgig-sdk/hackernews-sdk/entity"
	"github.com/voxgig-sdk/hackernews-sdk/feature"
	_ "github.com/voxgig-sdk/hackernews-sdk/utility"
)

// Type aliases preserve external API.
type HackernewsSDK = core.HackernewsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type HackernewsEntity = core.HackernewsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type HackernewsError = core.HackernewsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewItemEntityFunc = func(client *core.HackernewsSDK, entopts map[string]any) core.HackernewsEntity {
		return entity.NewItemEntity(client, entopts)
	}
	core.NewLiveDataEntityFunc = func(client *core.HackernewsSDK, entopts map[string]any) core.HackernewsEntity {
		return entity.NewLiveDataEntity(client, entopts)
	}
	core.NewStoryEntityFunc = func(client *core.HackernewsSDK, entopts map[string]any) core.HackernewsEntity {
		return entity.NewStoryEntity(client, entopts)
	}
	core.NewUpdateEntityFunc = func(client *core.HackernewsSDK, entopts map[string]any) core.HackernewsEntity {
		return entity.NewUpdateEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.HackernewsSDK, entopts map[string]any) core.HackernewsEntity {
		return entity.NewUserEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewHackernewsSDK = core.NewHackernewsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
