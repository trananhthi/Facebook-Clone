import { Avatar } from '@material-tailwind/react'
import defaultAva from 'src/assets/images/default_avatar.png'
import friendIcon from 'src/assets/images/friendIcon_gray.png'
import facebookIcon9 from 'src/assets/images/facbook_icon_9.png'
import facebookIcon3 from 'src/assets/images/facbook_icon_3.png'

import EmojiButton from './components/EmojiButton'
import { useRef } from 'react'

function UserPost() {
  const postRef = useRef(null)
  const postHeaderRef = useRef(null)

  return (
    <div ref={postRef} className='w-[590px] h-full shadow-[0_0px_1px_1px_rgba(0,0,0,0.06)] bg-white rounded-lg'>
      {/* header */}
      <div ref={postHeaderRef} id='post-header' className='flex justify-between items-center'>
        <div className='flex gap-2 px-4 pt-3 pb-2'>
          <Avatar
            variant='circular'
            size='sm'
            alt='avatar'
            className='h-10 w-10 border-solid border-gray-400 border'
            src={defaultAva}
          />
          <div className='flex flex-col'>
            <span className='text-[#050505] text-[15px] font-semibold cursor-pointer hover:underline hover:underline-offset-1'>
              Thi Tran
            </span>
            {/* <div> */}
            <span className='text-[#65676B] text-[13px] flex items-center hover:underline-offset-1 font-normal'>
              17 phút &middot;
              <img src={friendIcon} alt='friend-logo' className='h-3 w-3 text-[#65676B] inline ml-1' />
            </span>
            {/* </div> */}
          </div>
        </div>
        <button className='hover:bg-[#f2f2f2] h-8 w-8 rounded-full flex justify-center items-center mr-4'>
          <div
            style={{ backgroundImage: `url(${facebookIcon3})` }}
            className='bg-[length:190px_186px] bg-[-44px_-110px] h-5 w-5'
          ></div>
        </button>
      </div>
      {/* content */}
      <div className='px-4 text-2xl text-[#050505]'>Trời hum nay thặc đẹp</div>
      <hr className='border-gray-300 mx-4 mt-3'></hr>
      {/* emoji, comment,share */}
      <div className='flex px-4 my-1'>
        {/* emoji */}
        <EmojiButton postRef={postRef} postHeaderRef={postHeaderRef} />
        {/* comment */}
        <button className='h-8 w-[185px] px-3 py-0 hover:bg-[#f2f2f2] rounded-md flex items-center justify-center gap-2'>
          <div
            className='bg-[length:26px_1536px] bg-[0px_-576px] h-5 w-5 opacity-70'
            style={{ backgroundImage: `url(${facebookIcon9})` }}
          ></div>
          <span className='text-[15px] text-[#65676B] font-semibold'>Bình luận</span>
        </button>
        {/* share */}
        <button className='h-8 w-[185px] px-3 py-1 hover:bg-[#f2f2f2] rounded-md flex items-center justify-center gap-2'>
          <div
            className='bg-[length:26px_1536px] bg-[0px_-928px] h-5 w-5 opacity-70'
            style={{ backgroundImage: `url(${facebookIcon9})` }}
          ></div>
          <span className='text-[15px] text-[#65676B] font-semibold'>Chia sẻ</span>
        </button>
      </div>
      <hr className='border-gray-300 mx-4 mt-1'></hr>
      {/* Send my comment */}
      <div className='flex gap-2 px-4 py-2'>
        <>
          <Avatar
            variant='circular'
            size='sm'
            alt='avatar'
            className='h-8 w-8 border-solid border-gray-400 border cursor-pointer'
            src={defaultAva}
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

        <button className='w-full h-9 bg-[#f0f2f5] rounded-full flex items-center cursor-pointer'>
          <p className='ml-3 text-[#050505] opacity-60 text-[15px]'>Viết bình luận công khai...</p>
        </button>
      </div>
    </div>
  )
}

export default UserPost
