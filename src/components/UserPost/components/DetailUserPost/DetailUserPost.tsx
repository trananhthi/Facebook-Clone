import { Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react'
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
import { useRef } from 'react'

interface Props {
  openCommentDialog: boolean
  handleOpenCommentDialog: () => void
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
  openCommentDialog,
  handleOpenCommentDialog,
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

  const getAllComment = useQuery({
    queryKey: [`get-comment-${post.id}`],
    queryFn: () => commentApi.getAllCommentByPostID(post.id),
    onError: (err) => console.log(err)
  })

  const commentList = getAllComment.data?.data as CommentType[]

  const handleTextInput = (textArea: HTMLElement) => {
    textArea.style.height = '36px'
    textArea.style.height = textArea.scrollHeight + 'px'
    if (postRef.current) {
      const postElement = postRef.current as HTMLElement
      postElement.style.height = 449 - textArea.offsetHeight + 80 + 'px'
    }
  }

  // useEffect(() => {
  //   getAllComment.refetch()
  // })

  //console.log('reload')

  if (getAllComment.isLoading) return <>chờ xíu...</>
  return (
    <Dialog
      dismiss={{ enabled: false }}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 }
      }}
      open={openCommentDialog}
      handler={handleOpenCommentDialog}
      className={`w-[700px] h-[665px] bg-white`}
      size='xs'
    >
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
              onClick={handleOpenCommentDialog}
            >
              <div
                style={{ backgroundImage: `url(${facebookIcon3})` }}
                className='bg-[length:190px_186px] bg-[-22px_-110px] h-5 w-5 opacity-60'
              ></div>
            </IconButton>
          </div>
        </div>
      </DialogHeader>
      <DialogBody ref={postRef} className='max-h-[491px] min-h-[220px] overflow-y-auto privacy-scrollbar p-0 z-[50]'>
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
        {/* tất cả bình luận */}
        <div className='mt-4 pl-4 pr-2'>
          {commentList.map((comment) => (
            <UserComment key={comment.id} comment={comment} maxW='585px' />
          ))}
        </div>
      </DialogBody>
      <DialogFooter className='min-h-[114px] block p-0 mt-2 border-t-2'>
        <Comment
          focus={true}
          userAccount={userAccount}
          post={post}
          textAreaRef={textAreaRef}
          refetch={() => getAllComment.refetch()}
          content={content}
          setContent={setContent}
          handleTextInput={handleTextInput}
        />
      </DialogFooter>
    </Dialog>
  )
}

export default DetailUserPost
