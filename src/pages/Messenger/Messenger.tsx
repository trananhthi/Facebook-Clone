import { IMessage } from '@stomp/stompjs'
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppContext } from 'src/contexts/app.context'
import { RootState } from 'src/redux/store'
import ChatRoomList from './ChatRoomList'
import ChatWindow from './ChatWindow'
import { Helmet } from 'react-helmet-async'

const Messenger = () => {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const [message, setMessage] = useState('')
  const { stompClient } = useContext(AppContext)

  stompClient.onConnect = () => {
    console.log('connected')
    stompClient.subscribe(`/user/${userAccount.id}/queue/messages`, onMessageReceived)
  }
  stompClient.onDisconnect = () => {
    console.log('disconnected')
  }

  function onMessageReceived(message: IMessage): void {
    console.log(message.body)
  }

  const sendMessage = () => {
    const messageContent = message.trim()
    if (messageContent && stompClient) {
      const chatMessage = {
        roomId: 1,
        senderId: userAccount.id,
        content: messageContent,
        status: 'active',
        createdAt: new Date()
      }
      stompClient.publish({ destination: '/app/chat', body: JSON.stringify(chatMessage) })
      setMessage('')
    }
  }

  return (
    <div id='messenger-client-container' className='flex h-full text-textprimary'>
      <Helmet>
        <title>Messenger | Facebook</title>
        <meta name='description' content='Facebook' />
      </Helmet>
      <div className='sm:w-[360px]'>
        <ChatRoomList />
      </div>
      <div className='flex-1'>
        <ChatWindow />
      </div>
    </div>
  )
}

export default Messenger
