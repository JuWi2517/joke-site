import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import HomePage from './HomePage';

function App() {


  return (
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage/>} />
            </Routes>
          </Router>
        </div>
  )
}

export default App
