import { Separator } from '@components/ui/separator'

export function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-[#1e2022] h-14 px-2 flex items-center">
      <Separator className="absolute top-0 left-0 right-0 h-px bg-white/20" />
      <div className="flex gap-4 items-center">
      <div className="flex gap-2 items-center">
        <kbd className="px-2 py-1 rounded border border-white/25 shadow-sm text-xs">↵</kbd>
        <span className="text-white/50">Select</span>
      </div>
      <div className="flex gap-2 items-center">
        <kbd className="px-2 py-1 rounded border border-white/25 shadow-sm text-xs">ESC</kbd>
        <span className="text-white/50">Close</span>
      </div>
      </div>
    </footer>
  )
}
