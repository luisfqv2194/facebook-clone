import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/icons/icons.css'
// import { PersistGate } from 'redux-persist/integration/react'
// import DotLoader from 'react-spinners/ClipLoader'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate
        loading={
          <DotLoader
            color={'#1876f2'}
            loading={true}
            size={30}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        }
        persistor={persistor}
      > */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
)
