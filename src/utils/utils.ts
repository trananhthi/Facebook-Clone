import { type AxiosError, isAxiosError, HttpStatusCode } from 'axios'
import { EmojiType, ErrorResponse } from 'src/types/utils.type'
import { AES, enc } from 'crypto-js'
import { ReactionType } from 'src/types/reaction.type'
import { emojiList } from 'src/constants/list'

export function isAxiosBadRequestError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
}

export function isAxiosInternalServerError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.InternalServerError
}

export function isAxiosUnauthorizedError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosUnauthorizedError<ErrorResponse>(error) && error.response?.data.errorKey === 'TokenIsExpired'
}

export const formatDate = (date: string) => {
  const _date = new Date(date)
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
  const formattedDate = _date.toLocaleDateString('en-GB', options)

  return formattedDate
}

export function formatDateTime(date: Date) {
  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

  const dateTime = new Date(date)
  const dayOfWeek = daysOfWeek[dateTime.getDay()] // Lấy tên thứ.

  const day = dateTime.getDate()
  const month = dateTime.getMonth() + 1 // Tháng trong JavaScript bắt đầu từ 0, cộng thêm 1.
  const year = dateTime.getFullYear()
  const hour = dateTime.getHours()
  const minute = dateTime.getMinutes()

  const formattedDateTime = `${dayOfWeek}, ${day} Tháng ${month}, ${year} lúc ${hour}:${
    minute < 10 ? '0' : ''
  }${minute}`

  return formattedDateTime
}

export const formatNumber = (num: number) => {
  return Intl.NumberFormat('en-DE').format(num)
}

export function secondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

export function decodeBase64(encodedString: string): string {
  try {
    const decodedString = atob(encodedString)
    return decodedString
  } catch (error) {
    console.error('Error decoding Base64:', error)
    return '' // Trả về chuỗi trống nếu có lỗi
  }
}

export function formatTimeAgo(timestamp: Date) {
  const now = new Date()
  const postDate = new Date(timestamp)

  const timeDiff = now.getTime() - postDate.getTime()
  const seconds = Math.floor(timeDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    if (days < 10) return `${days} ngày trước`
    else
      return `${postDate.getDate()} Tháng ${
        postDate.getMonth() + 1
      }, ${postDate.getFullYear()} lúc ${postDate.getHours()}:${
        postDate.getMinutes() < 10 ? '0' : ''
      }${postDate.getMinutes()}`
  } else if (hours > 0) {
    return `${hours} giờ trước`
  } else if (minutes > 0) {
    return `${minutes} phút trước`
  } else {
    return 'vừa xong'
  }
}

export const formatNumberToSocialStyle = (value: number) => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
}

// Hàm mã hóa dữ liệu
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encryptData = (data: any) => {
  const ciphertext = AES.encrypt(JSON.stringify(data), import.meta.env.VITE_SECRET_KEY as string)
  return ciphertext.toString()
}

// Hàm giải mã dữ liệu
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decryptData = (encryptedData: any) => {
  const bytes = AES.decrypt(encryptedData, import.meta.env.VITE_SECRET_KEY as string)
  const decryptedData = JSON.parse(bytes.toString(enc.Utf8))
  return decryptedData
}

export const isLikedPost = (reactionList: ReactionType[], email: string): EmojiType | null => {
  const reaction = reactionList.find((reaction) => reaction.userAccount.email === email)
  if (reaction) return emojiList.find((emoji) => emoji.value === reaction.typeReaction) as EmojiType
  else return null
}

export const getTop3Emoji = (emojiList: ReactionType[]): { type: string; count: number }[] => {
  const countEmojiOccurrences = (emojiList: ReactionType[]) => {
    const emojiCount: Record<string, number> = {}

    emojiList.forEach((emoji) => {
      const type = emoji.typeReaction
      emojiCount[type] = (emojiCount[type] || 0) + 1
    })

    return Object.entries(emojiCount).map(([type, count]) => ({ type, count }))
  }

  const emojiOccurrences = countEmojiOccurrences(emojiList)

  // Sắp xếp mảng theo số lượng giảm dần
  const sortedEmojiArray = emojiOccurrences.sort((a, b) => b.count - a.count)

  // Lấy ba loại emoji nhiều nhất
  const top3Emojis = sortedEmojiArray.slice(0, 3)
  return top3Emojis
}
