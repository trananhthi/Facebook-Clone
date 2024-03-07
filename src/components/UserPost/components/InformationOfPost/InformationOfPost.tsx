import { Avatar, Dialog, Popover, PopoverHandler, Tooltip } from '@material-tailwind/react'
import { emojiList } from 'src/constants/list'
import EmojiButton from '../EmojiButton'
import { formatDateTime, formatTimeAgo, getTop3Emoji, restoreNewlinesFromStorage } from 'src/utils/utils'
import { Fragment, useEffect, useRef, useState } from 'react'
import { PostType } from 'src/types/post.type'
import { privacyList } from 'src/constants/list'
import { EmojiType, PrivacyType } from 'src/types/utils.type'
import { ReactionType } from 'src/types/reaction.type'
import { Top2LatestCommentsType } from 'src/types/comment.type'
import { UserInfor } from 'src/types/user.type'
import ShowImageInPost from 'src/components/ShowImageInPost'
import EditPostPopover from 'src/components/EditPostPopover'

/* import images */
import facebookIcon9 from 'src/assets/images/icon-pack/facbook_icon_9.png'
import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'
import DialogMainContent from 'src/components/CreatePost/components/DialogMainContent'
import DialogPrivacyContent from 'src/components/CreatePost/components/DialogPrivacyContent'
import DialogEditImage from 'src/components/CreatePost/components/DialogEditImage'

interface Props {
  post: PostType
  userAccount: Partial<UserInfor>
  reactionList: ReactionType[]
  top2LatestComments: Top2LatestCommentsType
  refetchReaction: () => void
  handleClickCommentButton: () => void
  isInDetailPost: boolean
}

