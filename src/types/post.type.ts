import { PostMediaType } from './media.type.ts'
import { UserInfo } from './user.type'
import { PageableType } from './utils.type'
import { PrivacyEnum } from 'src/constants/enum.ts'

export type PostType = {
  id: string
  author: UserInfo
  content: string
  createdAt: Date
  updatedAt: Date
  typePost: string
  mediaList: PostMediaType[]
  parentPost: PostType
  view: number
  privacy: PrivacyEnum
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
