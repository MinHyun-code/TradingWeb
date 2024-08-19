import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Test from './pages/Test';
import './App.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Home/>}></Route>
          <Route path="/login" element= {<Login/>}></Route>
          <Route path="/test" element= {<Test/>}></Route>
        </Routes>
      </BrowserRouter>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
