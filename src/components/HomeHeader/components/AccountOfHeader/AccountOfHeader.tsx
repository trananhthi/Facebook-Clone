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
import { useSelector } from 'react-redux'
import defaultAva from 'src/assets/images/default_avatar.png'
import { RootState } from 'src/redux/store'
import { clearLS } from 'src/utils/auth'

function AccountOfHeader() {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const handleLogout = () => {
    clearLS()
  }
  return (
    <Popover offset={0} placement='bottom-start'>
      <PopoverHandler>
        <Button
          variant='text'
          color='blue-gray'
          className='flex items-center gap-1 rounded-full py-0.5 pr-0 pl-0 lg:ml-auto'
        >
          <Avatar variant='circular' size='sm' alt='avatar' className='h-[40px] w-[40px]' src={defaultAva} />
        </Button>
      </PopoverHandler>
      <PopoverContent className='shadow-[0_0px_10px_5px_rgba(0,0,0,1)] px-3 py-1 z-[99999]'>
        <div className='flex flex-col items-center mt-2'>
          {/* profile */}
          <Card className='w-[313px] rounded-md shadow-[0_0px_8px_2px_rgba(0,0,0,0.1)] mb-4'>
            <CardBody className='px-2 py-1'>
              <div className='flex items-center min-h-[60px] p-2 mb-1 rounded-lg gap-2 cursor-pointer hover:bg-[#f2f2f2]'>
                <Avatar variant='circular' size='sm' alt='avatar' className='h-[36px] w-[36px]' src={defaultAva} />
                <Typography as='span' className='font-semibold w-[230px]' color='black'>
                  {userAccount.firstName + ' ' + userAccount.lastName}
                </Typography>
              </div>
              <hr className=' border-[1px] border-gray-300 mx-2'></hr>
              <Typography
                as='span'
                className='text-[15px] text-[#0866ff] mt-1 ml-1 p-2 rounded-lg font-[600] cursor-pointer hover:bg-[#f2f2f2]'
              >
                Xem tất cả trang cá nhân
              </Typography>
            </CardBody>
          </Card>
          {/* setting */}
          <div className='flex gap-4 items-center w-[328px] h-[52px] cursor-pointer hover:bg-[#f2f2f2] rounded-lg px-1'>
            <div className='bg-[#d8dadf] h-9 w-9 rounded-full flex justify-center items-center'>
              <div
                className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/QesjcY79Fo4.png)] 
                            bg-[length:190px_186px] bg-[-154px_-110px] h-5 w-5'
              ></div>
            </div>
            <Typography as='span' variant='small' className='font-semibold' color='black'>
              Cài đặt & quyền riêng tư
            </Typography>
          </div>
          {/* help */}
          <div className='flex gap-4 items-center w-[328px] h-[52px] cursor-pointer hover:bg-[#f2f2f2] rounded-lg px-1'>
            <div className='bg-[#d8dadf] h-9 w-9 rounded-full flex justify-center items-center'>
              <div
                className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/RJ2gJMyPGF8.png)] 
                            bg-[length:26px_330px] bg-[-0px_-202px] h-5 w-5'
              ></div>
            </div>
            <Typography as='span' variant='small' className='font-semibold' color='black'>
              Trợ giúp & hỗ trợ
            </Typography>
          </div>
          {/* Accessibility */}
          <div className='flex gap-4 items-center w-[328px] h-[52px] cursor-pointer hover:bg-[#f2f2f2] rounded-lg px-1'>
            <div className='bg-[#d8dadf] h-9 w-9 rounded-full flex justify-center items-center'>
              <div
                className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/yP/r/QuhVMl6eerd.png)] 
                            bg-[length:26px_592px] bg-[0px_-424px] h-5 w-5'
              ></div>
            </div>
            <Typography as='span' variant='small' className='font-semibold' color='black'>
              Màn hình & trợ năng
            </Typography>
          </div>
          {/* opinion */}
          <div className='flex gap-4 items-center w-[328px] h-[52px] cursor-pointer hover:bg-[#f2f2f2] rounded-lg px-1'>
            <div className='bg-[#d8dadf] h-9 w-9 rounded-full flex justify-center items-center'>
              <div
                className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/RJ2gJMyPGF8.png)] 
                            bg-[length:26px_330px] bg-[0px_-70px] h-5 w-5'
              ></div>
            </div>
            <Typography as='span' variant='small' className='font-semibold' color='black'>
              Đóng góp ý kiến
            </Typography>
          </div>
          {/* log out */}
          <button
            className='flex gap-4 items-center w-[328px] h-[52px] cursor-pointer hover:bg-[#f2f2f2] rounded-lg px-1'
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
          {/* footer */}
          <Typography as='span' className='font-light w-[310px] text-xs'>
            Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn quảng cáo · Cookie · Meta © 2023
          </Typography>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default AccountOfHeader
