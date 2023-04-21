import React from 'react';
import "./HomePage.css"
import CarDisplayHP from '../components/CarDisplayHP';
import { useState, useEffect }from 'react';

const HomePage = () => {
    const [data_all, setData] = useState([]);
    const [carNames, setCarNames] = useState([]);
    const [carMakes, setCarMakes] = useState([]);
    const [carModels, setCarModels] = useState([]);
    const [carYears, setCarYears] = useState([]);
    const [carColor, setCarColor] = useState([]);
    const [carUsed, setCarUsed] = useState([]);
    const [carPrices, setCarPrices] = useState([]);

    const [filter, setFilter] = useState("");//active filter
    const [sort, setSort] =useState([]);//array with attributes to sort by
    const [selectedSort, setSelectedSort] = useState('');//active attribute
    const [displayedSortedCars, setDisplayedSortedCars] = useState([]);//array with cars => active attribute

    useEffect(() => {
      fetch('https://royalmotors.azurewebsites.net/car')
        .then((response) => response.json())
        .then((data_all) => {
          setData(data_all);
          setCarNames(Array.from(new Set(data_all.map((car) => car.name))));
          setCarMakes(Array.from(new Set(data_all.map((car) => car.make))));
          setCarModels(Array.from(new Set(data_all.map((car) => car.model))));
          setCarYears(Array.from(new Set(data_all.map((car) => car.year))));
          setCarColor(Array.from(new Set(data_all.map((car) => car.color))));
          setCarUsed(Array.from(new Set(data_all.map((car) => car.used))));
          setCarPrices(Array.from(new Set(data_all.map((car) => car.price))));
          setDisplayedSortedCars(data_all);
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
      else if (selectedFilter === 'color') {
        setSort(carColor);
      }
      else if (selectedFilter === 'used') {
        setSort(carUsedString);
      }
      else if (selectedFilter === 'price') {
        setSort(carPrices);
      }
    };

    const handleReset = (event) => {
      setDisplayedSortedCars(data_all);
    };
    
    const handleSortChange = (event) => {
      const selectedSort = event.target.value;
      setSelectedSort(selectedSort);
    };

    const handleDisplayedCars = (event) => {
      const selectedSort = event.target.value;
      let filteredData = data_all;
      // Apply filter if there is one
      if (filter === ""){
        filteredData=data_all;
      }
      else if (filter === "name") {
        filteredData = filteredData.filter(car => car.name === selectedSort);
      } 
      else if (filter === "make") {
        filteredData = filteredData.filter(car => car.make === selectedSort);
      } 
      else if (filter === "model") {
        filteredData = filteredData.filter(car => car.model === selectedSort);
      } 
      else if (filter === "year") {
        filteredData = filteredData.filter(car => car.year === selectedSort);
      }
      else if (filter === "color") {
        filteredData = filteredData.filter(car => car.color === selectedSort);
      }
      else if (filter === "used") {
        filteredData = filteredData.filter(car => car.used === (selectedSort === "Used"));
      } 
      else if (filter === "price") {
        filteredData = filteredData.filter(car => car.price === selectedSort);
      }
      // Sort the filtered data based on the selected sort attribute
      if (sort.includes(selectedSort)) {
        filteredData.sort((a, b) => {
          if (a[selectedSort] < b[selectedSort]) {
            return -1;
          } else if (a[selectedSort] > b[selectedSort]) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      setDisplayedSortedCars(filteredData);
    };

    const handleMultipleChange = (event) => {
      handleDisplayedCars(event);
      handleSortChange(event);
    }

    console.log(filter)

  return (
    <div>
        <div className="kitkat" style={{marginTop:"10px"}}></div>
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
              <option value="" onClick={handleReset}>No Filter</option>
              <option value="name">Name</option>
              <option value="make">Make</option>
              <option value="model">Model</option>
              <option value="year">Year</option>
              <option value="color">Color</option>
              <option value="used">Used</option>
              <option value="price">Price</option>
              </select>
            </div>

            <div className="butt2">
              <select className="sort" value={selectedSort} onChange={handleMultipleChange}> 
                <option value="" onClick={handleReset}>No Selection</option>
                  {sort.map((value) => (
                  <option key={value} value={value}>{value}</option>
                  ))}  
              </select>
            </div>

            <form action="/search">
                <input type="text" placeholder="Search..." />
                <button type="submit"><i className="fa fa-search"></i></button>
            </form>

        </div>
    </div>

    {/* <!-- Section break --> */}
    <div className="kitkat"></div>
    {/* <!-- Multiple images displayed --> */}
    <div className="seinfeld">
        {displayedSortedCars.length > 0 ? (
        <div className="image-grid">
            {displayedSortedCars.map((car, i) => (
                <CarDisplayHP key={i} name={car.name}/>))}
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