import { GetApps } from "@wailsjs/go/app/App";
import { Body } from "./components/body";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { useAtom } from "jotai";
import { desktopAppsAtom } from "./atoms/desktopApps";
import { useEffect } from "react";
import { filteredDesktopAppsAtom } from "./atoms/filteredDesktopApps";

export type desktopAppsT = {
  Id: number;
  Name: string;
  Icon: string;
  Exec: string;
  Terminal: string;
};

function App() {
  const [, setDesktopApps] = useAtom(desktopAppsAtom);
  const [, setFilteredDesktopApps] = useAtom(filteredDesktopAppsAtom);

  async function fetchApps() {
    const path = "/usr/share/applications";
    const response: desktopAppsT[] = await GetApps(path);
    setDesktopApps(response);
    setFilteredDesktopApps(response);
  }

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <div id="App" className="bg-[#181a1b] text-[#afa99e] overflow-hidden p-4 relative w-[800px] h-[400px]">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
