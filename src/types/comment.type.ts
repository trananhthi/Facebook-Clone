import { UserInfo } from './user.type'
import { PageableType } from './utils.type'

export type CommentType = {
  id: string
  postId: string
  userAccount: UserInfo
  content: string
  createdAt: Date
  updatedAt: Date
}

export type CommentListType = {
  content: CommentType[]
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

export type Top2LatestCommentsType = {
  commentList: CommentType[]
  total: number
}
