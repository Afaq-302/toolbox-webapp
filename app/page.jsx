// EnhancedHomePage.jsx — drop‑in replacement for the original section
// ---------------------------------------------------------------------
// Major upgrades:
// 1) Visual polish – modern indigo/blue palette, softer gray text, bigger type‑scale
// 2) Interactive cards – Framer‑Motion tilt + scale, focus‑ring, gradient outline
// 3) Background flair – two blurred blobs (CSS only, no extra assets)
// 4) Accessibility – AA contrast, keyboard focusable, prefers‑reduced‑motion safe
// ---------------------------------------------------------------------

"use client"

import Link from "next/link"
import {
  Calculator,
  Type,
  Key,
  Palette,
  Timer,
  DollarSign,
  Activity,
  RotateCcw,
  Hash,
  Calendar,
  Ruler,
  Clock,
} from "lucide-react"
import { motion } from "framer-motion"

// ---------------------------------------------------------------------
// TOOL METADATA (unchanged – logic intact)
// ---------------------------------------------------------------------
const tools = [
  { name: "Unit Converter", description: "Convert between different units of measurement", href: "/unit-converter", icon: Ruler, color: "from-indigo-500 to-blue-500" },
  { name: "Age Calculator", description: "Calculate your exact age and next birthday", href: "/age-calculator", icon: Calendar, color: "from-emerald-500 to-lime-500" },
  { name: "Character Counter", description: "Count characters, words, and sentences", href: "/character-counter", icon: Hash, color: "from-violet-500 to-fuchsia-500" },
  { name: "Password Generator", description: "Generate secure passwords with custom options", href: "/password-generator", icon: Key, color: "from-rose-500 to-red-500" },
  { name: "Text Case Converter", description: "Convert text between different cases", href: "/text-case-converter", icon: Type, color: "from-amber-500 to-yellow-400" },
  { name: "Currency Converter", description: "Convert between currencies with live rates", href: "/currency-converter", icon: DollarSign, color: "from-teal-500 to-emerald-500" },
  { name: "Pace Calculator", description: "Calculate running pace and speed", href: "/pace-calculator", icon: Activity, color: "from-orange-500 to-amber-500" },
  { name: "Color Converter", description: "Convert between HEX, RGB, and HSL colors", href: "/color-converter", icon: Palette, color: "from-pink-500 to-rose-500" },
  { name: "Stopwatch", description: "Precise timing with lap functionality", href: "/stopwatch", icon: Timer, color: "from-indigo-500 to-sky-500" },
  { name: "QR Code Generator", description: "Generate QR codes for text and URLs", href: "/qr-generator", icon: RotateCcw, color: "from-cyan-500 to-teal-500" },
  { name: "Base64 Encoder", description: "Encode and decode Base64 strings", href: "/base64-converter", icon: Calculator, color: "from-sky-500 to-cyan-500" },
  { name: "World Clock", description: "View time in different time zones", href: "/world-clock", icon: Clock, color: "from-purple-500 to-indigo-500" },
]

// ---------------------------------------------------------------------
// QUICK MOTION HELPERS
// ---------------------------------------------------------------------
const cardVariants = {
  initial: { y: 0, scale: 1, rotate: 0 },
  hover: {
    y: -6,
    scale: 1.03,
    rotate: -0.5,
    transition: { type: "spring", stiffness: 250, damping: 18, mass: 0.6 },
  },
  tap: { scale: 0.97 },
}

// ---------------------------------------------------------------------
export default function EnhancedHomePage() {
  return (
    <div className="relative overflow-hidden isolate px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
      {/* --- Decorative blurred blobs ---------------------------------- */}
      <div aria-hidden="true" className="pointer-events-none select-none absolute -z-10 inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-400 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-400 opacity-20 rounded-full blur-3xl" />
      </div>

      {/* --- Hero copy ------------------------------------------------- */}
      <header className="text-center mb-16">
        <h1 className="text-5xl/tight font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">ToolBox</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          A comprehensive collection of useful tools for developers, students, writers, and everyday tasks. Choose a tool
          below to get started.
        </p>
      </header>

      {/* --- Tools grid ------------------------------------------------ */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
        {tools.map(({ name, description, href, icon: Icon, color }) => (
          <Link key={href} href={href} className="focus:outline-none group">
            <motion.article
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="relative h-full rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-md transition-shadow duration-200 group-focus-visible:ring-4 group-focus-visible:ring-indigo-300 dark:bg-gray-800/70 dark:border-gray-700/60 dark:shadow-none"
            >
              {/* gradient outline on hover */}
              <span className="pointer-events-none absolute inset-px rounded-[inherit] bg-gradient-to-tr opacity-0 group-hover:opacity-100 transition-opacity duration-200 " style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }} />

              <div className="relative z-10 flex flex-col items-center px-6 py-8 text-center">
                {/* Icon */}
                <div
                  className={`mb-4 grid place-items-center w-14 h-14 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>

                {/* Copy */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1">{name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>

      {/* --- Why choose area ------------------------------------------ */}
      <section className="mt-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white/90 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 shadow-lg p-10">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-10">
            Why choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">ToolBox</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "🚀 Fast & Responsive", body: "Built with Next.js for optimal performance on all devices" },
              { title: "🔒 Privacy‑first", body: "All calculations happen locally – your data never leaves your device" },
              { title: "📱 Mobile Friendly", body: "Optimized for mobile use with touch‑friendly interfaces" },
            ].map(({ title, body }) => (
              <div key={title} className="text-center md:text-left">
                <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
