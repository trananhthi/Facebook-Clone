import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import logo from 'src/assets/images/logo.png'
import defaultAva from 'src/assets/images/default_avatar.png'
import routes from 'src/constants/routes'
import { clearTempAccountAction } from 'src/redux/actions/tempAccountAction'
import { RootState } from 'src/redux/store'

function AuthHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const hanldeLogout = () => {
    setIsMenuOpen(false)
    dispatch(clearTempAccountAction())
    navigate(routes.home)
  }

  return (
    <div className='w-full flex items-center h-[55px] shadow-[0_2px_6px_0px_rgba(0,0,0,0.1)] border bg-white'>
      <a href={routes.home}>
        <img src={logo} alt='icon' className='w-10 h-10 ml-4' />
      </a>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
        <MenuHandler>
          <Button
            variant='text'
            color='blue-gray'
            className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
          >
            <Avatar
              variant='circular'
              size='sm'
              alt='tania andrew'
              className='border border-gray-900 p-0.5'
              src={defaultAva}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
            />
          </Button>
        </MenuHandler>
        <MenuList className='p-1'>
          <MenuItem className='flex items-center gap-2 rounded-none border-b border-gray-500'>
            <Typography as='span' variant='small' className='font-normal' color='black'>
              <div>{useSelector((state: RootState) => state.rootReducer.tempAccountReducer.email)}</div>
            </Typography>
          </MenuItem>
          <MenuItem onClick={hanldeLogout} className='flex items-center gap-2 rounded '>
            <Typography as='span' variant='small' className='font-normal' color='red'>
              Đăng xuất
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
export default AuthHeader
