import { Wrapper } from './styled'
import { ReactComponent as AnimatedPreloader } from './img/preloader.svg'


const Preloader: React.FC = () => (
  <Wrapper>
    <AnimatedPreloader />
  </Wrapper>
)

export default Preloader
