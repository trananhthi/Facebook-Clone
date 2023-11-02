import { Reducer } from 'redux'
import { ActionType } from 'src/types/redux.type'

export interface tempAccountState {
  email: string | null
  password: string | null
  isConfirmed: boolean | null
}

const initialState: tempAccountState = {
  email: null,
  password: null,
  isConfirmed: null
}

const tempAccountReducer: Reducer<tempAccountState> = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'tempAccount/UPDATE':
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        isConfirmed: action.payload.isConfirmed
      }
    case 'tempAccount/CLEAR':
      return {
        ...state,
        email: null,
        password: null,
        isConfirmed: null
      }
    case 'tempAccount/MARK_CONFIRM':
      return {
        ...state,
        isConfirmed: action.payload.isConfirmed
      }
    default:
      return state
  }
}

export default tempAccountReducer
