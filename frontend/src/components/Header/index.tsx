import { Search } from "lucide-react";
import { Input } from "@components/ui/input";
import { ChangeEvent, useEffect, useRef, useCallback, useState, Dispatch, SetStateAction } from "react";
import { useEmitEvent } from "@src/hooks/useEmitEvent";
import { ExecApp, HideApp } from "@wailsjs/go/app/App";
import { app } from "@wailsjs/go/models";

type HeaderPropsT = {
  desktopApps: app.DesktopApp[];
  filteredDesktopApps: app.DesktopApp[];
  setFilteredDesktopApps: Dispatch<SetStateAction<app.DesktopApp[]>>;
  selectionIdx: number;
  setSelectionIdx: Dispatch<SetStateAction<number>>;
};

export function Header({ desktopApps, filteredDesktopApps, setFilteredDesktopApps, selectionIdx, setSelectionIdx }: HeaderPropsT) {
  const emitEvent = useEmitEvent();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  // Corrected filtering logic
  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
    emitEvent("input:change", { message: value });

    const filteredApps = value === ""
      ? desktopApps
      : desktopApps.filter((app) => app.Name.toLowerCase().includes(value));

    setFilteredDesktopApps(filteredApps);
    setSelectionIdx(0); // Reset selection when filtering changes

    // Send input event to iframe
    const iframe = document.querySelector("#plugin-iframe") as HTMLIFrameElement;
    iframe?.contentWindow?.postMessage({ type: "input:change", message: value }, "*");
  }, [emitEvent, desktopApps, setFilteredDesktopApps]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const selectedApp = filteredDesktopApps[selectionIdx];
      if (selectedApp) {
        await ExecApp(selectedApp);
      }
      await HideApp();
      setInputValue("");
      emitEvent("input:change", { message: "" });
      setFilteredDesktopApps(desktopApps);
      setSelectionIdx(0); // Reset selection after submit
    },
    [emitEvent, setFilteredDesktopApps, desktopApps, filteredDesktopApps, selectionIdx]
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
      inputRef.current?.focus();
    }
  }, [filteredDesktopApps.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <form
      className="h-14 bg-[#1e2022] flex gap-3 items-center px-2 rounded-lg"
      onSubmit={handleSubmit}
    >
      <Search className="size-6" />
      <Input
        ref={inputRef}
        className="focus-visible:ring-0 border-0 text-xl h-full p-0 m-0 w-full"
        placeholder="Search"
        onChange={handleOnChange}
        value={inputValue}
      />
    </form>
  );
}
