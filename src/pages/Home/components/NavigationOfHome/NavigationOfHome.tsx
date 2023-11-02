import { Avatar, Typography } from '@material-tailwind/react'
import defaultAva from 'src/assets/images/default_avatar.png'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

function NavigationOfHome() {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const [isExtend, setIsExtend] = useState<boolean>(false)
  return (
    <div className='w-[360px] fixed flex flex-col h-[670px] overflow-x-hidden overflow-y-auto custom-scrollbar'>
      <div className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 mt-4 p-2'>
        <Avatar variant='circular' size='sm' alt='avatar' className='h-9 w-9' src={defaultAva} />
        <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
          {userAccount.firstName + ' ' + userAccount.lastName}
        </Typography>
      </div>

      {/* find friend */}
      <div className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'>
        <div
          className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/MXx87JcFKzH.png)] 
                            bg-[length:38px_570px] bg-[0px_-304px] h-9 w-9'
        ></div>
        <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
          Tìm bạn bè
        </Typography>
      </div>

      {/* Wellcome */}
      <div className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'>
        <div
          className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/vV4w4OL9xUs.png)] 
                            bg-[length:38px_38px] bg-[0px_0px] h-9 w-9'
        ></div>
        <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
          Chào mừng
        </Typography>
      </div>

      {/* memories */}
      <div className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'>
        <div
          className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/MXx87JcFKzH.png)] 
                            bg-[length:38px_570px] bg-[0px_-456px] h-9 w-9'
        ></div>
        <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
          Kỷ niệm
        </Typography>
      </div>

      {/* saved */}
      <div className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'>
        <div
          className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/MXx87JcFKzH.png)] 
                            bg-[length:38px_570px] bg-[0px_-190px] h-9 w-9'
        ></div>
        <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
          Đã lưu
        </Typography>
      </div>

      {/* group */}
      <div className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'>
        <div
          className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/MXx87JcFKzH.png)] 
                            bg-[length:38px_570px] bg-[0px_-38px] h-9 w-9'
        ></div>
        <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
          Nhóm
        </Typography>
      </div>

      {/* video */}
      <div className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'>
        <div
          className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/MXx87JcFKzH.png)] 
                            bg-[length:38px_570px] bg-[0px_-532px] h-9 w-9'
        ></div>
        <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
          Video
        </Typography>
      </div>
      {/* market place */}
      <div className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'>
        <div
          className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/MXx87JcFKzH.png)] 
                            bg-[length:38px_570px] bg-[0px_-418px] h-9 w-9'
        ></div>
        <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
          Marketplace
        </Typography>
      </div>

      {/* feed */}
      <div className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'>
        <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/3dN1QwOLden.png' className='h-9 w-9' alt='' />
        <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
          Bảng feed
        </Typography>
      </div>

      {/* messenger */}
      <div className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'>
        <div
          className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/Ue7hxB2U7UX.png)] 
                            bg-[length:38px_464px] bg-[0px_0px] h-9 w-9'
        ></div>
        <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
          Messenger
        </Typography>
      </div>

      <>
        {isExtend ? (
          <>
            {/* games */}
            <div className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'>
              <div
                className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/MXx87JcFKzH.png)] 
                            bg-[length:38px_570px] bg-[0px_-76px] h-9 w-9'
              ></div>
              <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
                Chơi game
              </Typography>
            </div>

            {/* page */}
            <div className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'>
              <div
                className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/MXx87JcFKzH.png)] 
                            bg-[length:38px_570px] bg-[0px_-114px] h-9 w-9'
              ></div>
              <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
                Messenger
              </Typography>
            </div>
            {/* event */}
            <div className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'>
              <div
                className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/vWSUA-u7jLw.png)] 
                            bg-[length:38px_76px] bg-[0px_-38px] h-9 w-9'
              ></div>
              <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
                Sự kiện
              </Typography>
            </div>
          </>
        ) : (
          ''
        )}
      </>

      {/* button  */}
      <button
        className='flex items-center gap-3 w-[344px] cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'
        onClick={() => setIsExtend((cur) => !cur)}
      >
        <div className='h-9 w-9 bg-[#d8dadfe0] flex justify-center items-center rounded-full'>
          <svg viewBox='0 0 16 16' className={`${isExtend ? 'rotate-180' : ''} h-4 w-4`}>
            <g fillRule='evenodd' transform='translate(-448 -544)'>
              <path
                fillRule='nonzero'
                d='M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z'
              ></path>
            </g>
          </svg>
        </div>
        <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
          {isExtend ? 'Ẩn bớt' : 'Xem thêm'}
        </Typography>
      </button>

      {/* footer */}
      <Typography as='span' className=' ml-2 p-2 font-normal text-gray-600 text-xs mt-2'>
        Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn quảng cáo · Cookie · Meta © 2023
      </Typography>
    </div>
  )
}

export default NavigationOfHome
