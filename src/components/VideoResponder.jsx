import { useEffect, useRef } from 'react'

// Simple video response component that speaks text and shows an animated waveform style video
export default function VideoResponder({ text }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (!text) return
    // Speak the response using the Web Speech Synthesis API
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 1
    utter.pitch = 1
    utter.lang = 'en-US'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)

    // Play the decorative video if available
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }, [text])

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border shadow">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="https://cdn.coverr.co/videos/coverr-sound-wave-visualizer-3083/1080p.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-3 right-3 text-white text-sm">
        <p className="line-clamp-3 opacity-90">{text || 'Your AI video reply will appear here with spoken audio.'}</p>
      </div>
    </div>
  )
}
