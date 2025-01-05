import { app } from "@wailsjs/go/models";
import { memo } from "react";

type AppLauncherPropsT = {
  filteredDesktopApps: app.DesktopApp[];
  selectedAppidx: number;
};

const AppLauncher = memo(({filteredDesktopApps, selectedAppidx}: AppLauncherPropsT) => {

  return (
    <ul className="mt-1">
      {filteredDesktopApps?.map((app, index) => {
        return (
          <li
            key={app.Id}
            className={`flex gap-3 items-center p-2 rounded-md ${selectedAppidx === index && 'bg-[#1e2022]'}`}
          >
            <span>{app.Name}</span>
          </li>
        );
      })}
    </ul>
  );
});

export { AppLauncher };
