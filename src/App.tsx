import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './page/StartPage';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import DashBoard from './page/DashBoard';

function App() {
  if (sessionStorage.getItem("user-login") == null) {
    sessionStorage.setItem("user-login", "");
  }

  return (
    <Router>
      <div className="App position-relative">
        <img className='position-absolute top-0 start-0' src="/images/background.png" alt="background decorate" />
          <Routes>
            <Route path='/*' element={<StartPage/>}></Route>
            <Route path='/sign-in/*' element={<SignIn/>}></Route>
            <Route path='/sign-up/*' element={<SignUp/>}></Route>
            <Route path='/dash-board/*' element={<DashBoard/>}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;