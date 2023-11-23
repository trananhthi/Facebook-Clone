import { Avatar, Dialog } from '@material-tailwind/react'
import { useEffect, useState } from 'react'

/* import image */
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { privacyList } from 'src/constants/list'
import { PrivacyType } from 'src/types/utils.type'
import DialogPrivacyContent from './components/DialogPrivacyContent'
import DialogMainContent from './components/DialogMainContent'

interface Props {
  refetch: () => void
}

function CreatePost({ refetch }: Props) {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)

  const [open, setOpen] = useState(false)
  const [content, setContent] = useState<string>('')
  const [openPrivacy, setOpenPrivacy] = useState<boolean>(false)
  const [privacyPost, setPrivacyPost] = useState<PrivacyType>(
    privacyList.find((p) => p.value === (userAccount.privacyDefault as string)) as PrivacyType
  )
  const [isStartAnimationClosePrivacyDialog, setIsStartAnimationClosePrivacyDialog] = useState(false)
  const [previewImage, setPreviewImage] = useState<string[]>([])
  const [openAddImage, setOpenAddImage] = useState<boolean>(false)
  const handleOpen = () => setOpen(!open)

  const dialogMainContent: JSX.Element = (
    <DialogMainContent
      type='create'
      content={content}
      setContent={setContent}
      handleOpen={handleOpen}
      userAccount={userAccount}
      setOpenPrivacy={setOpenPrivacy}
      privacyPost={privacyPost}
      isStartAnimationClosePrivacyDialog={isStartAnimationClosePrivacyDialog}
      setIsStartAnimationClosePrivacyDialog={setIsStartAnimationClosePrivacyDialog}
      previewImage={previewImage}
      setPreviewImage={setPreviewImage}
      openAddImage={openAddImage}
      setOpenAddImage={setOpenAddImage}
      refetch={refetch}
    />
  )
  const dialogPrivacyContent: JSX.Element = (
    <DialogPrivacyContent
      type='create'
      openPrivacy={openPrivacy}
      setOpenPrivacy={setOpenPrivacy}
      privacyPost={privacyPost}
      setPrivacyPost={setPrivacyPost}
      userAccount={userAccount}
      setIsStartAnimationClosePrivacyDialog={setIsStartAnimationClosePrivacyDialog}
    />
  )

  useEffect(() => {
    const textField = document.getElementById('create-post-text') as HTMLElement
    const textButton = document.getElementById('create-post-button') as HTMLElement
    if (content.length > 53) {
      textField.style.height = '46px'
      textButton.style.height = '62px'
    } else {
      textField.style.height = '23px'
      textButton.style.height = '40px'
    }
  }, [open])

  useEffect(() => {
    if (!open) setOpenPrivacy(false)
  }, [open, openPrivacy, privacyPost])

  return (
    <div className='w-[590px] h-auto min-h-[123px] max-h-[144px] bg-white rounded-lg shadow-[0_0px_1px_1px_rgba(0,0,0,0.06)]'>
      <div className='flex gap-2 px-4 py-3'>
        <Avatar
          variant='circular'
          size='sm'
          alt='avatar'
          className='h-10 w-10 border-solid border-gray-400 border cursor-pointer hover:brightness-90'
          src={userAccount.avatar?.url}
        />
        <button
          id='create-post-button'
          onClick={handleOpen}
          className='w-full h-auto min-h-[40px] max-h-[62px] bg-[#f0f2f5] rounded-full flex items-center cursor-pointer hover:bg-[#e4e6e9]'
        >
          <div
            style={{ display: '-webkit-box' }}
            className='max-w-[495px] h-auto min-h-[23px] max-h-[46px] pl-3 line-clamp-2 break-words'
          >
            <p id='create-post-text' className='text-gray-700 text-[17px] text-start leading-[23px]'>
              {content ? content : userAccount.lastName + ' ơi, bạn đang nghĩ gì thế?'}
            </p>
          </div>
        </button>
      </div>
      <hr className='border-gray-300 mx-4'></hr>
      {/* type */}
      <div className='flex mx-4 my-2'>
        {/* livestream type */}
        <button className='h-10 w-[186px] hover:bg-[#f2f2f2] rounded-lg flex items-center justify-center gap-2'>
          <img
            src='https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/v1iF2605Cb5.png'
            alt='livestream-type'
            className='h-6 w-6'
          />
          <span className='text-[15px] text-[#65676B] font-semibold'>Video trực tiếp</span>
        </button>
        {/* picture and video type */}
        <button className='h-10 w-[186px] hover:bg-[#f2f2f2] rounded-lg flex items-center justify-center gap-2'>
          <img
            src='https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png'
            alt='normal-type'
            className='h-6 w-6'
          />
          <span className='text-[15px] text-[#65676B] font-semibold'>Ảnh/video</span>
        </button>
        {/* emoji/activities */}
        <button className='h-10 w-[186px] hover:bg-[#f2f2f2] rounded-lg flex items-center justify-center gap-2'>
          <img
            src='https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/yMDS19UDsWe.png'
            alt='emoji-type'
            className='h-6 w-6'
          />
          <span className='text-[15px] text-[#65676B] font-semibold'>Cảm xúc/hoạt động</span>
        </button>
      </div>

      {/* Dialog đăng bài */}
      <Dialog
        dismiss={{ enabled: false }}
        open={open}
        handler={handleOpen}
        className={`${openPrivacy ? 'w-[500px]' : 'w-[500px]'} bg-white`}
        size='xs'
      >
        {openPrivacy ? dialogPrivacyContent : dialogMainContent}
      </Dialog>
    </div>
  )
}

export default CreatePost
