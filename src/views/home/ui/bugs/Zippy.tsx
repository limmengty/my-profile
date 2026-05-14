import { motion } from "framer-motion"

interface Props {
  fleeing: boolean
  caught: boolean
}

export function Zippy({ fleeing, caught }: Props) {
  const d = fleeing ? 0.08 : 0.3

  return (
    <motion.svg
      width="14"
      height="18"
      viewBox="0 0 22 28"
      fill="none"
      animate={caught ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
    >
      {/* Left legs */}
      <motion.path
        d="M 7 10 Q 3 7 1 4"
        stroke="#444"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 7 10 Q 3 7 1 4", "M 7 10 Q 2 8 0 6"] }}
        transition={{ duration: d, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M 7 15 Q 2 14 0 13"
        stroke="#444"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 7 15 Q 2 14 0 13", "M 7 15 Q 2 16 0 16"] }}
        transition={{ duration: d, repeat: Infinity, delay: d / 3, ease: "linear" }}
      />
      <motion.path
        d="M 7 20 Q 3 22 1 25"
        stroke="#444"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 7 20 Q 3 22 1 25", "M 7 20 Q 2 23 1 26"] }}
        transition={{ duration: d, repeat: Infinity, delay: d / 1.5, ease: "linear" }}
      />
      {/* Right legs */}
      <motion.path
        d="M 15 10 Q 19 7 21 4"
        stroke="#444"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 15 10 Q 19 7 21 4", "M 15 10 Q 20 8 22 6"] }}
        transition={{ duration: d, repeat: Infinity, delay: d / 6, ease: "linear" }}
      />
      <motion.path
        d="M 15 15 Q 20 14 22 13"
        stroke="#444"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 15 15 Q 20 14 22 13", "M 15 15 Q 20 16 22 16"] }}
        transition={{ duration: d, repeat: Infinity, delay: d / 2, ease: "linear" }}
      />
      <motion.path
        d="M 15 20 Q 19 22 21 25"
        stroke="#444"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 15 20 Q 19 22 21 25", "M 15 20 Q 20 23 21 26"] }}
        transition={{ duration: d, repeat: Infinity, delay: d / 1.2, ease: "linear" }}
      />

      {/* Abdomen */}
      <ellipse cx="11" cy="18" rx="6" ry="7.5" fill="#424242" />
      {/* Thorax */}
      <ellipse cx="11" cy="10" rx="5" ry="4" fill="#484848" />
      {/* Center line */}
      <line x1="11" y1="11" x2="11" y2="25" stroke="#303030" strokeWidth="0.7" opacity="0.6" />

      {/* Head */}
      <circle cx="11" cy="5" r="4" fill="#484848" />
      {/* Eyes */}
      <circle cx="9" cy="4" r="1.1" fill="#d0d0d0" />
      <circle cx="13" cy="4" r="1.1" fill="#d0d0d0" />
      <circle cx="9.4" cy="3.7" r="0.45" fill="#111" />
      <circle cx="13.4" cy="3.7" r="0.45" fill="#111" />

      {/* Antennae */}
      <motion.path
        d="M 9 2 Q 7 0 5 -1"
        stroke="#444"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 9 2 Q 7 0 5 -1", "M 9 2 Q 6 1 4 0"] }}
        transition={{ duration: fleeing ? 0.08 : 0.6, repeat: Infinity }}
      />
      <motion.path
        d="M 13 2 Q 15 0 17 -1"
        stroke="#444"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M 13 2 Q 15 0 17 -1", "M 13 2 Q 16 1 18 0"] }}
        transition={{ duration: fleeing ? 0.08 : 0.6, repeat: Infinity, delay: 0.08 }}
      />
    </motion.svg>
  )
}