function InformationOfPost({
  post,
  userAccount,
  reactionList,
  top2LatestComments,
  refetchReaction,
  handleClickCommentButton,
  isInDetailPost
}: Props) {
  const [curPost, setCurPost] = useState<PostType>(post)
  const [top3EmojiList, setTop3EmojiList] = useState<EmojiType[]>([])
  const [arrowBox, setArrowBox] = useState<string>('arrow-box-top')
  const interactFieldRef = useRef(null) //Vùng tương tác với bài viết như like, comment
  const postHeaderRef = useRef(null)
  const lines = restoreNewlinesFromStorage(curPost.content).split('\n')
  const [openPopover, setOpenPopover] = useState(false)

  ///////////////////////////////////////////////////////////////////////start
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState<string>(curPost.content)
  const [openPrivacy, setOpenPrivacy] = useState<boolean>(false)
  const [privacyPost, setPrivacyPost] = useState<PrivacyType>(
    privacyList.find((p) => p.value === (curPost.privacy as string)) as PrivacyType
  )
  const [isStartAnimationClosePrivacyDialog, setIsStartAnimationClosePrivacyDialog] = useState(false)
  const [previewImage, setPreviewImage] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<FileList | null>(null)
  const [openAddImage, setOpenAddImage] = useState<boolean>(false)
  const [openEditImage, setOpenEditImage] = useState<boolean>(false)
  const [width, setWidth] = useState('')
  const curDialogRef = useRef(null)

  //hàm mở dialog chỉnh sửa bài viết
  const handleOpenEditPostDialog = () => {
    setOpen(!open)
    setOpenPopover(false)
    setContent(curPost.content)
    setPreviewImage(curPost.image.map((image: { url: string }) => image.url))
    setPrivacyPost(privacyList.find((p) => p.value === (curPost.privacy as string)) as PrivacyType)
    setOpenAddImage(curPost.image.length > 0 ? true : false)
  }

  const handleOpenPopover = () => {
    setOpenPopover(!openPopover)
  }

  const dialogMainContent: JSX.Element = (
    <DialogMainContent
      type='edit'
      post={curPost}
      setCurPost={setCurPost}
      content={content}
      setContent={setContent}
      handleOpen={handleOpenEditPostDialog}
      userAccount={userAccount}
      setOpenPrivacy={setOpenPrivacy}
      privacyPost={privacyPost}
      isStartAnimationClosePrivacyDialog={isStartAnimationClosePrivacyDialog}
      setIsStartAnimationClosePrivacyDialog={setIsStartAnimationClosePrivacyDialog}
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      previewImage={previewImage}
      setPreviewImage={setPreviewImage}
      openAddImage={openAddImage}
      setOpenAddImage={setOpenAddImage}
      setOpenEditImage={setOpenEditImage}
    />
  )
  const dialogPrivacyContent: JSX.Element = (
    <DialogPrivacyContent
      type='edit'
      openPrivacy={openPrivacy}
      setOpenPrivacy={setOpenPrivacy}
      privacyPost={privacyPost}
      setPrivacyPost={setPrivacyPost}
      userAccount={userAccount}
      setIsStartAnimationClosePrivacyDialog={setIsStartAnimationClosePrivacyDialog}
    />
  )

  const dialogEditImage: JSX.Element = (
    <DialogEditImage
      setOpenEditImage={setOpenEditImage}
      curDialogRef={curDialogRef}
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      previewImage={previewImage}
      setPreviewImage={setPreviewImage}
    />
  )

  ///////////////////////////////////////////////////////////end

  useEffect(() => {
    const temp: EmojiType[] = []
    if (reactionList && reactionList.length > 0) {
      getTop3Emoji(reactionList).forEach((reaction) => {
        const emoji = emojiList.find((emoji) => emoji.value === reaction.type)
        if (emoji) temp.push(emoji)
      })
      setTop3EmojiList(temp)
    } else {
      setTop3EmojiList([])
    }
  }, [reactionList])

  useEffect(() => {
    window.addEventListener('scroll', function () {
      const headerRect = document.getElementById('home-header')?.getBoundingClientRect()
      if (headerRect && postHeaderRef.current) {
        const postHeaderRect = (postHeaderRef.current as HTMLElement).getBoundingClientRect()
        const distanceToHeader = (postHeaderRect.top - headerRect.bottom) as number
        if (distanceToHeader < 218) setArrowBox('arrow-box-top')
        else setArrowBox('arrow-box-bottom')
      }
    })
  }, [])

  useEffect(() => {
    if (curDialogRef.current) {
      const curDialogElement = curDialogRef.current as HTMLElement
      setWidth(`w-[${curDialogElement.offsetWidth}px]`)
    } else {
      setWidth('w-[500px]')
    }
  }, [openEditImage, previewImage, selectedImage])

  return (
    <>
      <div ref={postHeaderRef} className='flex justify-between items-center'>
        {/* thông tin về bài viết */}
        <div className='flex gap-2 px-4 pt-3 pb-2'>
          <Avatar
            variant='circular'
            size='sm'
            alt='avatar'
            className='h-10 w-10 border-solid border-gray-400 border'
            src={curPost.author.avatar.url}
          />
          <div className='flex flex-col'>
            <span className='text-[#050505] text-[15px] font-semibold cursor-pointer hover:underline hover:underline-offset-1'>
              {curPost.author.firstName + ' ' + curPost.author.lastName}
            </span>
            <span className='flex items-center hover:underline-offset-1 font-normal'>
              <Tooltip
                placement='bottom'
                content={formatDateTime(curPost.createdAt)}
                className='text-white text-[13px] bg-[rgba(0,0,0,0.8)]'
              >
                <span className='text-[#65676B] cursor-pointer text-[13px] hover:underline hover:underline-offset-1 font-normal'>
                  {formatTimeAgo(curPost.createdAt)}
                </span>
              </Tooltip>
              <span className='ml-1 text-[#65676B]'> &middot;</span>
              <Tooltip
                placement='bottom'
                content={privacyList.find((icon) => icon.value === curPost.privacy)?.title}
                className='text-white text-[13px] bg-[rgba(0,0,0,0.8)]'
              >
                <img
                  src={privacyList.find((icon) => icon.value === curPost.privacy)?.icon}
                  alt='friend-logo'
                  className='h-3 w-3 text-[#65676B] inline ml-1 opacity-60 cursor-pointer'
                />
              </Tooltip>
            </span>
          </div>
        </div>
        {/* edit button */}
        <Popover
          placement='bottom'
          offset={{ mainAxis: 10, crossAxis: -160 }}
          open={openPopover}
          handler={setOpenPopover}
        >
          <PopoverHandler onClick={handleOpenPopover}>
            <button
              className={`hover:bg-[#f2f2f2] h-9 w-9 rounded-full flex justify-center items-center ${
                isInDetailPost ? 'mr-1' : 'mr-4'
              }`}
            >
              <div
                style={{ backgroundImage: `url(${facebookIcon3})` }}
                className='bg-[length:190px_186px] bg-[-44px_-110px] h-5 w-5 opacity-60'
              ></div>
            </button>
          </PopoverHandler>

          <EditPostPopover
            arrowBox={arrowBox}
            handleOpenEditPostDialog={handleOpenEditPostDialog}
            userAccount={userAccount}
            post={post}
          />
        </Popover>
      </div>
      {/* content */}
      <div className={`px-4 text-[#050505] ${curPost.image.length !== 0 ? 'text-[15px] leading-5' : 'text-2xl'}`}>
        {lines.map((line, index) => (
          <Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </Fragment>
        ))}
      </div>
      {/* hình ảnh/ video */}

      {curPost.image.length !== 0 ? <ShowImageInPost listImage={curPost.image} /> : ''}

      {/* amount of emoji */}
      <div
        className={`px-4 ${
          top3EmojiList.length !== 0 || top2LatestComments.total !== 0 ? 'py-[10px]' : 'mt-[10px]'
        } flex items-center ml-1 justify-between ${isInDetailPost ? 'pr-1' : ''}`}
      >
        <div className='flex items-center gap-1'>
          <div className='flex'>
            {top3EmojiList.map((emoji) => (
              <img
                key={emoji.value}
                className='first:z-[90] first:ring-2 first:ring-white first:rounded-full [&:nth-child(2)]:ring-2 [&:nth-child(2)]:ring-white [&:nth-child(2)]:z-[89] [&:nth-child(2)]:rounded-full'
                height={18}
                width={18}
                src={emoji.icon}
                alt={`Emoji ${emoji.value}`}
              />
            ))}
          </div>
          <span className='text-[15px] text-[#65676b] hover:underline hover:cursor-pointer'>
            {reactionList.length > 0 ? reactionList.length : ''}
          </span>
        </div>
        <span
          className={`text-[15px] h-[23px] text-[#65676b] leading-5 hover:underline hover:cursor-pointer ${
            top2LatestComments.total === 0 ? 'hidden' : ''
          }`}
        >
          {top2LatestComments.total + ' bình luận'}
        </span>
      </div>

      <hr className={`border-gray-300 mx-4 ${isInDetailPost ? 'mr-1' : ''}`}></hr>
      {/* emoji, comment,share */}
      <div
        ref={interactFieldRef}
        className={`px-4 my-1 grid grid-flow-col gap-1 ${isInDetailPost ? 'pr-1' : ''}`}
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        {/* emoji button */}
        <EmojiButton
          interactFieldRef={interactFieldRef}
          reactionList={reactionList}
          userAccount={userAccount}
          postID={curPost.id}
          refetch={refetchReaction}
        />
        {/* comment button */}
        <button
          onClick={handleClickCommentButton}
          className='h-8 w-full px-3 py-0 hover:bg-[#f2f2f2] rounded-md flex items-center justify-center gap-2'
        >
          <div
            className='bg-[length:26px_1536px] bg-[0px_-576px] h-5 w-5 opacity-70'
            style={{ backgroundImage: `url(${facebookIcon9})` }}
          ></div>
          <span className='text-[15px] text-[#65676B] font-semibold'>Bình luận</span>
        </button>
        {/* share button */}
        <button className='h-8  px-3 py-1 hover:bg-[#f2f2f2] rounded-md flex items-center justify-center gap-2'>
          <div
            className='bg-[length:26px_1536px] bg-[0px_-928px] h-5 w-5 opacity-70'
            style={{ backgroundImage: `url(${facebookIcon9})` }}
          ></div>
          <span className='text-[15px] text-[#65676B] font-semibold'>Chia sẻ</span>
        </button>
      </div>
      <hr className={`border-gray-300 mx-4 mt-1 ${isInDetailPost ? 'mr-1' : ''}`}></hr>
      <Dialog
        dismiss={{ enabled: false }}
        open={open}
        handler={handleOpenEditPostDialog}
        className={`bg-white ${width} transition-[width] duration-100 ease-in-out`}
        size='xs'
      >
        {openPrivacy ? dialogPrivacyContent : openEditImage ? dialogEditImage : dialogMainContent}
      </Dialog>
    </>
  )
}

export default InformationOfPost
