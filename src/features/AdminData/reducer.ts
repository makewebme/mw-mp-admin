import {
  createReducer,
  createAction,
  PayloadAction as T_PayloadAction,
  Dispatch as Dispatch,
} from '@reduxjs/toolkit'

import { T_AppThunk } from 'store/types'
import { T_AdminData } from './types'

const initialState: T_AdminData = {
  id: null,
  nameFirst: null,
  nameLast: null,
  login: null,
  email: null,
  role: null,
}

export const initialAdminData = initialState


const setAdminDataAction = createAction<T_AdminData>('USER_DATA/set')

const adminDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAdminDataAction, (_, action: T_PayloadAction<T_AdminData>) => action.payload)
})


export const setAdminData = (adminData: T_AdminData): T_AppThunk => (dispatch: Dispatch) => {
  dispatch(setAdminDataAction(adminData))
}


export default adminDataReducer
