import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompareCars from './pages/CompareCars';
import CarListing from './pages/CarListing';
import CarListingDealer from './pages/CarListingDealer';
import './App.css';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import AdminTestDrives from './components/AdminTestDrives';



function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/CarListing" element={<CarListingDealer />} />
          <Route path="/CompareCars" element={<CompareCars />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path=":name" element={<CarListing />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/AdminTest" element={<AdminTestDrives />} />
          </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;