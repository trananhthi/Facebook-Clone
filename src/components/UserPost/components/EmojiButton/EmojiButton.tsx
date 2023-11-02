import { useEffect, useState, useRef } from 'react'
import facebook_icon_9 from 'src/assets/images/facbook_icon_9.png'
import like from 'src/assets/images/emoji_post/like.png'
import love from 'src/assets/images/emoji_post/love.png'
import care from 'src/assets/images/emoji_post/care.png'
import haha from 'src/assets/images/emoji_post/haha.png'
import wow from 'src/assets/images/emoji_post/wow.png'
import sad from 'src/assets/images/emoji_post/sad.png'
import angry from 'src/assets/images/emoji_post/angry.png'

interface Props {
  postRef: React.MutableRefObject<null>
  postHeaderRef: React.MutableRefObject<null>
}

const emojiIcons = [like, love, care, haha, wow, sad, angry]

interface emojiProps {
  isAnimationPopoverEnd: boolean
  icon: string
}

function Emoji({ isAnimationPopoverEnd, icon }: emojiProps) {
  const [isHoverEmoji, setIsHoverEmoji] = useState<boolean>(false)
  const [isAnimationEmojiEnd, setIsAnimationEmojiEnd] = useState(false)
  const emojiRef = useRef(null)
  useEffect(() => {
    if (isAnimationEmojiEnd && !isHoverEmoji && emojiRef.current) {
      const emojiElement = emojiRef.current as HTMLElement
      emojiElement.classList.remove('animate-scale-up-bottom-emoji')
      emojiElement.classList.add('animate-scale-down-bottom-emoji')
    }
  }, [isHoverEmoji])
  return (
    <button
      onMouseOver={() => {
        setIsHoverEmoji(true)
      }}
      onMouseOut={() => {
        setIsHoverEmoji(false)
      }}
      onAnimationEnd={(event: any) => {
        if (event.animationName === 'scale-up-bottom-emoji') {
          setIsAnimationEmojiEnd(true)
        }
        if (event.animationName === 'scale-down-bottom-emoji' && emojiRef.current) {
          const emojiElement = emojiRef.current as HTMLElement
          emojiElement.classList.remove('animate-scale-down-bottom-emoji')
        }
      }}
      className={`rounded-full ${isAnimationPopoverEnd ? '' : 'pointer-events-none'}`}
    >
      <img
        ref={emojiRef}
        src={icon}
        className={`w-10 h-10 ${isHoverEmoji ? 'animate-scale-up-bottom-emoji' : ''}`}
        alt={`Emoji ${icon}`}
      />
    </button>
  )
}

function EmojiButton({ postRef, postHeaderRef }: Props) {
  const popoverRef = useRef(null)
  const [openPopover, setOpenPopover] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isHoveredButton, setIsHoveredButton] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [margin, setMargin] = useState('mt-16')
  const [isAnimationPopoverEnd, setIsAnimationPopoverEnd] = useState(false)

  const triggersButton = {
    onMouseEnter: () => {
      setIsHovered(true)
    },
    onMouseLeave: () => {
      setIsHovered(false)
      setIsHoveredButton(false)
    }
  }

  const triggersPopover = {
    onMouseEnter: () => {
      setIsHovered(true)
      setOpenPopover(true)
    },
    onMouseLeave: () => setIsHovered(false),
    onAnimationStart: (event: any) => {
      if (event.animationName === 'slide-in-bottom-box-emoji') {
        setIsHoveredButton(true)
      }
    },
    onAnimationEnd: (event: any) => {
      if (event.animationName === 'slide-in-bottom-box-emoji') setIsAnimationPopoverEnd(true)
    }
  }

  useEffect(() => {
    if (postRef.current && popoverRef.current && postHeaderRef.current) {
      const parentElement = postRef.current as HTMLElement
      const popoverElement = popoverRef.current as HTMLElement
      const postHeaderElement = postHeaderRef.current as HTMLElement
      parentElement.insertBefore(popoverElement, postHeaderElement)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (postRef.current) {
      const elementRect = (postRef.current as HTMLElement).getBoundingClientRect()
      const headerRect = document.getElementById('home-header')?.getBoundingClientRect()
      const distanceToHeader = (elementRect.top - (headerRect?.bottom as number)) as number
      if (distanceToHeader > -60) {
        setMargin('mt-16')
      } else {
        setMargin('mt-36')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPopover])

  useEffect(() => {
    let hoverTimer: any
    let exitTimer: any
    if (isHovered) {
      hoverTimer = setTimeout(() => {
        setOpenPopover(true)
        setIsFirstLoad(false)
      }, 800)
    }
    if (!isHovered) {
      exitTimer = setTimeout(() => {
        setOpenPopover(false)
        setIsAnimationPopoverEnd(false)
      }, 1200)
    }
    return () => {
      clearTimeout(hoverTimer)
      clearTimeout(exitTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered])
  return (
    <div>
      <div
        ref={popoverRef}
        {...triggersPopover}
        className={`${isFirstLoad ? 'hidden' : ''}
        ${margin}
        ${isHoveredButton ? 'cursor-pointer' : ''} 
        ${openPopover ? 'animate-slide-in-bottom-box-emoji' : 'hidden'}  
        absolute ml-4 z-[999] h-[49px] w-[329px] rounded-full bg-white shadow-[0_0px_1px_1px_rgba(0,0,0,0.09)] flex gap-2 px-1`}
      >
        {emojiIcons.map((icon, index) => (
          <Emoji isAnimationPopoverEnd={isAnimationPopoverEnd} key={index} icon={icon} />
        ))}
      </div>
      <button
        {...triggersButton}
        className={`${
          isHoveredButton ? 'bg-[#f2f2f2]' : 'bg-white'
        } h-8 w-[185px] px-3 py-1 hover:bg-[#f2f2f2] rounded-md flex items-center justify-center gap-2`}
      >
        <div
          className='bg-[length:26px_1536px] bg-[0px_-774px] h-5 w-5 opacity-70'
          style={{ backgroundImage: `url(${facebook_icon_9})` }}
        ></div>
        <span className='text-[15px] text-[#65676B] font-semibold'>Thích</span>
      </button>
    </div>
  )
}

export default EmojiButton
