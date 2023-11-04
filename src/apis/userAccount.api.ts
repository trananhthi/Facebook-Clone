import http from 'src/utils/http'
import { UserInfor } from 'src/types/user.type'

const URL_GET_USER_INFOR = 'user/infor'
const URL_UPDATE_PRIVACY_DEFAULT = 'user/update/privacy-default'

const userAccountApi = {
  getUserInfor: () => {
    return http.get<UserInfor>(URL_GET_USER_INFOR)
  },
  updatePrivacyDefault: (body: { privacyDefault: string }) => {
    return http.patch<UserInfor>(URL_UPDATE_PRIVACY_DEFAULT, body)
  }
}

export default userAccountApi
