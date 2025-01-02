import { filteredDesktopAppsAtom } from "@src/atoms/filteredDesktopApps";
import { selectedAppIdxAtom } from "@src/atoms/selectedAppIdx";
import { useAtom } from "jotai";

export function FileExplorer() {
  const [selectedAppIdx] = useAtom(selectedAppIdxAtom);
  const [filteredDesktopApps] = useAtom(filteredDesktopAppsAtom);

  return (
    <ul>
      {
        filteredDesktopApps?.map((app, index) => {
          return (
            <li
              key={app.Id}
              className={`flex gap-3 items-center p-2 rounded-md ${selectedAppIdx === index ? 'bg-zinc-900' : 'bg-zinc-800'}`}
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
        })
      }
    </ul>
  )
}
