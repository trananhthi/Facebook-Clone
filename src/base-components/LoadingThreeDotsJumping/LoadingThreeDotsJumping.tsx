'use client'

import { motion, Variants } from 'motion/react'

interface Props {
  width?: string
  height?: string
  color?: string
}

function LoadingThreeDotsJumping({ width, height, color }: Props) {
  const dotVariants: Variants = {
    jump: {
      y: -6,
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut'
      }
    }
  }

  return (
    <motion.div animate='jump' transition={{ staggerChildren: -0.2, staggerDirection: -1 }} className={`container`}>
      <motion.div className='dot' variants={dotVariants} />
      <motion.div className='dot' variants={dotVariants} />
      <motion.div className='dot' variants={dotVariants} />
      <StyleSheet width={width} height={height} color={color} />
    </motion.div>
  )
}

/**
 * ==============   Styles   ================
 */
function StyleSheet({ width, height, color }: any) {
  return (
    <style>
      {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 4px;
            }

            .dot {
                width: ${width ? width : '10px'};
                height: ${height ? height : '10px'};
                border-radius: 50%;
                background-color: ${color ? color : 'black'};
                will-change: transform;
            }
            `}
    </style>
  )
}

export default LoadingThreeDotsJumping
