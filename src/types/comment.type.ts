import { UserInfor } from './user.type'

export type CommentType = {
  id: number
  postId: number
  userAccount: UserInfor
  content: string
  createdAt: Date
  updatedAt: Date
}

export type Top2LatestCommentsType = {
  commentList: CommentType[]
  total: number
}
