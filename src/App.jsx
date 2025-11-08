import { Suspense, lazy, useMemo, useState } from 'react'
import ChatWindow from './components/ChatWindow'
import VoiceControls from './components/VoiceControls'
import AlyaIdentity from './components/AlyaIdentity'

// Lazy-load heavier visual components to reduce initial lag
const Hero = lazy(() => import('./components/Hero'))
const VideoResponder = lazy(() => import('./components/VideoResponder'))

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'I am Alya-san, your iridescent AI companion. Speak or type a message and I will reply with voice and visuals.' }
  ])

  const lastAssistantMessage = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'assistant') return messages[i].content
    }
    return ''
  }, [messages])

  function addUserMessage(text) {
    if (!text?.trim()) return
    const user = { role: 'user', content: text.trim() }
    setMessages(prev => [...prev, user])

    // Simple local reply stub for demo
    const reply = smartLocalReply(text)
    const assistant = { role: 'assistant', content: reply }
    setTimeout(() => setMessages(prev => [...prev, assistant]), 250)
  }

  function smartLocalReply(text) {
    const t = text.toLowerCase()
    if (t.includes('hello') || t.includes('hi')) return "Hello! I’m Alya-san. How can I help you today?"
    if (t.includes('name')) return "I’m Alya-san — a verified, holographic identity who speaks back."
    if (t.includes('video')) return "I respond with voice and an ambient visual so you can listen while you watch."
    if (t.includes('weather')) return "I can’t fetch live weather here, but I can plan, summarize, or brainstorm with you."
    return `You said: "${text}". I’m here and listening. What would you like to do next?`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900">
      <Suspense fallback={<div className="w-full min-h-[50vh] grid place-items-center text-sm text-gray-500">Loading visual scene…</div>}>
        <Hero />
      </Suspense>

      <main className="mx-auto max-w-6xl px-4 py-8 grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <Suspense fallback={<div className="w-full aspect-video rounded-2xl border grid place-items-center text-sm text-gray-500 bg-white">Loading video responder…</div>}>
            <VideoResponder text={lastAssistantMessage} />
          </Suspense>
          <div className="rounded-2xl border bg-white p-4 md:p-6 shadow">
            <h2 className="font-semibold mb-3">Voice controls</h2>
            <VoiceControls onTranscript={addUserMessage} />
          </div>
        </div>

        <div className="space-y-4">
          <AlyaIdentity />
          <ChatWindow messages={messages} />
          <MessageInput onSend={addUserMessage} />
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500">Built for natural voice conversations with a vivid video response.</footer>
    </div>
  )
}

function MessageInput({ onSend }) {
  const [value, setValue] = useState('')

  function handleSend(e) {
    e.preventDefault()
    onSend?.(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSend} className="w-full flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message and press Enter"
        className="flex-1 rounded-xl border px-4 py-3 text-sm shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button type="submit" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm shadow">
        Send
      </button>
    </form>
  )
}

export default App
