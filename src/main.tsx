import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import AppRoutes from './routes/Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppRoutes/>
  </Provider>,
)
