import { Avatar, Tooltip } from '@material-tailwind/react'
import { emojiList } from 'src/constants/list'
import EmojiButton from '../EmojiButton'
import { formatDateTime, formatTimeAgo, getTop3Emoji } from 'src/utils/utils'
import { useEffect, useRef, useState } from 'react'
import { PostType } from 'src/types/post.type'
import { privacyList } from 'src/constants/list'
import { EmojiType } from 'src/types/utils.type'

/* import images */
import facebookIcon9 from 'src/assets/images/icon-pack/facbook_icon_9.png'
import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'
import { ReactionType } from 'src/types/reaction.type'
import { Top2LatestCommentsType } from 'src/types/comment.type'
import { UserInfor } from 'src/types/user.type'

interface Props {
  post: PostType
  userAccount: Partial<UserInfor>
  reactionList: ReactionType[]
  top2LatestComments: Top2LatestCommentsType
  postRef: any
  refetchReaction: () => void
  handleClickCommentButton: () => void
}

function InformationOfPost({
  post,
  userAccount,
  reactionList,
  top2LatestComments,
  postRef,
  refetchReaction,
  handleClickCommentButton
}: Props) {
  const postHeaderRef = useRef(null)
  const [top3EmojiList, setTop3EmojiList] = useState<EmojiType[]>([])

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

  return (
    <>
      <div ref={postHeaderRef} id='post-header' className='flex justify-between items-center'>
        <div className='flex gap-2 px-4 pt-3 pb-2'>
          <Avatar
            variant='circular'
            size='sm'
            alt='avatar'
            className='h-10 w-10 border-solid border-gray-400 border'
            src={post.author.avatar.url}
          />
          <div className='flex flex-col'>
            <span className='text-[#050505] text-[15px] font-semibold cursor-pointer hover:underline hover:underline-offset-1'>
              {post.author.firstName + ' ' + post.author.lastName}
            </span>
            <span className='flex items-center hover:underline-offset-1 font-normal'>
              <Tooltip
                placement='bottom'
                content={formatDateTime(post.createdAt)}
                className='text-white text-[13px] bg-[rgba(0,0,0,0.8)]'
              >
                <span className='text-[#65676B] cursor-pointer text-[13px] hover:underline hover:underline-offset-1 font-normal'>
                  {formatTimeAgo(post.createdAt)}
                </span>
              </Tooltip>
              <span className='ml-1 text-[#65676B]'> &middot;</span>
              <Tooltip
                placement='bottom'
                content={privacyList.find((icon) => icon.value === post.privacy)?.title}
                className='text-white text-[13px] bg-[rgba(0,0,0,0.8)]'
              >
                <img
                  src={privacyList.find((icon) => icon.value === post.privacy)?.icon}
                  alt='friend-logo'
                  className='h-3 w-3 text-[#65676B] inline ml-1 opacity-60 cursor-pointer'
                />
              </Tooltip>
            </span>
          </div>
        </div>
        <button className='hover:bg-[#f2f2f2] h-9 w-9 rounded-full flex justify-center items-center mr-4'>
          <div
            style={{ backgroundImage: `url(${facebookIcon3})` }}
            className='bg-[length:190px_186px] bg-[-44px_-110px] h-5 w-5 opacity-60'
          ></div>
        </button>
      </div>
      {/* content */}
      <div className='px-4 text-2xl text-[#050505] mb-3'>{post.content}</div>
      {/* amount of emoji */}
      <div className='px-4 flex items-center ml-1 -mt-1 justify-between'>
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

      <hr className='border-gray-300 mx-4 mt-2'></hr>
      {/* emoji, comment,share */}
      <div className=' px-4 my-1 grid grid-flow-col gap-1' style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {/* emoji button */}
        <EmojiButton
          postRef={postRef}
          postHeaderRef={postHeaderRef}
          reactionList={reactionList}
          userAccount={userAccount}
          postID={post.id}
          refetch={refetchReaction}
          top2LatestComments={top2LatestComments}
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
      <hr className='border-gray-300 mx-4 mt-1'></hr>
    </>
  )
}

export default InformationOfPost
