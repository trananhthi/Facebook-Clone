import {
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
  Tooltip,
  Card,
  CardBody
} from '@material-tailwind/react'
import { useState } from 'react'
import { useNavigate, NavLink, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import logo from 'src/assets/images/logo.png'
import routes from 'src/constants/routes'
import { clearTempAccountAction } from 'src/redux/actions/tempAccountAction'
import { RootState } from 'src/redux/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import AccountOfHeader from './components/AccountOfHeader'
import NotifyOfHeader from './components/NotifyOfHeader'

function HomeHeader() {
  const location = useLocation()
  // const [isMessengerOpen, setIsMessengerOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const hanldeLogout = () => {
    setIsMenuOpen(false)
    dispatch(clearTempAccountAction())
    navigate(routes.home)
  }
  return (
    <div
      id='home-header'
      className='fixed z-[9999] top-0 w-full flex items-center justify-between h-[56px] shadow-[0_2px_6px_0px_rgba(0,0,0,0.1)] border bg-white'
    >
      {/* search */}
      <div className='w-[360px]'>
        <Card className={`w-[320px] absolute rounded-t-none bg-white -mt-2 ${isFocus ? '' : 'hidden'}`}>
          <CardBody className='flex gap-2'>
            <Typography className='mt-11 ml-9 text-gray-500'>Không có tìm kiếm nào gần đây</Typography>
          </CardBody>
        </Card>
        <div className='flex gap-2'>
          <Link to={routes.home}>
            <img
              src={logo}
              alt='icon'
              className={`w-10 h-10 ml-4 ${
                isFocus ? 'animate-flip-out-hor-top-logo hidden' : 'animate-flip-in-hor-bottom-logo'
              }`}
            />
          </Link>
          <IconButton
            variant='text'
            onClick={() => setIsFocus(false)}
            className={`w-10 h-10 rounded-full ml-0 z-[999] ${
              isFocus ? 'animate-slide-in-right-button' : 'animate-flip-out-hor-top-logo hidden'
            }`}
          >
            <FontAwesomeIcon icon={faArrowLeft} className='w-[18px] h-[18px] text-gray-700 ' />
          </IconButton>
          <div className='flex flex-col gap-x-2 sm:flex-row sm:items-center'>
            <div className='relative w-full gap-2 md:w-max '>
              <Input
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                type='text'
                placeholder='Tìm kiếm trên Facebook'
                containerProps={{
                  className: `${isFocus ? 'w-[246px]' : 'w-[230px]'} rounded-full bg-[#f0f2f5]`
                }}
                className={`text-black border-none z-[99] ${
                  isFocus ? 'animate-slide-left-search' : 'animate-slide-right-search'
                }  !border-t-blue-gray-300 pl-9 placeholder:text-gray-500 focus:!border-blue-gray-300`}
                labelProps={{
                  className: ' before:content-none after:content-none'
                }}
                crossOrigin={undefined}
              />
              <div
                className={`!absolute left-3 top-[8px] ${
                  isFocus ? 'animate-slide-out-left-search' : 'animate-slide-in-left-search'
                }`}
              >
                <FontAwesomeIcon className='text-gray-500' icon={faMagnifyingGlass} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* home,friend, group */}
      <div className='flex gap-1'>
        <Tooltip content='Trang chủ' className='delay-500'>
          <NavLink
            to={routes.home}
            className={({ isActive }) =>
              classNames('w-[111px] h-[56px] flex justify-center items-center', {
                'border-b-4 border-blue-700': isActive
              })
            }
          >
            <IconButton
              variant='text'
              id='home'
              className='bg-transparent py-[23px] px-[55px] active:hover:bg-transparent'
            >
              {location.pathname === routes.home ? (
                <svg viewBox='0 0 24 24' width='1.5rem' height='1.5rem' fill='#0866ff'>
                  <path d='M9.464 1.286C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977zM10.5 13A1.5 1.5 0 0 0 9 14.5V21h6v-6.5a1.5 1.5 0 0 0-1.5-1.5h-3z'></path>
                </svg>
              ) : (
                <svg viewBox='0 0 24 24' width='1.5rem' height='1.5rem' fill='#65676b'>
                  <path d='M8.99 23H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H8.99zM7.8 4.9l-2 1.5C4.15 7.638 3.61 8.074 3.317 8.658 3.025 9.242 3 9.937 3 12v4c0 1.442.002 2.424.101 3.159.095.706.262 1.033.485 1.255.223.223.55.39 1.256.485.734.099 1.716.1 3.158.1V14.5a2.5 2.5 0 0 1 2.5-2.5h3a2.5 2.5 0 0 1 2.5 2.5V21c1.443 0 2.424-.002 3.159-.101.706-.095 1.033-.262 1.255-.485.223-.222.39-.55.485-1.256.099-.734.101-1.716.101-3.158v-4c0-2.063-.025-2.758-.317-3.342-.291-.584-.832-1.02-2.483-2.258l-2-1.5c-1.174-.881-1.987-1.489-2.67-1.886C12.87 2.63 12.425 2.5 12 2.5c-.425 0-.87.13-1.53.514-.682.397-1.495 1.005-2.67 1.886zM14 21v-6.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V21h4z'></path>
                </svg>
              )}
            </IconButton>
          </NavLink>
        </Tooltip>
        {/* friend */}
        <Tooltip content='Bạn bè' className='delay-500'>
          <NavLink
            to={routes.friend}
            className={({ isActive }) =>
              classNames('w-[111px] h-[56px] flex justify-center items-center', {
                'border-b-4 border-blue-700': isActive
              })
            }
          >
            <IconButton variant='text' id='friend' className='bg-transparent py-[23px] px-[55px]'>
              {location.pathname === routes.friend ? (
                <svg viewBox='0 0 24 24' width='1.5rem' height='1.5rem' fill='#0866ff'>
                  <path d='M8 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM17.5 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM5.25 13A4.75 4.75 0 0 0 .5 17.75 3.25 3.25 0 0 0 3.75 21h8.5a3.25 3.25 0 0 0 3.25-3.25A4.75 4.75 0 0 0 10.75 13h-5.5zm12.394 1.5a1 1 0 0 0-.95 1.31c.198.61.306 1.261.306 1.94 0 .661-.135 1.289-.377 1.858a1 1 0 0 0 .92 1.392H20.7a2.8 2.8 0 0 0 2.8-2.8 3.7 3.7 0 0 0-3.7-3.7h-2.156z'></path>
                </svg>
              ) : (
                <svg viewBox='0 0 24 24' width='1.5rem' height='1.5rem' fill='#65676b'>
                  <path d='M8 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM5.5 7a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm-.25 6A4.75 4.75 0 0 0 .5 17.75 3.25 3.25 0 0 0 3.75 21h8.5a3.25 3.25 0 0 0 3.25-3.25A4.75 4.75 0 0 0 10.75 13h-5.5zM2.5 17.75A2.75 2.75 0 0 1 5.25 15h5.5a2.75 2.75 0 0 1 2.75 2.75c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25zM14 9.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zM17.5 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm0 6.5a1 1 0 1 0 0 2h2.3a1.7 1.7 0 0 1 1.7 1.7.8.8 0 0 1-.8.8h-3.2a1 1 0 1 0 0 2h3.2a2.8 2.8 0 0 0 2.8-2.8 3.7 3.7 0 0 0-3.7-3.7h-2.3z'></path>
                </svg>
              )}
            </IconButton>
          </NavLink>
        </Tooltip>
        {/* group */}
        <Tooltip content='Nhóm' className='delay-500'>
          <NavLink
            to={routes.group}
            className={({ isActive }) =>
              classNames('w-[111px] h-[56px] flex justify-center items-center', {
                'border-b-4 border-blue-700': isActive
              })
            }
          >
            <IconButton variant='text' id='group' className='bg-transparent py-[23px] px-[55px]'>
              {location.pathname == routes.group ? (
                <svg viewBox='0 0 24 24' width='1.5rem' height='1.5rem' fill='#0866ff'>
                  <path d='M12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'></path>
                  <path d='M12 23.5C5.649 23.5.5 18.351.5 12S5.649.5 12 .5 23.5 5.649 23.5 12 18.351 23.5 12 23.5zM3.373 8.017a4 4 0 0 1 0 7.966 9.523 9.523 0 0 0 1.948 2.773A5.002 5.002 0 0 1 10 15.523h4a5.002 5.002 0 0 1 4.679 3.233 9.523 9.523 0 0 0 1.948-2.773 4 4 0 0 1 0-7.966A9.501 9.501 0 0 0 12 2.5a9.501 9.501 0 0 0-8.627 5.517z'></path>
                </svg>
              ) : (
                <svg viewBox='0 0 24 24' width='1.5rem' height='1.5rem' fill='#65676b'>
                  <path d='M12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0z'></path>
                  <path d='M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12 18.351 23.5 12 23.5.5 18.351.5 12zm2.21-2a9.537 9.537 0 0 0 0 3.993l.3.007A2 2 0 0 0 3 10h-.29zm.663-1.983a4 4 0 0 1 0 7.966 9.523 9.523 0 0 0 1.948 2.773A5.002 5.002 0 0 1 10 15.523h4a5.002 5.002 0 0 1 4.679 3.233 9.523 9.523 0 0 0 1.948-2.773 4 4 0 0 1 0-7.966A9.501 9.501 0 0 0 12 2.5a9.501 9.501 0 0 0-8.627 5.517zM21.5 12a9.55 9.55 0 0 0-.212-2.007l-.265.007H21a2 2 0 0 0-.01 4l.3-.007c.138-.643.21-1.31.21-1.993zM12 21.5a9.455 9.455 0 0 0 4.97-1.402A3 3 0 0 0 14 17.523h-4a3 3 0 0 0-2.97 2.575A9.456 9.456 0 0 0 12 21.5z'></path>
                </svg>
              )}
            </IconButton>
          </NavLink>
        </Tooltip>
      </div>

      {/* menu,messenger, profile,notify */}
      <div className='flex mr-7 gap-2'>
        {/* menu */}
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
          <MenuHandler>
            <IconButton
              variant='text'
              color='blue-gray'
              className=' hover:bg-gray-400 flex items-center gap-1 rounded-full py-0.5 bg-[#e4e6eb] lg:ml-auto'
            >
              <svg
                viewBox='0 0 24 24'
                width='1em'
                height='1em'
                fill='currentColor'
                className='h-[1.3rem] w-[1.25rem] text-black'
              >
                <path d='M12 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 17a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'></path>
              </svg>
            </IconButton>
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
        {/* messenger */}

        <div style={{ display: !location.pathname.startsWith('/messenger') ? 'block' : 'none' }}>
          <Menu /* open={isMessengerOpen} */ /* handler={setIsMessengerOpen} */ placement='bottom-end'>
            <MenuHandler>
              <Link to='/messenger' className='flex items-center gap-1'>
                <IconButton
                  variant='text'
                  color='blue-gray'
                  className={`hover:bg-gray-400 flex items-center gap-1 rounded-full py-0.5 bg-[#e4e6eb] lg:ml-auto`}
                >
                  <svg
                    viewBox='0 0 24 24'
                    width='1em'
                    height='1em'
                    fill='currentColor'
                    className='h-[1.3rem] w-[1.3rem] text-black'
                  >
                    <path d='M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12 18.351 23.5 12 23.5c-1.922 0-3.736-.472-5.33-1.308a.63.63 0 0 0-.447-.069l-3.4.882a1.5 1.5 0 0 1-1.828-1.829l.882-3.4a.63.63 0 0 0-.07-.445A11.454 11.454 0 0 1 .5 12zm17.56-1.43a.819.819 0 0 0-1.125-1.167L14 11.499l-3.077-2.171a1.5 1.5 0 0 0-2.052.308l-2.93 3.793a.819.819 0 0 0 1.123 1.167L10 12.5l3.076 2.172a1.5 1.5 0 0 0 2.052-.308l2.931-3.793z'></path>
                  </svg>
                </IconButton>
              </Link>
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
        {/* notify */}
        <NotifyOfHeader />

        {/* profile menu */}
        <AccountOfHeader />
      </div>
    </div>
  )
}
export default HomeHeader
