import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'

import App from 'App'
import store from 'store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.REACT_APP_ENV ==='production' ? '/admin' : ''}>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
)
