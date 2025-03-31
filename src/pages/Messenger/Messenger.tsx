import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import ChatRoomList from './ChatRoomList'
import ChatWindow from './ChatWindow'
import { Helmet } from 'react-helmet-async'
import { WSEventPayload } from 'src/types/utils.type.ts'

const Messenger = () => {
  const { eventReceived } = useContext(AppContext)
  const [newEvent, setNewEvent] = useState<WSEventPayload<any> | null>(null)

  useEffect(() => {
    if (!eventReceived) return
    setNewEvent(JSON.parse(eventReceived?.body) as WSEventPayload<any>)
  }, [eventReceived])

  console.log(newEvent)
  return (
    <div id='messenger-client-container' className='flex h-screen text-textprimary'>
      <Helmet>
        <title>Messenger | Facebook</title>
        <meta name='description' content='Facebook' />
      </Helmet>
      <div className='sm:w-[360px]'>
        <ChatRoomList newEvent={newEvent} />
      </div>
      <div className='flex-1 max-h-[100px] h-full'>
        <ChatWindow newEvent={newEvent} setNewEvent={setNewEvent} />
      </div>
    </div>
  )
}

export default Messenger
