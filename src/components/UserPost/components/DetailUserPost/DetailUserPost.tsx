import { DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react'
import UserComment from 'src/components/UserComment'
import { useQuery } from '@tanstack/react-query'
import commentApi from 'src/apis/comment.api'
import { CommentType, Top2LatestCommentsType } from 'src/types/comment.type'
import Comment from '../Comment'

/* import images */
import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'
import { PostType } from 'src/types/post.type'
import InformationOfPost from '../InformationOfPost'
import { ReactionType } from 'src/types/reaction.type'
import { UserInfor } from 'src/types/user.type'
import { useEffect, useRef } from 'react'

interface Props {
  openDetailPost: boolean
  handleOpenDetailPost: () => void
  post: PostType
  userAccount: Partial<UserInfor>
  reactionList: ReactionType[]
  top2LatestComments: Top2LatestCommentsType
  refetchReaction: () => void
  handleClickCommentButton: () => void
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

function DetailUserPost({
  openDetailPost,
  handleOpenDetailPost,
  post,
  userAccount,
  reactionList,
  top2LatestComments,
  refetchReaction,
  handleClickCommentButton,
  content,
  setContent
}: Props) {
  const postRef = useRef(null)
  const textAreaRef = useRef(null)
  const footerRef = useRef(null)

  const getAllCommentOfPost = useQuery({
    queryKey: [`get-all-comment-${post.id}`],
    queryFn: () => commentApi.getAllCommentByPostID(post.id),
    onError: (err) => console.log(err)
  })

  const commentList = getAllCommentOfPost.data?.data as CommentType[]

  useEffect(() => {
    if (textAreaRef.current) {
      const textAreaElement = textAreaRef.current as HTMLElement
      textAreaElement.style.height = '36px'
      textAreaElement.style.height = textAreaElement.scrollHeight + 'px'
      if (postRef.current) {
        const postElement = postRef.current as HTMLElement
        postElement.style.height = 449 - textAreaElement.offsetHeight + 80 + 'px'
      }
    }
  }, [content, openDetailPost])

  useEffect(() => {
    if (footerRef.current) {
      const footerElement = footerRef.current as HTMLElement
      if (footerElement.scrollHeight > 363) {
        footerElement.classList.remove('px-4')
        footerElement.classList.add('pl-4', 'pr-1')
      } else {
        footerElement.classList.remove('pl-4', 'pr-1')
        footerElement.classList.add('px-4')
      }
    }
  }, [content])

  return (
    <>
      <DialogHeader
        id='header-detail-post'
        className='bg-white rounded-t-md h-[60px] border-b border-gray-300 p-4 block'
      >
        <div className='flex items-center'>
          <div className='w-full flex justify-center'>
            <span className='text-[20px] text-[#050505] font-bold overflow-auto'>
              {'Bài viết của ' + post.author.lastName}
            </span>
          </div>
          <div className='flex justify-end absolute w-[668px]'>
            <IconButton
              color='blue-gray'
              className='h-9 w-9 bg-[#e4e6eb] rounded-full hover:bg-[#d8dadf] px-4'
              variant='text'
              onClick={handleOpenDetailPost}
            >
              <div
                style={{ backgroundImage: `url(${facebookIcon3})` }}
                className='bg-[length:190px_186px] bg-[-22px_-110px] h-5 w-5 opacity-60'
              ></div>
            </IconButton>
          </div>
        </div>
      </DialogHeader>
      <DialogBody ref={postRef} className='max-h-[491px] min-h-[220px] overflow-y-auto custom-scrollbar-vip p-0 z-[50]'>
        {/* thông tin bài đăng */}
        <InformationOfPost
          post={post}
          userAccount={userAccount}
          reactionList={reactionList}
          top2LatestComments={top2LatestComments}
          refetchReaction={refetchReaction}
          handleClickCommentButton={handleClickCommentButton}
          isInDetailPost={true}
        />
        {/* tất cả bình luận */}
        {getAllCommentOfPost.isLoading ? (
          <div className='w-full bg-white rounded-lg p-4 '>
            <div className='animate-pulse flex flex-col gap-2'>
              <div className='flex gap-2 items-start'>
                <div className='rounded-full mt-1 bg-[#f0f2f5] h-10 w-10'></div>
                <div className='flex-1 py-1 gap-2 flex flex-col'>
                  <div className='h-[70px] bg-[#f0f2f5e3] rounded-2xl w-[390px]'></div>
                </div>
              </div>
              <div className='flex gap-2 items-start'>
                <div className='rounded-full mt-1 bg-[#f0f2f5] h-10 w-10'></div>
                <div className='flex-1 py-1 gap-2 flex flex-col'>
                  <div className='h-[50px] bg-[#f0f2f5e3] rounded-2xl w-[490px]'></div>
                </div>
              </div>
              <div className='flex gap-2 items-start'>
                <div className='rounded-full mt-1 bg-[#f0f2f5] h-10 w-10'></div>
                <div className='flex-1 py-1 gap-2 flex flex-col'>
                  <div className='h-[100px] bg-[#f0f2f5e3] rounded-2xl w-[430px]'></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='mt-4 pl-4 pr-2'>
            {commentList.map((comment) => (
              <UserComment key={comment.id} comment={comment} maxW='585px' />
            ))}
          </div>
        )}
      </DialogBody>
      <DialogFooter
        ref={footerRef}
        className='min-h-[114px] block p-0 px-4 py-2 mt-2 border-t-2 pb-1 max-h-[370px] overflow-auto custom-scrollbar-vip'
      >
        <Comment
          maxW='622px'
          focus={true}
          userAccount={userAccount}
          post={post}
          textAreaRef={textAreaRef}
          refetch={() => getAllCommentOfPost.refetch()}
          content={content}
          setContent={setContent}
        />
      </DialogFooter>
    </>
  )
}

export default DetailUserPost
