import { UserInfo } from './user.type'
import { PageableType } from './utils.type'

export type ChatRoomType = {
  id: string
  userId1: string
  userId2: string
  roomName: null | string
  status: string
  createdAt: Date
  receiver: UserInfo
  lastMessageTime: Date
  lastMessage: LastMessageType
}

export type ChatRoomListType = {
  content: ChatRoomType[]
  pageable: string
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  numberOfElements: number
  first: boolean
  empty: boolean
}

export type ChatMessageType = {
  id?: string
  roomId: string
  senderId: string
  content: string
  status?: string
  createdAt?: Date
}

export type LastMessageType = {
  id: string
  roomId: string
  sender: UserInfo
  content: string
  status: string
  createdAt: Date
}

export type MessageListType = {
  content: ChatMessageType[]
  pageable: string | PageableType
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  numberOfElements: number
  first: boolean
  empty: boolean
}

export type TypingStatusType = {
  chatRoomId: string
  userId: string
  isTyping: boolean
}
