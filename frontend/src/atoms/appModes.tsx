import { atom } from "jotai"

export enum ModeENUM {
  ":APP_LAUNCHER" = ':app_launcher',
  ":MATH" = ':math',
  ":CMDS" = ':cmds'
}

export const appModeAtom = atom(ModeENUM[":APP_LAUNCHER"])
