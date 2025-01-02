import { atom } from "jotai"

export enum ModeENUM {
  ":FILE_EXPLORER" = ':file_explorer',
  ":MATH" = ':math',
}

export const appModeAtom = atom(ModeENUM[":FILE_EXPLORER"])
