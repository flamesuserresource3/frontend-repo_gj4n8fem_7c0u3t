import { useMemo, useState } from 'react'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import VoiceControls from './components/VoiceControls'
import VideoResponder from './components/VideoResponder'

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey! I am your AI companion. Speak or type a message and I will reply with voice and an animated video.' }
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

    // Very simple on-device response for demo purposes
    const reply = smartLocalReply(text)
    const assistant = { role: 'assistant', content: reply }
    setTimeout(() => setMessages(prev => [...prev, assistant]), 300)
  }

  function smartLocalReply(text) {
    const t = text.toLowerCase()
    if (t.includes('hello') || t.includes('hi')) return "Hello! Great to hear your voice. How can I help you today?"
    if (t.includes('weather')) return "I can't fetch live weather here, but you can ask me to summarize, plan, or brainstorm anything."
    if (t.includes('name')) return "I'm your friendly AI. I speak back and show an ambient video for responses."
    if (t.includes('video')) return "You're seeing a waveform video as I talk. I can also keep chatting—ask me anything!"
    return `You said: "${text}". I'm here and listening. What would you like to do next?`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <VideoResponder text={lastAssistantMessage} />
          <div className="rounded-2xl border bg-white p-4 md:p-6 shadow">
            <h2 className="font-semibold mb-3">Voice controls</h2>
            <VoiceControls onTranscript={addUserMessage} />
          </div>
        </div>

        <div className="space-y-4">
          <ChatWindow messages={messages} />
          <MessageInput onSend={addUserMessage} />
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500">Built for natural, voice-first conversations with a simple video response.</footer>
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
