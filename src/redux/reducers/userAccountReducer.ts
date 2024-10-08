import { Reducer } from 'redux'
import { ActionType } from 'src/types/redux.type'
import { UserInfor } from 'src/types/user.type'

const initialState: Partial<UserInfor> = {
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

const userAccountReducer: Reducer<Partial<UserInfor>> = (state = initialState, action: ActionType) => {
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
