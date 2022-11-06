import { T_RootState } from 'store/types'

export const selectAdminData = (state: T_RootState) => state.adminData
export const selectAdminRole = (state: T_RootState) => state.adminData.role
