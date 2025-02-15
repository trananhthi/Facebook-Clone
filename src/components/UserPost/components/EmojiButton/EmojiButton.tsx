import React, { useEffect, useState, useRef } from 'react'
import { emojiList } from 'src/constants/list'
import { Tooltip } from '@material-tailwind/react'
import { EmojiType } from 'src/types/utils.type'
import { ExpressReactionType, ReactionType } from 'src/types/reaction.type'
import { UserInfo } from 'src/types/user.type'
import { isLikedPost } from 'src/utils/utils'
import { useMutation } from '@tanstack/react-query'
import reactionApi from 'src/apis/reaction.api'

/* import images */
import facebook_icon_9 from 'src/assets/images/icon-pack/facbook_icon_9.png'
import { StatusEnum } from 'src/constants/enum.ts'

interface Props {
  interactFieldRef: React.MutableRefObject<null>
  reactionList: ReactionType[]
  userAccount: Partial<UserInfo>
  postId: string
  refetch: () => void
}

interface emojiProps {
  isAnimationPopoverEnd: boolean
  emoji: EmojiType
  emojiChoosen: EmojiType | null
  setEmojiChoosen: React.Dispatch<React.SetStateAction<EmojiType | null>>
  setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>
  setIsAnimationPopoverEnd: React.Dispatch<React.SetStateAction<boolean>>
}

function Emoji({
  isAnimationPopoverEnd,
  emoji,
  emojiChoosen,
  setEmojiChoosen,
  setOpenPopover,
  setIsAnimationPopoverEnd
}: emojiProps) {
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

  const hanldeClickChooseEmoji = () => {
    setOpenPopover(false)
    setIsAnimationPopoverEnd(false)
    if (emoji === emojiChoosen) {
      setEmojiChoosen(null)
    } else {
      setEmojiChoosen(emoji)
    }
  }
  return (
    <Tooltip
      content={emoji.title}
      offset={13}
      className='text-white text-[11px] bg-[rgba(0,0,0,0.8)] px-1 py-[2px] rounded-full font-semibold'
    >
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <button
        onClick={hanldeClickChooseEmoji}
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
          src={emoji.icon}
          className={`w-10 h-10 ${isHoverEmoji ? 'animate-scale-up-bottom-emoji' : ''}`}
          alt={`Emoji ${emoji.icon}`}
        />
      </button>
    </Tooltip>
  )
}

function EmojiButton({ interactFieldRef, reactionList, userAccount, postId, refetch }: Props) {
  const popoverRef = useRef(null)
  const [emojiChoosen, setEmojiChoosen] = useState<EmojiType | null>(
    isLikedPost(reactionList, userAccount.email as string)
  )
  const [openPopover, setOpenPopover] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isHoveredButton, setIsHoveredButton] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [margin, setMargin] = useState('mt-16')
  const [isAnimationPopoverEnd, setIsAnimationPopoverEnd] = useState(false)

  const expressReactionMutation = useMutation({
    mutationFn: (body: ExpressReactionType) => reactionApi.expressReaction(body, postId),
    onSuccess: () => {
      refetch()
    },
    onError: (err) => console.log(err)
  })

  const triggersButton = {
    onMouseEnter: () => {
      setIsHovered(true)
    },
    onMouseLeave: () => {
      setIsHovered(false)
      setIsHoveredButton(false)
    },
    onClick: () => {
      if (emojiChoosen) {
        setOpenPopover(false)
        setEmojiChoosen(null)
      } else {
        setOpenPopover(false)
        setEmojiChoosen(emojiList[0])
      }
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
    if (interactFieldRef.current) {
      const interactFieldRect = (interactFieldRef.current as HTMLElement).getBoundingClientRect()
      const headerRect = document.getElementById('home-header')?.getBoundingClientRect()
      const headerDetailPostElement = document.getElementById('header-detail-post')
      if (headerDetailPostElement) {
        const distanceToHeader = (interactFieldRect.top -
          (headerDetailPostElement.getBoundingClientRect().bottom as number)) as number
        if (distanceToHeader > 55) {
          setMargin('-mt-[50px]')
        } else {
          setMargin('mt-[30px]')
        }
      } else {
        const distanceToHeader = (interactFieldRect.top - (headerRect?.bottom as number)) as number
        if (distanceToHeader > 55) {
          setMargin('-mt-[50px]')
        } else {
          setMargin('mt-[30px]')
        }
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

  useEffect(() => {
    setEmojiChoosen(isLikedPost(reactionList, userAccount.email as string))
  }, [reactionList])

  useEffect(() => {
    if (!reactionList || userAccount.email === undefined) return

    const isLiked = isLikedPost(reactionList, userAccount.email as string)

    if (emojiChoosen && isLiked !== emojiChoosen) {
      // Nếu người dùng chọn một emoji mới khác với cảm xúc trước đó
      expressReactionMutation.mutate({ typeReaction: emojiChoosen.value as string })
    } else if (!emojiChoosen && isLiked) {
      // Nếu người dùng bỏ thích và trước đó đã có cảm xúc
      expressReactionMutation.mutate({ typeReaction: 'like', status: StatusEnum.DEL })
    }
  }, [emojiChoosen, reactionList, userAccount.email])

  return (
    <div>
      <div
        ref={popoverRef}
        {...triggersPopover}
        className={`${isFirstLoad ? 'hidden' : ''}
        ${margin}
        ${isHoveredButton ? 'cursor-pointer' : ''} 
        ${openPopover ? 'animate-slide-in-bottom-box-emoji' : 'hidden'}  
        absolute z-[999] h-[49px] w-[329px] rounded-full bg-white shadow-[0_0px_1px_1px_rgba(0,0,0,0.09)] flex gap-2 px-1`}
      >
        {emojiList.map((emoji, index) => (
          <Emoji
            isAnimationPopoverEnd={isAnimationPopoverEnd}
            key={index}
            emoji={emoji}
            setEmojiChoosen={setEmojiChoosen}
            setOpenPopover={setOpenPopover}
            setIsAnimationPopoverEnd={setIsAnimationPopoverEnd}
            emojiChoosen={emojiChoosen}
          />
        ))}
      </div>
      <button
        {...triggersButton}
        className={`${
          isHoveredButton ? 'bg-[#f2f2f2]' : 'bg-white'
        } h-8 w-full px-3 py-1 hover:bg-[#f2f2f2] rounded-md flex items-center justify-center gap-2`}
      >
        {emojiChoosen && emojiChoosen.value !== 'like' ? (
          <img src={emojiChoosen.icon} alt={emojiChoosen.value} className='h-5 w-5' />
        ) : (
          <div
            className={`bg-[length:26px_1536px] ${
              emojiChoosen ? 'bg-[0px_-709px]' : 'bg-[0px_-774px] opacity-70'
            }  h-5 w-5 `}
            style={{ backgroundImage: `url(${facebook_icon_9})` }}
          ></div>
        )}
        <span style={{ color: emojiChoosen ? emojiChoosen.color : '#65676B' }} className={`text-[15px] font-semibold`}>
          {emojiChoosen ? emojiChoosen.title : 'Thích'}
        </span>
      </button>
    </div>
  )
}

export default EmojiButton
