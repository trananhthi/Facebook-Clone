import { ActionType } from 'src/types/redux.type'
import { UserInfor } from 'src/types/user.type'

export const setUserAccountAction = (data: UserInfor): ActionType => {
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
