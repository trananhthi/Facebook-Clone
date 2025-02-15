import { StatusEnum } from 'src/constants/enum.ts'
import { UserInfo } from './user.type'

export type ReactionType = {
  id: string
  postId: string
  userAccount: UserInfo
  typeReaction: string
  createdAt: Date
}

export type ExpressReactionType = {
  typeReaction: string
  status?: Extract<StatusEnum, StatusEnum.ACT | StatusEnum.DEL>
}
