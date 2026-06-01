'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

export default function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 5 + 2,
      duration: Math.random() * 12 + 18,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.15 + 0.08,
      swayAmount: Math.random() * 30 + 10,
      swayDuration: Math.random() * 4 + 3,
    }))
  , [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(247, 184, 8, ${p.opacity + 0.1}), rgba(184, 164, 34, ${p.opacity}))`,
            boxShadow: `0 0 ${p.size * 2}px rgba(247, 184, 8, ${p.opacity * 0.5})`,
          }}
          initial={{ y: '100%', opacity: 0, x: 0 }}
          animate={{
            y: '-20%',
            opacity: [0, p.opacity, p.opacity, 0],
            x: [0, p.swayAmount, -p.swayAmount, p.swayAmount / 2, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
            x: {
              duration: p.swayDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </div>
  )
}
