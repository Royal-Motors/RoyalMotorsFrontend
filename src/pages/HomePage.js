/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./HomePage.css"
import CarDisplayHP from '../components/CarDisplayHP';
import { useState, useEffect }from 'react';
import { Switch, Route ,Router } from 'react-router-dom';

const HomePage = () => {
    const [data_all, setData] = useState([]);
    const [carNames, setCarNames] = useState([]);
    const [carMakes, setCarMakes] = useState([]);
    const [carModels, setCarModels] = useState([]);
    const [carYears, setCarYears] = useState([]);
    const [carUsed, setCarUsed] = useState([]);
    const [carPrices, setCarPrices] = useState([]);
    const [filter, setFilter] = useState("");
    const [sort, setSort] =useState([]);

    useEffect(() => {
      fetch('https://royalmotors.azurewebsites.net/car')
        .then((response) => response.json())
        .then((data_all) => {
          setData(data_all);
          setCarNames(Array.from(new Set(data_all.map((car) => car.name))));
          setCarMakes(Array.from(new Set(data_all.map((car) => car.make))));
          setCarModels(Array.from(new Set(data_all.map((car) => car.model))));
          setCarYears(Array.from(new Set(data_all.map((car) => car.year))));
          setCarUsed(Array.from(new Set(data_all.map((car) => car.used))));
          setCarPrices(Array.from(new Set(data_all.map((car) => car.price))));
        });
    }, []);

    const carUsedString = carUsed.map(value => value ? "Used" : "New");

    const handleFilterChange = (event) => {
      const selectedFilter = event.target.value;
      setFilter(selectedFilter);
      if (selectedFilter === ""){
        setSort([]);
      }
      else if (selectedFilter === 'name') {
        setSort(carNames);
      } 
      else if (selectedFilter === 'make') {
        setSort(carMakes);
      }
      else if (selectedFilter === 'model') {
        setSort(carModels);
      }
      else if (selectedFilter === 'year') {
        setSort(carYears);
      }
      else if (selectedFilter === 'used') {
        setSort(carUsedString);
      }
      else if (selectedFilter === 'price') {
        setSort(carPrices);
      }
    };
    
    const handleSortChange = (event) => {
      console.log(`Selected ${filter} filter and ${event.target.value} sort`);
    };

  return (
    <div>
        <div className="kitkat"></div>
    {/* <!-- Pictures with info 1 --> */}
    <div className="Info">
        <div className="TestedCar" >
            <img className="CarRight" src="Car pictures/noBackground.png" alt="" />
        </div>
        <div className="InfoLeft">
            <p id="L1">Our deals</p>
            <p id="L2">are</p>
            <p id="L3">Wheely Good!</p>
        </div>
        {/* <!-- Section break --> */}
        <div className="kitkat" id="inSection"></div>
    </div>
    {/* <!-- Search bar, Filter and  Sort --> */}
    <div className="SFS">
        <div className="search-container">
            {/* Filter dropdown */}
          <div className="butt1">
          <select className="filter" value={filter} onChange={handleFilterChange}>
              <option value="">No Filter</option>
              <option value="name">Name</option>
              <option value="make">Make</option>
              <option value="model">Model</option>
              <option value="year">Year</option>
              <option value="used">Used</option>
              <option value="price">Price</option>
              </select>
            </div>

            <form action="/search">
                <input type="text" placeholder="Search..." />
                <button type="submit"><i className="fa fa-search"></i></button>
            </form>

            <div className="butt2">
              <select className="sort" value="" onChange={handleSortChange}>
                <option value="">Select {filter} to sort by</option>
                  {sort.map((value) => (
                  <option key={value} value={value}>{value}</option>
                  ))}  
              </select>
            </div>
        </div>
    </div>

    {/* <!-- Section break --> */}
    <div className="kitkat"></div>
    {/* <!-- Multiple images displayed --> */}
    <div className="seinfeld">
        {data_all.length > 0 ? (
        <div className="image-grid">
            {data_all.map((car, i) => (
                <CarDisplayHP key={i} name={car.name}/>
            ))}
        </div>
        ) : (
        <p>Loading data...</p>
        )}
    </div>
    {/* <!-- Section break --> */}
    <div className="kitkat"></div>
    </div>
  )
}

export default HomePage