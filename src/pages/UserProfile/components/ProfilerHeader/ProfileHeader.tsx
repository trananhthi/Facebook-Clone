import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import camera_light from 'src/assets/images/icon/camera_light.png'
import avatar_light from 'src/assets/images/icon/create_with_avatar_light.png'
import facebookIcon18 from 'src/assets/images/icon-pack/facbook_icon_18.png'
import { RootState } from 'src/redux/store'

export const ProfileHeader = () => {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)

  return (
    <div className='flex flex-col'>
      <div className='h-[406px] w-full flex justify-center'>
        {/* BEGIN: ảnh bìa */}
        <div className='w-[1095px] h-full flex justify-end py-4 px-8 rounded-b-md bg-gradient-to-b from-[#F0F2F5] via-[#F0F2F5] to-[#a9aaab]'>
          <div className='w-fit flex flex-col justify-end items-end h-full gap-2'>
            <button className='w-full font-semibold text-[15px] rounded-md text-white bg-[rgba(75,76,77,0.8)] px-3 py-[6px] flex items-center gap-2 hover:bg-[rgba(75,76,77,1)]'>
              <img src={avatar_light} className='w-[15px] h-[15px]' />
              <span>Tạo với Avatar</span>
            </button>
            <button className=' w-full font-semibold text-[15px] rounded-md text-white bg-[rgba(75,76,77,0.8)] px-3 py-[6px] flex items-center gap-2 hover:bg-[rgba(75,76,77,1)]'>
              <img src={camera_light} className='w-[16px] h-[14px]' />
              <span>Thêm ảnh bìa</span>
            </button>
          </div>
        </div>
        {/* END: ảnh bìa */}
      </div>
      {/* BEGIN: avatar */}
      <div>
        <div className='w-[176px] h-[176px] rounded-full bg-white absolute -mt-[75px] ml-[240px] flexbox-center'>
          <img src={userAccount.avatar} className='w-[168px] h-[168px] rounded-full object-cover' />
          <div className='w-9 h-9 rounded-full bg-primarygray absolute flexbox-center bottom-0 right-0 mb-3 mr-2 cursor-pointer hover:bg-[#d8dadf]'>
            <div
              style={{ backgroundImage: `url(${facebookIcon18})` }}
              className={`bg-[length:26px_607px] bg-[1px_-229px] h-5 w-5`}
            ></div>
          </div>
        </div>
      </div>
      {/* END: avatar */}
      {/* BEGIN: Edit info */}
      <div className='h-[117px] w-full flex justify-center'>
        <div className='w-[1031px] flex h-full items-center border-b border-gray-400/60 justify-between'>
          <div className='flex flex-col justify-center ml-[185px]'>
            <span className='text-textprimary text-[32px] font-bold'>
              {userAccount.firstName + ' ' + userAccount.lastName}{' '}
            </span>
            <span className='text-textgray text-[15px] font-semibold mb-4 cursor-pointer hover:underline'>
              420 bạn bè
            </span>
          </div>
          <div className='flex gap-2 '>
            <button className='text-white bg-[#0866FF] rounded-md py-[6px] px-3 text-[15px] font-semibold flex items-center hover:bg-blue-600'>
              <FontAwesomeIcon icon={faPlus} className='h-3 w-3 mr-2' />
              Thêm vào tin
            </button>
            <button className='bg-primarygray rounded-md py-[6px] px-3 text-[15px] font-semibold flex items-center hover:bg-[#d8dadf]'>
              <FontAwesomeIcon icon={faPen} className='h-[14px] w-[14px] mr-1' />
              Chỉnh sửa trang cá nhân
            </button>
          </div>
        </div>
      </div>
      {/* END: Edit info */}
    </div>
  )
}

export default ProfileHeader
