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
  const postRef = useRef(null)
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

  const handleTextInput = (textArea: HTMLElement) => {
    textArea.style.height = '36px'
    textArea.style.height = textArea.scrollHeight + 'px'
  }

  useEffect(() => {}, [openCommentDialog])

  if (getReaction.isLoading || getTop2LatestComments.isLoading) {
    return <div>loading...</div>
  }

  return (
    <div ref={postRef} className='w-[590px] h-full shadow-[0_0px_1px_1px_rgba(0,0,0,0.06)] bg-white rounded-lg'>
      {/* thông tin bài đăng */}
      <InformationOfPost
        post={post}
        userAccount={userAccount}
        reactionList={reactionList}
        top2LatestComments={top2LatestComments}
        postRef={postRef}
        refetchReaction={refetchReaction}
        handleClickCommentButton={handleClickCommentButton}
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
      <Comment
        focus={false}
        userAccount={userAccount}
        post={post}
        textAreaRef={textAreaRef}
        refetch={refetchComment}
        content={content}
        setContent={setContent}
        handleTextInput={handleTextInput}
      />
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
