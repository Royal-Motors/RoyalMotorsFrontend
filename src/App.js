import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompareCars from './pages/CompareCars';
import CarListing from './pages/CarListing';
import './App.css';
import HomePage from './pages/HomePage';


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/CarListing" element={<CarListing />} />
          <Route path="/CompareCars" element={<CompareCars />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/sign-in" element={<sign-in />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path=":name" element={<CarListing />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
//hi
//hi crispy :D
