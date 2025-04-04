import { useEffect, useState } from "react";
import { GetPlugins } from "@wailsjs/go/app/App";
import { app } from "@wailsjs/go/models";
import { PluginLoader } from "./PluginLoader";
import { AppLauncher } from "./AppLauncher";
import { useAtom } from "jotai";
import { inputAtom } from "@src/atoms/input";
import { modeAtom } from "@src/atoms/mode";

type ContentPropsT = {
  filteredDesktopApps: app.DesktopApp[];
  selectedAppidx: number;
}

export function Content({ filteredDesktopApps, selectedAppidx }: ContentPropsT) {
  const [inputValue] = useAtom<string>(inputAtom);
  const [mode, setMode] = useAtom<string>(modeAtom);
  const [plugins, setPlugins] = useState<app.Plugin[]>([]);
  const [plugin, setPlugin] = useState<app.Plugin>();

  const cmds = plugins && plugins.map((p) => p.command)

  function getMode(input: string): string {
    const firstWord = input.split(" ")[0];
    const cmd = cmds && cmds.find((c) => c.cmd === firstWord);
    return cmd?.cmd
  }

  useEffect(() => {
    const mode = getMode(inputValue);
    setMode(mode);
  }, [inputValue]);

  useEffect(() => {
    const el = plugins && plugins.find((p) => p.command.cmd === mode);
    setPlugin(el || undefined);
  }, [inputValue, plugins, mode]);

  useEffect(() => {
    (async () => {
      const response = await GetPlugins();
      setPlugins(response);
    })();
  }, []);

  return (
    <>
      <main className="h-full rounded-lg overflow-hidden mt-2">
        {
          plugin ?
            <PluginLoader plugin={plugin} />
            : <AppLauncher
              filteredDesktopApps={filteredDesktopApps}
              selectedAppidx={selectedAppidx}
            />
        }
      </main>
    </>
  );
}
