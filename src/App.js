import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import AppRoutes from './routes';

function App() {
  
  return (
    <Router>   
      <AppRoutes />
      <ToastContainer />
    </Router>   
  );
}

export default App;
