import { LegacyRef, forwardRef } from 'react'
import { ChatMessageType, ChatRoomType } from 'src/types/chat.type'
import { Link, useParams } from 'react-router-dom'
import { timeElapsedSince } from 'src/utils/utils'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store.ts'

interface ChatRoomProps {
  chatRoom: ChatRoomType
  newMessage: ChatMessageType | null
}

export const ChatRoom = forwardRef(({ chatRoom, newMessage }: ChatRoomProps, ref) => {
  const { roomId } = useParams()
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const lastMessage =
    chatRoom.lastMessage.sender.id !== userAccount.id
      ? chatRoom.lastMessage.content
      : 'Bạn: ' + chatRoom.lastMessage.content

  const messageContent = newMessage
    ? roomId !== newMessage.roomId.toString() && newMessage.senderId === (chatRoom.receiver.id?.toString() as string)
      ? newMessage.content
      : null
    : null

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
          <span className='line-clamp-1 max-w-[160px]'>{messageContent ? messageContent : lastMessage}</span>
          <span>· {timeElapsedSince(chatRoom.lastMessage.createdAt as Date)}</span>
        </span>
      </div>
    </Link>
  )

  return ref ? <div ref={ref as LegacyRef<HTMLDivElement>}>{body}</div> : body
})

ChatRoom.displayName = 'ChatRoom'

export default ChatRoom
