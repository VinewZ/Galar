import { GetApps } from "@wailsjs/go/main/App";
import { Body } from "./components/body";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { useAtom } from "jotai";
import { desktopAppsAtom } from "./atoms/desktopApps";
import { useEffect } from "react";
import { filteredDesktopAppsAtom } from "./atoms/filteredDesktopApps";
import { Separator } from "@components/ui/separator";

export type desktopAppsT = {
  Id: number;
  Name: string;
  Icon: string;
  Exec: string;
  Terminal: string;
}

function App() {
  const [, setDesktopApps] = useAtom(desktopAppsAtom);
  const [, setFilteredDesktopApps] = useAtom(filteredDesktopAppsAtom);

  async function fetchApps() {
    const path = "/usr/share/applications";
    const response = await GetApps(path);
    setDesktopApps(response);
    setFilteredDesktopApps(response);
  }

  useEffect(() => {
    fetchApps();
  }, []);


  return (
    <div id="App" className="bg-[#18181a] text-white overflow-hidden">
      <Header />
      <Separator/>
      <Body />
      <Separator/>
      <Footer />
    </div>
  );
}

export default App;
