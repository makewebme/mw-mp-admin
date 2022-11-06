import styled from 'styled-components'

import { Z_INDEX_LEVEL_5 } from 'consts'


export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: ${Z_INDEX_LEVEL_5};
  background-color: rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`
