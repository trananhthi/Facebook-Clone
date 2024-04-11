import { UserInfor } from './user.type'
import { PageableType } from './utils.type'

export type ChatRoomType = {
  id: number
  userId1: number
  userId2: number
  roomName: null | string
  status: string
  createdAt: Date
  receiver: UserInfor
  lastMessageTime: Date
  lastMessage: ChatMessageType
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
  id?: number
  roomId: number
  senderId: number
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
