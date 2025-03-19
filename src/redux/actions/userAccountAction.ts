import { ActionType } from 'src/types/redux.type'
import { UserInfo } from 'src/types/user.type'

export const setUserAccountAction = (data: UserInfo): ActionType => {
  return {
    type: 'userAccount/SET',
    payload: data
  }
}

export const clearUserAccountAction = (): ActionType => {
  return {
    type: 'userAccount/CLEAR'
  }
}
