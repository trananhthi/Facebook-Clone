import { UserInfor } from './user.type'

export type ReactionType = {
  id: number
  postId: number
  userAccount: UserInfor
  typeReaction: string
  createdAt: Date
}

export type ExpressReactionType = {
  typeReaction: string
  status?: string
}
