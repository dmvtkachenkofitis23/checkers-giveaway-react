import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import StartMenu from './pages/StartMenu/StartMenu';
import GamePage from './pages/GamePage/GamePage';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<StartMenu />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;