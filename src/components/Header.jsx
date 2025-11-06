import { Bot, Video, Mic } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white grid place-items-center shadow">
            <Bot size={22} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">AI Talk & Video</h1>
            <p className="text-xs text-gray-500">Speak naturally, get voice and visual responses</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-gray-500">
          <Video size={18} />
          <Mic size={18} />
        </div>
      </div>
    </header>
  )
}
