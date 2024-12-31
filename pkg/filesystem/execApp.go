package filesystem

import (
	"os"
	"os/exec"
	"strings"
)


func ExecApp(execCmd string) error {
  cmd := exec.Command(cleanCmd(execCmd))
  cmd.Stdout = os.Stdout

  err := cmd.Start()
  if err != nil {
    return err
  }

  return nil
}

func cleanCmd(s string) string {
  split := strings.Split(s, " ")
  cmd := split[0]

  return cmd
}
