import { Reducer } from 'redux'
import { ActionType } from 'src/types/redux.type'
import { UserInfor } from 'src/types/user.type'

const initialState: Partial<UserInfor> = {
  email: undefined,
  lastName: undefined,
  firstName: undefined,
  phone: undefined,
  birthday: undefined,
  gender: undefined,
  avatar: undefined,
  timeCreated: undefined
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
        email: undefined,
        lastName: undefined,
        firstName: undefined,
        phone: undefined,
        birthday: undefined,
        gender: undefined,
        avatar: undefined,
        timeCreated: undefined
      }
    default:
      return state
  }
}

export default userAccountReducer
