import { IMessage } from '@stomp/stompjs'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { useSelector } from 'react-redux'
import chatApi from 'src/apis/chat.api'
import ChatMessage from 'src/base-components/ChatMessage'
import { RootState } from 'src/redux/store'
import { ChatRoomType, ChatMessageType } from 'src/types/chat.type'

interface ChatMessageViewProps {
  chatRoom: ChatRoomType
  messageReceived: IMessage | null
}

export const ChatMessageView = ({ chatRoom, messageReceived }: ChatMessageViewProps) => {
  const [maxHeight, setMaxHeight] = useState(0)
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const [isLoadingFake, setIsLoadingFake] = useState(false) //loading giả , sau này xóa
  const chatMessageContainerRef = useRef(null)

  //lấy tin nhắn trong cuộc trò chuyện
  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    error,
    isLoading,
    refetch
  } = useInfiniteQuery({
    queryKey: ['get-chat-message', chatRoom.id],
    queryFn: ({ pageParam = 0 }) => chatApi.getChatMessage(chatRoom.id, pageParam, 35),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.last ? undefined : allPages.length
    },
    initialPageParam: 0
  })

  //set chiều cao tối đa cho khung chat
  //65 là chiều cao của khung chatbox có tên người nhận
  //60 là chiều cao của khung nhập tin nhắn
  useEffect(() => {
    const messengerContainer = document.getElementById('messenger-client-container')

    // Định nghĩa hàm xử lý sự kiện resize
    const handleResize = () => {
      // Tính toán lại chiều cao và cập nhật state
      setMaxHeight((messengerContainer?.clientHeight as number) - 65 - 60)
    }

    // Gán hàm xử lý sự kiện cho sự kiện resize của cửa sổ
    window.addEventListener('resize', handleResize)

    // Gọi hàm xử lý sự kiện lần đầu tiên
    handleResize()

    // Xóa hàm xử lý sự kiện khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  //thêm tin nhắn mới vào cuộc trò chuyện
  useEffect(() => {
    if (messageReceived) {
      const newMessage = JSON.parse(messageReceived.body) as ChatMessageType
      if (chatRoom.receiver.id === newMessage.senderId || newMessage.senderId === userAccount.id) {
        refetch()
      }
    }
  }, [messageReceived])

  //thêm thông tin người nhận vào đầu cuộc trò chuyện
  useEffect(() => {
    if (
      chatMessageContainerRef.current &&
      data &&
      data?.pages[data.pages.length - 1].data.last &&
      data.pages[data.pages.length - 1].data.content.length > 0
    ) {
      const chatMessageContainer = chatMessageContainerRef.current as HTMLElement
      const tempContainer = document.createElement('div')
      const receiverBasicInforElement = (
        <div className='relative flex flex-col justify-center items-center gap-2 my-10'>
          <div className='flex w-[60px] h-[60px] rounded-full'>
            <img src={chatRoom.receiver.avatar} className=' w-full h-full rounded-full' alt='receiver_avt' />
            <div className='w-5 h-5 absolute ml-10 mt-10 bg-green-600 rounded-full border-2 border-white'></div>
          </div>
          <span className='text-[17px] leading-5 font-semibold'>
            {chatRoom.receiver.firstName + ' ' + chatRoom.receiver.lastName}
          </span>
          <span className='text-[12px] leading-4 text-textgray'>Các bạn là bạn bè trên Facebook</span>
        </div>
      )

      createRoot(tempContainer).render(receiverBasicInforElement)

      chatMessageContainer.appendChild(tempContainer)

      return () => tempContainer.remove()
    }
  }, [data])

  //lấy tin nhắn tiếp theo khi cuộc trò chuyện kéo xuống cuối
  const intObserver = useRef<IntersectionObserver | null>(null)
  const lastChatMessageRef = useCallback(
    (chatMessage: Element) => {
      if (isFetchingNextPage) return

      if (intObserver.current) intObserver.current.disconnect()

      intObserver.current = new IntersectionObserver(
        (chatMessages) => {
          if (chatMessages[0].isIntersecting && hasNextPage) {
            setIsLoadingFake(true) //loading giả , sau này xóa
            setTimeout(() => {
              fetchNextPage()
              setIsLoadingFake(false) //loading giả , sau này xóa
            }, 300)
          }
        },
        { threshold: 0.05 }
      )

      if (chatMessage) intObserver.current.observe(chatMessage)
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  )

  //hiển thị tin nhắn
  //next và pre bị đảo ngược vì tin nhắn được lấy theo thời gian gần nhất
  const chatMessageData = data?.pages.map((pg) => {
    return pg.data.content.map((chatMessage: ChatMessageType, i) => {
      if (pg.data.content.length === i + 1) {
        return (
          <ChatMessage
            key={chatMessage.id}
            ref={lastChatMessageRef}
            message={chatMessage}
            previousMessage={undefined}
            nextMessage={pg.data.content[i - 1]}
            userAccount={userAccount}
            chatRoom={chatRoom}
          />
        )
      }
      return (
        <ChatMessage
          key={chatMessage.id}
          message={chatMessage}
          userAccount={userAccount}
          chatRoom={chatRoom}
          nextMessage={pg.data.content[i - 1]}
          previousMessage={pg.data.content[i + 1]}
        />
      )
    })
  })

  if (status === 'error') return <p className='center'>Error: {(error as any).message}</p>

  if (isLoading)
    return (
      <div
        style={{ height: `${maxHeight}px`, maxHeight: `${maxHeight}px` }}
        className='flex justify-center items-center w-full'
      >
        <div className='spinner-loader-circle w-[70px]'>
          <svg className='spinner-circular' viewBox='25 25 50 50'>
            <circle className='spinner-path' cx='50' cy='50' r='20' fill='none' strokeWidth='5' strokeMiterlimit='10' />
          </svg>
        </div>
      </div>
    )

  return (
    <div
      ref={chatMessageContainerRef}
      className='flex flex-col-reverse overflow-y-scroll'
      style={{ height: `${maxHeight}px`, maxHeight: `${maxHeight}px`, overflowAnchor: 'none' }}
    >
      {chatMessageData}
      {(isFetchingNextPage || isLoadingFake) && (
        <div
          style={{ height: `${maxHeight}px`, maxHeight: `${maxHeight}px` }}
          className='flex justify-center items-center w-full'
        >
          <div className='spinner-loader-circle w-[30px]'>
            <svg className='spinner-circular' viewBox='25 25 50 50'>
              <circle
                className='spinner-path'
                cx='50'
                cy='50'
                r='20'
                fill='none'
                strokeWidth='5'
                strokeMiterlimit='10'
              />
            </svg>
          </div>
        </div>
      )}

      <div
        style={{
          height: `${maxHeight}px`,
          maxHeight: `${maxHeight}px`,
          display: (data?.pages[0].data.content.length as number) > 0 ? 'none' : 'flex'
        }}
        className='flex flex-col justify-center items-center gap-2'
      >
        <div className='flex w-[60px] h-[60px] rounded-full'>
          <img src={chatRoom.receiver.avatar} className=' w-full h-full rounded-full' alt='receiver_avt' />
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
