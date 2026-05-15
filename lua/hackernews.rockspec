package = "voxgig-sdk-hackernews"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/hackernews-sdk.git"
}
description = {
  summary = "Hackernews SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["hackernews_sdk"] = "hackernews_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
