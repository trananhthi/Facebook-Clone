import { useEffect, useRef, useState } from 'react'
import { PostType } from 'src/types/post.type'
import { UserInfor } from 'src/types/user.type'
import reactionApi from 'src/apis/reaction.api'
import { useQuery } from '@tanstack/react-query'
import { ReactionType } from 'src/types/reaction.type'
import Comment from './components/Comment'
import DetailUserPost from './components/DetailUserPost'
import commentApi from 'src/apis/comment.api'
import { Top2LatestCommentsType } from 'src/types/comment.type'
import UserComment from '../UserComment'
import InformationOfPost from './components/InformationOfPost'

interface Props {
  post: PostType
  userAccount: Partial<UserInfor>
}

function UserPost({ post, userAccount }: Props) {
  const [openCommentDialog, setOpenCommentDialog] = useState(false)
  const [content, setContent] = useState<string>('')
  const textAreaRef = useRef(null)

  const getReaction = useQuery({
    queryKey: [`get-reaction-${post.id}`],
    queryFn: () => reactionApi.getAllReactionByPostID(post.id),
    onError: (err) => console.log(err)
  })

  const getTop2LatestComments = useQuery({
    queryKey: [`get-top2-lastest-comments-${post.id}`],
    queryFn: () => commentApi.getTop2LatestComments(post.id),
    onError: (err) => console.log(err)
  })

  const reactionList = getReaction.data?.data as ReactionType[]
  const top2LatestComments = getTop2LatestComments.data?.data as Top2LatestCommentsType

  const handleOpenCommentDialog = () => setOpenCommentDialog(!openCommentDialog)
  const handleClickCommentButton = () => {
    if (textAreaRef.current) {
      const textAreaElement = textAreaRef.current as HTMLElement
      textAreaElement.focus()
    }
  }

  const refetchReaction = () => {
    getReaction.refetch()
  }

  const refetchComment = () => {
    getTop2LatestComments.refetch()
  }

  useEffect(() => {
    if (textAreaRef.current) {
      const textAreaElement = textAreaRef.current as HTMLElement
      textAreaElement.style.height = '36px'
      textAreaElement.style.height = textAreaElement.scrollHeight + 'px'
    }
  }, [content, openCommentDialog])

  if (getReaction.isLoading || getTop2LatestComments.isLoading) {
    return (
      <div className='w-[590px] shadow-[0_0px_1px_1px_rgba(0,0,0,0.06)] bg-white rounded-lg p-4'>
        <div className='animate-pulse'>
          <div className='flex gap-2 items-center'>
            <div className='rounded-full bg-[#f0f2f5] h-10 w-10'></div>
            <div className='flex-1 py-1 gap-2 flex flex-col'>
              <div className='h-[10px] bg-[#f0f2f5e3] rounded-full w-[90px]'></div>
              <div className='h-[10px] bg-[#f0f2f5e3] rounded-full w-[110px]'></div>
            </div>
          </div>
          <div className='h-[170px]'></div>
          <div className='grid grid-flow-col gap-1' style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className='flex justify-center'>
              <div className='h-[10px] bg-[#f0f2f5e3] rounded-full w-[70px]'></div>
            </div>
            <div className='flex justify-center'>
              <div className='h-[10px] bg-[#f0f2f5e3] rounded-full w-[70px]'></div>
            </div>
            <div className='flex justify-center'>
              <div className='h-[10px] bg-[#f0f2f5e3] rounded-full w-[70px]'></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-[590px] h-full shadow-[0_0px_1px_1px_rgba(0,0,0,0.06)] bg-white rounded-lg'>
      {/* thông tin bài đăng */}
      <InformationOfPost
        post={post}
        userAccount={userAccount}
        reactionList={reactionList}
        top2LatestComments={top2LatestComments}
        refetchReaction={refetchReaction}
        handleClickCommentButton={handleClickCommentButton}
        isInDetailPost={false}
      />
      {/* xem thêm bình luận */}
      <button
        className={`px-4 mt-2 text-[15px] text-[#65676b] leading-5 font-semibold hover:underline hover:cursor-pointer ${
          top2LatestComments.total > 2 ? '' : 'hidden'
        }`}
        onClick={handleOpenCommentDialog}
      >
        Xem thêm bình luận
      </button>
      {/* top 2 comments gần nhất */}
      <div className={`pl-4 pr-2 mt-2 ${top2LatestComments.total === 0 ? 'hidden' : ''}`}>
        {top2LatestComments.commentList.map((comment) => (
          <UserComment key={comment.id} comment={comment} maxW='490px' />
        ))}
      </div>

      {/* Gửi bình luận */}
      <div className='px-4 py-2'>
        <Comment
          maxW='512px'
          focus={false}
          userAccount={userAccount}
          post={post}
          textAreaRef={textAreaRef}
          refetch={refetchComment}
          content={content}
          setContent={setContent}
        />
      </div>

      {/* Thông tin chi tiết của bài đăng */}
      <DetailUserPost
        openCommentDialog={openCommentDialog}
        handleOpenCommentDialog={handleOpenCommentDialog}
        post={post}
        userAccount={userAccount}
        reactionList={reactionList}
        top2LatestComments={top2LatestComments}
        refetchReaction={refetchReaction}
        handleClickCommentButton={handleClickCommentButton}
        content={content}
        setContent={setContent}
      />
    </div>
  )
}

export default UserPost
