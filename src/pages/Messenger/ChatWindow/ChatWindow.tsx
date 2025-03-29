import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import chatApi from 'src/apis/chat.api'
import { ChatMessageType, ChatRoomType } from 'src/types/chat.type'
import no_message_icon from 'src/assets/images/icon-pack/no_message_icon.png'
import ChatMessageView from 'src/components/ChatMessageView'
import ChatBox from 'src/components/ChatBox'
import React from 'react'

interface ChatWindowProps {
  newMessage: ChatMessageType | null
  setNewMessage: React.Dispatch<React.SetStateAction<ChatMessageType | null>>
}

export const ChatWindow = ({ newMessage, setNewMessage }: ChatWindowProps) => {
  const { roomId } = useParams()

  const getChatRoom = useQuery({
    queryKey: [roomId],
    enabled: !!roomId,
    queryFn: () => chatApi.getChatRoomById(roomId as any)
  })

  const room = getChatRoom.data?.data as ChatRoomType

  if (getChatRoom.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='h-full'>
      {roomId ? (
        <div className='w-full'>
          {/* BEGIN: receiver information */}
          <div className='py-[6px] flex justify-between items-center px-[10px] border-b border-gray-300 shadow-sm'>
            <Link
              to={`/messenger`}
              className={`h-[52px] px-2 w-fit rounded-md text-left hover:bg-[#f2f2f2] cursor-pointer flex items-center gap-2 `}
            >
              <div className='flex w-10 h-10 rounded-full'>
                <img src={room.receiver.avatar} className=' w-full h-full rounded-full' alt='' />
                <div className='w-3 h-3 absolute ml-7 mt-7 bg-green-600 rounded-full border-2 border-white'></div>
              </div>
              <div className='flex flex-col'>
                <span className='text-[17px] leading-5 font-semibold'>
                  {room.receiver.firstName + ' ' + room.receiver.lastName}
                </span>
                <span className='text-[13px] leading-4 text-textgray'>Đang hoạt động</span>
              </div>
            </Link>

            {/* Call, call video, information */}
            <div className='flex gap-1 justify-center items-center'>
              <div
                aria-label='Bắt đầu gọi thoại'
                role='button'
                className='hover:bg-[#f2f2f2] h-9 w-9 flex justify-center items-center rounded-full'
              >
                <svg viewBox='0 0 12 13' width='20' height='20' fill='currentColor' color='#0084ff'>
                  <g stroke='none' strokeWidth='1' fillRule='evenodd'>
                    <path
                      d='M109.492 925.682a1.154 1.154 0 0 0-.443-.81 10.642 10.642 0 0 0-1.158-.776l-.211-.125c-.487-.29-.872-.514-1.257-.511a3.618 3.618 0 0 0-.693.084c-.304.07-.6.302-.88.69a3.365 3.365 0 0 0-.297.494l.449.22-.507-.202-.13-.074a8.53 8.53 0 0 1-3.04-3.043l-.071-.124.019-.057v-.001c.168-.083.334-.183.492-.297.162-.117.552-.432.681-.842.063-.2.075-.407.086-.59l.007-.116c.029-.389-.197-.764-.482-1.237l-.153-.256c-.322-.55-.6-.933-.775-1.158a1.155 1.155 0 0 0-.811-.443c-.36-.031-1.066.01-1.748.608-1.018.896-1.326 2.25-.845 3.714a11.734 11.734 0 0 0 2.834 4.612 11.732 11.732 0 0 0 4.61 2.833c.455.149.897.222 1.32.222.94 0 1.777-.364 2.395-1.067.599-.681.639-1.387.608-1.748'
                      transform='translate(-450 -1073) translate(352.5 157)'
                    ></path>
                  </g>
                </svg>
              </div>

              <div
                aria-label='Bắt đầu gọi video'
                role='button'
                className='hover:bg-[#f2f2f2] h-9 w-9 flex justify-center items-center rounded-full'
              >
                <svg viewBox='0 0 12 13' width='20' height='20' fill='currentColor' color='#0084ff'>
                  <g fillRule='evenodd' transform='translate(-450 -1073)'>
                    <path d='M461.583 1076.078a.732.732 0 0 0-.774.073l-.612.466a.498.498 0 0 0-.197.398v4.97c0 .157.072.304.197.398l.612.466a.736.736 0 0 0 .774.073.749.749 0 0 0 .417-.677v-5.49a.75.75 0 0 0-.417-.677m-4.562-1.557h-5.043A1.98 1.98 0 0 0 450 1076.5v6.021a1.98 1.98 0 0 0 1.978 1.979h5.043a1.98 1.98 0 0 0 1.979-1.979v-6.021a1.98 1.98 0 0 0-1.978-1.979'></path>
                  </g>
                </svg>
              </div>

              <div
                aria-label='Thông tin về cuộc trò chuyện'
                role='button'
                className='hover:bg-[#f2f2f2] h-9 w-9 flex justify-center items-center rounded-full'
              >
                <svg
                  height='24px'
                  name='icon'
                  role='presentation'
                  viewBox='0 0 36 36'
                  width='24px'
                  fill='currentColor'
                  color='#0084ff'
                >
                  <g transform='translate(18,18)scale(1.2)translate(-18,-18)'>
                    <path
                      d='M18,10 C16.6195,10 15.5,11.119 15.5,12.5 C15.5,13.881 16.6195,15 18,15 C19.381,15 20.5,13.881 20.5,12.5 C20.5,11.119 19.381,10 18,10 Z M16,25 C16,25.552 16.448,26 17,26 L19,26 C19.552,26 20,25.552 20,25 L20,18 C20,17.448 19.552,17 19,17 L17,17 C16.448,17 16,17.448 16,18 L16,25 Z M18,30 C11.3725,30 6,24.6275 6,18 C6,11.3725 11.3725,6 18,6 C24.6275,6 30,11.3725 30,18 C30,24.6275 24.6275,30 18,30 Z'
                      fill='var(--mwp-header-button-color)'
                      stroke='var(--mwp-header-button-color)'
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          {/* END: receiver information */}
          {/* BEGIN: Chat message center */}
          <ChatMessageView chatRoom={room} newMessage={newMessage} />
          {/* <div className='min-h-[160px] max-h-[300px] overflow-auto'> */}
          <ChatBox roomId={roomId} setNewMessage={setNewMessage} />
          {/* </div> */}
          {/* END: Chat message center */}
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col h-screen gap-4'>
          <div className=''>
            <i
              className=''
              style={{
                backgroundImage: `url(${no_message_icon})`,
                backgroundPosition: '0px -182px',
                backgroundSize: '248px 386px',
                width: '244px',
                height: '180px',
                backgroundRepeat: 'no-repeat',
                display: 'inline-block'
              }}
            ></i>
          </div>
          <div className='x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w x6s0dn4 x1cnzs8'>
            <span className='text-[20px] leading-5 font-bold text-textprimary'>Chưa chọn đoạn chat nào</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatWindow
