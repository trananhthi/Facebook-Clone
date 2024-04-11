import { LegacyRef, forwardRef } from 'react'
import { ChatMessageType, ChatRoomType } from 'src/types/chat.type'
import { Link, useParams } from 'react-router-dom'
import { timeElapsedSince } from 'src/utils/utils'

interface ChatRoomProps {
  chatRoom: ChatRoomType
  messageReceived?: ChatMessageType
}

export const ChatRoom = forwardRef(({ chatRoom, messageReceived }: ChatRoomProps, ref) => {
  const { roomId } = useParams()
  const lastMessage =
    chatRoom.lastMessage.senderId === chatRoom.receiver.id
      ? chatRoom.lastMessage.content
      : 'Bạn: ' + chatRoom.lastMessage.content

  const body = (
    <Link
      to={`/messenger/${chatRoom.id}`}
      className={`h-[68px] w-full rounded-md text-left ${
        roomId === chatRoom.id.toString() ? 'bg-[#ebf5ff]' : 'bg-white'
      } hover:bg-[#f2f2f2] cursor-pointer flex items-center px-2 gap-2`}
    >
      <img src={chatRoom.receiver.avatar} className='h-[56px] w-[56px] rounded-full'></img>
      <div className='flex flex-col'>
        <span className='text-[15px] leading-5 font-medium'>
          {chatRoom.receiver.firstName + ' ' + chatRoom.receiver.lastName}
        </span>
        <span className='text-[13px] leading-4 text-textgray flex'>
          <span className='line-clamp-1 max-w-[160px]'>{messageReceived ? messageReceived.content : lastMessage}</span>
          <span>· {timeElapsedSince(chatRoom.lastMessage.createdAt)}</span>
        </span>
      </div>
    </Link>
  )

  return ref ? <div ref={ref as LegacyRef<HTMLDivElement>}>{body}</div> : body
})

export default ChatRoom
