import { useState, useEffect } from "react"
import { evaluate } from "mathjs"
import { useAtom } from "jotai"
import { inputValueAtom } from "@src/atoms/inputValue"
import { Separator } from "@src/components/ui/separator"

export function Math() {
  const [ipValue] = useAtom(inputValueAtom)
  const [result, setResult] = useState<string | null>(null)
  const expression = ipValue.split(' ').slice(1).join(' ')

  useEffect(() => {
    try {
      const calcResult = evaluate(expression)
      setResult(calcResult.toString())
    } catch (error) {
      setResult('')
    }

  }, [ipValue])

  return (
    <div className="flex w-full h-full">
      <div className="grid place-content-center w-1/2 text-4xl p-4">
      {expression}
      </div>
      <Separator orientation="vertical"/>
      <div className="grid place-content-center w-1/2 text-4xl p-4">
      {
        result != "" ? result : ""
      }
      </div>
    </div>
  )
}
