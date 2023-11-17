import {
  Avatar,
  Button,
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography
} from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserAccountAction } from 'src/redux/actions/userAccountAction'
import { RootState } from 'src/redux/store'
import { clearLS } from 'src/utils/auth'

function AccountOfHeader() {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const dispatch = useDispatch()
  const handleLogout = () => {
    clearLS()
    dispatch(clearUserAccountAction())
  }
  return (
    <Popover offset={0} placement='bottom-start'>
      <PopoverHandler>
        <Button
          variant='text'
          color='blue-gray'
          className='flex items-center gap-1 rounded-full py-0.5 pr-0 pl-0 lg:ml-auto'
        >
          <Avatar
            variant='circular'
            size='sm'
            alt='avatar'
            className='h-10 w-10 border-solid border-gray-400 border'
            src={userAccount.avatar?.url}
          />
        </Button>
      </PopoverHandler>
      <PopoverContent className='w-[360px] shadow-[0_0px_10px_5px_rgba(0,0,0,1)] p-0 py-1 z-[99999]'>
        <div className='flex flex-col items-center mt-2'>
          {/* profile */}
          <div className='px-4 w-full'>
            <Card className='rounded-md shadow-[0_0px_8px_2px_rgba(0,0,0,0.1)] mb-4'>
              <CardBody className='px-1 py-1'>
                <div className='flex items-center min-h-[60px] p-2 mb-1 rounded-lg gap-2 cursor-pointer hover:bg-[#f2f2f2]'>
                  <Avatar
                    variant='circular'
                    size='sm'
                    alt='avatar'
                    className='h-9 w-9 border-solid border-gray-400 border'
                    src={userAccount.avatar?.url}
                  />
                  <Typography as='span' className='font-semibold w-[230px]' color='black'>
                    {userAccount.firstName + ' ' + userAccount.lastName}
                  </Typography>
                </div>
                <hr className=' border-[1px] border-gray-300 mx-2'></hr>
                <Typography
                  as='span'
                  className='text-[15px]  text-[#0866ff] mt-1 p-2 rounded-lg font-[600] cursor-pointer hover:bg-[#f2f2f2]'
                >
                  Xem tất cả trang cá nhân
                </Typography>
              </CardBody>
            </Card>
          </div>
          {/* các chức năng */}
          <div className='w-full px-2 mb-2'>
            {/* setting */}
            <button className='w-full  flex gap-4 items-center h-[52px] hover:bg-[#f2f2f2] rounded-lg px-2'>
              <div className='bg-[#d8dadf] h-9 w-9 rounded-full flex justify-center items-center'>
                <div
                  className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/QesjcY79Fo4.png)] 
                            bg-[length:190px_186px] bg-[-154px_-110px] h-5 w-5'
                ></div>
              </div>
              <Typography as='span' variant='small' className='font-semibold' color='black'>
                Cài đặt & quyền riêng tư
              </Typography>
            </button>
            {/* help */}
            <button className='w-full flex gap-4 items-center h-[52px] hover:bg-[#f2f2f2] rounded-lg px-2'>
              <div className='bg-[#d8dadf] h-9 w-9 rounded-full flex justify-center items-center'>
                <div
                  className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/RJ2gJMyPGF8.png)] 
                            bg-[length:26px_330px] bg-[-0px_-202px] h-5 w-5'
                ></div>
              </div>
              <Typography as='span' variant='small' className='font-semibold' color='black'>
                Trợ giúp & hỗ trợ
              </Typography>
            </button>
            {/* Accessibility */}
            <button className='w-full flex gap-4 items-center h-[52px] hover:bg-[#f2f2f2] rounded-lg px-2'>
              <div className='bg-[#d8dadf] h-9 w-9 rounded-full flex justify-center items-center'>
                <div
                  className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/yP/r/QuhVMl6eerd.png)] 
                            bg-[length:26px_592px] bg-[0px_-424px] h-5 w-5'
                ></div>
              </div>
              <Typography as='span' variant='small' className='font-semibold' color='black'>
                Màn hình & trợ năng
              </Typography>
            </button>
            {/* opinion */}
            <button className='w-full flex gap-4 items-center h-[52px] hover:bg-[#f2f2f2] rounded-lg px-2'>
              <div className='bg-[#d8dadf] h-9 w-9 rounded-full flex justify-center items-center'>
                <div
                  className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/RJ2gJMyPGF8.png)] 
                            bg-[length:26px_330px] bg-[0px_-70px] h-5 w-5'
                ></div>
              </div>
              <Typography as='span' variant='small' className='font-semibold' color='black'>
                Đóng góp ý kiến
              </Typography>
            </button>
            {/* log out */}
            <button
              className='flex w-full gap-4 items-center h-[52px] hover:bg-[#f2f2f2] rounded-lg px-2'
              onClick={handleLogout}
            >
              <div className='bg-[#d8dadf] h-9 w-9 rounded-full flex justify-center items-center'>
                <div
                  className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/yM/r/rv2ND7tqffN.png)] 
                            bg-[length:26px_1078px] bg-[0px_-518px] h-5 w-5'
                ></div>
              </div>
              <Typography as='span' variant='small' className='font-semibold' color='black'>
                Đăng xuất
              </Typography>
            </button>
          </div>
          {/* footer */}
          <Typography as='span' className='font-light w-full text-xs px-4'>
            Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn quảng cáo · Cookie · Meta © 2023
          </Typography>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default AccountOfHeader
