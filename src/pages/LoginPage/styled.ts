import styled from 'styled-components'

import colors from 'consts/colors'
import bg from './img/bg.jpg'


export const PageWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
`

export const BG = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  width: 100%;
`

export const FormWrapper = styled.div`
  background-color: #fff;
  padding: 30px 40px;
  width: 520px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    width: 154px;
    margin-bottom: 35px;
    margin-left: auto;
    margin-right: auto;
  }
`

export const Heading = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 29px;
  margin-bottom: 5px;
`

export const SubHeading = styled.p`
  font-size: 14px;
  margin-bottom: 25px;
`

export const ForgotPassword = styled.p`
  text-decoration: none;
  font-size: 12px;
  color: ${colors.purple};
  margin-top: 20px;
`
