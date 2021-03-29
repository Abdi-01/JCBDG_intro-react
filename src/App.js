// import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/landingPage' //import pages 
import RegisterPage from './pages/registerPage'
import Navbar from './components/navbar'
import DetailPage from './pages/detailAlbum';
import LoginPage from './pages/loginPage'
// Route : menjadi penghubung page ke BrowserRouter
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* Virtual DOM */}
      <Navbar brand="AllGraph" />
      <Route path="/" component={LandingPage} exact />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/detail-album" component={DetailPage} />
    </div>
  );
}

export default App;
