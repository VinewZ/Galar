import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import { useAtom } from "jotai";
import { inputValueAtom } from "@src/atoms/inputValue";
import { Separator } from "@src/components/ui/separator";

export function Math() {
  const [ipValue] = useAtom(inputValueAtom);
  const [result, setResult] = useState<string | null>(null);

  // Remove the ":math" prefix from the input if it exists
  const expression = ipValue.startsWith(":math") ? ipValue.replace(":math", "").trim() : ipValue;

  useEffect(() => {
    if (!expression) {
      setResult(null);
      return;
    }

    try {
      const calcResult = evaluate(expression);
      setResult(calcResult.toString());
    } catch (error) {
      console.error(error);
    }
  }, [expression]);

  return (
    <div className="flex w-full h-full">
      <div className="grid place-content-center w-1/2 text-4xl p-4">
        <span>{expression || "Expression"}</span>
      </div>
      <Separator orientation="vertical" />
      <div className="grid place-content-center w-1/2 text-4xl p-4">
        <span>{result || "Result"}</span>
      </div>
    </div>
  );
}
