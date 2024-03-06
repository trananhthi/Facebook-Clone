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
  chatMessageContainerRef: any
}

export const ChatMessageView = ({ chatRoom, messageReceived, chatMessageContainerRef }: ChatMessageViewProps) => {
  const [maxHeight, setMaxHeight] = useState(0)
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)

  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    error,
    isLoading
  } = useInfiniteQuery(
    ['get-chat-message', chatRoom.id],
    ({ pageParam = 0 }) => chatApi.getChatMessage(chatRoom.id as number, pageParam, 35),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.last ? undefined : allPages.length
      }
    }
  )

  useEffect(() => {
    const messengerContainer = document.getElementById('messenger-client-container')
    setMaxHeight((messengerContainer?.clientHeight as number) - 65 - 60)
  }, [])

  useEffect(() => {
    if (messageReceived) {
      const newMessage = JSON.parse(messageReceived.body) as ChatMessageType
      const newMessageElement = <ChatMessage message={newMessage} userAccount={userAccount} chatRoom={chatRoom} />
      if (chatRoom.receiver.id === newMessage.senderId && chatMessageContainerRef.current) {
        const chatMessageContainer = chatMessageContainerRef.current as HTMLElement
        const tempContainer = document.createElement('div')
        createRoot(tempContainer).render(newMessageElement)

        // Lấy phần tử đầu tiên trong danh sách các phần tử con của thẻ container
        const firstChild = chatMessageContainer?.firstChild
        // Thêm phần tử mới vào trước phần tử đầu tiên
        chatMessageContainer?.insertBefore(tempContainer as Node, firstChild as Node)
        setTimeout(() => {
          tempContainer.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }, 100)
      }
    }
  }, [messageReceived])

  const intObserver = useRef<IntersectionObserver | null>(null)
  const lastChatMessageRef = useCallback(
    (chatMessage: Element) => {
      if (isFetchingNextPage) return

      if (intObserver.current) intObserver.current.disconnect()

      intObserver.current = new IntersectionObserver((chatMessages) => {
        if (chatMessages[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })

      if (chatMessage) intObserver.current.observe(chatMessage)
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  )

  const chatMessageData = data?.pages.map((pg) => {
    return pg.data.content.map((chatMessage: ChatMessageType, i) => {
      if (pg.data.content.length === i + 1) {
        return (
          <ChatMessage
            key={chatMessage.id}
            ref={lastChatMessageRef}
            message={chatMessage}
            userAccount={userAccount}
            chatRoom={chatRoom}
          />
        )
      }
      return <ChatMessage key={chatMessage.id} message={chatMessage} userAccount={userAccount} chatRoom={chatRoom} />
    })
  })

  if (status === 'error') return <p className='center'>Error: {(error as any).message}</p>

  if (isLoading)
    return (
      <div
        style={{ height: `${maxHeight}px`, maxHeight: `${maxHeight}px` }}
        className='flex justify-center items-center w-full'
      >
        <div className='spinner-loader-circle'>
          <svg className='spinner-circular' viewBox='25 25 50 50'>
            <circle className='spinner-path' cx='50' cy='50' r='20' fill='none' strokeWidth='5' strokeMiterlimit='10' />
          </svg>
        </div>
      </div>
    )

  return (
    <div
      ref={chatMessageContainerRef}
      className='flex flex-col-reverse h-full overflow-y-scroll'
      style={{ height: `${maxHeight}px`, maxHeight: `${maxHeight}px` }}
    >
      {chatMessageData}

      <div
        style={{ display: (data?.pages[0].data.content.length as number) > 0 ? 'flex' : 'none' }}
        className='relative flex-col justify-center items-center gap-2 my-10'
      >
        <div className='flex w-[60px] h-[60px] rounded-full'>
          <img src={chatRoom.receiver.avatar.url} className=' w-full h-full rounded-full' />
          <div className='w-5 h-5 absolute ml-10 mt-10 bg-green-600 rounded-full border-2 border-white'></div>
        </div>
        <span className='text-[17px] leading-5 font-semibold'>
          {chatRoom.receiver.firstName + ' ' + chatRoom.receiver.lastName}
        </span>
        <span className='text-[12px] leading-4 text-textgray'>Các bạn là bạn bè trên Facebook</span>
      </div>

      <div
        style={{
          height: `${maxHeight}px`,
          maxHeight: `${maxHeight}px`,
          display: (data?.pages[0].data.content.length as number) > 0 ? 'none' : 'flex'
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
