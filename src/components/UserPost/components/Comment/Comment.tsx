import { Avatar } from '@material-tailwind/react'
import { UserInfor } from 'src/types/user.type'
import defaultAva from 'src/assets/images/default_avatar.png'
import facebookIcon9 from 'src/assets/images/facbook_icon_9.png'
import { useState } from 'react'

interface Props {
  userAccount: Partial<UserInfor>
}

function Comment({ userAccount }: Props) {
  const [isFocusInputField, setIsFocusInputField] = useState<boolean>(false)

  return (
    <div className='flex gap-2 px-4 py-2'>
      <>
        <Avatar
          variant='circular'
          size='sm'
          alt='avatar'
          className='h-8 w-8 border-solid border-gray-400 border cursor-pointer'
          src={userAccount.avatar ? userAccount.avatar : defaultAva}
        />
        <div className='h-5 w-5 flex justify-center items-center rounded-full absolute mt-[18px] ml-[17px]'>
          <svg viewBox='0 0 16 16' fill='currentColor' className={`h-3 w-3 bg-[#d8dadfe0] rounded-full`}>
            <g fillRule='evenodd' transform='translate(-448 -544)'>
              <path
                fillRule='nonzero'
                d='M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z'
              ></path>
            </g>
          </svg>
        </div>
      </>

      <div className='flex flex-col w-full'>
        <button
          className={`w-full h-9 bg-[#f0f2f5] ${
            isFocusInputField ? 'rounded-t-2xl' : 'rounded-full'
          } flex items-center cursor-pointer`}
        >
          <textarea
            onFocus={() => setIsFocusInputField(true)}
            onBlur={() => setIsFocusInputField(false)}
            className='w-full h-9 p-[6.5px] pl-3 text-[#050505] opacity-60 text-[15px] rounded-full resize-none bg-[#f0f2f5] placeholder:text-[#050505] active:outline-0 focus:outline-0'
            placeholder='Viết bình luận công khai...'
          ></textarea>
          <div className={`flex gap-3 mr-3 ${isFocusInputField ? 'hidden' : ''}`}>
            {/* nhãn dán avatar */}
            <div
              className='bg-[length:26px_1536px] bg-[0px_-1130px] h-4 w-4 opacity-50'
              style={{ backgroundImage: `url(${facebookIcon9})` }}
            ></div>
            {/* icon cảm xúc */}
            <div
              className='bg-[length:26px_1536px] bg-[0px_-1238px] h-4 w-4 opacity-50'
              style={{ backgroundImage: `url(${facebookIcon9})` }}
            ></div>
            {/* camera */}
            <div
              className='bg-[length:26px_1536px] bg-[0px_-1166px] h-4 w-4 opacity-50'
              style={{ backgroundImage: `url(${facebookIcon9})` }}
            ></div>
            {/* gif */}
            <div
              className='bg-[length:26px_1536px] bg-[0px_-1274px] h-4 w-4 opacity-50'
              style={{ backgroundImage: `url(${facebookIcon9})` }}
            ></div>
            {/* nhãn dán thường */}
            <div
              className='bg-[length:26px_1536px] bg-[0px_-1418px] h-4 w-4 opacity-50'
              style={{ backgroundImage: `url(${facebookIcon9})` }}
            ></div>
          </div>
        </button>
        {/* các button như icon, nhãn dán,... */}
        <div className={`w-full bg-[#f0f2f5] rounded-b-2xl ${isFocusInputField ? '' : 'hidden'}`}>
          <div className='flex gap-3 p-3 pb-4 pt-3'>
            {/* nhãn dán avatar */}
            <div
              className='bg-[length:26px_1536px] bg-[0px_-1130px] h-4 w-4 opacity-50'
              style={{ backgroundImage: `url(${facebookIcon9})` }}
            ></div>
            {/* icon cảm xúc */}
            <div
              className='bg-[length:26px_1536px] bg-[0px_-1238px] h-4 w-4 opacity-50'
              style={{ backgroundImage: `url(${facebookIcon9})` }}
            ></div>
            {/* camera */}
            <div
              className='bg-[length:26px_1536px] bg-[0px_-1166px] h-4 w-4 opacity-50'
              style={{ backgroundImage: `url(${facebookIcon9})` }}
            ></div>
            {/* gif */}
            <div
              className='bg-[length:26px_1536px] bg-[0px_-1274px] h-4 w-4 opacity-50'
              style={{ backgroundImage: `url(${facebookIcon9})` }}
            ></div>
            {/* nhãn dán thường */}
            <div
              className='bg-[length:26px_1536px] bg-[0px_-1418px] h-4 w-4 opacity-50'
              style={{ backgroundImage: `url(${facebookIcon9})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment

{
  /* <button className='w-full h-9 bg-[#f0f2f5] rounded-full flex items-center cursor-pointer'>
        <p className='ml-3 text-[#050505] opacity-60 text-[15px]'>Viết bình luận công khai...</p>
      </button> */
}
