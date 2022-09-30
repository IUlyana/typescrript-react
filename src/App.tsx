import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';


function App() {
  return (
    <HashRouter>
    <Routes>
      <Route path="/" element={<Main />} /> 
    </Routes>
  </HashRouter>
  );
}

export default App;
