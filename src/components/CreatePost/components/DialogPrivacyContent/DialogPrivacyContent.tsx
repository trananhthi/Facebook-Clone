import { DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react'
import { useEffect, useRef, useState } from 'react'
import { UserInfor } from 'src/types/user.type'
import userAccountApi from 'src/apis/userAccount.api'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { setUserAccountAction } from 'src/redux/actions/userAccountAction'
import { PrivacyType } from 'src/types/utils.type'
import { privacyList } from 'src/constants/list'

/* import image */
import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'

interface Props {
  type: string
  openPrivacy: boolean
  setOpenPrivacy: React.Dispatch<React.SetStateAction<boolean>>
  privacyPost: PrivacyType
  setPrivacyPost: React.Dispatch<React.SetStateAction<PrivacyType>>
  userAccount: Partial<UserInfor>
  setIsStartAnimationClosePrivacyDialog: React.Dispatch<React.SetStateAction<boolean>>
}

function DialogPrivacyContent({
  type,
  openPrivacy,
  setOpenPrivacy,
  privacyPost,
  setPrivacyPost,
  userAccount,
  setIsStartAnimationClosePrivacyDialog
}: Props) {
  const dispatch = useDispatch()
  const [current] = useState(privacyPost)
  const [checked, setChecked] = useState(false)
  const [startAnimationClosePrivacyDialog, setStartAnimationClosePrivacyDialog] = useState(false)
  const [isStartAnimationOpenPrivacyDialog, setIsStartAnimationOpenPrivacyDialog] = useState<boolean>(openPrivacy)
  const dialogPrivacyContentRef = useRef(null)

  const updatePrivacyDefaultMutation = useMutation({
    mutationFn: (body: { privacyDefault: string }) => userAccountApi.updatePrivacyDefault(body),
    onSuccess: (res) => {
      const profile = res.data
      dispatch(setUserAccountAction(profile))
      setStartAnimationClosePrivacyDialog(true)
    },
    onError: (err) => console.log(err)
  })

  const handleCancel = () => {
    setStartAnimationClosePrivacyDialog(true)
    setPrivacyPost(current)
  }

  const handleChangePrivacyOfPost = () => {
    if (checked) {
      updatePrivacyDefaultMutation.mutate({ privacyDefault: privacyPost.value })
    } else {
      setStartAnimationClosePrivacyDialog(true)
    }
  }

  useEffect(() => {
    setIsStartAnimationOpenPrivacyDialog(false)
    if (dialogPrivacyContentRef.current) {
      const dialogPrivacyContentElement = dialogPrivacyContentRef.current as HTMLElement
      if (document.getElementById('tee')?.classList.contains('animate-slide-out-right-createpost')) {
        setOpenPrivacy(false)
        setIsStartAnimationClosePrivacyDialog(true)
      }
      dialogPrivacyContentElement.addEventListener('animationend', (event) => {
        if (event.animationName === 'slide-out-right-createpost') {
          setOpenPrivacy(false)
          setIsStartAnimationClosePrivacyDialog(true)
        }
      })
    }
  }, [startAnimationClosePrivacyDialog])

  return (
    <div ref={dialogPrivacyContentRef} className='w-[500px] '>
      <DialogHeader className='bg-white rounded-t-md h-[60px] border-b border-gray-300 p-4 block'>
        <div
          data-animationsopen={isStartAnimationOpenPrivacyDialog}
          data-animationsclose={startAnimationClosePrivacyDialog}
          className='flex items-center data-[animationsopen=true]:animate-slide-in-right-post 
          data-[animationsclose=true]:animate-slide-out-right-createpost'
        >
          <div className='absolute w-full flex justify-start'>
            <IconButton
              color='blue-gray'
              className='h-9 w-9 bg-[#e4e6eb] rounded-full hover:bg-[#d8dadf] p-4'
              variant='text'
              onClick={handleCancel}
            >
              <div
                style={{ backgroundImage: `url(${facebookIcon3})` }}
                className='bg-[length:190px_186px] bg-[-78px_-62px] h-5 w-5 opacity-60'
              ></div>
            </IconButton>
          </div>
          <div className='w-full flex justify-center'>
            <span className='text-[20px] text-[#050505] font-bold'>Đối tượng của bài viết</span>
          </div>
        </div>
      </DialogHeader>
      <DialogBody className='w-full max-h-[340px] h-auto p-0 privacy-scrollbar overflow-y-auto overflow-x-hidden'>
        <div
          data-animationsopen={isStartAnimationOpenPrivacyDialog}
          data-animationsclose={startAnimationClosePrivacyDialog}
          className='data-[animationsopen=true]:animate-slide-in-right-post 
          data-[animationsclose=true]:animate-slide-out-right-createpost'
        >
          <div className='flex flex-col gap-1 p-4 pb-2'>
            <span className='text-[#050505] text-[17px] font-semibold'>Ai có thể xem bài viết của bạn?</span>
            <span className='text-[#65676B] text-[14px] font-light'>
              Bài viết của bạn sẽ hiển thị ở Bảng feed, trang cá nhân và kết quả tìm kiếm.
            </span>
            <span className='text-[#65676B] text-[14px] font-light'>
              Tuy đối tượng mặc định là <span className='font-semibold'>Bạn bè</span>, nhưng bạn có thể thay đổi đối
              tượng của riêng bài viết này.
            </span>
          </div>
          <div className='flex flex-col px-2'>
            {privacyList.map((privacy) => (
              <label
                key={privacy.value}
                htmlFor={privacy.value + '-privacy'}
                className={`flex gap-3 items-center cursor-pointer rounded-lg p-2 ${
                  current.value === privacy.value ? 'bg-[#ebf5ff]' : ''
                } hover:bg-[#f2f2f2]`}
              >
                <div className='rounded-full bg-[#e4e6eb] p-[18px]'>
                  <img src={privacy.icon} alt={privacy.value} className='h-6 w-6' />
                </div>
                <div className='flex items-center justify-between w-[381px]'>
                  <div className='flex flex-col'>
                    <span className='text-[#050505] text-[17px] font-semibold'>{privacy.title}</span>
                    <span className='text-[#65676B] text-[14px] font-light'>{privacy.description}</span>
                  </div>
                  <input
                    onChange={() => setPrivacyPost(privacy)}
                    className='appearance-none privacy-radio-input'
                    type='radio'
                    id={privacy.value + '-privacy'}
                    name='privacy'
                    value={privacy.value}
                    checked={privacyPost.value === privacy.value}
                  />
                  {privacyPost.value === privacy.value ? (
                    <i
                      style={{ backgroundImage: `url(${facebookIcon3})` }}
                      className=' bg-[length:190px_186px] bg-[-154px_-88px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                    ></i>
                  ) : (
                    <i
                      style={{ backgroundImage: `url(${facebookIcon3})` }}
                      className=' bg-[length:190px_186px] bg-[0px_-110px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                    ></i>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      </DialogBody>
      <DialogFooter className='mr-3 p-0 pl-2 pt-2 pb-4 border-t-2 block'>
        <div
          data-animationsopen={isStartAnimationOpenPrivacyDialog}
          data-animationsclose={startAnimationClosePrivacyDialog}
          className='flex flex-col gap-4 data-[animationsopen=true]:animate-slide-in-right-post 
          data-[animationsclose=true]:animate-slide-out-right-createpost'
        >
          <div className={`w-full flex justify-start items-center ${type === 'edit' ? 'hidden' : ''} `}>
            <label
              data-disable={userAccount.privacyDefault === privacyPost.value}
              htmlFor='privacy-default'
              className='w-fit flex gap-5 justify-start items-center data-[disable=true]:pointer-events-none'
            >
              <input
                type='checkbox'
                name='privacy-default'
                id='privacy-default'
                className='opacity-0 peer/privacy'
                onChange={(e) => setChecked(e.target.checked)}
              />
              <span
                data-disable={userAccount.privacyDefault === privacyPost.value}
                className={`absolute h-6 w-6 rounded border-2 border-gray-500 cursor-pointer peer-hover/privacy:shadow-[0px_0px_20px_5px_rgba(164,164,165,0.5)]
             peer-checked/privacy:bg-[#005fcc] peer-checked/privacy:border-none after:content-[''] after:hidden after:absolute peer-checked/privacy:after:inline
             after:w-[6px] after:h-[13px] after:border-r-[3px] after:border-b-[3px] after:left-[9px] after:top-[4px] after:border-solid after:border-white after:rotate-45
             data-[disable=true]:bg-[#bec3c9] data-[disable=true]:border-none data-[disable=true]:after:inline data-[disable=true]:cursor-not-allowed
             `}
              ></span>
              <span
                data-disable={userAccount.privacyDefault === privacyPost.value}
                className='text-[#050505] text-[15px] font-semibold data-[disable=true]:text-[#bcc0c4]'
              >
                Đặt làm đối tượng mặc định.
              </span>
            </label>
          </div>
          <div className='w-full flex gap-3 justify-end items-center'>
            <button
              onClick={handleCancel}
              className='text-[#0064D1] text-[15px] px-3 py-[5px] rounded-md hover:bg-[#f2f2f2]'
            >
              Hủy
            </button>
            <button
              onClick={handleChangePrivacyOfPost}
              className='bg-[#0866ff] px-10 py-[5px] text-white text-[15px] font-medium rounded-md hover:bg-[#0861f2]'
            >
              {checked ? 'Lưu' : 'Xong'}
            </button>
          </div>
        </div>
      </DialogFooter>
    </div>
  )
}

export default DialogPrivacyContent
