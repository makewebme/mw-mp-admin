import { createSlice } from '@reduxjs/toolkit'
import type { CaseReducer, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { T_AppThunk } from 'store/types'
import { T_AppStore } from './types'


const initialState: T_AppStore = {
  isLogged: false,
  isAppLoading: false,
}


export const isLoggedReducer: CaseReducer<T_AppStore, PayloadAction<boolean>> = (state, action) => {
  state.isLogged = action.payload
}

export const isAppLoadingReducer: CaseReducer<T_AppStore, PayloadAction<boolean>> = (state, action) => {
  state.isAppLoading = action.payload
}


const appSlice = createSlice({
  name: 'APP',
  initialState,
  reducers: {
    isLogged: isLoggedReducer,
    isAppLoading: isAppLoadingReducer,
  },
})

const {
  isLogged: setIsLoggedAction,
  isAppLoading: setIsAppLoadingAction,
} = appSlice.actions


export const setIsLogged = (isLogged: boolean): T_AppThunk => (dispatch: Dispatch) => {
  dispatch(setIsLoggedAction(isLogged))
}

export const setIsAppLoading = (isAppLoading: boolean): T_AppThunk => (dispatch: Dispatch) => {
  dispatch(setIsAppLoadingAction(isAppLoading))
}


export default appSlice.reducer
