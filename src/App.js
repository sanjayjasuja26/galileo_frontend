import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import AppRoutes from './routes';
import { store, persistor } from './redux/store';

function App() {
  
  return (
    <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <Router>   
        <AppRoutes />
        <ToastContainer />
      </Router>   
    </PersistGate>
    </Provider>
  );
}

export default App;
