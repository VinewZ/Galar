import { Search } from "lucide-react";
import { Input } from "@components/ui/input";
import { ChangeEvent, useEffect, useRef, useCallback, Dispatch, SetStateAction } from "react";
import { useEmitEvent } from "@src/hooks/useEmitEvent";
import { ExecApp, HideApp } from "@wailsjs/go/app/App";
import { app } from "@wailsjs/go/models";
import { useAtom } from "jotai";
import { inputAtom } from "@src/atoms/input";

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
  const [inputValue, setInputValue] = useAtom<string>(inputAtom)
  const [mode] = useAtom<string>(inputAtom);

  function setAndEmitInputValue(value: string) {
    setInputValue(value);
    emitEvent("input:change", { message: value });
  }

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const lowerValue = event.target.value.toLowerCase();
    setAndEmitInputValue(lowerValue);

    if (lowerValue === "") {
      setFilteredDesktopApps(desktopApps);
    } else {
      const filteredApps = desktopApps.filter(({ Name, GenericName, Exec, Keywords }) => {
        const lowerName = Name.toLowerCase();
        const lowerGenericName = GenericName?.toLowerCase();
        const lowerExec = Exec?.toLowerCase();
        const lowerKeywords = Keywords?.map(keyword => keyword.toLowerCase());

        return (
          lowerName.includes(lowerValue) ||
          (lowerGenericName && lowerGenericName.includes(lowerValue)) ||
          (lowerExec && lowerExec.includes(lowerValue)) ||
          (lowerKeywords && lowerKeywords.some(keyword => keyword.includes(lowerValue)))
        );
      });

      setFilteredDesktopApps(filteredApps);
    }

    setSelectionIdx(0);

    document.querySelector<HTMLIFrameElement>("#plugin-iframe")
      ?.contentWindow?.postMessage({ type: "input:change", message: lowerValue }, "*");
  }, [desktopApps, setFilteredDesktopApps]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const selectedApp = filteredDesktopApps[selectionIdx];
      if (selectedApp && mode) {
        HideApp();
        ExecApp(selectedApp);
        setAndEmitInputValue("");
        setSelectionIdx(0)
        setFilteredDesktopApps(desktopApps);
      }
      emitEvent("input:submit", { message: inputValue });
    },
    [setFilteredDesktopApps, desktopApps, filteredDesktopApps, selectionIdx]
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
      className="h-14 bg-[#1e2022] flex gap-3 items-center px-2 rounded-lg m-2 mb-0"
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
