import { Tooltip } from '@material-tailwind/react'
import { LegacyRef, forwardRef } from 'react'
import { ChatMessageType, ChatRoomType } from 'src/types/chat.type'
import { UserInfo } from 'src/types/user.type'
import { formatDateTime } from 'src/utils/utils'
import CircleIconButton from '../CircleIconButton'

interface ChatMessageProps {
  message: ChatMessageType
  nextMessage?: ChatMessageType
  previousMessage?: ChatMessageType
  userAccount: Partial<UserInfo>
  chatRoom?: ChatRoomType
}

// eslint-disable-next-line react/display-name
const ChatMessage = forwardRef(
  ({ message, userAccount, chatRoom, nextMessage, previousMessage }: ChatMessageProps, ref) => {
    const isSender = message.senderId === userAccount.id
    // xem thử tin nhắn cuối cùng của block của người nhận không
    const isLastMessageOfBLock = (!nextMessage || nextMessage?.senderId === userAccount.id) && !isSender

    // UI cho từng tin nhắn
    let styleOfMessage = ''

    // UI cho người nhận
    if (!isSender) {
      if ((nextMessage?.senderId === userAccount.id || !nextMessage) && previousMessage?.senderId === userAccount.id)
        styleOfMessage = 'rounded-full'
      else if (
        nextMessage?.senderId !== userAccount.id &&
        (previousMessage?.senderId === userAccount.id || !previousMessage)
      )
        styleOfMessage = 'rounded-r-full rounded-tl-[10000px] rounded-bl-[2000px]'
      else if (nextMessage?.senderId !== userAccount.id && nextMessage && previousMessage?.senderId !== userAccount.id)
        styleOfMessage = 'rounded-r-full rounded-l-[2000px]'
      else if (
        (nextMessage?.senderId === userAccount.id || !nextMessage) &&
        previousMessage?.senderId !== userAccount.id
      )
        styleOfMessage = 'rounded-r-full rounded-bl-[10000px] rounded-tl-[2000px]'
    }
    // UI cho người gửi
    else {
      if (nextMessage?.senderId !== userAccount.id && previousMessage?.senderId !== userAccount.id)
        styleOfMessage = 'rounded-full'
      else if (
        nextMessage?.senderId === userAccount.id &&
        (previousMessage?.senderId !== userAccount.id || !previousMessage)
      )
        styleOfMessage = 'rounded-l-full rounded-tr-[10000px] rounded-br-[2000px]'
      else if (nextMessage?.senderId === userAccount.id && nextMessage && previousMessage?.senderId === userAccount.id)
        styleOfMessage = 'rounded-l-full rounded-r-[2000px]'
      else if (
        (nextMessage?.senderId !== userAccount.id || !nextMessage) &&
        previousMessage?.senderId === userAccount.id
      )
        styleOfMessage = 'rounded-l-full rounded-br-[10000px] rounded-tr-[2000px]'
    }

    // các nút chức năng cho từng tin nhắn như xóa, thả cảm xúc,...
    const controlPanel = (
      <div className='hidden group-hover:block'>
        <div className='flex cursor-pointer'>
          <CircleIconButton size={28} bgColor='current' bgHoverColor='#d8dadf'>
            <svg viewBox='0 0 20 20' width='16' height='16' fill='currentColor' color='#65676b'>
              <g fillRule='evenodd' transform='translate(-446 -398)'>
                <path d='M456 410a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0-12a2 2 0 1 1 0-4 2 2 0 0 1 0 4'></path>
              </g>
            </svg>
          </CircleIconButton>
          <CircleIconButton size={28} bgColor='current' bgHoverColor='#d8dadf'>
            <svg viewBox='0 0 12 13' width='16' height='16' fill='currentColor' color='#65676b'>
              <g fillRule='evenodd' transform='translate(-450 -1073)'>
                <g>
                  <path
                    d='M101 936.5c1.903 0 3.847.017 5.811 3.326.053.09.192.048.189-.057-.213-8.03-6-7.769-6-7.769v-2.75c0-.112-.17-.112-.25-.034l-4.712 4.978a.128.128 0 0 0 0 .182l4.712 4.879c.08.078.25.022.25-.091V936.5z'
                    transform='translate(354.5 145)'
                  ></path>
                  <path
                    fillRule='nonzero'
                    d='M101.5 937.007c2.344.065 3.445.655 4.881 3.074.318.538 1.136.29 1.119-.326-.096-3.612-1.284-5.961-3.22-7.245a6.126 6.126 0 0 0-2.136-.888 6.042 6.042 0 0 0-.644-.1v-2.272c0-.673-.751-.733-1.1-.39l-4.725 4.99a.624.624 0 0 0 .011.881l4.704 4.87c.395.388 1.11.137 1.11-.437v-2.157zm-4.857-2.724 3.857-4.075v2.315l.527-.024c.207-.004.524.02.912.102a5.134 5.134 0 0 1 1.788.743c1.388.92 2.339 2.508 2.66 4.948-1.422-1.847-2.873-2.292-5.387-2.292h-.5v2.276l-3.857-3.993z'
                    transform='translate(354.5 145)'
                  ></path>
                </g>
              </g>
            </svg>
          </CircleIconButton>
          <CircleIconButton size={28} bgColor='current' bgHoverColor='#d8dadf'>
            <svg viewBox='0 0 20 20' width='16' height='16' fill='currentColor' color='#65676b'>
              <path
                d='M6.062 11.548c.596 1.376 2.234 2.453 3.955 2.452 1.694 0 3.327-1.08 3.921-2.452a.75.75 0 1 0-1.376-.596c-.357.825-1.451 1.548-2.545 1.548-1.123 0-2.22-.72-2.579-1.548a.75.75 0 1 0-1.376.596z'
                fillRule='nonzero'
              ></path>
              <ellipse cx='13.6' cy='6.8' rx='1.2' ry='1.2'></ellipse>
              <ellipse cx='6.4' cy='6.8' rx='1.2' ry='1.2'></ellipse>
              <ellipse stroke='currentColor' strokeWidth='1.5' fill='none' cx='10' cy='10' rx='9' ry='9'></ellipse>
            </svg>
          </CircleIconButton>
        </div>
      </div>
    )

    const body = (
      <div
        className={`flex items-center ${
          isSender ? 'justify-end' : 'justify-start'
        } px-4 mb-[2px] gap-2 items-end group`}
      >
        {isLastMessageOfBLock ? (
          <img src={chatRoom?.receiver.avatar} className=' w-7 h-7 rounded-full' alt='avt' />
        ) : (
          <div className=' w-7 h-7 rounded-full' />
        )}
        {isSender && controlPanel}
        <Tooltip
          animate={{
            mount: {
              transition: {
                delay: 0.5 // Sử dụng thuộc tính delay ở đây
              }
            }
          }}
          placement='left'
          content={formatDateTime(message.createdAt)}
          className='text-white text-[13px] bg-[rgba(0,0,0,0.8)]'
        >
          <div className={`${isSender ? 'bg-[#0084ff] text-white' : 'bg-[#f0f0f0]'} w-fit ${styleOfMessage} px-3 py-1`}>
            <span className='leading-5 text-[15px]'>{message.content}</span>
          </div>
        </Tooltip>
        {!isSender && controlPanel}
      </div>
    )
    return ref ? <div ref={ref as LegacyRef<HTMLDivElement>}>{body}</div> : body
  }
)

export default ChatMessage
