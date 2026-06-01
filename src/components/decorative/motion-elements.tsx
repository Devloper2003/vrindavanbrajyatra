'use client'

import { motion, type ReactNode } from 'framer-motion'

// ─── FLOATING ORB DECORATION (Simplified — static, no infinite animation) ──
interface FloatingOrbProps {
  color?: string
  size?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  delay?: number
  className?: string
}

export function FloatingOrb({ color = 'rgba(247, 184, 8, 0.08)', size = 300, top, left, right, bottom, className = '' }: FloatingOrbProps) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        filter: 'blur(40px)',
      }}
    />
  )
}

// ─── TEXT REVEAL ANIMATION ──────────────────────────────────────
interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1.0,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {text}
    </motion.span>
  )
}

// ─── REVEAL LINE ────────────────────────────────────────────────
export function RevealLine({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`h-[2px] bg-gradient-to-r from-transparent via-braj-gold to-transparent ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  )
}

// ─── SECTION DECORATIVE PATTERN (Simplified — static SVG, no infinite rotation) ──
export function SectionPattern({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Top-right mandala — static */}
      <div className="absolute -top-20 -right-20 w-60 h-60 opacity-[0.03]">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="95" fill="none" stroke="#B8A422" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#B8A422" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="#B8A422" strokeWidth="0.3" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180
            const x2 = 100 + 90 * Math.cos(angle)
            const y2 = 100 + 90 * Math.sin(angle)
            return <line key={i} x1="100" y1="100" x2={x2} y2={y2} stroke="#B8A422" strokeWidth="0.3" />
          })}
        </svg>
      </div>
      {/* Bottom-left mandala — static */}
      <div className="absolute -bottom-20 -left-20 w-48 h-48 opacity-[0.03]">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="95" fill="none" stroke="#0C6775" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="#0C6775" strokeWidth="0.3" />
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i * 60 * Math.PI) / 180
            const cx1 = 100 + 55 * Math.cos(angle - 0.4)
            const cy1 = 100 + 55 * Math.sin(angle - 0.4)
            const cx2 = 100 + 55 * Math.cos(angle + 0.4)
            const cy2 = 100 + 55 * Math.sin(angle + 0.4)
            const x1 = 100 + 85 * Math.cos(angle)
            const y1 = 100 + 85 * Math.sin(angle)
            return <path key={i} d={`M100,100 Q${cx1},${cy1} ${x1},${y1} Q${cx2},${cy2} 100,100`} fill="none" stroke="#0C6775" strokeWidth="0.4" />
          })}
        </svg>
      </div>
    </div>
  )
}
