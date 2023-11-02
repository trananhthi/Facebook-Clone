import { ActionType } from 'src/types/redux.type'
import { tempAccountState } from '../reducers/tempAccountReducer'

export const updateTempAccountAction = (data: tempAccountState): ActionType => {
  return {
    type: 'tempAccount/UPDATE',
    payload: data
  }
}

export const clearTempAccountAction = (): ActionType => {
  return {
    type: 'tempAccount/CLEAR'
  }
}

export const markTempAccountConfirmAction = (data: { isConfirmed: boolean }): ActionType => {
  return {
    type: 'tempAccount/MARK_CONFIRM',
    payload: data
  }
}
