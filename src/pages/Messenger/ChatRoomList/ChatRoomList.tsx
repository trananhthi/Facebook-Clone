import { faArrowLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Input } from '@material-tailwind/react'
import { IMessage } from '@stomp/stompjs'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import chatApi from 'src/apis/chat.api'
import userAccountApi from 'src/apis/userAccount.api'
import ChatRoom from 'src/base-components/ChatRoom'
import CircleIconButton from 'src/base-components/CircleIconButton'
import { RootState } from 'src/redux/store'
import { ChatMessageType, ChatRoomType } from 'src/types/chat.type'
import { UserInfor } from 'src/types/user.type'

const ChatRoomList = ({ messageReceived }: { messageReceived: IMessage | null }) => {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const { roomId } = useParams()
  const [isFocus, setIsFocus] = useState(false)
  const [isSCroll, setIsScroll] = useState(false)
  const [maxHeight, setMaxHeight] = useState(0)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedUser, setSelectedUser] = useState<UserInfor | null>(null)
  const navigate = useNavigate()

  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    error,
    isLoading,
    refetch
  } = useInfiniteQuery(
    ['get-all-chatroom'],
    ({ pageParam = 0 }) => chatApi.getListChatRoom(userAccount.id as number, pageParam, 15),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.last ? undefined : allPages.length
      }
    }
  )

  const searchUsersByName = useQuery({
    queryKey: [searchKeyword],
    enabled: searchKeyword !== '' && isFocus,
    queryFn: () => userAccountApi.searchUsersByName(searchKeyword),
    onError: (err) => console.log(err)
  })

  const listUser = searchUsersByName.data?.data as UserInfor[]

  const getChatRoom = useQuery({
    queryKey: [selectedUser],
    enabled: selectedUser !== null && isFocus,
    queryFn: () => chatApi.getChatRoom(userAccount.id as number, selectedUser?.id as number),
    onError: (err) => console.log(err),
    onSuccess: (data) => {
      navigate('/messenger/' + data.data.id, { replace: true })
      handleRefetch()
      setIsFocus(false)
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      const chatRoomList = document.getElementById('chat-room-list') as HTMLElement
      if (chatRoomList.scrollTop > 0) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    }

    const chatRoomList = document.getElementById('chat-room-list')
    chatRoomList?.addEventListener('scroll', handleScroll)

    if (data && data.pages && data.pages[0].data.content.length !== 0) {
      if (selectedUser) {
        navigate('/messenger/' + getChatRoom.data?.data.id, { replace: true })
        setSelectedUser(null)
      } else {
        if (roomId) navigate('/messenger/' + roomId, { replace: true })
        else navigate('/messenger/' + data.pages[0].data.content[0].id, { replace: true })
      }
    }

    // Cleanup function to remove event listener
    return () => {
      chatRoomList?.removeEventListener('scroll', handleScroll)
    }
  }, [data]) // Ensure useEffect only runs when data or navigate changes

  useEffect(() => {
    const messengerContainer = document.getElementById('messenger-client-container')
    setMaxHeight((messengerContainer?.clientHeight as number) - 165)
  }, [])

  useEffect(() => {
    setSearchKeyword('')
  }, [isFocus])

  // useEffect(() => {
  //   if (messageReceived) {
  //     const newMessage = JSON.parse(messageReceived.body) as ChatMessageType
  //     if (parseInt(roomId as string) !== newMessage.senderId) {
  //       console.log('khác')
  //     }
  //   }
  // }, [messageReceived])

  //Scroll loading infinite
  const intObserver = useRef<IntersectionObserver | null>(null)
  const lastChatRoomRef = useCallback(
    (chatRoom: Element) => {
      if (isFetchingNextPage) return

      if (intObserver.current) intObserver.current.disconnect()

      intObserver.current = new IntersectionObserver((chatRooms) => {
        if (chatRooms[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })

      if (chatRoom) intObserver.current.observe(chatRoom)
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  )

  const chatRoomData = data?.pages.map((pg) => {
    return pg.data.content.map((chatRoom: ChatRoomType, i) => {
      if (messageReceived) {
        const newMessage = JSON.parse((messageReceived as IMessage).body) as ChatMessageType

        const isTrue =
          roomId !== newMessage.roomId.toString() &&
          newMessage.senderId.toString() === (chatRoom.receiver.id?.toString() as string)
        // console.log(newMessage.roomId.toString())
        // console.log(isTrue, '  ', chatRoom)
        if (pg.data.content.length === i + 1) {
          return (
            <ChatRoom
              ref={lastChatRoomRef}
              key={chatRoom.id}
              chatRoom={chatRoom}
              messageReceived={isTrue ? newMessage : undefined}
            />
          )
        }
        return <ChatRoom key={chatRoom.id} chatRoom={chatRoom} messageReceived={isTrue ? newMessage : undefined} />
      } else {
        if (pg.data.content.length === i + 1) {
          return <ChatRoom ref={lastChatRoomRef} key={chatRoom.id} chatRoom={chatRoom} />
        }
        return <ChatRoom key={chatRoom.id} chatRoom={chatRoom} />
      }
    })
  })

  const handleRefetch = () => {
    refetch()
  }

  const handleSelectUser = (user: UserInfor) => {
    setSelectedUser(user)
  }

  if (status === 'error') return <p className='center'>Error: {(error as any).message}</p>

  return (
    <div className='py-3 border-r h-full border-gray-300 w-full'>
      {/* BEGIN: header */}
      <div className='px-4 flex justify-between items-center mb-3'>
        <span className='font-bold text-[24px] leading-7'>Đoạn chat</span>
        <div className='flex gap-3'>
          <CircleIconButton>
            <svg viewBox='0 0 20 20' width='20' height='20' fill='currentColor'>
              <g fillRule='evenodd' transform='translate(-446 -398)'>
                <path d='M458 408a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0'></path>
              </g>
            </svg>
          </CircleIconButton>

          <CircleIconButton>
            <svg viewBox='0 0 12 13' width='20' height='20' fill='currentColor'>
              <g fillRule='evenodd' transform='translate(-450 -1073)'>
                <g>
                  <path
                    d='M105.506 926.862a.644.644 0 0 1-.644.644h-6.724a.644.644 0 0 1-.644-.644v-6.724c0-.356.288-.644.644-.644h2.85c.065 0 .13-.027.176-.074l.994-.993a.25.25 0 0 0-.177-.427h-3.843A2.138 2.138 0 0 0 96 920.138v6.724c0 1.18.957 2.138 2.138 2.138h6.724a2.138 2.138 0 0 0 2.138-2.138v-3.843a.25.25 0 0 0-.427-.177l-1.067 1.067v2.953zm1.024-9.142a.748.748 0 0 0-1.06 0l-.589.588a.25.25 0 0 0 0 .354l1.457 1.457a.25.25 0 0 0 .354 0l.588-.589a.75.75 0 0 0 0-1.06l-.75-.75z'
                    transform='translate(354.5 156)'
                  ></path>
                  <path
                    d='M99.22 923.97a.75.75 0 0 0-.22.53v.75c0 .414.336.75.75.75h.75a.75.75 0 0 0 .53-.22l4.248-4.247a.25.25 0 0 0 0-.354l-1.457-1.457a.25.25 0 0 0-.354 0l-4.247 4.248z'
                    transform='translate(354.5 156)'
                  ></path>
                </g>
              </g>
            </svg>
          </CircleIconButton>
        </div>
      </div>
      {/* END: header */}

      {/* BEGIN: search bar */}
      <div className={`${isFocus ? 'pr-4 pl-1' : 'px-4'} w-full mb-2`}>
        <div className='flex'>
          <div>
            <IconButton
              variant='text'
              onClick={() => setIsFocus(false)}
              className={`w-9 h-9 rounded-full ml-0 z-[999] ${
                isFocus ? 'animate-slide-in-right-button' : 'animate-flip-out-hor-top-logo hidden'
              }`}
            >
              <FontAwesomeIcon icon={faArrowLeft} className='w-[18px] h-[18px] text-gray-700 ' />
            </IconButton>
          </div>
          <div className='flex flex-col gap-x-2 sm:flex-row sm:items-center w-full'>
            <div className='relative after:gap-2 md:w-full'>
              <Input
                onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                type='text'
                placeholder='Tìm kiếm trên Messenger'
                containerProps={{
                  className: `${isFocus ? 'w-full' : 'w-full'} h-9 rounded-full bg-[#f0f2f5]`
                }}
                className={`text-black border-none z-[99] ${
                  isFocus ? 'animate-slide-left-search' : 'animate-slide-right-search'
                }  !border-t-blue-gray-300 pl-9 placeholder:text-gray-700/80 placeholder:text-[15px] focus:!border-blue-gray-300`}
                labelProps={{
                  className: ' before:content-none after:content-none'
                }}
                crossOrigin={undefined}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <div
                className={`!absolute left-3 top-[6px] ${
                  isFocus ? 'animate-slide-out-left-search' : 'animate-slide-in-left-search'
                }`}
              >
                <FontAwesomeIcon className='text-gray-700 w-[18px] h-[18px]' icon={faMagnifyingGlass} />
              </div>
              {searchKeyword !== '' && (
                <button className='absolute right-[4px] top-[2px]' onClick={() => setSearchKeyword('')}>
                  <CircleIconButton size={32}>
                    <svg viewBox='0 0 12 13' width='16' height='16' fill='currentColor'>
                      <g fillRule='evenodd' transform='translate(-450 -1073)'>
                        <g fillRule='nonzero'>
                          <path
                            d='m98.095 917.155 7.75 7.75a.75.75 0 0 0 1.06-1.06l-7.75-7.75a.75.75 0 0 0-1.06 1.06z'
                            transform='translate(353.5 159)'
                          ></path>
                          <path
                            d='m105.845 916.095-7.75 7.75a.75.75 0 1 0 1.06 1.06l7.75-7.75a.75.75 0 0 0-1.06-1.06z'
                            transform='translate(353.5 159)'
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </CircleIconButton>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* END: search bar */}

      {/* BEGIN: Type of chat */}
      {!isFocus && (data?.pages[0].data.content.length as number) > 0 && (
        <div className='px-4 flex gap-3 items-center h-9 mb-2 text-[15px] leading-5'>
          <div className='font-semibold text-[#0064d1] cursor-pointer rounded-full p-2 px-3 bg-[#ebf5ff]'>Hộp thư</div>
          <div className='font-semibold text-[#050505cb] rounded-full cursor-pointer p-2 px-3 hover:bg-[#f2f2f2]'>
            Cộng đồng
          </div>
        </div>
      )}
      {/* END: Type of chat */}
      <hr className={`${isSCroll ? '' : 'hidden'} border-gray-300`} />

      {/* BEGIN: chat room list */}
      <div
        style={{ maxHeight: `${maxHeight}px` }}
        id='chat-room-list'
        className={`${isFocus ? 'hidden' : ''} px-2 overflow-y-auto h-full`}
      >
        {chatRoomData}
        {(data?.pages[0].data.content.length as number) === 0 && (
          <div className='flex justify-center items-center h-full'>
            <span>Không tìm thấy tin nhắn.</span>
          </div>
        )}
        {(isFetchingNextPage || isLoading) &&
          Array.from({ length: 2 }, (_, index) => index).map((_, index) => (
            <div key={index} className='bg-white rounded-lg p-4'>
              <div className='animate-pulse'>
                <div className='flex gap-2 items-center'>
                  <div className='rounded-full bg-gray-300 h-[56px] w-[56px]'></div>
                  <div className='flex-1 py-1 gap-2 flex flex-col'>
                    <div className='h-[20px] bg-gray-300 rounded-full w-[110px]'></div>
                    <div className='h-[16px] bg-gray-300 rounded-full w-[170px]'></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* END: chat room list */}

      {/* BEGIN: chat room list when focus */}
      <div
        style={{ maxHeight: `${maxHeight + 44}px` }}
        id='chat-room-list'
        className={`${isFocus ? '' : 'hidden'} px-2 overflow-y-auto`}
      >
        {searchUsersByName.isLoading && searchKeyword !== '' && <div>Loading...</div>}
        {searchKeyword === '' && <span className='ml-9 text-gray-500'>Không có tìm kiếm nào gần đây</span>}
        {searchKeyword !== '' && listUser?.length === 0 && (
          <span className='ml-9 text-gray-500'>Không tìm thấy kết quả nào</span>
        )}
        {searchKeyword !== '' && listUser?.length > 0 && (
          <div>
            {listUser?.map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className='h-[48px] flex items-center w-full rounded-md cursor-pointer px-2 gap-2 hover:bg-[#f2f2f2]'
              >
                <img src={user.avatar.url} className='h-9 w-9 rounded-full'></img>
                <span className='text-[15px] leading-5'>{user.firstName + ' ' + user.lastName}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* END: chat room list when focus */}
    </div>
  )
}

export default ChatRoomList
