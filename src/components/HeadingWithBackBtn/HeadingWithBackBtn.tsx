import { Link } from 'react-router-dom'
import { Button } from 'antd'

import { Wrapper } from './styled'


const HeadingWithBackBtn: React.FC<any> = (props) => (
  <Wrapper>
    <Link to={props.backLink}>
      <Button type='ghost'>
        &laquo;
      </Button>
    </Link>

    {props.children}
  </Wrapper>
)

export default HeadingWithBackBtn
