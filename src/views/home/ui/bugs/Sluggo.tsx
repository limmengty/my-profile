import { motion } from "framer-motion"

interface Props {
  fleeing: boolean
  caught: boolean
}

export function Sluggo({ fleeing, caught }: Props) {
  const d = fleeing ? 0.16 : 0.6

  return (
    <motion.svg
      width="20"
      height="26"
      viewBox="0 0 30 38"
      fill="none"
      animate={caught ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      {/* Left legs — curved outward */}
      <motion.path
        d="M 10 13 Q 4 9 1 5"
        stroke="#3a3a3a"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 10 13 Q 4 9 1 5", "M 10 13 Q 3 10 0 7"] }}
        transition={{ duration: d, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 9 20 Q 2 19 0 17"
        stroke="#3a3a3a"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 9 20 Q 2 19 0 17", "M 9 20 Q 2 21 0 21"] }}
        transition={{ duration: d, repeat: Infinity, delay: d / 3, ease: "easeInOut" }}
      />
      <motion.path
        d="M 10 27 Q 4 29 1 33"
        stroke="#3a3a3a"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 10 27 Q 4 29 1 33", "M 10 27 Q 3 31 1 35"] }}
        transition={{ duration: d, repeat: Infinity, delay: d / 1.5, ease: "easeInOut" }}
      />
      {/* Right legs */}
      <motion.path
        d="M 20 13 Q 26 9 29 5"
        stroke="#3a3a3a"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 20 13 Q 26 9 29 5", "M 20 13 Q 27 10 30 7"] }}
        transition={{ duration: d, repeat: Infinity, delay: d / 6, ease: "easeInOut" }}
      />
      <motion.path
        d="M 21 20 Q 28 19 30 17"
        stroke="#3a3a3a"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 21 20 Q 28 19 30 17", "M 21 20 Q 28 21 30 21"] }}
        transition={{ duration: d, repeat: Infinity, delay: d / 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M 20 27 Q 26 29 29 33"
        stroke="#3a3a3a"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 20 27 Q 26 29 29 33", "M 20 27 Q 27 31 29 35"] }}
        transition={{ duration: d, repeat: Infinity, delay: d / 1.2, ease: "easeInOut" }}
      />

      {/* Abdomen — wide round */}
      <ellipse cx="15" cy="24" rx="8" ry="10" fill="#383838" />
      {/* Thorax */}
      <ellipse cx="15" cy="14" rx="6.5" ry="5" fill="#404040" />
      {/* Center line */}
      <line x1="15" y1="15" x2="15" y2="33" stroke="#282828" strokeWidth="0.8" opacity="0.7" />

      {/* Head */}
      <circle cx="15" cy="7" r="5.5" fill="#404040" />
      {/* Eyes */}
      <circle cx="12.2" cy="5.8" r="1.5" fill="#d8d8d8" />
      <circle cx="17.8" cy="5.8" r="1.5" fill="#d8d8d8" />
      <circle cx="12.6" cy="5.4" r="0.6" fill="#111" />
      <circle cx="18.2" cy="5.4" r="0.6" fill="#111" />

      {/* Antennae */}
      <motion.path
        d="M 12.5 2.5 Q 9 0 7 -2"
        stroke="#3a3a3a"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 12.5 2.5 Q 9 0 7 -2", "M 12.5 2.5 Q 8 1 6 -1"] }}
        transition={{ duration: fleeing ? 0.12 : 0.9, repeat: Infinity }}
      />
      <motion.path
        d="M 17.5 2.5 Q 21 0 23 -2"
        stroke="#3a3a3a"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 17.5 2.5 Q 21 0 23 -2", "M 17.5 2.5 Q 22 1 24 -1"] }}
        transition={{ duration: fleeing ? 0.12 : 0.9, repeat: Infinity, delay: 0.12 }}
      />
    </motion.svg>
  )
}
