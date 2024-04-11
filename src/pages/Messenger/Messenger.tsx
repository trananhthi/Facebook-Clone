import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import ChatRoomList from './ChatRoomList'
import ChatWindow from './ChatWindow'
import { Helmet } from 'react-helmet-async'

const Messenger = () => {
  const { messageReceived } = useContext(AppContext)

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
