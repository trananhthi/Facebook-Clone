import { Avatar, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react'
import React, { useEffect, useRef, useState } from 'react'
import { UserInfo } from 'src/types/user.type'
import { useMutation } from '@tanstack/react-query'
import Picker from '@emoji-mart/react'
import postApi from 'src/apis/post.api'
import { PreviewMediaContentType, PrivacyType } from 'src/types/utils.type'
import { convertNewlinesForStorage } from 'src/utils/utils'
import { PostType } from 'src/types/post.type'
import _ from 'lodash'

/* import image */
import chooseBackGroundIcon from 'src/assets/images/icon/chooseBackGroundIcon.png'
import facebookIcon7 from 'src/assets/images/icon-pack/facbook_icon_7.png'
import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'
import imageIcon from 'src/assets/images/icon/imageIcon.png'
import tagFriendIcon from 'src/assets/images/icon/tagFriendIcon.png'
import activityIcon from 'src/assets/images/icon/activityIcon.png'
import locationIcon from 'src/assets/images/icon/locationIcon.png'
import gifIcon from 'src/assets/images/icon/gifIcon.png'
import AddMediaContent from '../AddMediaContent'
import imageApi from 'src/apis/image.api'

interface Props {
  type: string
  post?: PostType
  setCurPost?: React.Dispatch<React.SetStateAction<PostType>>
  handleOpen: () => void
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  userAccount: Partial<UserInfo>
  setOpenPrivacy: React.Dispatch<React.SetStateAction<boolean>>
  setOpenEditMediaContent: React.Dispatch<React.SetStateAction<boolean>>
  privacyPost: PrivacyType
  isStartAnimationClosePrivacyDialog: boolean
  setIsStartAnimationClosePrivacyDialog: React.Dispatch<React.SetStateAction<boolean>>
  //sau này sửa lại kiểu dữ liệu
  selectedMediaContent: FileList | null
  setSelectedMediaContent: React.Dispatch<React.SetStateAction<FileList | null>>
  previewMediaContent: PreviewMediaContentType[]
  setPreviewMediaContent: React.Dispatch<React.SetStateAction<PreviewMediaContentType[]>>
  openAddMediaContent: boolean
  setOpenAddMediaContent: React.Dispatch<React.SetStateAction<boolean>>
  refetch?: () => void
}

function DialogCreatePost({
  type,
  post,
  setCurPost,
  handleOpen,
  content,
  setContent,
  userAccount,
  setOpenPrivacy,
  setOpenEditMediaContent,
  privacyPost,
  isStartAnimationClosePrivacyDialog,
  setIsStartAnimationClosePrivacyDialog,
  selectedMediaContent,
  setSelectedMediaContent,
  previewMediaContent,
  setPreviewMediaContent,
  openAddMediaContent,
  setOpenAddMediaContent,
  refetch
}: Props) {
  const [openEmoji, setOpenEmoji] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [startAnimationOpenPrivacyDialog, setStartAnimationOpenPrivacyDialog] = useState(false)
  const [isActivedButton, setIsActivedButton] = useState(false)
  const [openWarning, setOpenWarning] = useState(false)

  const dialogMainContentRef = useRef(null)
  const textareaRef = useRef(null)
  const addMoreRef = useRef(null)
  const fileInputRef = useRef(null)

  const createPostMutation = useMutation({
    mutationFn: (body: FormData) => postApi.createPost(body),
    onSuccess: () => {
      handleOpen()
      setContent('')
      handleCloseSelectMediaContent()
      refetch ? refetch() : null
    },
    onError: (err) => console.log(err)
  })

  const deleteImageMutation = useMutation({
    mutationFn: (imageId: string) => imageApi.deletePostImage(imageId),
    onError: (err) => console.log(err)
  })

  const updatePostMutation = useMutation({
    mutationFn: (body: FormData) => postApi.updatePost(body, post?.id as string),
    onSuccess: (data) => {
      handleOpen()
      if (setCurPost) {
        setCurPost(data.data)
      }
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

  /* xử lý tắt mở dialog cảnh báo chưa lưu */
  const handleOpenWarning = () => setOpenWarning(!openWarning)

  /* xử lý đăng bài viết */
  const hanldeClickPublishPost = () => {
    const formData = new FormData()
    formData.append('content', convertNewlinesForStorage(content))
    if (selectedMediaContent) {
      formData.append('typePost', 'image')
      for (let i = 0; i < selectedMediaContent.length; i++) {
        formData.append('files', selectedMediaContent[i])
      }
    } else {
      formData.append('typePost', 'text')
    }
    formData.append('privacy', privacyPost.value)
    createPostMutation.mutate(formData)
    //Giải phóng URL để tránh lỗi memory leak
    previewMediaContent.forEach((p) => URL.revokeObjectURL(p.url))
  }

  /* xử lý thay đổi bài viết */
  const handleEditPost = () => {
    const formData = new FormData()
    formData.append('content', convertNewlinesForStorage(content))
    if (previewMediaContent.length > 0) {
      formData.append('typePost', 'image')
    } else {
      formData.append('typePost', 'text')
    }
    if (selectedMediaContent) {
      for (let i = 0; i < selectedMediaContent.length; i++) {
        formData.append('files', selectedMediaContent[i])
      }
    }
    formData.append('privacy', privacyPost.value)
    const oldPreviewImage = post?.mediaList.map((media) => ({
      url: media.url,
      type: media.type
    }))
    const changedElementsInOldArray = _.difference(oldPreviewImage, previewMediaContent)

    if (changedElementsInOldArray.length > 0) {
      const deleteImagePromises = changedElementsInOldArray.map((changedElement) => {
        const imageToDelete = post?.mediaList.find((img) => img.url === changedElement.url)
        if (imageToDelete) {
          return deleteImageMutation.mutateAsync(imageToDelete.id)
        } else {
          return Promise.resolve() // Trả về promise đã giải quyết ngay lập tức nếu không tìm thấy ảnh
        }
      })

      // Chờ tất cả các promise trong mảng hoàn thành
      Promise.all(deleteImagePromises)
        .then(() => {
          // Tất cả các xóa hình đã hoàn thành, tiếp tục với updatePostMutation
          updatePostMutation.mutate(formData)
        })
        .catch((error) => {
          console.error('Error deleting images:', error)
        })
    } else {
      // Nếu không có ảnh nào thay đổi, chỉ thực hiện updatePostMutation
      updatePostMutation.mutate(formData)
    }
  }

  const hanldeClickOpenPrivacyDialog = () => {
    setStartAnimationOpenPrivacyDialog(true)
  }

  /* Xử lý tắt tùy chọn thêm hình ảnh */
  const handleCloseSelectMediaContent = () => {
    previewMediaContent.forEach((item) => {
      if (item.url.startsWith('blob:')) {
        URL.revokeObjectURL(item.url)
      }
    })
    setSelectedMediaContent(null)
    setPreviewMediaContent([])
    setOpenAddMediaContent(false)
    if (fileInputRef.current) {
      const fileInputElement = fileInputRef.current as HTMLInputElement
      fileInputElement.value = ''
    }
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

  useEffect(() => {
    if (textareaRef.current && addMoreRef.current) {
      const textareaElement = textareaRef.current as HTMLElement
      const addMoreElement = addMoreRef.current as HTMLElement
      if (openAddMediaContent) textareaElement.style.height = '20px'
      else textareaElement.style.height = '103px'
      textareaElement.style.height = textareaElement.scrollHeight + 'px'
      if (addMoreElement.scrollHeight + 3 >= 331) {
        addMoreElement.classList.remove('px-4')
        addMoreElement.classList.add('pl-4', 'pr-1')
      } else {
        addMoreElement.classList.remove('pl-4', 'pr-1')
        addMoreElement.classList.add('px-4')
      }
    }
  }, [content, openAddMediaContent, selectedMediaContent])

  useEffect(() => {
    if (type === 'edit' && post) {
      const oldPreviewImage = post.mediaList.map((media) => ({
        url: media.url,
        type: media.type
      }))
      if (
        (content !== post.content && content !== '') ||
        !_.isEqual(previewMediaContent, oldPreviewImage) ||
        privacyPost.value !== post.privacy
      )
        setIsActivedButton(true)
      else setIsActivedButton(false)
      if (content === '' && previewMediaContent.length === 0) setIsActivedButton(false)
    } else {
      if (content !== '' || previewMediaContent.length !== 0) setIsActivedButton(true)
      else setIsActivedButton(false)
    }

    if (previewMediaContent.length === 0) setOpenAddMediaContent(false)
  }, [content, previewMediaContent])

  return (
    <div
      ref={dialogMainContentRef}
      className={`${
        createPostMutation.isLoading || updatePostMutation.isLoading ? 'pointer-events-none' : ''
      } w-[500px]`}
    >
      <DialogHeader className='bg-white rounded-t-md h-[132px] p-0 block'>
        <div
          data-animationsclose={startAnimationOpenPrivacyDialog}
          data-animationsopen={isStartAnimationClosePrivacyDialog}
          className='data-[animationsclose=true]:animate-slide-out-left-post data-[animationsopen=true]:animate-slide-in-left-post'
        >
          {/* header */}
          <div className='flex items-center h-[60px] border-b border-gray-300'>
            <div className='w-full flex justify-center'>
              <span className='text-[20px] text-[#050505] font-bold'>
                {type === 'edit' ? 'Chỉnh sửa bài viết' : 'Tạo bài viết'}
              </span>
            </div>
            <div className='flex justify-end absolute w-full -ml-4'>
              <IconButton
                color='blue-gray'
                className='h-9 w-9 bg-[#e4e6eb] rounded-full hover:bg-[#d8dadf] px-4'
                variant='text'
                onClick={type === 'edit' && isActivedButton ? handleOpenWarning : handleOpen}
              >
                <div
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className='bg-[length:190px_186px] bg-[-22px_-110px] h-5 w-5 opacity-60'
                ></div>
              </IconButton>
            </div>
          </div>
          {/* avatar và chỉnh đối tượng xem bài */}
          <div className='flex justify-between items-center mx-4 py-[14px]'>
            <div className='flex gap-2 items-center'>
              <Avatar
                variant='circular'
                size='sm'
                alt='avatar'
                className='h-10 w-10 border-solid border-gray-400 border'
                src={userAccount.avatar}
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
        </div>
      </DialogHeader>

      <DialogBody className='w-[500px] p-0 mt-1 max-h-[331px] overflow-y-auto custom-scrollbar-vip'>
        <div
          data-animationsclose={startAnimationOpenPrivacyDialog}
          data-animationsopen={isStartAnimationClosePrivacyDialog}
          className='data-[animationsclose=true]:animate-slide-out-left-post data-[animationsopen=true]:animate-slide-in-left-post'
        >
          {/* viết text và chèn hình video */}
          <div className='p-0' ref={addMoreRef}>
            {openAddMediaContent ? (
              <div className='flex items-end'>
                <textarea
                  ref={textareaRef}
                  className={`w-full h-min-[32px] overflow-x-clip text-[15px] leading-5 text-[#050505] resize-none active:outline-0
                   focus:outline-0 placeholder:text-[15px] placeholder:opacity-80 placeholder:text-[#65676b]`}
                  placeholder={userAccount.lastName + ` ơi, bạn đang nghĩ gì thế?`}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value)
                  }}
                />
                {/* emoji button */}
                <button
                  onMouseLeave={() => setIsClicked(false)}
                  onClick={handleClickEmojiButton}
                  className='h-6 w-6 flex justify-end items-center'
                >
                  <div
                    style={{ backgroundImage: `url(${facebookIcon7})` }}
                    className={`bg-[length:38px_486px] bg-[0px_-76px] ${
                      openEmoji ? '' : 'opacity-70'
                    } h-6 w-6 hover:opacity-100`}
                  ></div>
                </button>
              </div>
            ) : (
              <textarea
                ref={textareaRef}
                className={`w-full overflow-clip min-h-[100px] ${
                  content.length > 100 ? 'text-[15px] leading-5' : 'text-2xl'
                } text-[#050505] resize-none active:outline-0 focus:outline-0 placeholder:text-2xl placeholder:text-[#65676b]`}
                placeholder={userAccount.lastName + ` ơi, bạn đang nghĩ gì thế?`}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value)
                }}
              />
            )}

            <div className={`flex justify-between items-center mt-1 ${openAddMediaContent ? 'hidden' : ''}`}>
              <button>
                <img src={chooseBackGroundIcon} alt='friend-logo' className='h-[38px] w-[38px]' />
              </button>
              <button
                onMouseLeave={() => setIsClicked(false)}
                onClick={handleClickEmojiButton}
                className='h-9 w-9 flex justify-end items-center'
              >
                <div
                  style={{ backgroundImage: `url(${facebookIcon7})` }}
                  className={`bg-[length:38px_486px] bg-[0px_-76px] ${
                    openEmoji ? '' : 'opacity-70'
                  } h-6 w-6 hover:opacity-100`}
                ></div>
              </button>
            </div>
            {/* thêm hình/video */}
            {openAddMediaContent ? (
              <AddMediaContent
                openAddMediaContent={openAddMediaContent}
                selectedMediaContent={selectedMediaContent}
                setSelectedMediaContent={setSelectedMediaContent}
                previewMediaContent={previewMediaContent}
                setPreviewMediaContent={setPreviewMediaContent}
                fileInputRef={fileInputRef}
                handleCloseSelectMediaContent={handleCloseSelectMediaContent}
                setOpenEditMediaContent={setOpenEditMediaContent}
              />
            ) : null}
          </div>
        </div>
      </DialogBody>
      <DialogFooter className='p-4 justify-center'>
        <div
          data-animationsclose={startAnimationOpenPrivacyDialog}
          data-animationsopen={isStartAnimationClosePrivacyDialog}
          className='w-full data-[animationsclose=true]:animate-slide-out-left-post data-[animationsopen=true]:animate-slide-in-left-post'
        >
          {/* add more */}
          <div className='h-[58px] w-full flex justify-between items-center rounded-lg border border-gray-500 shadow p-4 mb-4'>
            <span className='text-[#050505] text-[15px] font-semibold'>Thêm vào bài viết của bạn</span>

            <div className='flex justify-center items-center '>
              <button
                className={`h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center ${
                  openAddMediaContent ? 'bg-[#f2f2f2]' : ''
                }`}
                onClick={() => setOpenAddMediaContent(true)}
              >
                <img src={imageIcon} className='h-6 w-6' alt='imageIcon' />
              </button>
              <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
                <img src={tagFriendIcon} className='h-6 w-6' alt='tagFriendIcon' />
              </button>
              <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
                <img src={activityIcon} className='h-6 w-6' alt='activityIcon' />
              </button>
              <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
                <img src={locationIcon} className='h-6 w-6' alt='locationIcon' />
              </button>
              <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
                <img src={gifIcon} className='h-6 w-6' alt='gifIcon' />
              </button>
              <button className='hover:bg-[#f2f2f2] h-8 w-8 rounded-full flex justify-center items-center'>
                <div
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className='bg-[length:190px_186px] bg-[-44px_-110px] h-5 w-5'
                ></div>
              </button>
            </div>
          </div>
          <button
            onClick={type === 'edit' ? handleEditPost : hanldeClickPublishPost}
            disabled={!isActivedButton}
            className='flex gap-2 justify-center items-center py-2 rounded-md bg-[#0866ff] w-full disabled:bg-[#e4e6eb] disabled:cursor-not-allowed'
          >
            <svg
              className={`animate-spin h-5 w-5 text-white ${
                type === 'create'
                  ? createPostMutation.isLoading
                    ? ''
                    : 'hidden'
                  : updatePostMutation.isLoading || deleteImageMutation.isLoading
                  ? ''
                  : 'hidden'
              }`}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle className='opacity-50' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
              <path
                className='opacity-100'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            <span
              className={`text-[15px] leading-5 font-semibold ${isActivedButton ? 'text-white' : 'text-[#bcc0c4]'}`}
            >
              {type === 'create'
                ? createPostMutation.isLoading
                  ? 'Đang đăng...'
                  : 'Đăng'
                : updatePostMutation.isLoading || deleteImageMutation.isLoading
                ? 'Đang lưu...'
                : 'Lưu'}
            </span>
          </button>
        </div>
      </DialogFooter>
      {/* Emoji Picker */}
      <div className={`${openEmoji ? '' : 'hidden'} absolute ml-[510px] -mt-[520px]`}>
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

      {/* Thông báo chưa lưu thay đổi */}
      <Dialog
        dismiss={{ enabled: false }}
        open={openWarning}
        handler={handleOpenWarning}
        size='xs'
        className='w-[550px]'
      >
        <DialogHeader className='bg-white rounded-t-md p-0 block'>
          <div className='flex items-center h-[60px] border-b border-gray-300'>
            <div className='w-full flex justify-center'>
              <span className='text-[20px] text-[#050505] font-bold'>Thay đổi chưa lưu</span>
            </div>
            <div className='flex justify-end absolute w-full -ml-4'>
              <IconButton
                color='blue-gray'
                className='h-9 w-9 bg-[#e4e6eb] rounded-full hover:bg-[#d8dadf] px-4'
                variant='text'
                onClick={handleOpenWarning}
              >
                <div
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className='bg-[length:190px_186px] bg-[-22px_-110px] h-5 w-5 opacity-60'
                ></div>
              </IconButton>
            </div>
          </div>
        </DialogHeader>
        <DialogBody className='p-0 px-4 py-3'>
          <span className='text-[15px] leading-5 text-[#050505]'>Hệ thống sẽ không lưu các thay đổi của bạn.</span>
        </DialogBody>
        <DialogFooter className='gap-2'>
          <button
            onClick={handleOpenWarning}
            className='text-center text-[15px] py-[6px] text-[#0064d1] font-semibold w-[148px] rounded-md hover:bg-[#f2f2f2]'
          >
            Tiếp tục chỉnh sửa
          </button>
          <button
            onClick={() => {
              setOpenWarning(false)
              handleOpen()
            }}
            className='bg-[#0866ff] rounded-md py-[6px] text-center text-[15px] text-white font-semibold w-[98px] hover:brightness-90'
          >
            Bỏ
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default DialogCreatePost
