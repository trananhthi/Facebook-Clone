import { Reducer } from 'redux'
import { ActionType } from 'src/types/redux.type'
import { UserInfo } from 'src/types/user.type'

const initialState: Partial<UserInfo> = {
  id: undefined,
  email: undefined,
  lastName: undefined,
  firstName: undefined,
  phone: undefined,
  birthday: undefined,
  gender: undefined,
  avatar: undefined,
  timeCreated: undefined,
  privacyDefault: undefined
}

const userAccountReducer: Reducer<Partial<UserInfo>> = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'userAccount/SET':
      return {
        ...state,
        ...action.payload
      }
    case 'userAccount/CLEAR':
      return {
        ...state,
        id: undefined,
        email: undefined,
        lastName: undefined,
        firstName: undefined,
        phone: undefined,
        birthday: undefined,
        gender: undefined,
        avatar: undefined,
        timeCreated: undefined,
        privacyDefault: undefined
      }
    default:
      return state
  }
}

export default userAccountReducer
