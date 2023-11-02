import { SuccessResponseData } from './utils.type'

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  message?: string
  key?: string
}

export type Token = Pick<LoginResponse, 'accessToken' | 'refreshToken'>

export type RefreshTokenResponse = SuccessResponseData<{
  access_token: {
    token: string
    created: string
    expiry: number
  }
}>
