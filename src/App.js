import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import AppRoutes from './routes';
import store from './redux/store';

function App() {
  
  return (
    <Provider store={store}>
      <Router>   
        <AppRoutes />
        <ToastContainer />
      </Router>   
    </Provider>
  );
}

export default App;
