import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './page/StartPage';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import DashBoard from './page/DashBoard';
import LoggedInRedirect from './page/LoggedInRedirect';
import { setUserSessionLogOut } from './sessionStorage/sessionStorageAction';
import SignOut from './page/SignOut';

function App() {
  if (sessionStorage.getItem("user-login") == null) {
    setUserSessionLogOut();
  }

  return (
    <Router>
      <div className="App position-relative">
        <img className='position-absolute top-0 start-0' src="/images/background.png" alt="background decorate" style={{zIndex: "-1"}}/>
          <Routes>
            <Route path='/*' element={<StartPage/>}></Route>
            <Route path='/logged-in-redirect/*' element={<LoggedInRedirect/>}></Route>
            <Route path='/sign-in/*' element={<SignIn/>}></Route>
            <Route path='/sign-up/*' element={<SignUp/>}></Route>
            <Route path='/sign-out/*' element={<SignOut/>}></Route>
            <Route path='/dash-board/*' element={<DashBoard/>}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;