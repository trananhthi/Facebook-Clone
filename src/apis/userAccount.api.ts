import http from 'src/utils/http'
import { UserInfo } from 'src/types/user.type'

const URL_GET_USER_INFOR = 'user/infor'
const URL_UPDATE_PRIVACY_DEFAULT = 'user/update/privacy-default'
const URL_SEARCH_USER = 'user/search'

const userAccountApi = {
  getUserInfor: () => {
    return http.get<UserInfo>(URL_GET_USER_INFOR)
  },
  updatePrivacyDefault: (body: { privacyDefault: string }) => {
    return http.patch<UserInfo>(URL_UPDATE_PRIVACY_DEFAULT, body)
  },
  searchUsersByName: (keyword: string) => {
    return http.get<UserInfo[]>(`${URL_SEARCH_USER}?keyword=${keyword}`)
  }
}

export default userAccountApi
