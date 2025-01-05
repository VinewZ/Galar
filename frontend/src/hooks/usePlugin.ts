import { app } from "@wailsjs/go/models"
import { useEffect, useState } from "react"

export function usePlugin(plugin: app.Plugin): [string, string] {
  const [jsCode, setJsCode] = useState<string>("")
  const [cssCode, setCssCode] = useState<string>("")

  async function fetchJs(url: string) {
    const response = await fetch(url)
    const text = await response.text()
    setJsCode(text)
  }

  async function fetchCss(url: string) {
    const response = await fetch(url)
    const text = await response.text()
    setCssCode(text)
  }

  useEffect(() => {
    fetchJs(plugin.entry)
    fetchCss(plugin.style)
  }, [plugin])

  return [jsCode, cssCode]
}

