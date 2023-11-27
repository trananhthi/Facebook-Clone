import { Avatar, Tooltip } from '@material-tailwind/react'
import { Fragment, LegacyRef, forwardRef } from 'react'
import { CommentType } from 'src/types/comment.type'
import { formatDateTime, formatTimeAgoOfComment, restoreNewlinesFromStorage } from 'src/utils/utils'

/* import images */
import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'

interface Props {
  comment: CommentType
  maxW: string
}

const UserComment = forwardRef(({ comment, maxW }: Props, ref) => {
  const lines = restoreNewlinesFromStorage(comment.content).split('\n')

  const commentBody = (
    <div className='mb-2 last:mb-0 group'>
      <div className='flex items-center gap-1'>
        <div className='flex gap-2'>
          <Avatar
            variant='circular'
            size='sm'
            alt='avatar'
            className='h-8 w-8 border-solid border-gray-400 border cursor-pointer hover:brightness-90'
            src={comment.userAccount.avatar.url}
          />

          <div className={`bg-[#f0f2f5] rounded-2xl max-w-[${maxW}]`} style={{ maxWidth: maxW }}>
            <div className='py-2 px-3'>
              <span className='text-[#050505] block text-[13px] leading-[16px] font-semibold'>
                {comment.userAccount.firstName + ' ' + comment.userAccount.lastName}
              </span>
              <span className='text-[#050505] block text-[15px] leading-[20px] opacity-90 break-words'>
                {lines.map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    {index < lines.length - 1 && <br />}
                  </Fragment>
                ))}
              </span>
            </div>
          </div>
        </div>
        {/* Chỉnh sửa hoặc xóa bình luận */}
        <Tooltip
          id={comment.id}
          placement='top'
          content='Chỉnh sửa hoặc xóa bình luận này'
          className='text-white text-[13px] bg-[rgba(0,0,0,0.8)] z-[9999]'
        >
          <button className='p-2 rounded-full hidden justify-center items-center group-hover:block hover:bg-[#f2f2f2]'>
            <div
              style={{ backgroundImage: `url(${facebookIcon3})` }}
              className='bg-[length:190px_186px] bg-[-18px_-153px] h-4 w-4 opacity-60'
            ></div>
          </button>
        </Tooltip>
      </div>

      <div className='ml-[52px] flex gap-4 mt-1 text-[12px] text-[#65676b] leading-3'>
        <Tooltip
          placement='bottom'
          content={formatDateTime(comment.createdAt)}
          className='text-white text-[13px] bg-[rgba(0,0,0,0.8)] z-[9999]'
        >
          <span className='hover:underline hover:cursor-pointer'>{formatTimeAgoOfComment(comment.createdAt)}</span>
        </Tooltip>
        <span className='font-bold hover:underline hover:cursor-pointer'>Thích</span>
        <span className='font-bold hover:underline hover:cursor-pointer'>Phản hồi</span>
      </div>
    </div>
  )
  return ref ? <div ref={ref as LegacyRef<HTMLDivElement>}>{commentBody}</div> : commentBody
})

export default UserComment
