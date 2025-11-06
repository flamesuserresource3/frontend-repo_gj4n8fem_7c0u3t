import Spline from '@splinetool/react-spline'
import { BadgeCheck, User } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] rounded-3xl overflow-hidden border shadow bg-black/5">
      {/* 3D Spline Scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient overlay to enhance contrast; does not block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent" />

      {/* Content overlay */}
      <div className="relative z-10 h-full w-full flex items-end md:items-center">
        <div className="mx-auto max-w-6xl w-full px-4 py-8 md:py-12 flex flex-col md:flex-row md:items-center gap-6">
          <div className="shrink-0">
            <div className="h-14 w-14 rounded-2xl bg-white/90 backdrop-blur grid place-items-center shadow border">
              <User className="text-indigo-600" size={24} />
            </div>
          </div>
          <div className="text-white drop-shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs md:text-sm border border-white/20">
              <span className="opacity-90">Avatar</span>
              <span className="font-semibold">Alya-san</span>
              <BadgeCheck size={16} className="text-sky-300" />
            </div>
            <h1 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight">
              Iridescent identity meets voice-first AI
            </h1>
            <p className="mt-2 md:mt-3 max-w-2xl text-sm md:text-base text-white/90">
              A stylized, holographic profile brought to life. Speak naturally to Alya-san and get vivid, spoken responses with immersive visuals.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
