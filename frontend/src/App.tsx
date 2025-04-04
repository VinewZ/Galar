import { Content } from "@components/Content";
import { Header } from "@components/Header";
import { GetApps } from "@wailsjs/go/app/App";
import { app } from "@wailsjs/go/models";
import { useCallback, useEffect, useState } from "react";

export function App() {
  const [desktopApps, setDesktopApps] = useState<app.DesktopApp[]>([]);
  const [filteredDesktopApps, setFilteredDesktopApps] = useState<app.DesktopApp[]>([]);
  const [selectIdx, setSelectIdx] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const response = await GetApps("/usr/share/applications");
      setDesktopApps(response);
      setFilteredDesktopApps(response);
    })();
  }, []);


  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        setSelectIdx((prevIdx) => {
          if (prevIdx <= 0) return prevIdx;
          const newIdx = prevIdx - 1;
          return newIdx;
        });
        break;
      case "ArrowDown":
        setSelectIdx((prevIdx) => {
          if (prevIdx >= filteredDesktopApps.length - 1) return prevIdx;
          const newIdx = prevIdx + 1;
          return newIdx;
        });
        break;
    }
  }, [filteredDesktopApps.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div id="App" className="bg-[#181a1b] text-[#afa99e] overflow-hidden relative w-[800px] h-[400px] flex flex-col">
      <Header
        desktopApps={desktopApps}
        filteredDesktopApps={filteredDesktopApps}
        setFilteredDesktopApps={setFilteredDesktopApps}
        selectionIdx={selectIdx}
        setSelectionIdx={setSelectIdx}
      />
      <Content
        filteredDesktopApps={filteredDesktopApps}
        selectedAppidx={selectIdx}
      />
    </div>
  );
}
