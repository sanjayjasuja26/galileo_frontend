import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
