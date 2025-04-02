import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { useSelector } from 'react-redux'
import chatApi from 'src/apis/chat.api'
import ChatMessage from 'src/base-components/ChatMessage'
import { RootState } from 'src/redux/store'
import { ChatRoomType, ChatMessageType } from 'src/types/chat.type'
import LoadingSpinner from 'src/base-components/LoadingSpinner'
import { WSEventPayload } from 'src/types/utils.type.ts'
import { WSEventEnum } from 'src/constants/enum.ts'
import LoadingThreeDotsJumping from 'src/base-components/LoadingThreeDotsJumping/LoadingThreeDotsJumping.tsx'

interface ChatMessageViewProps {
  chatRoom: ChatRoomType
  newEvent: WSEventPayload<any> | null
}

export const ChatMessageView = ({ chatRoom, newEvent }: ChatMessageViewProps) => {
  const [maxHeight, setMaxHeight] = useState(0)
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const [listMsg, setListMsg] = useState<ChatMessageType[]>([])
  const chatMessageContainerRef = useRef(null)
  const queryClient = useQueryClient()
  const [isReceiverTyping, setIsReceiverTyping] = useState(false)
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
      setMaxHeight((messengerContainer?.clientHeight as number) - 65 - 60 - 32 + 6)
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
  // Cập nhật listMsg khi `data` thay đổi (Lần đầu load & fetchNextPage)
  useEffect(() => {
    if (data?.pages) {
      setListMsg((prevMessages) => {
        const newMessages = data.pages.flatMap((page) => page.data.content)

        if (prevMessages.length === 0) {
          return newMessages // Lần đầu load
        }

        if (newMessages.length > prevMessages.length) {
          return [...prevMessages, ...newMessages.slice(prevMessages.length)] // Chỉ thêm phần mới
        }

        return prevMessages
      })
    }
  }, [data?.pages?.length])

  //thêm tin nhắn mới vào cuộc trò chuyện
  // Khi có tin nhắn mới từ WebSocket, thêm vào đầu danh sách
  useEffect(() => {
    if (newEvent && newEvent.event === WSEventEnum.SEND_MESSAGE) {
      const newMessage = newEvent.data as ChatMessageType
      setListMsg((prevMessages) => {
        // Nếu tin nhắn đã tồn tại, không thêm lại
        if (!prevMessages.some((msg) => msg.id === newMessage.id)) {
          return [newMessage, ...prevMessages] // Thêm vào đầu danh sách
        }
        return prevMessages
      })
    }
    if (newEvent && newEvent.event === WSEventEnum.TYPING) {
      const typingStatus = newEvent.data
      if (chatRoom.id === typingStatus.chatRoomId) {
        setIsReceiverTyping(typingStatus.isTyping)
      }
    }
  }, [newEvent, chatRoom])

  useEffect(() => {
    const cachedData: any = queryClient.getQueryData(['get-chat-message', chatRoom.id])

    if (cachedData) {
      setListMsg(cachedData.pages.flatMap((pg: any) => pg.data.content))
    }
    // Luôn refetch để đảm bảo có dữ liệu mới nhất
    refetch()
  }, [chatRoom.id])

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
            setTimeout(() => {
              fetchNextPage()
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
  const chatMessageData = listMsg.map((chatMessage, i) => {
    return (
      <ChatMessage
        key={chatMessage.id}
        ref={i === listMsg.length - 1 ? lastChatMessageRef : undefined} // Gán ref cho tin nhắn cuối cùng
        message={chatMessage}
        userAccount={userAccount}
        chatRoom={chatRoom}
        nextMessage={i > 0 ? listMsg[i - 1] : undefined} // Nếu có tin nhắn phía trên, gán vào
        previousMessage={i < listMsg.length - 1 ? listMsg[i + 1] : undefined} // Nếu có tin nhắn phía dưới, gán vào
      />
    )
  })

  const typingIndicator = (
    <div className={`flex items-center justify-start px-4 mb-[2px] gap-2 group`}>
      <img src={chatRoom?.receiver.avatar} className=' w-7 h-7 rounded-full' alt='avt' />
      <div className={`bg-[#f0f0f0] w-fit rounded-full px-1 py-1 h-6 flex items-center gap-1`}>
        <span className='leading-5 text-[15px]'>
          <LoadingThreeDotsJumping width='6px' height='6px' color='gray' />
        </span>
      </div>
    </div>
  )

  if (status === 'error') return <p className='center'>Error: {(error as any).message}</p>

  if (isLoading)
    return <LoadingSpinner type='window' className={`h-[calc(100vh-7.8rem)] max-h-[${maxHeight}px] w-full`} />

  return (
    <div
      ref={chatMessageContainerRef}
      className='flex flex-col-reverse overflow-y-scroll'
      style={{ height: `${maxHeight}px`, maxHeight: `${maxHeight}px`, overflowAnchor: 'none' }}
    >
      {isReceiverTyping && typingIndicator}
      {chatMessageData}
      {isFetchingNextPage && (
        <div
          style={{ height: `${maxHeight}px`, maxHeight: `${maxHeight}px` }}
          className='flex justify-center items-center w-full'
        >
          <LoadingSpinner type='window' className={`h-6 w-6`} border='2px' />
        </div>
      )}

      <div
        style={{
          height: `${maxHeight}px`,
          maxHeight: `${maxHeight}px`,
          display: (listMsg.length as number) > 0 ? 'none' : 'flex'
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
