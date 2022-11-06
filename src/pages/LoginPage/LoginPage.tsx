import { useState, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Input, Button, Form, notification } from 'antd'

import { useAppDispatch, useAppSelector } from 'store'
import { paths } from 'routes/helpers'
import { post } from 'helpers/request'
import { setIsAppLoading } from 'features/App/reducer'
import { selectIsAppLoading } from 'features/App/selectors'
import { setIsLogged } from 'features/App/reducer'
import { I_UniRes } from 'types'
import {
  PageWrapper,
  BG,
  FormWrapper,
  Heading,
  SubHeading,
  ForgotPassword,
} from './styled'


const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAppLoading = useAppSelector(selectIsAppLoading)

  // Text inputs
  const [ fields, setFields ] = useState({
    loginOrEmail: process.env.REACT_APP_DEV_LOGIN || '',
    password: process.env.REACT_APP_DEV_PASSWORD || '',
  })

  // Change handler for all inputs
  const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }, [ fields ])

  //
  // Log in user
  //

  const isLoginDisabled = useCallback(() => {
    return (
      !fields['loginOrEmail'] ||
      !fields['password']
    )
  }, [ fields ])

  const handleLogin = useCallback(() => {
    dispatch(setIsAppLoading(true))

    post('/admins/login', {
      loginOrEmail: fields['loginOrEmail'],
      password: fields['password'],
    })
      .then(({ status, data }: I_UniRes) => {
        if (status === 'error') {
          notification.error({ message: 'Неверный логин или пароль. Повторите попытку.' })
          dispatch(setIsAppLoading(false))
          return
        }

        localStorage.setItem(
          'MW_MP_TOKEN_ADMIN',
          JSON.stringify({
            ...data,
            accessCreated: new Date().valueOf()
          })
        )

        dispatch(setIsLogged(true))
        dispatch(setIsAppLoading(false))
      })
      .catch(() => {
        notification.error({ message: 'Неизвестная ошибка. Повторите попытку позднее.' })
        dispatch(setIsAppLoading(false))
      })
  }, [ dispatch, fields ])

  // To use enter for login
  const handleFormKeyPress = useCallback(({ code }: React.KeyboardEvent<HTMLFormElement>) => {
    if (([ 'Enter', 'NumpadEnter' ].includes(code)) && !isLoginDisabled()) {
      handleLogin()
    }
  }, [ handleLogin, isLoginDisabled ])


  return (
    <PageWrapper>
      <Helmet>
        <title>Войти в админ-панель - MW Marketplace Admin</title>
      </Helmet>

      <BG />

      <FormWrapper>
        <Heading>Админ-панель MW Marketplace</Heading>
        <SubHeading>Пожалуйста, войдите в свой аккаунт</SubHeading>

        <Form onKeyPress={handleFormKeyPress} layout='vertical'>
          <Form.Item label='Логин или E-mail'>
            <Input
              name='loginOrEmail'
              value={fields['loginOrEmail']}
              onChange={onChangeInput}
            />
          </Form.Item>

          <Form.Item label='Пароль'>
            <Input
              name='password'
              value={fields['password']}
              onChange={onChangeInput}
              type='password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              onClick={handleLogin}
              disabled={isLoginDisabled() || isAppLoading}
            >
              Войти в кабинет
            </Button>
          </Form.Item>
        </Form>

        <ForgotPassword>
          <Link to={paths.login}>
            Забыли пароль?
          </Link>
        </ForgotPassword>
      </FormWrapper>
    </PageWrapper>
  )
}

export default LoginPage
