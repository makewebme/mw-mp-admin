import { lazy, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { useAppDispatch } from 'store'
import history from 'store/history'
import { get } from 'helpers/request'
import { setIsLogged } from 'features/App/reducer'
import { setAdminData } from 'features/AdminData/reducer'
import { checkPathMatch, paths, pathsPublic } from './helpers'

const HomePage = lazy(() => import('pages/HomePage'))


const PrivateRoutes: React.FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const adminId = JSON.parse(localStorage.getItem('MW_MP_TOKEN_ADMIN')!).adminId

    if (!adminId) {
      history.push(paths.logout)
      return
    }

    get(`/admins/${adminId}`)
      .then((res) => dispatch(setAdminData(res.data)))
  }, [ dispatch ])


  const Logout = () => {
    localStorage.removeItem('MW_MP_TOKEN_ADMIN')
    dispatch(setIsLogged(false))
    return <Navigate to={paths.login} />
  }


  const isMatch = checkPathMatch(location.pathname, paths)


  if (checkPathMatch(location.pathname, pathsPublic)) {
    return <Navigate to={paths.home} />
  }


  return (
    <Routes>
      <Route path={paths.home} element={<HomePage />} />

      <Route path={paths.logout} element={<Logout />} />

      <Route path='*' element={!isMatch ? <Navigate to={paths.home} /> : null} />
    </Routes>
  )
}

export default PrivateRoutes
