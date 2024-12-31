package ui

import (
	"strings"
)

func SetMode(str string) Mode {
	var md string
	if len(str) > 0 {
		md = strings.ToLower(strings.Split(str, " ")[0])
	}

	switch md {
	case "$":
		return CURR_CONVERTER
	case "math":
		return MATH
	default:
		return FILE_EXPLORER
	}
}

