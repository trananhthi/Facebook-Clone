import { LegacyRef, forwardRef } from 'react'
import { ChatMessageType, ChatRoomType } from 'src/types/chat.type'
import { UserInfor } from 'src/types/user.type'

interface ChatMessageProps {
  message: ChatMessageType
  nextMessage?: ChatMessageType
  previousMessage?: ChatMessageType
  userAccount: Partial<UserInfor>
  chatRoom?: ChatRoomType
}

const ChatMessage = forwardRef(
  ({ message, userAccount, chatRoom, nextMessage, previousMessage }: ChatMessageProps, ref) => {
    const isSender = message.senderId === userAccount.id ? true : false
    // xem thử tin nhắn cuối cùng của block của người nhận không
    const isLastMessageOfBLock = (!nextMessage || nextMessage?.senderId === userAccount.id) && !isSender ? true : false

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

    const body = (
      <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} px-4 mb-[2px] gap-2 items-end`}>
        {isLastMessageOfBLock ? (
          <img src={chatRoom?.receiver.avatar} className=' w-7 h-7 rounded-full' />
        ) : (
          <div className=' w-7 h-7 rounded-full' />
        )}

        <div className={`${isSender ? 'bg-[#0084ff] text-white' : 'bg-[#f0f0f0]'} w-fit ${styleOfMessage} px-3 py-1`}>
          <span className='leading-5 text-[15px]'>{message.content}</span>
        </div>
      </div>
    )
    return ref ? <div ref={ref as LegacyRef<HTMLDivElement>}>{body}</div> : body
  }
)

export default ChatMessage
