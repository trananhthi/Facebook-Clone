import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react'
// import { useMutation } from '@tanstack/react-query'
import Picker from '@emoji-mart/react'
// import { convertNewlinesForStorage } from 'src/utils/utils'
import { AppContext } from 'src/contexts/app.context'
import { RootState } from 'src/redux/store'
import { useSelector } from 'react-redux'
import ChatMessage from 'src/base-components/ChatMessage'
import { ChatMessageType } from 'src/types/chat.type'
import { createRoot } from 'react-dom/client'
/* import images */

const animateZoomOut = (element: string, animationConfig: string) =>
  new Promise((resolve) => {
    const node = document.querySelector(element) as HTMLElement
    node?.classList.add(animationConfig)

    function handleAnimationEnd(event: any) {
      if (event.animationName === 'scale-out-center') {
        event.stopPropagation()
        node?.classList.remove(animationConfig)
        resolve('Animation ended')
        node?.classList.add('hidden')
      }
    }

    node?.addEventListener('animationend', handleAnimationEnd, { once: false })
  })

const animateZoomIn = (element: string, animationConfig: string) =>
  new Promise((resolve) => {
    const node = document.querySelector(element) as HTMLElement

    setTimeout(() => {
      node?.classList.remove('hidden')
    }, 150)

    node?.classList.add(animationConfig)

    function handleAnimationEnd(event: any) {
      if (event.animationName === 'scale-in-center') {
        event.stopPropagation()
        node?.classList.remove(animationConfig)
        resolve('Animation ended')
      }
    }

    node?.addEventListener('animationend', handleAnimationEnd, { once: false })
  })

