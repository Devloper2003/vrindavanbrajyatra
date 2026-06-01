import { Variants, Transition } from 'framer-motion'

// ─── CINEMATIC TRANSITIONS ────────────────────────────────────────
// Slow, Smooth, Buttery, Cinematic, Elegant
// Using cubic bezier curves that create luxurious, film-like motion

export const cinematicTransition: Transition = {
  duration: 1.4,
  ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier: smooth deceleration
}

export const butteryTransition: Transition = {
  duration: 1.6,
  ease: [0.16, 1, 0.3, 1], // Extra smooth, long tail
}

export const elegantTransition: Transition = {
  duration: 1.2,
  ease: [0.25, 0.1, 0.25, 1], // Classic elegant ease
}

export const slowTransition: Transition = {
  duration: 2.0,
  ease: [0.22, 1, 0.36, 1],
}

export const defaultTransition: Transition = {
  duration: 1.4,
  ease: [0.22, 1, 0.36, 1],
}

export const fastTransition: Transition = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1],
}

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 80,
  damping: 20,
  mass: 1.2,
}

export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 60,
  damping: 25,
  mass: 1.5,
}

// ─── CINEMATIC VARIANTS ───────────────────────────────────────────

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: cinematicTransition,
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: butteryTransition,
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: cinematicTransition,
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...cinematicTransition,
      scale: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: cinematicTransition,
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: cinematicTransition,
  },
}

export const slideInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: cinematicTransition,
  },
}

// ─── 3D ANIMATION VARIANTS ────────────────────────────────────────

export const perspective3D: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 8,
    rotateY: -5,
    z: -80,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    z: 0,
    transition: {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const flipIn3D: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -15,
    z: -50,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    z: 0,
    transition: {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const tiltIn3D: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 12,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const card3DEnter: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 10,
    rotateY: 5,
    scale: 0.9,
    z: -100,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    z: 0,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      opacity: { duration: 1.0 },
    },
  },
}

// ─── CINEMATIC TEXT ANIMATIONS ─────────────────────────────────────

export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const textSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const letterStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
}

export const letterFade: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// ─── SHIMMER & GLOW EFFECTS ───────────────────────────────────────

export const shimmerReveal: Variants = {
  hidden: {
    opacity: 0,
    backgroundPosition: '200% center',
  },
  visible: {
    opacity: 1,
    backgroundPosition: '0% center',
    transition: {
      duration: 2.0,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const glowPulse: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: 'brightness(1)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'brightness(1)',
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// ─── VIEWPORT CONFIGS ──────────────────────────────────────────────

export const defaultViewport = {
  once: true as const,
  margin: '-80px' as const,
}

export const earlyViewport = {
  once: true as const,
  margin: '-40px' as const,
}

export const generousViewport = {
  once: true as const,
  margin: '0px' as const,
}

// ─── PARALLAX HELPERS ──────────────────────────────────────────────

export const parallaxSlow = {
  speed: 0.15,
  range: [0, 300] as [number, number],
  output: [0, 45] as [number, number],
}

export const parallaxMedium = {
  speed: 0.3,
  range: [0, 300] as [number, number],
  output: [0, 90] as [number, number],
}

export const parallaxFast = {
  speed: 0.5,
  range: [0, 300] as [number, number],
  output: [0, 150] as [number, number],
}
