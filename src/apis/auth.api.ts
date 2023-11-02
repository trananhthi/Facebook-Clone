import http from 'src/utils/http'
import { LoginResponse } from 'src/types/auth.type'
import { UserInfor, User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'

export const URL_SIGNUP = 'authenticate/signup'
export const URL_SIGNIN = 'authenticate/signin'
export const URL_REFRESH_TOKEN = 'refreshtoken'
const URL_CONFIRM = 'authenticate/confirm'
const URL_RESEND = 'authenticate/resend'

const authApi = {
  signUp: (body: User) => {
    return http.post<SuccessResponse>(URL_SIGNUP, body)
  },
  signIn: (body: Pick<User, 'email' | 'password'>) => {
    return http.post<LoginResponse>(URL_SIGNIN, body)
  },
  getUserInfor: () => {
    return http.get<UserInfor>('user/infor')
  },
  confirmAccount: (body: { email: string; code: string }) => {
    return http.post<SuccessResponse>(URL_CONFIRM, body)
  },
  resendConfirmCode: (email: string) => {
    return http.post<SuccessResponse>(`${URL_RESEND}` + '?email=' + email)
  }
}

export default authApi
