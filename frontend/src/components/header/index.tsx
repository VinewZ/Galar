import { ExecApp, HideApp } from "@wailsjs/go/app/App"
import { ChangeEvent, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { selectedAppIdxAtom } from "@src/atoms/selectedAppIdx";
import { filteredDesktopAppsAtom } from "@src/atoms/filteredDesktopApps";
import { inputValueAtom } from "@src/atoms/inputValue";
import { desktopAppsAtom } from "@src/atoms/desktopApps";
import { appModeAtom, ModeENUM } from "@src/atoms/appModes";
import { Input } from "@components/ui/input";
import { desktopAppsT } from "@src/App";
import { Search } from "lucide-react";

export function Header() {
  const [desktopApps] = useAtom(desktopAppsAtom);
  const [selectedAppIdx, setSelectedAppIdx] = useAtom(selectedAppIdxAtom);
  const [filteredDesktopApps, setFilteredDesktopApps] = useAtom(filteredDesktopAppsAtom);
  const [inputValue, setInputValue] = useAtom(inputValueAtom);
  const [, setAppmode] = useAtom(appModeAtom);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setSelectedAppIdx(prev => Math.max(prev - 1, 0));
          break;
        case "ArrowDown":
          if (!filteredDesktopApps || filteredDesktopApps.length === 0) return
          setSelectedAppIdx(prev => Math.min(prev + 1, filteredDesktopApps.length - 1));
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
  }, [filteredDesktopApps?.length])


  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    setSelectedAppIdx(0);
    setInputValue(inputValue);
    setAppmode(determineAppMode(inputValue));
    setFilteredDesktopApps(filterDesktopApps(inputValue));
  }

  function determineAppMode(inputValue: string): ModeENUM {
    const [mode] = inputValue.trim().split(' ');
    return ModeENUM[mode.toUpperCase() as keyof typeof ModeENUM] || ModeENUM[":APP_LAUNCHER"];
  }

  function filterDesktopApps(inputValue: string): desktopAppsT[] {
    if (!desktopApps) return [];
    if (!inputValue) return desktopApps

    const searchValue = inputValue.toLowerCase();
    return desktopApps.filter(app => app.Name.toLowerCase().includes(searchValue));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!filteredDesktopApps || filteredDesktopApps.length === 0) return
    await ExecApp(filteredDesktopApps[selectedAppIdx]);
    await HideApp();
    setInputValue('');
  }

  return (
    <form
      className="h-[50px] max-h-[50px] bg-[#1e2022] flex gap-3 items-center px-2 rounded-lg"
      onSubmit={handleSubmit}>
      <Search color="#afa99e" size={22} />
      <Input
        className="focus-visible:ring-0 border-0 text-xl h-full p-0 m-0 w-full"
        placeholder="Search App"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  )
}
