import styled from 'styled-components'
import { Layout } from 'antd'

import { Z_INDEX_LEVEL_4 } from 'consts'


export const Wrapper = styled((props) => (
  <Layout.Sider {...props}>
    {props.children}
  </Layout.Sider>
))`
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  border-right: 1px solid #f0f0f0;
  z-index: ${Z_INDEX_LEVEL_4};

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }

  .ant-layout-sider-trigger {
    border-right: 1px solid #f0f0f0;
  }

  .anticon {
    font-size: 20px;
  }
`

export const Logo = styled.img`
  margin: 16px 20px;
`

export const AdminName = styled.div`
  padding: 5px 0;
  margin: 0 16px 10px 24px;
  font-size: 18px;
  border: 1px solid #CCC;
  border-left: none;
  border-right: none;
`

export const ListContainer = styled.div`
  overflow: auto;
  max-height: calc(100vh - 172px);
`
