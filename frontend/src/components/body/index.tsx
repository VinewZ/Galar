import { appModeAtom, ModeENUM } from '@src/atoms/appModes'
import { Commands } from '@src/modes/commands'
import { AppLauncher } from '@src/modes/appLauncher'
import { Math } from '@src/modes/math'
import { useAtom } from 'jotai'


const modeMap: Record<ModeENUM, JSX.Element> = {
  ':app_launcher': <AppLauncher />,
  ':math': <Math />,
  ':cmds': <Commands />,
};

export function Body() {
  const [appMode] = useAtom(appModeAtom)

  return (
    <div className="h-[290px] overflow-y-auto">
      {modeMap[appMode] || <AppLauncher />}
    </div>
  );
}

