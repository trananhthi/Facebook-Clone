import { ChatRoomListType, ChatRoomType, MessageListType } from 'src/types/chat.type'
import http from 'src/utils/http'

const URL_GET_LIST_CHAT_ROOM = 'chat/list-chat-room'
const URL_GET_CHAT_ROOM = 'chat/chat-room'
const URL_GET_CHAT_MESSAGE = 'chat/messages'

const chatApi = {
  getListChatRoom: (userId: string, pageNumber: number = -1, pageSize: number = 0) => {
    return http.get<ChatRoomListType>(`${URL_GET_LIST_CHAT_ROOM}/${userId}?page=${pageNumber}&size=${pageSize}`)
  },
  getChatRoom: (userId1: string, userId2: string) => {
    return http.get<ChatRoomType>(`${URL_GET_CHAT_ROOM}?userId1=${userId1}&userId2=${userId2}`)
  },
  getChatRoomById: (chatRoomId: string, userId: string) => {
    return http.get<ChatRoomType>(`${URL_GET_CHAT_ROOM}/${userId}/${chatRoomId}`)
  },
  getChatMessage: (chatRoomId: string, pageNumber: number = -1, pageSize: number = 0) => {
    return http.get<MessageListType>(`${URL_GET_CHAT_MESSAGE}/${chatRoomId}?page=${pageNumber}&size=${pageSize}`)
  }
}

export default chatApi
