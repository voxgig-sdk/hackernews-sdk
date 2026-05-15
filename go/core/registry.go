package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewItemEntityFunc func(client *HackernewsSDK, entopts map[string]any) HackernewsEntity

var NewLiveDataEntityFunc func(client *HackernewsSDK, entopts map[string]any) HackernewsEntity

var NewStoryEntityFunc func(client *HackernewsSDK, entopts map[string]any) HackernewsEntity

var NewUpdateEntityFunc func(client *HackernewsSDK, entopts map[string]any) HackernewsEntity

var NewUserEntityFunc func(client *HackernewsSDK, entopts map[string]any) HackernewsEntity

