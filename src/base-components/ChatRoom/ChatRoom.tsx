import { LegacyRef, forwardRef, useEffect, useState } from 'react'
import { ChatMessageType, ChatRoomType, TypingStatusType } from 'src/types/chat.type'
import { Link, useParams } from 'react-router-dom'
import { timeElapsedSince } from 'src/utils/utils'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store.ts'
import { WSEventPayload } from 'src/types/utils.type.ts'
import { WSEventEnum } from 'src/constants/enum.ts'

interface ChatRoomProps {
  chatRoom: ChatRoomType
  newEvent: WSEventPayload<any> | null
}

export const ChatRoom = forwardRef(({ chatRoom, newEvent }: ChatRoomProps, ref) => {
  const { roomId } = useParams()
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  // Lưu trữ tin nhắn cuối cùng
  const getLastMessage = () =>
    chatRoom.lastMessage.sender.id !== userAccount.id
      ? chatRoom.lastMessage.content
      : 'Bạn: ' + chatRoom.lastMessage.content

  const [lastMsg, setLastMsg] = useState<string>(getLastMessage())

  useEffect(() => {
    if (newEvent) {
      if (newEvent.event === WSEventEnum.SEND_MESSAGE) {
        const newMessage = newEvent.data as ChatMessageType
        if (roomId !== newMessage.roomId && newMessage.senderId === chatRoom.receiver.id) {
          setLastMsg(newMessage.content)
        }
      }

      if (newEvent.event === WSEventEnum.TYPING) {
        const typingStatus = newEvent.data as TypingStatusType
        if (chatRoom.id === typingStatus.chatRoomId && typingStatus.userId === chatRoom.receiver.id) {
          if (typingStatus.isTyping) {
            setLastMsg('Đang nhập...')
          } else {
            setLastMsg(getLastMessage()) // Khi ngừng nhập, quay lại tin nhắn cũ
          }
        }
      }
    }
  }, [newEvent])

  const body = (
    <Link
      to={`/messenger/${chatRoom.id}`}
      className={`h-[68px] w-full rounded-md text-left ${
        roomId === chatRoom.id.toString() ? 'bg-[#ebf5ff]' : 'bg-white'
      } hover:bg-[#f2f2f2] cursor-pointer flex items-center px-2 gap-2`}
    >
      <img src={chatRoom.receiver.avatar} className='h-[56px] w-[56px] rounded-full' alt=''></img>
      <div className='flex flex-col'>
        <span className='text-[15px] leading-5 font-medium'>
          {chatRoom.receiver.firstName + ' ' + chatRoom.receiver.lastName}
        </span>
        <span className='text-[13px] leading-4 text-textgray flex'>
          <span className='line-clamp-1 max-w-[160px]'>{lastMsg}</span>
          <span>· {timeElapsedSince(chatRoom.lastMessage.createdAt as Date)}</span>
        </span>
      </div>
    </Link>
  )

  return ref ? <div ref={ref as LegacyRef<HTMLDivElement>}>{body}</div> : body
})

ChatRoom.displayName = 'ChatRoom'

export default ChatRoom
