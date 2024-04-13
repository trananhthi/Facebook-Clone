import { Tooltip, IconButton } from '@material-tailwind/react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

interface HeaderNavigationButtonProps {
  content: string
  to: string
  children?: React.ReactNode
}

const HeaderNavigationButtonProps = ({ content, to, children }: HeaderNavigationButtonProps) => {
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
      <NavLink
        to={to}
        className={({ isActive }) =>
          classNames('lg:w-[111px] md:w-[82px] sm:w-[62px] h-[56px] flex justify-center items-center', {
            'border-b-4 border-blue-700': isActive
          })
        }
      >
        <IconButton variant='text' className='py-[23px] lg:px-[55px] md:px-[42px] sm:px-[30px]'>
          {children}
        </IconButton>
      </NavLink>
    </Tooltip>
  )
}

export default HeaderNavigationButtonProps
