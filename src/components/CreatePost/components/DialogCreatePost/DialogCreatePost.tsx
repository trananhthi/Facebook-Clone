import { Avatar, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react'
import { useEffect, useRef, useState } from 'react'
import { UserInfor } from 'src/types/user.type'
import userAccountApi from 'src/apis/userAccount.api'
import { useMutation } from '@tanstack/react-query'
import { CreatePostType } from 'src/types/post.type'
import Picker from '@emoji-mart/react'

/* import image */
import defaultAva from 'src/assets/images/default_avatar.png'
import chooseBackGroundIcon from 'src/assets/images/chooseBackGroundIcon.png'
import facebookIcon7 from 'src/assets/images/facbook_icon_7.png'
import facebookIcon3 from 'src/assets/images/facbook_icon_3.png'
import imageIcon from 'src/assets/images/imageIcon.png'
import tagFriendIcon from 'src/assets/images/tagFriendIcon.png'
import activityIcon from 'src/assets/images/activityIcon.png'
import locationIcon from 'src/assets/images/locationIcon.png'
import gifIcon from 'src/assets/images/gifIcon.png'
import { useDispatch } from 'react-redux'
import { setUserAccountAction } from 'src/redux/actions/userAccountAction'
import postApi from 'src/apis/post.api'
import { PrivacyType } from 'src/types/utils.type'
import { privacyList } from 'src/constants/list'

interface MainContentProps {
  handleOpen: () => void
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  userAccount: Partial<UserInfor>
  setOpenPrivacy: React.Dispatch<React.SetStateAction<boolean>>
  privacyPost: PrivacyType
  isStartAnimationClosePrivacyDialog: boolean
  setIsStartAnimationClosePrivacyDialog: React.Dispatch<React.SetStateAction<boolean>>
}

function DialogMainContent({
  handleOpen,
  content,
  setContent,
  userAccount,
  setOpenPrivacy,
  privacyPost,
  isStartAnimationClosePrivacyDialog,
  setIsStartAnimationClosePrivacyDialog
}: MainContentProps) {
  const [openEmoji, setOpenEmoji] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [rows, setRows] = useState<number>(3)
  const [startAnimationOpenPrivacyDialog, setStartAnimationOpenPrivacyDialog] = useState(false)

  const dialogMainContentRef = useRef(null)

  const createPostMutation = useMutation({
    mutationFn: (body: CreatePostType) => postApi.createPost(body),
    onSuccess: () => {
      handleOpen()
      setContent('')
    },
    onError: (err) => console.log(err)
  })

  const handleEmojiSelect = (emoji: any) => {
    setContent(content + emoji.native)
  }

  const handleClickOutsideEmojiPicker = () => {
    if (openEmoji && !isClicked) setOpenEmoji(false)
  }

  const handleClickEmojiButton = () => {
    setOpenEmoji((cur) => !cur)
    setIsClicked(true)
  }

  const hanldeClickPublishPost = () => {
    createPostMutation.mutate({ content: content, typePost: 'text', privacy: privacyPost.value })
  }

  const hanldeClickOpenPrivacyDialog = () => {
    setStartAnimationOpenPrivacyDialog(true)
  }

  useEffect(() => {
    if (dialogMainContentRef.current) {
      const dialogMainContentElement = dialogMainContentRef.current as HTMLElement
      dialogMainContentElement.addEventListener('animationend', (event) => {
        if (event.animationName === 'slide-out-left-post') setOpenPrivacy(true)
        if (event.animationName === 'slide-in-left-post') setIsStartAnimationClosePrivacyDialog(false)
      })
    }
  }, [isStartAnimationClosePrivacyDialog])

  const handleTextInput = (textArea: HTMLElement) => {
    textArea.style.height = textArea.scrollHeight + 'px'
    let scrollHeight = textArea.scrollHeight
    let maxRows = 1 // Đặt số hàng tối đa
    let lineHeight = scrollHeight / maxRows
    if (scrollHeight > lineHeight * maxRows) {
      textArea.style.height = maxRows * lineHeight + 'px'
    } else {
      textArea.style.height = scrollHeight + 'px'
    }
    if (content.length < 50) {
      setRows(3)
      textArea.style.height = '96px'
    }
  }

  return (
    <div ref={dialogMainContentRef}>
      <DialogHeader className='bg-white rounded-t-md h-[60px] border-b border-gray-300 p-4 block'>
        <div
          data-animationsclose={startAnimationOpenPrivacyDialog}
          data-animationsopen={isStartAnimationClosePrivacyDialog}
          className='flex items-center data-[animationsclose=true]:animate-slide-out-left-post data-[animationsopen=true]:animate-slide-in-left-post'
        >
          <div className='w-full flex justify-center'>
            <span className='text-[20px] text-[#050505] font-bold'>Tạo bài viết</span>
          </div>
          <div className='flex justify-end absolute w-[464px]'>
            <IconButton
              color='blue-gray'
              className='h-9 w-9 bg-[#e4e6eb] rounded-full hover:bg-[#d8dadf] px-4'
              variant='text'
              onClick={handleOpen}
            >
              <div
                style={{ backgroundImage: `url(${facebookIcon3})` }}
                className='bg-[length:190px_186px] bg-[-22px_-110px] h-5 w-5 opacity-60'
              ></div>
            </IconButton>
          </div>
        </div>
      </DialogHeader>

      <DialogBody className='w-[500px] p-4'>
        {/* Header */}
        <div
          data-animationsclose={startAnimationOpenPrivacyDialog}
          data-animationsopen={isStartAnimationClosePrivacyDialog}
          className='data-[animationsclose=true]:animate-slide-out-left-post data-[animationsopen=true]:animate-slide-in-left-post'
        >
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <Avatar
                variant='circular'
                size='sm'
                alt='avatar'
                className='h-10 w-10 border-solid border-gray-400 border'
                src={defaultAva}
              />
              <div className='flex flex-col'>
                <span className='text-[#050505] text-[15px] font-semibold cursor-pointer'>
                  {userAccount.firstName + ' ' + userAccount.lastName}
                </span>
                {/* <div> */}
                <button
                  onClick={hanldeClickOpenPrivacyDialog}
                  className='text-[#65676B] text-[13px] w-fit min-w-[89px] p-1 h-6 bg-[#e4e6eb] rounded-md flex justify-center items-center gap-1'
                >
                  <img src={privacyPost.icon} alt='friend-logo' className='h-3 w-3 text-[#65676B] inline ml-1' />
                  <span className='text-[#050505] text-[13px] font-semibold'>{privacyPost.title}</span>
                  <div
                    style={{ backgroundImage: `url(${facebookIcon3})` }}
                    className='bg-[length:190px_186px] bg-[0px_-172px] h-3 w-3'
                  ></div>
                </button>
                {/* </div> */}
              </div>
            </div>
          </div>
          <div className='mt-4'>
            <textarea
              rows={rows}
              onInput={(event) => handleTextInput(event.target as HTMLElement)}
              className={`w-full ${
                content.length > 800
                  ? 'h-[260px]'
                  : content.length > 500
                  ? 'h-[180px]'
                  : content.length > 300
                  ? 'h-[140px]'
                  : content.length < 50
                  ? 'h-auto'
                  : 'h-[120px]'
              } input-scrollbar overflow-y-auto min-h-[80px] max-h-[260px] ${
                content.length > 100 ? 'text-[15px] leading-5' : 'text-2xl'
              } text-[#050505] resize-none active:outline-0 focus:outline-0 placeholder:text-2xl placeholder:text-[#65676b]`}
              placeholder={userAccount.lastName + ` ơi, bạn đang nghĩ gì thế?`}
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
              }}
            />
            <div className={`flex justify-between items-center  ${rows >= 5 ? 'mt-1' : 'mt-3'}`}>
              <button>
                <img src={chooseBackGroundIcon} alt='friend-logo' className='h-[38px] w-[38px]' />
              </button>
              <button
                onMouseLeave={() => setIsClicked(false)}
                onClick={handleClickEmojiButton}
                className='h-9 w-9 flex justify-center items-center'
              >
                <div
                  style={{ backgroundImage: `url(${facebookIcon7})` }}
                  className='bg-[length:38px_486px] bg-[0px_-76px] opacity-70 h-6 w-6 hover:opacity-100'
                ></div>
              </button>
              {/* Emoji Picker */}
              <div className={`${openEmoji ? '' : 'hidden'} absolute ml-[480px] mb-[200px]`}>
                <Picker
                  onClickOutside={() => handleClickOutsideEmojiPicker()}
                  theme='light'
                  locale='vi'
                  showReview={true}
                  set='facebook'
                  previewPosition='none'
                  onEmojiSelect={handleEmojiSelect}
                />
              </div>
            </div>
          </div>
          {/* add more */}
          <div className='h-[58px] flex justify-between items-center rounded-lg border border-gray-500 shadow mt-4 p-4'>
            <span className='text-[#050505] text-[15px] font-semibold'>Thêm vào bài viết của bạn</span>

            <div className='flex justify-center items-center '>
              <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
                <img src={imageIcon} className='h-6 w-6' />
              </button>
              <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
                <img src={tagFriendIcon} className='h-6 w-6' />
              </button>
              <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
                <img src={activityIcon} className='h-6 w-6' />
              </button>
              <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
                <img src={locationIcon} className='h-6 w-6' />
              </button>
              <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
                <img src={gifIcon} className='h-6 w-6' />
              </button>
              <button className='hover:bg-[#f2f2f2] h-8 w-8 rounded-full flex justify-center items-center'>
                <div
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className='bg-[length:190px_186px] bg-[-44px_-110px] h-5 w-5'
                ></div>
              </button>
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className='p-4 pt-0'>
        <button
          data-animationsclose={startAnimationOpenPrivacyDialog}
          data-animationsopen={isStartAnimationClosePrivacyDialog}
          onClick={hanldeClickPublishPost}
          disabled={content === ''}
          className='py-1 rounded-md bg-[#0866ff] w-full disabled:bg-[#e4e6eb] data-[animationsclose=true]:animate-slide-out-left-post data-[animationsopen=true]:animate-slide-in-left-post'
        >
          <span className={`text-[15px] leading-5 font-semibold ${content !== '' ? 'text-white' : 'text-[#bcc0c4]'}`}>
            Đăng
          </span>
        </button>
      </DialogFooter>
    </div>
  )
}

