import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { ChatRoomType, MessageType } from 'src/types/chat.type'
import { UserInfor } from 'src/types/user.type'

const messageData: MessageType[] = [
  {
    id: 3,
    roomId: 1,
    senderId: 3,
    content: '123',
    status: 'active',
    createdAt: '2024-03-01T12:52:28.000+07:00'
  },
  {
    id: 4,
    roomId: 1,
    senderId: 2,
    content: '1',
    status: 'active',
    createdAt: '2024-03-01T13:06:22.000+07:00'
  },
  {
    id: 5,
    roomId: 1,
    senderId: 3,
    content: '2',
    status: 'active',
    createdAt: '2024-03-01T13:06:24.000+07:00'
  },
  {
    id: 6,
    roomId: 1,
    senderId: 2,
    content: '3',
    status: 'active',
    createdAt: '2024-03-01T13:06:24.000+07:00'
  },
  {
    id: 7,
    roomId: 1,
    senderId: 3,
    content: '4',
    status: 'active',
    createdAt: '2024-03-01T13:06:26.000+07:00'
  },
  {
    id: 8,
    roomId: 1,
    senderId: 2,
    content: '5',
    status: 'active',
    createdAt: '2024-03-01T13:06:27.000+07:00'
  },
  {
    id: 9,
    roomId: 1,
    senderId: 3,
    content: '1',
    status: 'active',
    createdAt: '2024-03-01T13:08:38.000+07:00'
  },
  {
    id: 10,
    roomId: 1,
    senderId: 2,
    content: '2',
    status: 'active',
    createdAt: '2024-03-01T13:08:40.000+07:00'
  },
  {
    id: 11,
    roomId: 1,
    senderId: 3,
    content: '3',
    status: 'active',
    createdAt: '2024-03-01T13:08:40.000+07:00'
  },
  {
    id: 12,
    roomId: 1,
    senderId: 3,
    content: '4',
    status: 'active',
    createdAt: '2024-03-01T13:08:41.000+07:00'
  },
  {
    id: 13,
    roomId: 1,
    senderId: 3,
    content: 'thi đây',
    status: 'active',
    createdAt: '2024-03-01T13:09:50.000+07:00'
  },
  {
    id: 14,
    roomId: 1,
    senderId: 3,
    content: '333',
    status: 'active',
    createdAt: '2024-03-01T13:10:28.000+07:00'
  },
  {
    id: 15,
    roomId: 1,
    senderId: 3,
    content: 'q',
    status: 'active',
    createdAt: '2024-03-01T13:10:30.000+07:00'
  },
  {
    id: 16,
    roomId: 1,
    senderId: 3,
    content: '123',
    status: 'active',
    createdAt: '2024-03-01T15:37:21.000+07:00'
  },
  {
    id: 17,
    roomId: 1,
    senderId: 3,
    content: 'thi đây',
    status: 'active',
    createdAt: '2024-03-01T15:40:06.000+07:00'
  },
  {
    id: 18,
    roomId: 1,
    senderId: 3,
    content: 'hehe',
    status: 'active',
    createdAt: '2024-03-01T15:41:10.000+07:00'
  },
  {
    id: 19,
    roomId: 1,
    senderId: 3,
    content: 'thi đây nè',
    status: 'active',
    createdAt: '2024-03-01T15:41:37.000+07:00'
  },
  {
    id: 20,
    roomId: 1,
    senderId: 2,
    content: 'thi nào',
    status: 'active',
    createdAt: '2024-03-01T15:42:14.000+07:00'
  },
  {
    id: 21,
    roomId: 1,
    senderId: 3,
    content: 'ít me',
    status: 'active',
    createdAt: '2024-03-01T15:42:26.000+07:00'
  },
  {
    id: 22,
    roomId: 1,
    senderId: 3,
    content: 'hihihifdgdg',
    status: 'active',
    createdAt: '2024-03-01T15:45:32.000+07:00'
  },
  {
    id: 23,
    roomId: 1,
    senderId: 2,
    content: 'ẻwerwerewr',
    status: 'active',
    createdAt: '2024-03-01T15:45:36.000+07:00'
  },
  {
    id: 24,
    roomId: 1,
    senderId: 2,
    content: 'hhhhh',
    status: 'active',
    createdAt: '2024-03-01T16:23:15.000+07:00'
  },
  {
    id: 25,
    roomId: 1,
    senderId: 3,
    content: 'kakaka',
    status: 'active',
    createdAt: '2024-03-01T16:29:31.000+07:00'
  },
  {
    id: 26,
    roomId: 1,
    senderId: 3,
    content: 'jjjj',
    status: 'active',
    createdAt: '2024-03-01T16:33:32.000+07:00'
  },
  {
    id: 27,
    roomId: 1,
    senderId: 2,
    content: 'dđ',
    status: 'active',
    createdAt: '2024-03-01T16:35:15.000+07:00'
  },
  {
    id: 28,
    roomId: 1,
    senderId: 3,
    content: 'ffff',
    status: 'active',
    createdAt: '2024-03-01T16:35:19.000+07:00'
  },
  {
    id: 29,
    roomId: 1,
    senderId: 2,
    content: 'jjj',
    status: 'active',
    createdAt: '2024-03-01T16:48:22.000+07:00'
  },
  {
    id: 30,
    roomId: 1,
    senderId: 3,
    content: 'dđ',
    status: 'active',
    createdAt: '2024-03-01T16:48:26.000+07:00'
  },
  {
    id: 31,
    roomId: 1,
    senderId: 3,
    content: 'aa',
    status: 'active',
    createdAt: '2024-03-01T16:49:52.000+07:00'
  }
]

