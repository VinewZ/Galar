import { appModeAtom } from '@src/atoms/appModes'
import { FileExplorer } from '@src/modes/fileExplorer'
import { Math } from '@src/modes/math'
import { useAtom } from 'jotai'

export function Body() {
  const [appMode] = useAtom(appModeAtom)
  type appModeT = typeof appMode

  function handleModeChange(mode: appModeT):  JSX.Element {
    switch (mode) {
      case ':file_explorer':
        return <FileExplorer />
      case ':math':
        return <Math />
      default:
        return <FileExplorer />
    }
  }

  return (
    <div className="h-[320px] overflow-y-auto">
    {
      handleModeChange(appMode)
    }
    </div>
  )
}

