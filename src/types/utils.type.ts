export type ErrorResponse = {
  statusCode: number
  errorKey: string
  message: string
  date: string
}

export type SuccessResponseData<Data> = {
  data: Data
}

export type SuccessResponse = {
  message: string
  key?: string
}

export type ToUndefined<T> = {
  [P in keyof T]?: ToUndefined<T[P]>
}

export type PrivacyType = {
  icon: string
  value: string
  title?: string
  description?: string
}

export type EmojiType = {
  icon: string
  value: string
  title?: string
  color?: string
}

export type PageableType = {
  pageNumber: number
  pageSize: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  offset: number
  unpaged: boolean
  paged: boolean
}
