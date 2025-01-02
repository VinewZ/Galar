import { desktopAppsT } from '@src/App'
import { atom } from "jotai"

export const filteredDesktopAppsAtom = atom<desktopAppsT[]>()
