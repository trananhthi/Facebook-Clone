import { LegacyRef, forwardRef } from 'react'
import { ChatMessageType, ChatRoomType } from 'src/types/chat.type'
import { UserInfor } from 'src/types/user.type'

interface ChatMessageProps {
  message: ChatMessageType
  userAccount: Partial<UserInfor>
  chatRoom?: ChatRoomType
}

const ChatMessage = forwardRef(({ message, userAccount, chatRoom }: ChatMessageProps, ref) => {
  const isSender = message.senderId === userAccount.id ? true : false

  const body = (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} px-4 mb-[2px] gap-2 items-end`}>
      {!isSender && <img src={chatRoom?.receiver.avatar.url} className=' w-7 h-7 rounded-full' />}
      <div className={`${isSender ? 'bg-[#0084ff] text-white' : 'bg-[#f0f0f0]'} w-fit rounded-full px-3 py-1`}>
        <span className='leading-5 text-[15px]'>{message.content}</span>
      </div>
    </div>
  )
  return ref ? <div ref={ref as LegacyRef<HTMLDivElement>}>{body}</div> : body
})

export default ChatMessage
