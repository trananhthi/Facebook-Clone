import { type AxiosError, isAxiosError, HttpStatusCode } from 'axios'
import { ErrorResponse } from 'src/types/utils.type'
import { AES, enc } from 'crypto-js'

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
