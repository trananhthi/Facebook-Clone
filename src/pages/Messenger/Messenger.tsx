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
  const { stompClient } = useContext(AppContext)
  const [messageReceived, setMessageReceived] = useState<IMessage | null>(null)

  stompClient.onConnect = () => {
    console.log('connected')
    stompClient.subscribe(`/user/${userAccount.id}/queue/messages`, onMessageReceived)
  }
  stompClient.onDisconnect = () => {
    console.log('disconnected')
  }

  function onMessageReceived(message: IMessage): void {
    setMessageReceived(message)
  }

  return (
    <div id='messenger-client-container' className='flex h-full text-textprimary'>
      <Helmet>
        <title>Messenger | Facebook</title>
        <meta name='description' content='Facebook' />
      </Helmet>
      <div className='sm:w-[360px]'>
        <ChatRoomList messageReceived={messageReceived} />
      </div>
      <div className='flex-1'>
        <ChatWindow messageReceived={messageReceived} />
      </div>
    </div>
  )
}

export default Messenger
