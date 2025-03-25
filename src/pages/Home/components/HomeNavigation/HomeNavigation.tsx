import { Avatar, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import facebookIcon6 from 'src/assets/images/icon-pack/facbook_icon_6.png'
import facebookIcon7 from 'src/assets/images/icon-pack/facbook_icon_7.png'
import facebookIcon8 from 'src/assets/images/icon-pack/facbook_icon_8.png'

const NavigationOfHomeButton = ({ name, children }: { name: string; children: React.ReactNode }) => {
  return (
    <div className='flex items-center gap-3 cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 p-2'>
      {children}
      <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
        {name}
      </Typography>
    </div>
  )
}

function HomeNavigation() {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const [isExtend, setIsExtend] = useState<boolean>(false)
  return (
    <div className='3xl:w-[360px] 2xl:w-[340px] xl:w-[280px] semi-lg:w-[280px] fixed flex flex-col h-[670px] overflow-x-hidden overflow-y-auto custom-scrollbar'>
      <div className='flex items-center gap-3 cursor-pointer hover:bg-[#e4e6e9] rounded-lg ml-2 mt-4 p-2'>
        <Avatar variant='circular' size='sm' alt='avatar' className='h-9 w-9' src={userAccount.avatar} />
        <Typography as='div' className='font-[600] text-[15px] text-[#050505]'>
          {userAccount.firstName + ' ' + userAccount.lastName}
        </Typography>
      </div>

      {/* find friend */}
      <NavigationOfHomeButton name='Tìm bạn bè'>
        <div
          style={{ backgroundImage: `url(${facebookIcon6})` }}
          className={`bg-[length:38px_570px] bg-[0px_-304px] h-9 w-9`}
        ></div>
      </NavigationOfHomeButton>

      {/* Wellcome */}
      <NavigationOfHomeButton name='Chào mừng'>
        <div
          className='bg-[url(https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/vV4w4OL9xUs.png)] 
                            bg-[length:38px_38px] bg-[0px_0px] h-9 w-9'
        ></div>
      </NavigationOfHomeButton>

      {/* memories */}
      <NavigationOfHomeButton name='Kỷ niệm'>
        <div
          style={{ backgroundImage: `url(${facebookIcon6})` }}
          className={`bg-[length:38px_570px] bg-[0px_-456px] h-9 w-9`}
        ></div>
      </NavigationOfHomeButton>

      {/* saved */}
      <NavigationOfHomeButton name='Đã lưu'>
        <div
          style={{ backgroundImage: `url(${facebookIcon6})` }}
          className={`bg-[length:38px_570px] bg-[0px_-190px] h-9 w-9`}
        ></div>
      </NavigationOfHomeButton>

      {/* group */}
      <NavigationOfHomeButton name='Nhóm'>
        <div
          style={{ backgroundImage: `url(${facebookIcon6})` }}
          className={`bg-[length:38px_570px] bg-[0px_-38px] h-9 w-9`}
        ></div>
      </NavigationOfHomeButton>

      {/* video */}
      <NavigationOfHomeButton name='Video'>
        <div
          style={{ backgroundImage: `url(${facebookIcon6})` }}
          className={`bg-[length:38px_570px] bg-[0px_-532px] h-9 w-9`}
        ></div>
      </NavigationOfHomeButton>
      {/* market place */}
      <NavigationOfHomeButton name='Marketplace'>
        <div
          style={{ backgroundImage: `url(${facebookIcon6})` }}
          className={`bg-[length:38px_570px] bg-[0px_-418px] h-9 w-9`}
        ></div>
      </NavigationOfHomeButton>

      {/* feed */}
      <NavigationOfHomeButton name='Bảng Feed'>
        <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/3dN1QwOLden.png' className='h-9 w-9' alt='' />
      </NavigationOfHomeButton>

      {/* messenger */}
      <NavigationOfHomeButton name='Messenger'>
        <div
          style={{ backgroundImage: `url(${facebookIcon7})` }}
          className='bg-[length:38px_464px] bg-[0px_0px] h-9 w-9'
        ></div>
      </NavigationOfHomeButton>

      <>
        {isExtend ? (
          <>
            {/* games */}
            <NavigationOfHomeButton name='Chơi games'>
              <div
                style={{ backgroundImage: `url(${facebookIcon6})` }}
                className={`bg-[length:38px_570px] bg-[0px_-76px] h-9 w-9`}
              ></div>
            </NavigationOfHomeButton>

            {/* page */}
            <NavigationOfHomeButton name='Trang'>
              <div
                style={{ backgroundImage: `url(${facebookIcon6})` }}
                className={`bg-[length:38px_570px] bg-[0px_-114px] h-9 w-9`}
              ></div>
            </NavigationOfHomeButton>
            {/* event */}
            <NavigationOfHomeButton name='Sự kiện'>
              <div
                style={{ backgroundImage: `url(${facebookIcon8})` }}
                className='bg-[length:38px_76px] bg-[0px_-38px] h-9 w-9'
              ></div>
            </NavigationOfHomeButton>
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

export default HomeNavigation
