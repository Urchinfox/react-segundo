import { Provider } from 'react-redux';
import './assets/all.scss';
import AppRouter from './router';
import { store } from './store/messageStore';
function App() {


  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  )
}

export default App
