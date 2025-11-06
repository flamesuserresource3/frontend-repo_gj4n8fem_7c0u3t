import { useEffect, useRef } from 'react'

export default function ChatWindow({ messages, onRetry }) {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="w-full bg-white rounded-2xl shadow border p-4 md:p-6 h-[420px] overflow-y-auto">
      <div className="space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
              {m.content}
              {m.error && (
                <button onClick={() => onRetry?.(i)} className="block mt-2 text-xs underline opacity-80">
                  Retry
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  )
}
