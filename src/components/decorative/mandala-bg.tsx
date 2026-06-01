'use client'

import { motion } from 'framer-motion'

export default function MandalaBg() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
      {/* Primary mandala - slow rotation */}
      <motion.svg
        viewBox="0 0 400 400"
        className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.04]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 200,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Outer circle */}
        <circle cx="200" cy="200" r="195" fill="none" stroke="#B8A422" strokeWidth="1" />
        <circle cx="200" cy="200" r="180" fill="none" stroke="#B8A422" strokeWidth="0.5" />

        {/* Lotus petals - outer ring */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const x1 = 200 + 170 * Math.cos(angle)
          const y1 = 200 + 170 * Math.sin(angle)
          const cx1 = 200 + 120 * Math.cos(angle - 0.3)
          const cy1 = 200 + 120 * Math.sin(angle - 0.3)
          const cx2 = 200 + 120 * Math.cos(angle + 0.3)
          const cy2 = 200 + 120 * Math.sin(angle + 0.3)
          return (
            <path
              key={`petal-outer-${i}`}
              d={`M200,200 Q${cx1},${cy1} ${x1},${y1} Q${cx2},${cy2} 200,200`}
              fill="none"
              stroke="#B8A422"
              strokeWidth="0.8"
            />
          )
        })}

        {/* Inner ring */}
        <circle cx="200" cy="200" r="100" fill="none" stroke="#B8A422" strokeWidth="0.5" />

        {/* Lotus petals - inner ring */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180
          const x1 = 200 + 90 * Math.cos(angle)
          const y1 = 200 + 90 * Math.sin(angle)
          const cx1 = 200 + 60 * Math.cos(angle - 0.4)
          const cy1 = 200 + 60 * Math.sin(angle - 0.4)
          const cx2 = 200 + 60 * Math.cos(angle + 0.4)
          const cy2 = 200 + 60 * Math.sin(angle + 0.4)
          return (
            <path
              key={`petal-inner-${i}`}
              d={`M200,200 Q${cx1},${cy1} ${x1},${y1} Q${cx2},${cy2} 200,200`}
              fill="none"
              stroke="#B8A422"
              strokeWidth="0.6"
            />
          )
        })}

        {/* Center circle */}
        <circle cx="200" cy="200" r="40" fill="none" stroke="#B8A422" strokeWidth="1" />
        <circle cx="200" cy="200" r="20" fill="none" stroke="#B8A422" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="5" fill="#B8A422" opacity="0.5" />

        {/* Decorative lines from center */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 + 22.5) * Math.PI / 180
          const x2 = 200 + 170 * Math.cos(angle)
          const y2 = 200 + 170 * Math.sin(angle)
          return (
            <line
              key={`line-${i}`}
              x1="200"
              y1="200"
              x2={x2}
              y2={y2}
              stroke="#B8A422"
              strokeWidth="0.3"
              opacity="0.5"
            />
          )
        })}
      </motion.svg>

      {/* Secondary mandala - counter-rotation, offset */}
      <motion.svg
        viewBox="0 0 400 400"
        className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] opacity-[0.02] absolute"
        animate={{ rotate: -360 }}
        transition={{
          duration: 300,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <circle cx="200" cy="200" r="190" fill="none" stroke="#0C6775" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="#0C6775" strokeWidth="0.3" />
        <circle cx="200" cy="200" r="110" fill="none" stroke="#0C6775" strokeWidth="0.3" />
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180
          const x1 = 200 + 145 * Math.cos(angle)
          const y1 = 200 + 145 * Math.sin(angle)
          const cx1 = 200 + 100 * Math.cos(angle - 0.5)
          const cy1 = 200 + 100 * Math.sin(angle - 0.5)
          const cx2 = 200 + 100 * Math.cos(angle + 0.5)
          const cy2 = 200 + 100 * Math.sin(angle + 0.5)
          return (
            <path
              key={`petal2-${i}`}
              d={`M200,200 Q${cx1},${cy1} ${x1},${y1} Q${cx2},${cy2} 200,200`}
              fill="none"
              stroke="#0C6775"
              strokeWidth="0.4"
            />
          )
        })}
      </motion.svg>
    </div>
  )
}