const Message = ({
  message,
  userAccount,
  chatRoom
}: {
  message: MessageType
  userAccount: Partial<UserInfor>
  chatRoom: ChatRoomType
}) => {
  const isSender = message.senderId === userAccount.id ? true : false
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} px-4 mb-[2px] gap-2 `}>
      {!isSender && <img src={chatRoom.receiver.avatar.url} className=' w-7 h-7 rounded-full' />}
      <div className={`${isSender ? 'bg-[#0084ff] text-white' : 'bg-[#f0f0f0]'} w-fit rounded-full px-3 py-1`}>
        <span className='leading-5 text-[15px]'>{message.content}</span>
      </div>
    </div>
  )
}

interface ChatMessageViewProps {
  chatRoom: ChatRoomType
}

export const ChatMessageView = ({ chatRoom }: ChatMessageViewProps) => {
  const [maxHeight, setMaxHeight] = useState(0)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)

  useEffect(() => {
    const messengerContainer = document.getElementById('messenger-client-container')
    setMaxHeight((messengerContainer?.clientHeight as number) - 65 - 60)
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView()
    }
  }, [])

  return (
    <div className='h-full overflow-y-scroll' style={{ height: `${maxHeight}px`, maxHeight: `${maxHeight}px` }}>
      <div className='relative flex flex-col justify-center items-center gap-2 my-10'>
        <div className='flex w-[60px] h-[60px] rounded-full'>
          <img src={chatRoom.receiver.avatar.url} className=' w-full h-full rounded-full' />
          <div className='w-5 h-5 absolute ml-10 mt-10 bg-green-600 rounded-full border-2 border-white'></div>
        </div>
        <span className='text-[17px] leading-5 font-semibold'>
          {chatRoom.receiver.firstName + ' ' + chatRoom.receiver.lastName}
        </span>
        <span className='text-[12px] leading-4 text-textgray'>Các bạn là bạn bè trên Facebook</span>
      </div>
      {messageData.map((message, index) => (
        <div ref={index === messageData.length - 1 ? lastMessageRef : null} key={message.id}>
          <Message message={message} userAccount={userAccount} chatRoom={chatRoom} />
        </div>
      ))}
      <div
        style={{
          height: `${maxHeight}px`,
          maxHeight: `${maxHeight}px`,
          display: messageData.length > 0 ? 'none' : 'flex'
        }}
        className='flex flex-col justify-center items-center gap-2'
      >
        <div className='flex w-[60px] h-[60px] rounded-full'>
          <img src={chatRoom.receiver.avatar.url} className=' w-full h-full rounded-full' />
          <div className='w-5 h-5 absolute ml-10 mt-10 bg-green-600 rounded-full border-2 border-white'></div>
        </div>
        <span className='text-[17px] leading-5 font-semibold'>
          {chatRoom.receiver.firstName + ' ' + chatRoom.receiver.lastName}
        </span>
        <span className='text-[14px] leading-4 text-textgray'>Hãy bắt đầu đoạn chat nào!!!</span>
      </div>
    </div>
  )
}

export default ChatMessageView
