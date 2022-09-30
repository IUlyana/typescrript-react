import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import { useAppSelector } from './hook';


function App() {
  const {isPortable} = useAppSelector(state => state.auth);

  return (
    <HashRouter>
    <Routes>
      <Route path="/" element={<Main />} /> 
    </Routes>
  </HashRouter>
  );
}

export default App;
