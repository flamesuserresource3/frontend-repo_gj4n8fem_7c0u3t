import { Sparkles, ShieldCheck, BadgeCheck } from 'lucide-react'

export default function AlyaIdentity() {
  return (
    <div className="rounded-2xl border bg-white shadow p-5 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base md:text-lg font-semibold">Alya-san</h3>
          <p className="text-xs md:text-sm text-gray-500">Futuristic digital identity • Verified</p>
        </div>
        <BadgeCheck className="text-sky-500" size={20} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl border p-3">
          <Sparkles className="mx-auto text-indigo-600" size={18} />
          <p className="mt-1 text-xs text-gray-500">Iridescent</p>
        </div>
        <div className="rounded-xl border p-3">
          <ShieldCheck className="mx-auto text-indigo-600" size={18} />
          <p className="mt-1 text-xs text-gray-500">Secure</p>
        </div>
        <div className="rounded-xl border p-3">
          <BadgeCheck className="mx-auto text-indigo-600" size={18} />
          <p className="mt-1 text-xs text-gray-500">Verified</p>
        </div>
      </div>
    </div>
  )
}
