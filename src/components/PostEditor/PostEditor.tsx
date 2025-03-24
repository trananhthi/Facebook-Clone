import { Avatar, Dialog } from '@material-tailwind/react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { privacyList } from 'src/constants/list'
import { PreviewMediaContentType } from 'src/types/media.type'
import DialogPrivacyContent from './components/DialogPrivacyContent'
import PostEditorDialog from './components/PostEditorDialog'
import MediaEditor from './components/MediaEditor'
import { PrivacyType } from 'src/types/utils.type.ts'

interface Props {
  refetch: () => void
}

function PostEditor({ refetch }: Props) {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const curDialogRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState('')

  const [open, setOpen] = useState(false)
  const [content, setContent] = useState<string>('')
  const [openPrivacy, setOpenPrivacy] = useState<boolean>(false)
  const [openEditMediaContent, setOpenEditMediaContent] = useState<boolean>(false)
  const [privacyPost, setPrivacyPost] = useState<PrivacyType>(
    privacyList.find((p) => p.value === (userAccount.privacyDefault as string)) as PrivacyType
  )
  const [isStartAnimationClosePrivacyDialog, setIsStartAnimationClosePrivacyDialog] = useState(false)
  const [mediaContentMap, setMediaContentMap] = useState<
    Map<File, { preview: PreviewMediaContentType; visualIndex: number }>
  >(new Map())
  const [openAddMediaContent, setOpenAddMediaContent] = useState<boolean>(false)
  const handleOpen = () => setOpen(!open)

  const dialogMainContent: JSX.Element = (
    <PostEditorDialog
      type='create'
      content={content}
      setContent={setContent}
      handleOpen={handleOpen}
      userAccount={userAccount}
      setOpenPrivacy={setOpenPrivacy}
      setOpenEditMediaContent={setOpenEditMediaContent}
      privacyPost={privacyPost}
      isStartAnimationClosePrivacyDialog={isStartAnimationClosePrivacyDialog}
      setIsStartAnimationClosePrivacyDialog={setIsStartAnimationClosePrivacyDialog}
      mediaContentMap={mediaContentMap}
      setMediaContentMap={setMediaContentMap}
      openAddMediaContent={openAddMediaContent}
      setOpenAddMediaContent={setOpenAddMediaContent}
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

  const MediaEditorDialog: JSX.Element = (
    <MediaEditor
      setOpenEditImage={setOpenEditMediaContent}
      curDialogRef={curDialogRef}
      mediaContentMap={mediaContentMap}
      setMediaContentMap={setMediaContentMap}
      setWidth={setWidth}
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

  useEffect(() => {
    // if (curDialogRef.current) {
    //   const curDialogElement = curDialogRef.current as HTMLElement
    //   setWidth(`w-[${curDialogElement.offsetWidth}px]`)
    // } else {
    //   setWidth('w-[500px]')
    // }

    if (!openEditMediaContent) {
      setWidth('w-[500px]')
    }
  }, [openEditMediaContent])

  return (
    <div className='1200:w-[590px] w-[500px] 700-1100:w-[590px] max-500:w-[475px] h-auto min-h-[123px] max-h-[144px] bg-white rounded-lg shadow-[0_0px_1px_1px_rgba(0,0,0,0.06)]'>
      <div className='flex gap-2 px-4 py-3'>
        <Avatar
          variant='circular'
          size='sm'
          alt='avatar'
          className='h-10 w-10 border-solid border-gray-400 border cursor-pointer hover:brightness-90'
          src={userAccount.avatar}
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
      <div className='flex mx-4 my-2 justify-between items-center'>
        {/* livestream type */}
        <button className='h-10 w-[186px] hover:bg-[#f2f2f2] rounded-lg flex items-center justify-center gap-2 flex-1'>
          <img
            src='https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/v1iF2605Cb5.png'
            alt='livestream-type'
            className='h-6 w-6'
          />
          <span className='text-[15px] text-[#65676B] font-semibold'>Video trực tiếp</span>
        </button>
        {/* picture and video type */}
        <button className='h-10 w-[186px] hover:bg-[#f2f2f2] rounded-lg flex items-center justify-center gap-2 flex-1'>
          <img
            src='https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png'
            alt='normal-type'
            className='h-6 w-6'
          />
          <span className='text-[15px] text-[#65676B] font-semibold'>Ảnh/video</span>
        </button>
        {/* emoji/activities */}
        <button className='h-10 w-[186px] hover:bg-[#f2f2f2] rounded-lg flex items-center justify-center gap-2 max-500:hidden flex-1'>
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
        className={`bg-white ${width} transition-[width] duration-100 ease-in-out max-500:ml-0`}
        size='xs'
      >
        {openPrivacy ? dialogPrivacyContent : openEditMediaContent ? MediaEditorDialog : dialogMainContent}
      </Dialog>
    </div>
  )
}

export default PostEditor
