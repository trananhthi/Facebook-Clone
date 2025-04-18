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
  return isAxiosUnauthorizedError<ErrorResponse>(error) && error.response?.data.key === 'TokenIsExpired'
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

export const convertNewlinesForStorage = (inputData: string): string => {
  return inputData.replace(/\n/g, '\\n')
}

export const restoreNewlinesFromStorage = (savedData: string): string => {
  return savedData.replace(/\\n/g, '\u000A')
}

export function formatTimeAgoOfComment(timestamp: Date) {
  const now = new Date()
  const postDate = new Date(timestamp)

  const timeDiff = now.getTime() - postDate.getTime()
  const seconds = Math.floor(timeDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30) // Assuming a month has 30 days
  const years = Math.floor(days / 365) // Assuming a year has 365 days

  if (years > 0) {
    return `${years} năm trước`
  } else if (months > 0) {
    return `${months} tháng trước`
  } else if (weeks > 0) {
    return `${weeks} tuần trước`
  } else if (days > 0) {
    if (days === 1) {
      return 'Hôm qua'
    } else if (days < 10) {
      return `${days} ngày trước`
    }
  } else if (hours > 0) {
    return `${hours} giờ trước`
  } else if (minutes > 0) {
    return `${minutes} phút trước`
  } else {
    return 'vừa xong'
  }
}

export const mergeFileLists = (fileList1: FileList | null, fileList2: FileList): FileList => {
  // Chuyển FileList thành mảng
  if (fileList1) {
    const array1 = Array.from(fileList1)
    const array2 = Array.from(fileList2)

    // Gộp hai mảng
    const mergedArray = array1.concat(array2)

    // Tạo một đối tượng FileList mới từ mảng gộp
    const dataTransfer = new DataTransfer()

    // Thêm các tệp vào đối tượng DataTransfer
    mergedArray.forEach((file) => {
      dataTransfer.items.add(file)
    })

    // Lấy FileList từ đối tượng DataTransfer
    const mergedFileList = dataTransfer.files

    return mergedFileList
  } else return fileList2
}

// export const isAllWhitespaceString = (str: string) => {
//   // Tạo biểu thức chính quy để kiểm tra
//   const whitespaceRegex = /^\s*$/
//   // Kiểm tra chuỗi có chứa toàn khoảng trắng hay không
//   return whitespaceRegex.test(str)
// }

export function timeElapsedSince(date: Date) {
  const currentTime = new Date()
  const elapsedTime = currentTime.getTime() - new Date(date).getTime() // Thời gian đã trôi qua tính bằng mili giây

  // Chuyển đổi thời gian đã trôi qua từ mili giây sang phút, giờ, ngày, tuần và năm
  const secondsElapsed = Math.floor(elapsedTime / 1000)
  const minutesElapsed = Math.floor(secondsElapsed / 60)
  const hoursElapsed = Math.floor(minutesElapsed / 60)
  const daysElapsed = Math.floor(hoursElapsed / 24)
  const weeksElapsed = Math.floor(daysElapsed / 7)
  const yearsElapsed = Math.floor(weeksElapsed / 52)

  if (yearsElapsed > 0) {
    return `${yearsElapsed} năm`
  } else if (weeksElapsed > 0) {
    return `${weeksElapsed} tuần`
  } else if (daysElapsed > 0) {
    return `${daysElapsed} ngày`
  } else if (hoursElapsed > 0) {
    return `${hoursElapsed} giờ`
  } else if (minutesElapsed > 0) {
    return `${minutesElapsed} phút`
  } else {
    return `1 phút`
  }
}

export function snapImage(video: HTMLVideoElement, url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Chuyển canvas thành blob (nhanh, gọn, nhẹ hơn base64)
    canvas.toBlob(
      (blob) => {
        if (blob && blob.size > 10 * 1024) {
          URL.revokeObjectURL(url)

          // Trả về blob URL (dạng ngắn hơn base64)
          resolve(URL.createObjectURL(blob))
        } else {
          resolve(null)
        }
      },
      'image/jpeg',
      1 // Giảm chất lượng xuống 70% để nhẹ hơn
    )
  })
}

export const getAverageColor = (imgSrc: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = imgSrc

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Cannot get canvas context'))
        return
      }

      // Giảm kích thước canvas để tối ưu hiệu năng
      const scaleFactor = 0.1 // Thu nhỏ ảnh xuống 10%
      canvas.width = img.width * scaleFactor
      canvas.height = img.height * scaleFactor

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data

      let r = 0,
        g = 0,
        b = 0
      const pixelCount = data.length / 4

      for (let i = 0; i < data.length; i += 4) {
        // Bỏ qua các pixel quá sáng hoặc quá tối
        if (data[i] > 250 && data[i + 1] > 250 && data[i + 2] > 250) continue
        if (data[i] < 5 && data[i + 1] < 5 && data[i + 2] < 5) continue

        r += data[i]
        g += data[i + 1]
        b += data[i + 2]
      }

      r = Math.floor(r / pixelCount)
      g = Math.floor(g / pixelCount)
      b = Math.floor(b / pixelCount)

      // Chuyển đổi sang HSL để điều chỉnh độ sáng
      const rgbToHsl = (r: number, g: number, b: number) => {
        ;(r /= 255), (g /= 255), (b /= 255)
        const max = Math.max(r, g, b),
          min = Math.min(r, g, b)
        let h = 0,
          s = 0,
          l = (max + min) / 2

        if (max === min) {
          h = s = 0
        } else {
          const d = max - min
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0)
              break
            case g:
              h = (b - r) / d + 2
              break
            case b:
              h = (r - g) / d + 4
              break
          }
          h /= 6
        }

        return [h, s, l]
      }

      const [h, s, l] = rgbToHsl(r, g, b)

      // Điều chỉnh độ sáng để màu luôn dễ nhìn
      const adjustedL = Math.min(Math.max(l, 0.3), 0.7)

      const hslToRgb = (h: number, s: number, l: number) => {
        let r, g, b
        if (s === 0) {
          r = g = b = l
        } else {
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s
          const p = 2 * l - q
          r = hueToRgb(p, q, h + 1 / 3)
          g = hueToRgb(p, q, h)
          b = hueToRgb(p, q, h - 1 / 3)
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
      }

      const hueToRgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      const [adjustedR, adjustedG, adjustedB] = hslToRgb(h, s, adjustedL)

      resolve(`rgb(${adjustedR},${adjustedG},${adjustedB})`)
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }
  })
}
