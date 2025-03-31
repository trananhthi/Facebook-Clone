import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import ChatRoomList from './ChatRoomList'
import ChatWindow from './ChatWindow'
import { Helmet } from 'react-helmet-async'
import { WSEventPayload } from 'src/types/utils.type.ts'
import messageNotiSound from '../../assets/sounds/notificationMessage.mp3'
import { WSEventEnum } from 'src/constants/enum.ts'

const Messenger = () => {
  const { eventReceived } = useContext(AppContext)
  const [newEvent, setNewEvent] = useState<WSEventPayload<any> | null>(null)
  const audioRef = useRef(new Audio(messageNotiSound))
  const [soundEnabled, setSoundEnabled] = useState(false)

  // Function to enable sound after user interaction
  const enableSound = () => {
    audioRef.current
      .play()
      .then(() => {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        setSoundEnabled(true)
      })
      .catch((err) => console.error('Could not enable audio:', err))
  }

  // Add event listeners for user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      enableSound()
      // Remove event listeners after enabling
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
    }

    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('keydown', handleUserInteraction)

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
    }
  }, [])

  // Handle new messages
  useEffect(() => {
    if (!eventReceived) return
    const event = JSON.parse(eventReceived?.body) as WSEventPayload<any>
    if (soundEnabled && event.event === WSEventEnum.SEND_MESSAGE) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((err) => {
        console.error('Error playing sound:', err)
      })
    }

    setNewEvent(event)
  }, [eventReceived, soundEnabled])

  return (
    <div id='messenger-client-container' className='flex h-screen text-textprimary'>
      <Helmet>
        <title>Messenger | Facebook</title>
        <meta name='description' content='Facebook' />
      </Helmet>
      <div className='sm:w-[360px]'>
        <ChatRoomList newEvent={newEvent} />
      </div>
      <div className='flex-1 h-full'>
        <ChatWindow newEvent={newEvent} setNewEvent={setNewEvent} />
      </div>
    </div>
  )
}

export default Messenger
