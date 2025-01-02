import { ModeENUM } from "@src/atoms/appModes";
import { useAtom } from "jotai";
import { appModeAtom } from "@src/atoms/appModes";
import { inputValueAtom } from "@src/atoms/inputValue";

export function Commands() {
  const [appMode, setAppMode] = useAtom(appModeAtom);
  const [, setInputValue] = useAtom(inputValueAtom);

  const handleCommandClick = (mode: ModeENUM) => {
    setAppMode(mode);
    setInputValue(mode);
  };

  return (
    <div className="space-y-2">
      {Object.entries(ModeENUM).map(([key, value]) => (
        <div key={value}>
          <button
            onClick={() => handleCommandClick(value)}
            className={`block p-2 rounded-md w-full text-left ${appMode === value ? "bg-[#1e2022] text-[#fff]" : "hover:bg-[#333]"}`}
          >
            {key.replace(":", "").replace("_", " ")} {/* Display cleaner labels */}
          </button>
        </div>
      ))}
    </div>
  );
}
