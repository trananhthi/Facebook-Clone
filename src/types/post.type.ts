import { UserInfor } from './user.type'
import { PostImageType } from './utils.type'

export type PostType = {
  id: number
  author: UserInfor
  content: string
  createdAt: Date
  updatedAt: Date
  typePost: string
  image: PostImageType[]
  video: string
  parentPost: PostType
  view: number
  privacy: string
  tag: string
  hashtag: string
}

export type CreatePostType = Pick<PostType, 'content' | 'typePost' | 'privacy'>
