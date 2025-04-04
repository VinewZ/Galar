import { Footer } from "@src/components/Footer";
import { app } from "@wailsjs/go/models";
import { memo } from "react";

type AppLauncherPropsT = {
  filteredDesktopApps: app.DesktopApp[];
  selectedAppidx: number;
};

export const AppLauncher = memo(({ filteredDesktopApps, selectedAppidx }: AppLauncherPropsT) => {

  return (
    <>
      <ul className="m-2 mt-0 h-[280px]">
        {filteredDesktopApps?.map((app, index) => {
          return (
            <li
              key={app.Id}
              className={`flex gap-3 items-center p-2 rounded-md ${selectedAppidx === index && 'bg-[#1e2022]'}`}
            >
              <span> {app.Name} </span>
              {app.GenericName && <span className="text-sm text-[#afa99e]"> ({app.GenericName}) </span>}
            </li>
          );
        })}
      </ul>
      <Footer />
    </>
  );
});
