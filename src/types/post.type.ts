import { UserInfor } from './user.type'

export type PostType = {
  id: number
  author: UserInfor
  content: string
  createdAt: Date
  updatedAt: Date
  typePost: string
  image: string
  video: string
  parentPost: PostType
  view: number
  privacy: string
  tag: string
  hashtag: string
  status: string
}

export type CreatePostType = Pick<PostType, 'content' | 'typePost' | 'privacy'>
