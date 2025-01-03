import { useAtom } from "jotai";
import { filteredDesktopAppsAtom } from "@src/atoms/filteredDesktopApps";
import { selectedAppIdxAtom } from "@src/atoms/selectedAppIdx";
import { memo } from "react";

const AppLauncher = memo(() => {
  const [selectedAppIdx] = useAtom(selectedAppIdxAtom);
  const [filteredDesktopApps] = useAtom(filteredDesktopAppsAtom);

  return (
    <ul className="mt-1">
      {filteredDesktopApps?.map((app, index) => {
        return (
          <li
            key={app.Id}
            className={`flex gap-3 items-center p-2 rounded-md ${selectedAppIdx === index && 'bg-[#1e2022]'}`}
          >
            {//<img
              //   src={app.Icon}
              //   alt={app.Name}
              //   className="w-6 h-6 mr-2"
              // />
              // 
            }
            <span>{app.Name}</span>
          </li>
        );
      })}
    </ul>
  );
});

export { AppLauncher };
