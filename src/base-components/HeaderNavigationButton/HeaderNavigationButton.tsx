import { Tooltip, IconButton } from '@material-tailwind/react'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderNavigationButtonProps {
  content: string
  to: string
  children?: React.ReactNode
  isActive: boolean
  onTabChange: any
  direction: number
}

const HeaderNavigationButton = ({
  content,
  to,
  children,
  isActive,
  onTabChange,
  direction
}: HeaderNavigationButtonProps) => {
  const tabVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? '100%' : '-100%'
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? '-100%' : '100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    })
  }

  return (
    <Tooltip
      content={content}
      animate={{
        mount: {
          transition: {
            delay: 0.5
          }
        }
      }}
    >
      <div className='relative group cursor-pointer' onClick={() => onTabChange(to)}>
        <NavLink
          to={to}
          className={`lg:w-[111px] md:w-[82px] sm:w-[62px] h-[56px] flex justify-center items-center relative z-10 px-4 py-2 transition-colors duration-200 ${
            isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <IconButton variant='text' className='py-[23px] lg:px-[55px] md:px-[42px] sm:px-[30px]'>
            {children}
          </IconButton>
        </NavLink>

        <AnimatePresence custom={direction}>
          {isActive && (
            <motion.div
              variants={tabVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              custom={direction}
              className='absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full'
              style={{ transformOrigin: 'center', willChange: 'transform' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </Tooltip>
  )
}

export default HeaderNavigationButton