interface PrivacyContentProps {
  OpenPrivacy: boolean
  setOpenPrivacy: React.Dispatch<React.SetStateAction<boolean>>
  privacyPost: PrivacyType
  setPrivacyPost: React.Dispatch<React.SetStateAction<PrivacyType>>
  userAccount: Partial<UserInfor>
  setIsStartAnimationClosePrivacyDialog: React.Dispatch<React.SetStateAction<boolean>>
}

function DialogPrivacyContent({
  OpenPrivacy,
  setOpenPrivacy,
  privacyPost,
  setPrivacyPost,
  userAccount,
  setIsStartAnimationClosePrivacyDialog
}: PrivacyContentProps) {
  const dispatch = useDispatch()
  const [current] = useState(privacyPost)
  const [checked, setChecked] = useState(false)
  const [startAnimationClosePrivacyDialog, setStartAnimationClosePrivacyDialog] = useState(false)
  const dialogPrivacyContenttRef = useRef(null)

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
    if (dialogPrivacyContenttRef.current) {
      const dialogMainContentElement = dialogPrivacyContenttRef.current as HTMLElement
      dialogMainContentElement.addEventListener('animationend', (event) => {
        if (event.animationName === 'slide-out-right-post') {
          setOpenPrivacy(false)
          setIsStartAnimationClosePrivacyDialog(true)
        }
      })
    }
  }, [startAnimationClosePrivacyDialog])

  return (
    <div ref={dialogPrivacyContenttRef} className='transition-all'>
      <DialogHeader className='bg-white rounded-t-md h-[60px] border-b border-gray-300 p-4 block'>
        <div
          data-animationsopen={OpenPrivacy}
          data-animationsclose={startAnimationClosePrivacyDialog}
          className='flex items-center data-[animationsopen=true]:animate-slide-in-right-post data-[animationsclose=true]:animate-slide-out-right-post'
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
          data-animationsopen={OpenPrivacy}
          data-animationsclose={startAnimationClosePrivacyDialog}
          className='data-[animationsopen=true]:animate-slide-in-right-post data-[animationsclose=true]:animate-slide-out-right-post'
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
          data-animationsopen={OpenPrivacy}
          data-animationsclose={startAnimationClosePrivacyDialog}
          className='flex flex-col gap-4 data-[animationsopen=true]:animate-slide-in-right-post data-[animationsclose=true]:animate-slide-out-right-post'
        >
          <div className='w-full flex justify-start items-center'>
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

interface Props {
  open: boolean
  handleOpen: () => void
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  userAccount: Partial<UserInfor>
}

function DialogCreatePost({ open, handleOpen, content, setContent, userAccount }: Props) {
  const [OpenPrivacy, setOpenPrivacy] = useState<boolean>(false)
  const [privacyPost, setPrivacyPost] = useState<PrivacyType>(
    privacyList.find((p) => p.value === (userAccount.privacyDefault as string)) as PrivacyType
  )
  const [isStartAnimationClosePrivacyDialog, setIsStartAnimationClosePrivacyDialog] = useState(false)
  const dialogMainContent: JSX.Element = (
    <DialogMainContent
      content={content}
      setContent={setContent}
      handleOpen={handleOpen}
      userAccount={userAccount}
      setOpenPrivacy={setOpenPrivacy}
      privacyPost={privacyPost}
      isStartAnimationClosePrivacyDialog={isStartAnimationClosePrivacyDialog}
      setIsStartAnimationClosePrivacyDialog={setIsStartAnimationClosePrivacyDialog}
    />
  )
  const dialogPrivacyContent: JSX.Element = (
    <DialogPrivacyContent
      OpenPrivacy={OpenPrivacy}
      setOpenPrivacy={setOpenPrivacy}
      privacyPost={privacyPost}
      setPrivacyPost={setPrivacyPost}
      userAccount={userAccount}
      setIsStartAnimationClosePrivacyDialog={setIsStartAnimationClosePrivacyDialog}
    />
  )
  useEffect(() => {
    if (!open) setOpenPrivacy(false)
  }, [open, OpenPrivacy, privacyPost])

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className={`${OpenPrivacy ? 'w-[500px]' : 'w-[500px]'} bg-white`}
      size='xs'
    >
      {OpenPrivacy ? dialogPrivacyContent : dialogMainContent}
    </Dialog>
  )
}

export default DialogCreatePost
