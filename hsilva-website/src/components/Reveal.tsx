import { motion } from 'framer-motion'

type RevealProps = {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}

export default function Reveal({ children, delay = 0, y = 28, className = '' }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
