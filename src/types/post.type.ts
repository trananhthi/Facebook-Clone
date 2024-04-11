import { PostImageType } from './image.type'
import { UserInfor } from './user.type'
import { PageableType } from './utils.type'

export type PostType = {
  id: number
  author: UserInfor
  content: string
  createdAt: Date
  updatedAt: Date
  typePost: string
  image: PostImageType[]
  parentPost: PostType
  view: number
  privacy: string
  tag: string
  hashtag: string
}

export type PostListType = {
  content: PostType[]
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

export type CreatePostType = Pick<PostType, 'content' | 'typePost' | 'privacy'>
