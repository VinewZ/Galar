import { atom } from "jotai"

export enum ModeENUM {
  ":FILE_EXPLORER" = ':file_explorer',
  ":MATH" = ':math',
  ":CMDS" = ':cmds'
}

export const appModeAtom = atom(ModeENUM[":FILE_EXPLORER"])
