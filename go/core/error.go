package core

type HackernewsError struct {
	IsHackernewsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewHackernewsError(code string, msg string, ctx *Context) *HackernewsError {
	return &HackernewsError{
		IsHackernewsError: true,
		Sdk:              "Hackernews",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *HackernewsError) Error() string {
	return e.Msg
}
