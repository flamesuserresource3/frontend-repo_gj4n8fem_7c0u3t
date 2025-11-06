import { useEffect, useRef, useState } from 'react'
import { Mic, Square, Play } from 'lucide-react'

export default function VoiceControls({ onTranscript }) {
  const [recording, setRecording] = useState(false)
  const [supported, setSupported] = useState(false)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  useEffect(() => {
    setSupported('MediaRecorder' in window)
  }, [])

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const text = await simpleLocalTranscribe(blob)
        if (text) onTranscript?.(text)
      }

      mediaRecorder.start()
      setRecording(true)
    } catch (e) {
      console.error(e)
      alert('Microphone access is required to record audio.')
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop()
    mediaRecorderRef.current?.stream.getTracks().forEach(t => t.stop())
    setRecording(false)
  }

  // Very lightweight stub transcription using Web Speech API if available
  function simpleLocalTranscribe() {
    return new Promise((resolve) => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SR) {
        // Fall back: simulate transcription notice
        resolve('Transcription demo: audio recorded. Describe what you said here.')
        return
      }
      const rec = new SR()
      rec.lang = 'en-US'
      rec.interimResults = false
      rec.maxAlternatives = 1
      rec.onresult = (ev) => {
        const txt = ev.results?.[0]?.[0]?.transcript
        resolve(txt || '')
      }
      rec.onerror = () => resolve('')
      rec.onend = () => {}
      rec.start()
    })
  }

  if (!supported) {
    return (
      <div className="text-sm text-gray-500">Your browser may not fully support in-browser recording. You can still type messages below.</div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {!recording ? (
        <button
          onClick={startRecording}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 shadow"
        >
          <Mic size={18} /> Start talking
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="inline-flex items-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 shadow"
        >
          <Square size={18} /> Stop
        </button>
      )}
    </div>
  )
}
