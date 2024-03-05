import { UserInfor } from './user.type'

export type ChatRoomType = {
  id: number
  userId1: number
  userId2: number
  roomName: null | string
  status: string
  createdAt: Date
  receiver: UserInfor
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

export type MessageType = {
  id: number
  roomId: number
  senderId: number
  content: string
  status: string
  createdAt: Date
}
