import styled, { createGlobalStyle } from 'styled-components'

import { SIDEBAR_WIDTH } from 'consts'


export const AppStyles = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    font-family: 'Montserrat';
  }


  /*  */
  /* Ant Design */
  /*  */

  /* Modal */

  .ant-modal-close-x {
    margin-top: 16px;
    height: 20px;
    width: 45px;

    > span {
      display: block;
    }
  }

  /* Ant Form */

  .ant-form .ant-form-item:last-child {
    margin-bottom: 0;
  }

  /* Ant Divider */

  .ant-divider * {
    margin-bottom: 0;
  }

  .ant-divider-horizontal.ant-divider-with-text-left::before {
    width: 0;
  }

  .ant-divider-horizontal.ant-divider-with-text-left::after {
    border-color: #1890ff;
  }

  .ant-divider-inner-text {
    padding-left: 0;
  }

  .ant-card-bordered {
    border-color: #CDCDCD;
  }

  /*  */
  /*Ant Pagination */
  /*  */

  .ant-pagination {
    display: flex;
    justify-content: flex-end;
  }


  /*  */
  /* React Quill */
  /*  */

  .quill {
    background-color: #fff;
  }

  .ql-toolbar {
    background: #fff;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    border-bottom: none!important;
    padding: 12px 15px;

    button {
      line-height: 12px;
    }
  }

  .ql-container {
    overflow: initial;
  }

  .ql-editor {
    min-height: 158px;
    font-size: 14px;
    font-family: 'Montserrat';
  }
`

export const GlobalAppWrapper = styled.div`
  min-height: 100vh;
  min-width: 320px;
  display: flex;
  flex-direction: column;
`

export const MainContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
`

interface T_MainContentProps {
  isSidebarCollapsed: boolean
}
export const MainContent = styled.div<T_MainContentProps>`
  min-height: 100vh;
  width: calc(100% - ${({ isSidebarCollapsed }) => isSidebarCollapsed ? 80 : SIDEBAR_WIDTH}px);
  margin-left: ${({ isSidebarCollapsed }) => isSidebarCollapsed ? 80 : SIDEBAR_WIDTH}px;
`

export const PageArea = styled.div`
  padding: 30px;
  background-color: #fff;
  min-height: 100vh;
`

// Wrapper to adapt tables
export const AdaptiveTableWrapper = styled.div`
  overflow-y: auto;
`
