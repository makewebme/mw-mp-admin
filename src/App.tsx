import { Suspense, useEffect, useState, useCallback } from 'react'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import ruRU from 'antd/lib/locale/ru_RU'
import 'moment/locale/ru'

import store, { useAppDispatch, useAppSelector } from 'store'
import { SECOND_IN_MS } from 'consts'
import Preloader from 'components/Preloader'
import SideBar from 'features/SideBar'
import { selectIsAppLoading } from 'features/App/selectors'
import { selectIsLogged } from 'features/App/selectors'
import { setIsLogged } from 'features/App/reducer'
import PublicRoutes from 'routes/PublicRoutes'
import PrivateRoutes from 'routes/PrivateRoutes'
import {
  GlobalAppWrapper,
  AppStyles,
  PageArea,
  MainContentWrapper,
  MainContent,
} from './App.styled'


const App = () => {
  const dispatch = useAppDispatch()

  const isAppLoading = useAppSelector(selectIsAppLoading)
  const isLogged = useAppSelector(selectIsLogged)

  const [ isSidebarCollapsed, setIsSidebarCollapsed ] = useState(false)
  const toggleSidebar = useCallback(() => setIsSidebarCollapsed((state) => !state), [])

  // While login state is not calculated - we render null
  const [ isLoggedStateCalculated, setIsLoggedStateCalculated ] = useState<boolean>(false)

  // Redux login state
  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem('MW_MP_TOKEN_ADMIN')!)

    const isLogged = !!tokenData && tokenData.accessCreated + tokenData.accessExpired * SECOND_IN_MS > (new Date().valueOf())

    // For now we calculate login state and know which routes to render - public or private
    // We need this to correctly handle redirects and divide public and private routes
    setIsLoggedStateCalculated(true)

    // If logged after LocalStorage check - set logged state in Redux
    isLogged
      ? dispatch(setIsLogged(true))
      : localStorage.removeItem('MW_MP_TOKEN_ADMIN')
  }, [ dispatch ])


  // Not render any while not check if we really logged or not
  if (!isLoggedStateCalculated) return null


  return (
    <Provider store={store}>
      <ConfigProvider locale={ruRU}>
        <GlobalAppWrapper>
          {/* @ts-ignore */}
          <AppStyles />

          {!isLogged ? (
            <Suspense fallback={<div>Loading...</div>}>
              <PublicRoutes />
            </Suspense>
          ) : (
            <MainContentWrapper>
              <SideBar
                isSidebarCollapsed={isSidebarCollapsed}
                toggleSidebar={toggleSidebar}
              />

              <MainContent isSidebarCollapsed={isSidebarCollapsed}>
                <PageArea>
                  <Suspense fallback={<div>Loading...</div>}>
                    <PrivateRoutes />
                  </Suspense>
                </PageArea>
              </MainContent>
            </MainContentWrapper>
          )}
        </GlobalAppWrapper>

        {isAppLoading && <Preloader />}
      </ConfigProvider>
    </Provider>
  )
}

export default App
