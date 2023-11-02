import { Reducer } from 'redux'
import { ActionType } from 'src/types/redux.type'
import { Token } from 'src/types/auth.type'

const initialState: Partial<Token> = {
  accessToken: undefined,
  refreshToken: undefined
}

const tokenReducer: Reducer<Partial<Token>> = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'token/SET_TOKEN':
      return {
        ...state,
        ...action.payload
      }
    case 'token/SET_ACCESSTOKEN':
      return {
        ...state,
        ...action.payload
      }
    case 'token/SET_REFRESHTOKEN':
      return {
        ...state,
        ...action.payload
      }
    case 'token/CLEAR':
      return {
        ...state,
        accessToken: undefined,
        refreshToken: undefined
      }
    default:
      return state
  }
}

export default tokenReducer
