import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CompareCars from './pages/CompareCars';
import CarListing from './pages/CarListing';
import CarListingDealer from './pages/CarListingDealer';
import CarListingEdit from './pages/CarListingEdit';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import './App.css';
import { getUserAuth } from './pages/localStorage';
import HomePageDealer from './pages/HomePageDealer';
import AccessDenied from './pages/AccessDenied';


function App() {


  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          {/* <Route exact path="/" element={<HomePage />} /> */}
          <Route path="/" element={getUserAuth()==='admin' ? <HomePageDealer /> : <HomePage />} />
          <Route path="/CompareCars" element={<CompareCars />} />
          <Route path="/AccessDenied" element={<AccessDenied />} />
          <Route path="/carAdd" element={getUserAuth()==='admin' ? <CarListingDealer /> : <AccessDenied />} />
          {/* <Route exact path=":name" element={<CarListing />} >
            <Route path="edit" element={getUserAuth()==='admin' ? <CarListingEdit /> : <AccessDenied />} />
          </Route> */}
          <Route exact path=":name" element={<CarListing />} />
          <Route exact path="edit" element={<CarListingEdit />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;