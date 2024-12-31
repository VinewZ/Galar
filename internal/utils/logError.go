package utils

import (
	"log"
	"os"
)

func LogError(err error, message string, exit bool) {
	if err != nil {
		log.Printf("%s: %v", message, err)
	}

  if exit {
    os.Exit(1)
  }
}
