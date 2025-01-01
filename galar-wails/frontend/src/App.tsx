import { ExecApp, GetApps } from "@wailsjs/go/main/App";
import { Quit } from "@wailsjs/runtime/runtime";
import { useEffect, useRef, useState } from 'react';
import { Input } from "./components/input";

type DesktopApps = {
  Name: string;
  Icon: string;
  Exec: string;
  Terminal: string;
}

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [desktopApps, setDesktopApps] = useState<DesktopApps[]>([]);
  const [search, setSearch] = useState('');
  const filteredApps = desktopApps.filter(app => {
    return app.Name.toLowerCase().includes(search.toLowerCase());
  });
  const [appIdx, setAppIdx] = useState(0);

  async function fetchApps() {
    const path = "/usr/share/applications";
    const response = await GetApps(path);
    setDesktopApps(response);
  }

  useEffect(() => {
    fetchApps();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setAppIdx(prev => Math.max(prev - 1, 0));
          break;
        case "ArrowDown":
          setAppIdx(prev => Math.min(prev + 1, filteredApps.length - 1));
          break;
        default:
          inputRef.current?.focus();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredApps.length])

  return (
    <div id="App" className="bg-slate-800 text-white p-4 overflow-hidden">
      <form onSubmit={async (e) => {
        e.preventDefault()
        await ExecApp(filteredApps[appIdx]);
        Quit()
      }}>
        <Input
          innerRef={inputRef}
          value={search}
          onChange={(e) => {
            setAppIdx(0);
            setSearch(e.target.value);
          }}
        />
      </form>
      <div className="h-80 max-h-80">
        {
          filteredApps.map((app, index) => {
            return (
              <div
                key={index}
                className={`flex items-center p-2 rounded-md ${appIdx === index ? 'bg-slate-900' : 'bg-slate-800'}`}
              >
                <div className="app-name">{app.Name}</div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default App;
