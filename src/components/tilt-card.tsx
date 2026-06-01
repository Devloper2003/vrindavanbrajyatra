'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, MouseEvent, ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  scale?: number
  glareEnabled?: boolean
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 5,
  scale = 1.02,
  glareEnabled = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 300,
    damping: 30,
  })

  const glareBackground = useTransform(
    [x, y],
    ([latestX, latestY]) =>
      `radial-gradient(circle at ${(latestX as number) * 100}% ${(latestY as number) * 100}%, rgba(255,255,255,0.15), transparent 60%)`
  )

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    x.set(px)
    y.set(py)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{ scale }}
      transition={{ scale: { duration: 0.2 } }}
    >
      {children}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            background: glareBackground,
          }}
        />
      )}
    </motion.div>
  )
}
