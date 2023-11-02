import { BellIcon } from '@heroicons/react/20/solid'
import { IconButton, Popover, PopoverContent, PopoverHandler, Typography } from '@material-tailwind/react'
import { useState } from 'react'

function NotifyOfHeader() {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  return (
    <Popover offset={{ mainAxis: 4, crossAxis: 48 }} placement='bottom-start'>
      <PopoverHandler onClick={() => setIsFocus(true)}>
        <IconButton
          onBlur={() => setIsFocus(false)}
          variant='text'
          color='blue-gray'
          className={`flex items-center gap-1 rounded-full py-0.5 lg:ml-auto ${
            isFocus ? ' bg-[#e8f2fc]' : 'bg-[#e4e6eb] hover:bg-gray-400'
          }`}
        >
          <BellIcon className={`h-[1.55rem] w-[1.5rem]  ${isFocus ? 'text-[#0866ff]' : 'text-black'} `}></BellIcon>
        </IconButton>
      </PopoverHandler>
      <PopoverContent className='shadow-[0_0px_10px_5px_rgba(0,0,0,1)] px-4 py-1 z-[99999]'>
        <div className='flex flex-col items-center mt-2'>
          {/* header */}
          <div className='flex justify-between items-center w-full'>
            <Typography as='span' className='font-bold text-[23px]' color='black'>
              Thông báo
            </Typography>
            <div className='hover:bg-[#f2f2f2] cursor-pointer h-8 w-8 rounded-full flex justify-center items-center'>
              <div
                className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/QesjcY79Fo4.png)] 
                            bg-[length:190px_186px] bg-[-44px_-110px] h-5 w-5'
              ></div>
            </div>
          </div>
          {/* filter */}
          <div className='flex gap-3 items-center w-[344px] h-[45px] mb-2'>
            <div className='font-semibold text-[#0266d1df] cursor-pointer rounded-full p-2 px-3 bg-[#ebf5ff]'>
              Tất cả
            </div>
            <div className='font-semibold text-[#050505cb] rounded-full cursor-pointer p-2 px-3 hover:bg-[#f2f2f2]'>
              Chưa đọc
            </div>
          </div>
          {/* header content */}
          <div className='flex gap-3 items-center justify-between w-[328px] h-[21px]'>
            <div className='font-semibold text-[#050505] text-[17px]'>Trước đó</div>
            <div className='font-normal p-1 py-2 -mr-1 text-[#0064D1] text-[15px] rounded-lg cursor-pointer hover:bg-[#f2f2f2]'>
              Xem tất cả
            </div>
          </div>
          {/* content */}
          <div className='flex gap-4 justify-between items-center w-[344px] h-[94px] cursor-pointer hover:bg-[#f2f2f2] rounded-lg px-2'>
            <div>
              {/* nội dung */}
              <div className='flex gap-2 items-center'>
                <img
                  src='https://www.facebook.com/images/icons-large/fb-xl-gradient-2x.png'
                  className='h-[56px] w-[56px] rounded-full'
                  alt=''
                />
                <div
                  className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/8vo53WwtI-n.png)] 
                            bg-[length:30px_2430px] bg-[0px_-570px] h-7 w-7 absolute ml-8 mt-10'
                ></div>
                {/* nội dung chính*/}
                <Typography
                  as='div'
                  className='line-clamp-3 font-normal max-w-[228px] max-h-[60px] text-sm text-blue-gray-600'
                  style={{ display: '-webkit-box' }}
                >
                  Chào mừng bạn đến với Facebook! Hãy nhấn vào đây để tìm những người bạn biết và thêm họ làm bạn bè
                </Typography>
              </div>
              {/* Thời gian thông báo */}
              <Typography as='span' className='ml-16 font-semibold text-[13px] text-[#0866FF]'>
                5 ngày trước
              </Typography>
            </div>
            <span className='h-3 w-3 bg-[#0866FF] rounded-full'></span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default NotifyOfHeader
