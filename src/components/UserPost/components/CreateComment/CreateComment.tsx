import { Avatar } from '@material-tailwind/react'
import { UserInfor } from 'src/types/user.type'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import commentApi from 'src/apis/comment.api'
import Picker from '@emoji-mart/react'
import { convertNewlinesForStorage } from 'src/utils/utils'

/* import images */
import facebookIcon9 from 'src/assets/images/icon-pack/facbook_icon_9.png'
import sendCmtActive from 'src/assets/images/active-icon/send-cmt-active.png'
import emojiIconActive from 'src/assets/images/active-icon/emoji-icon-active.png'
import { PostType } from 'src/types/post.type'

interface Props {
  userAccount: Partial<UserInfor>
  post: PostType
  textAreaRef: any
  focus: boolean
  refetch: () => void
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  maxW: string
}

function CreateComment({ userAccount, post, textAreaRef, refetch, focus, content, setContent, maxW }: Props) {
  const [isFocusInputField, setIsFocusInputField] = useState<boolean>(focus)
  //const [content, setContent] = useState<string>('')
  const [openEmoji, setOpenEmoji] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const createCommentMutation = useMutation({
    mutationFn: (body: { content: string }) => commentApi.createComment(body, post.id),
    onSuccess: () => {
      setContent('')
      if (textAreaRef.current) {
        const textAreaElement = textAreaRef.current as HTMLElement
        textAreaElement.style.height = '36px'
        textAreaElement.focus()
      }
      refetch()
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
    setIsFocusInputField(true)
    setOpenEmoji((cur) => !cur)
    setIsClicked(true)
  }

  const handleCreateComment = () => {
    createCommentMutation.mutate({ content: convertNewlinesForStorage(content) })
  }

  const mediaAttachContent = (
    <>
      {/* nhãn dán avatar */}
      <button className='h-9 w-9 hover:bg-[#e4e6e9] rounded-full flex justify-center items-center'>
        <div
          className='bg-[length:26px_1536px] bg-[0px_-1130px] h-4 w-4 opacity-50'
          style={{ backgroundImage: `url(${facebookIcon9})` }}
        ></div>
      </button>

      {/* icon cảm xúc */}
      <button
        onMouseLeave={() => setIsClicked(false)}
        onClick={handleClickEmojiButton}
        className='h-9 w-9 -ml-2 hover:bg-[#e4e6e9] rounded-full flex justify-center items-center'
      >
        <div
          className={`h-4 w-4 ${
            openEmoji
              ? 'bg-[length:15.5px_15.5px] bg-[0.2px_0.15px]'
              : 'bg-[length:26px_1536px] bg-[0px_-1238px] opacity-50'
          }`}
          style={{ backgroundImage: `url(${openEmoji ? emojiIconActive : facebookIcon9})` }}
        ></div>
      </button>

      {/* camera */}
      <button className='h-9 w-9 -ml-2 hover:bg-[#e4e6e9] rounded-full flex justify-center items-center'>
        <div
          className='bg-[length:26px_1536px] bg-[0px_-1166px] h-4 w-4 opacity-50'
          style={{ backgroundImage: `url(${facebookIcon9})` }}
        ></div>
      </button>

      {/* gif */}
      <button className='h-9 w-9 -ml-2 hover:bg-[#e4e6e9] rounded-full flex justify-center items-center'>
        <div
          className='bg-[length:26px_1536px] bg-[0px_-1274px] h-4 w-4 opacity-50'
          style={{ backgroundImage: `url(${facebookIcon9})` }}
        ></div>
      </button>

      {/* nhãn dán thường */}
      <button className='h-9 w-9 -ml-2 hover:bg-[#e4e6e9] rounded-full flex justify-center items-center'>
        <div
          className='bg-[length:26px_1536px] bg-[0px_-1418px] h-4 w-4 opacity-50'
          style={{ backgroundImage: `url(${facebookIcon9})` }}
        ></div>
      </button>
    </>
  )

  return (
    <div className='flex gap-2'>
      <>
        {/* <div className='w-8 h-8'> */}
        <Avatar
          variant='circular'
          size='sm'
          alt='avatar'
          className='h-8 w-8 border-solid border-gray-400 border cursor-pointer '
          src={userAccount.avatar?.url}
        />
        {/* </div> */}
        <div className='h-5 w-5 flex justify-center items-center rounded-full sticky mt-[18px] -ml-[22px]'>
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

      <div className='flex flex-col flex-1'>
        <div
          className={`w-full h-auto bg-[#f0f2f5] flex items-center ${
            isFocusInputField || content !== '' ? 'rounded-t-2xl' : 'rounded-full'
          }`}
        >
          <textarea
            ref={textAreaRef}
            onFocus={() => setIsFocusInputField(true)}
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
            }}
            style={{ maxWidth: maxW }}
            className={`w-full h-9 pt-[6.5px] px-3 overflow-clip text-[#050505] text-[15px] resize-none bg-[#f0f2f5] placeholder:text-[#050505] placeholder:opacity-60 active:outline-0 focus:outline-0 ${
              isFocusInputField || content !== '' ? 'rounded-t-2xl' : 'rounded-full'
            }`}
            placeholder='Viết bình luận công khai...'
          ></textarea>
          <div className={`flex ${isFocusInputField || content !== '' ? 'hidden' : ''}`}>{mediaAttachContent}</div>
        </div>
        {/* các button như icon, nhãn dán,... */}
        <div
          className={`w-full bg-[#f0f2f5] rounded-b-2xl flex justify-between items-center ${
            isFocusInputField || content !== '' ? '' : 'hidden'
          }`}
        >
          <div className='flex p-1 pb-1 pt-1'>{mediaAttachContent}</div>
          {/* create button */}
          <button
            onClick={handleCreateComment}
            className={`h-9 w-9 mr-2 rounded-full flex justify-center items-center ${
              content !== '' ? 'hover:bg-[#e4e6e9]' : 'cursor-not-allowed'
            }`}
          >
            <div
              className={`h-4 w-4 ${
                content !== ''
                  ? 'bg-[length:17px_17px] bg-[0px_0px]'
                  : 'bg-[length:26px_1536px] bg-[0px_-1327px] opacity-20'
              }`}
              style={{ backgroundImage: `url(${content !== '' ? sendCmtActive : facebookIcon9})` }}
            ></div>
          </button>
          <div className={`${openEmoji ? '' : 'hidden'} absolute ml-[480px] mb-[400px] z-[99]`}>
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
    </div>
  )
}

export default CreateComment
