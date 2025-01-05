import { useEffect, useState } from "react";
import { GetPlugins } from "@wailsjs/go/app/App";
import { app } from "@wailsjs/go/models";
import { PluginLoader } from "./PluginLoader";
import { useListenToEvent } from "@src/hooks/useListenEvent";
import { AppLauncher } from "./AppLauncher";

type ContentPropsT = {
  filteredDesktopApps: app.DesktopApp[];
  selectedAppidx: number;
}

export function Content({ filteredDesktopApps, selectedAppidx }: ContentPropsT) {
  const [plugins, setPlugins] = useState<app.Plugin[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [plugin, setPlugin] = useState<app.Plugin | undefined>(undefined);

  const cmds = plugins.map((p) => p.command);
  const mode = getMode(inputValue);

  useListenToEvent("input:change", (detail) => {
    setInputValue(detail.message);
  });

  function getMode(input: string): string | undefined {
    if (input === "") return;
    const firstWord = input.split(" ")[0];
    const cmd = cmds.find((c) => c.cmd === firstWord);
    return cmd?.cmd;
  }

  useEffect(() => {
    const el = plugins.find((p) => p.command.cmd === mode);
    setPlugin(el || undefined);
  }, [inputValue, plugins, mode]);

  useEffect(() => {
    (async () => {
      const response = await GetPlugins();
      setPlugins(response);
    })();
  }, []);

  return (
    <main className="h-full rounded-lg overflow-hidden my-2">
      {
        plugin ?
          <PluginLoader plugin={plugin} />
          : <AppLauncher
            filteredDesktopApps={filteredDesktopApps}
            selectedAppidx={selectedAppidx}
          />
      }
    </main>
  );
}
