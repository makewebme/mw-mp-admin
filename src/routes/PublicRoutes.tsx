import { lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { checkPathMatch, paths, pathsPrivate } from './helpers'

const LoginPage = lazy(() => import('pages/LoginPage'))


const PublicRoutes: React.FC = () => {
  const location = useLocation()

  const isMatch = checkPathMatch(location.pathname, paths)


  if (checkPathMatch(location.pathname, pathsPrivate)) {
    return <Navigate to={paths.login} />
  }


  return (
    <Routes>
      <Route path={paths.login} element={<LoginPage />} />
      <Route path='*' element={!isMatch ? <Navigate to={paths.login} /> : null} />
    </Routes>
  )
}

export default PublicRoutes
