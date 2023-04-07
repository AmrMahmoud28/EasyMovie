import 'swiper/swiper.min.css';
import "./app.scss";
import { BrowserRouter, Route } from "react-router-dom";

import Routes from "./config/Routes";
import Header from './components/header/Header';
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Route render={() => (
        <>
          {isWatchPage() && (
            <Header/>
          )}

          <Routes key={Math.random()}/>
          
          {isWatchPage() && (
            <Footer/>
          )}
        </>
      )}/>
    </BrowserRouter>
  );
};

function isWatchPage(){
  return (window.location.pathname.split("/")[1] !== "watch" 
  && window.location.pathname.split("/")[1] !== "register"
  && window.location.pathname.split("/")[1] !== "login");
}

export default App;