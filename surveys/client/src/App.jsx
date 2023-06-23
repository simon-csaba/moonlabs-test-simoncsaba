
import {useEffect} from 'react'

import { Provider } from 'react-redux'
import { AppRouter } from './component/Router'

import { store } from './store'

function App() {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch({ type: 'LOGIN', payload: JSON.parse(localStorage.getItem('user')) });
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  )
}

export default App
