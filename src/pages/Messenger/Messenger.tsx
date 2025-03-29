import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import ChatRoomList from './ChatRoomList'
import ChatWindow from './ChatWindow'
import { Helmet } from 'react-helmet-async'
import { ChatMessageType } from 'src/types/chat.type.ts'

const Messenger = () => {
  const { messageReceived } = useContext(AppContext)
  const [newMessage, setNewMessage] = useState<ChatMessageType | null>(null)

  useEffect(() => {
    if (!messageReceived) return
    setNewMessage(JSON.parse(messageReceived?.body) as ChatMessageType)
  }, [messageReceived])

  return (
    <div id='messenger-client-container' className='flex h-screen text-textprimary'>
      <Helmet>
        <title>Messenger | Facebook</title>
        <meta name='description' content='Facebook' />
      </Helmet>
      <div className='sm:w-[360px]'>
        <ChatRoomList newMessage={newMessage} />
      </div>
      <div className='flex-1 max-h-[100px] h-full'>
        <ChatWindow newMessage={newMessage} setNewMessage={setNewMessage} />
      </div>
    </div>
  )
}

export default Messenger