export const ChatBox = ({ roomId, chatMessageContainerRef }: { roomId: string; chatMessageContainerRef: any }) => {
  const colorButton = '#0084ff'
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const { stompClient } = useContext(AppContext)

  const [message, setMessage] = useState('')
  // const [isFocusInputField, setIsFocusInputField] = useState<boolean>(false)
  const [openEmoji, setOpenEmoji] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const textAreaRef = useRef(null)
  // const [messageTextAreaWidth, setMessageTextAreaWidth] = useState<number>(0)
  const [isTyping, setIsTyping] = useState<boolean>(false)

  const handleClickOutsideEmojiPicker = () => {
    if (openEmoji && !isClicked) setOpenEmoji(false)
  }

  const handleClickEmojiButton = () => {
    // setIsFocusInputField(true)
    setOpenEmoji((cur) => !cur)
    setIsClicked(true)
  }

  const handleEmojiSelect = (emoji: any) => {
    setMessage(message + emoji.native)
  }

  const sendMessage = () => {
    const messageContent = message.trim()
    if (messageContent && stompClient) {
      const chatMessage: ChatMessageType = {
        roomId: parseInt(roomId),
        senderId: userAccount.id as number,
        content: messageContent,
        status: 'active',
        createdAt: new Date()
      }
      stompClient.publish({ destination: '/app/chat', body: JSON.stringify(chatMessage) })
      setMessage('')
      const newMessageElement = <ChatMessage message={chatMessage} userAccount={userAccount} />
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

  const handleEnterPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
    if (event.key === 'Enter' && !event.shiftKey && message.trim().length !== 0) {
      sendMessage() // Gọi hàm để gửi tin nhắn
    }
  }

  useEffect(() => {
    const messageTextAreaElement = document.getElementById('message-text-area') as HTMLElement

    if (message.length !== 0 && !isTyping && message.trim() !== '') {
      animateZoomOut('#media-gif', 'animate-[scale-out-center_0.1s_ease-in-out_both_0ms]')
      animateZoomOut('#media-sticker', 'animate-[scale-out-center_0.1s_ease-in-out_both_50ms]')
      animateZoomOut('#media-image', 'animate-[scale-out-center_0.1s_ease-in-out_both_100ms]')
      setIsTyping(true)
      messageTextAreaElement.style.width = '1073px'
    }
    if (message.length === 0 && isTyping) {
      animateZoomIn('#media-image', 'animate-[scale-in-center_0.1s_ease-in-out_both_0ms]')
      animateZoomIn('#media-sticker', 'animate-[scale-in-center_0.1s_ease-in-out_both_50ms]')
      animateZoomIn('#media-gif', 'animate-[scale-in-center_0.1s_ease-in-out_both_100ms]')
      setIsTyping(false)
      messageTextAreaElement.style.width = '973px'
    }
  }, [message])

  useEffect(() => {
    const messageTextAreaElement = document.getElementById('message-text-area') as HTMLElement

    messageTextAreaElement.style.width = '973px'

    if (textAreaRef.current) {
      const textAreaElement = textAreaRef.current as HTMLTextAreaElement
      textAreaElement.focus()
    }
  }, [roomId])

  const fastEmojiButton = (
    <button
      onMouseLeave={() => setIsClicked(false)}
      onClick={handleClickEmojiButton}
      className='hover:bg-[#f2f2f2] h-7 w-7 flex justify-center items-center rounded-full'
    >
      <svg height='20px' viewBox='0 0 38 38' width='20px'>
        <g fill='none' fillRule='evenodd'>
          <g transform='translate(-893.000000, -701.000000)'>
            <g transform='translate(709.000000, 314.000000)'>
              <g>
                <path
                  d='M210.5,405 C209.121,405 208,403.879 208,402.5 C208,401.121 209.121,400 210.5,400 C211.879,400 213,401.121 213,402.5 C213,403.879 211.879,405 210.5,405 M212.572,411.549 C210.428,413.742 206.938,415 203,415 C199.062,415 195.572,413.742 193.428,411.549 C192.849,410.956 192.859,410.007 193.451,409.428 C194.045,408.85 194.993,408.859 195.572,409.451 C197.133,411.047 199.909,412 203,412 C206.091,412 208.867,411.047 210.428,409.451 C211.007,408.859 211.956,408.85 212.549,409.428 C213.141,410.007 213.151,410.956 212.572,411.549 M195.5,400 C196.879,400 198,401.121 198,402.5 C198,403.879 196.879,405 195.5,405 C194.121,405 193,403.879 193,402.5 C193,401.121 194.121,400 195.5,400 M203,387 C192.523,387 184,395.523 184,406 C184,416.477 192.523,425 203,425 C213.477,425 222,416.477 222,406 C222,395.523 213.477,387 203,387'
                  fill={colorButton}
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </button>
  )

  return (
    <div className='flex h-full px-1 justify-between items-center gap-[6px]'>
      {/* BEGIN: addition content */}
      <div className='flex items-center absolute'>
        <div role='button' className='hover:bg-[#f2f2f2] h-7 w-7 flex justify-center items-center rounded-full'>
          <svg height='20px' viewBox='0 0 24 24' width='20px'>
            <g fillRule='evenodd'>
              <polygon fill='none' points='-6,30 30,30 30,-6 -6,-6 '></polygon>
              <path
                d='m18,11l-5,0l0,-5c0,-0.552 -0.448,-1 -1,-1c-0.5525,0 -1,0.448 -1,1l0,5l-5,0c-0.5525,0 -1,0.448 -1,1c0,0.552 0.4475,1 1,1l5,0l0,5c0,0.552 0.4475,1 1,1c0.552,0 1,-0.448 1,-1l0,-5l5,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1m-6,13c-6.6275,0 -12,-5.3725 -12,-12c0,-6.6275 5.3725,-12 12,-12c6.627,0 12,5.3725 12,12c0,6.6275 -5.373,12 -12,12'
                fill={colorButton}
              ></path>
            </g>
          </svg>
        </div>
      </div>
      {/* END: addition content*/}

      {/* BEGIN: Chat box */}
      <div className='flex gap-[6px] py-3 h-full w-full items-center '>
        {/* media content */}
        <div id='media-content-container' className='flex gap-[6px] items-center absolute ml-[31px]'>
          {/* image */}
          <div
            id='media-image'
            role='button'
            className='hover:bg-[#f2f2f2] h-7 w-7 flex justify-center items-center rounded-full'
          >
            <svg height='20px' viewBox='0 -1 17 17' width='20px'>
              <g fill='none' fillRule='evenodd'>
                <path
                  d='M2.882 13.13C3.476 4.743 3.773.48 3.773.348L2.195.516c-.7.1-1.478.647-1.478 1.647l1.092 11.419c0 .5.2.9.4 1.3.4.2.7.4.9.4h.4c-.6-.6-.727-.951-.627-2.151z'
                  fill={colorButton}
                ></path>
                <circle cx='8.5' cy='4.5' fill={colorButton} r='1.5'></circle>
                <path
                  d='M14 6.2c-.2-.2-.6-.3-.8-.1l-2.8 2.4c-.2.1-.2.4 0 .6l.6.7c.2.2.2.6-.1.8-.1.1-.2.1-.4.1s-.3-.1-.4-.2L8.3 8.3c-.2-.2-.6-.3-.8-.1l-2.6 2-.4 3.1c0 .5.2 1.6.7 1.7l8.8.6c.2 0 .5 0 .7-.2.2-.2.5-.7.6-.9l.6-5.9L14 6.2z'
                  fill={colorButton}
                ></path>
                <path
                  d='M13.9 15.5l-8.2-.7c-.7-.1-1.3-.8-1.3-1.6l1-11.4C5.5 1 6.2.5 7 .5l8.2.7c.8.1 1.3.8 1.3 1.6l-1 11.4c-.1.8-.8 1.4-1.6 1.3z'
                  stroke={colorButton}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </g>
            </svg>
          </div>
          {/* nhãn dán */}
          <div
            id='media-sticker'
            role='button'
            className='hover:bg-[#f2f2f2] h-7 w-7 flex justify-center items-center rounded-full'
          >
            <svg height='20px' viewBox='0 0 17 16' width='20px' x='0px' y='0px'>
              <g fillRule='evenodd'>
                <circle cx='5.5' cy='5.5' fill='none' r='1'></circle>
                <circle cx='11.5' cy='4.5' fill='none' r='1'></circle>
                <path
                  d='M5.3 9c-.2.1-.4.4-.3.7.4 1.1 1.2 1.9 2.3 2.3h.2c.2 0 .4-.1.5-.3.1-.3 0-.5-.3-.6-.8-.4-1.4-1-1.7-1.8-.1-.2-.4-.4-.7-.3z'
                  fill='none'
                ></path>
                <path
                  d='M10.4 13.1c0 .9-.4 1.6-.9 2.2 4.1-1.1 6.8-5.1 6.5-9.3-.4.6-1 1.1-1.8 1.5-2 1-3.7 3.6-3.8 5.6z'
                  fill={colorButton}
                ></path>
                <path
                  d='M2.5 13.4c.1.8.6 1.6 1.3 2 .5.4 1.2.6 1.8.6h.6l.4-.1c1.6-.4 2.6-1.5 2.7-2.9.1-2.4 2.1-5.4 4.5-6.6 1.3-.7 1.9-1.6 1.9-2.8l-.2-.9c-.1-.8-.6-1.6-1.3-2-.7-.5-1.5-.7-2.4-.5L3.6 1.5C1.9 1.8.7 3.4 1 5.2l1.5 8.2zm9-8.9c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-3.57 6.662c.3.1.4.4.3.6-.1.3-.3.4-.5.4h-.2c-1-.4-1.9-1.3-2.3-2.3-.1-.3.1-.6.3-.7.3-.1.5 0 .6.3.4.8 1 1.4 1.8 1.7zM5.5 5.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z'
                  fill={colorButton}
                  fillRule='nonzero'
                ></path>
              </g>
            </svg>
          </div>
          {/* gif */}
          <div
            id='media-gif'
            role='button'
            className='hover:bg-[#f2f2f2] h-7 w-7 flex justify-center items-center rounded-full'
          >
            <svg height='20px' viewBox='0 0 16 16' width='20px' x='0px' y='0px'>
              <path
                d='M.783 12.705c.4.8 1.017 1.206 1.817 1.606 0 0 1.3.594 2.5.694 1 .1 1.9.1 2.9.1s1.9 0 2.9-.1 1.679-.294 2.479-.694c.8-.4 1.157-.906 1.557-1.706.018 0 .4-1.405.5-2.505.1-1.2.1-3 0-4.3-.1-1.1-.073-1.976-.473-2.676-.4-.8-.863-1.408-1.763-1.808-.6-.3-1.2-.3-2.4-.4-1.8-.1-3.8-.1-5.7 0-1 .1-1.7.1-2.5.5s-1.417 1.1-1.817 1.9c0 0-.4 1.484-.5 2.584-.1 1.2-.1 3 0 4.3.1 1 .2 1.705.5 2.505zm10.498-8.274h2.3c.4 0 .769.196.769.696 0 .5-.247.68-.747.68l-1.793.02.022 1.412 1.252-.02c.4 0 .835.204.835.704s-.442.696-.842.696H11.82l-.045 2.139c0 .4-.194.8-.694.8-.5 0-.7-.3-.7-.8l-.031-5.631c0-.4.43-.696.93-.696zm-3.285.771c0-.5.3-.8.8-.8s.8.3.8.8l-.037 5.579c0 .4-.3.8-.8.8s-.8-.4-.8-.8l.037-5.579zm-3.192-.825c.7 0 1.307.183 1.807.683.3.3.4.7.1 1-.2.4-.7.4-1 .1-.2-.1-.5-.3-.9-.3-1 0-2.011.84-2.011 2.14 0 1.3.795 2.227 1.695 2.227.4 0 .805.073 1.105-.127V8.6c0-.4.3-.8.8-.8s.8.3.8.8v1.8c0 .2.037.071-.063.271-.7.7-1.57.991-2.47.991C2.868 11.662 1.3 10.2 1.3 8s1.704-3.623 3.504-3.623z'
                fill={colorButton}
                fillRule='nonzero'
              ></path>
            </svg>
          </div>
        </div>

        {/* media content */}
        {/* */}
        <div className='flex justify-end w-full'>
          <div
            id='message-text-area'
            className={`h-auto bg-[#f0f2f5] flex items-center transition-all duration-[300ms] rounded-full`}
          >
            <textarea
              ref={textAreaRef}
              onKeyDown={(e) => handleEnterPress(e)}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
              }}
              className={`w-full h-9 pt-[6.5px] px-3 overflow-clip text-[#050505] text-[15px] resize-none bg-[#f0f2f5] placeholder:text-[#050505] placeholder:opacity-60 active:outline-0 focus:outline-0 rounded-full`}
              placeholder='Aa'
            />
            <div>{fastEmojiButton}</div>
          </div>
        </div>
        {/*  */}
      </div>
      {/* END: Chat box */}

      {/* BEGIN: fast emoji button */}
      {message.trim() === '' && (
        <button className={`hover:bg-[#f2f2f2] h-9 w-9 flex justify-center items-center rounded-full`}>
          <svg height='20' viewBox='0 0 16 16' width='20'>
            <path
              d='M16,9.1c0-0.8-0.3-1.1-0.6-1.3c0.2-0.3,0.3-0.7,0.3-1.2c0-1-0.8-1.7-2.1-1.7h-3.1c0.1-0.5,0.2-1.3,0.2-1.8 c0-1.1-0.3-2.4-1.2-3C9.3,0.1,9,0,8.7,0C8.1,0,7.7,0.2,7.6,0.4C7.5,0.5,7.5,0.6,7.5,0.7L7.6,3c0,0.2,0,0.4-0.1,0.5L5.7,6.6 c0,0-0.1,0.1-0.1,0.1l0,0l0,0L5.3,6.8C5.1,7,5,7.2,5,7.4v6.1c0,0.2,0.1,0.4,0.2,0.5c0.1,0.1,1,1,2,1h5.2c0.9,0,1.4-0.3,1.8-0.9 c0.3-0.5,0.2-1,0.1-1.4c0.5-0.2,0.9-0.5,1.1-1.2c0.1-0.4,0-0.8-0.2-1C15.6,10.3,16,9.9,16,9.1z'
              fill={colorButton}
            ></path>
            <path
              d='M3.3,6H0.7C0.3,6,0,6.3,0,6.7v8.5C0,15.7,0.3,16,0.7,16h2.5C3.7,16,4,15.7,4,15.3V6.7C4,6.3,3.7,6,3.3,6z'
              fill={colorButton}
            ></path>
          </svg>
        </button>
      )}
      {message.trim() !== '' && (
        <button
          onClick={sendMessage}
          className={` ${
            message !== '' ? '' : 'hidden'
          } hover:bg-[#f2f2f2] h-9 w-9 flex justify-center items-center rounded-full`}
        >
          <svg height='20px' viewBox='0 0 24 24' width='20px'>
            <title>Nhấn Enter để gửi</title>
            <path
              d='M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z'
              fill={colorButton}
            ></path>
          </svg>
        </button>
      )}

      {/* END: fast emoji button */}

      <div className={`${openEmoji ? '' : 'hidden'} absolute bottom-[70px] right-[50px] z-[99]`}>
        <Picker
          onClickOutside={() => handleClickOutsideEmojiPicker()}
          theme='light'
          locale='vi'
          showReview={true}
          set='facebook'
          previewPosition='none'
          onEmojiSelect={handleEmojiSelect}
        />
      </div>
    </div>
  )
}

export default ChatBox
