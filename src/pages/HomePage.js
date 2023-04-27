import React from 'react';
import "./HomePage.css"
import CarDisplayHP from '../components/CarDisplayHP';
import { useState, useEffect }from 'react';

const HomePage = () => {
    const [data_all, setData] = useState([]); //array of jsons with all cars
    const [carNames, setCarNames] = useState([]); //array for car names
    const [carMakes, setCarMakes] = useState([]); //array for car makes
    const [carModels, setCarModels] = useState([]); //array for car models
    const [carYears, setCarYears] = useState([]); //array for car years
    const [carColor, setCarColor] = useState([]); //array for car colors
    const [carUsed, setCarUsed] = useState([]); //array for used or new cars
    const [carPrices, setCarPrices] = useState([]); //array for car prices

    const [filter_1, setFilter_1] = useState(""); //active filter
    const [filter_2, setFilter_2] =useState([]); //array with attributes to sort by
    const [selectedFilter_2, setSelectedFilter_2] = useState(''); //active attribute
    const [displayedCars, setDisplayedCars] = useState([]);//array with cars => active attribute
    const [sort, setSort] = useState(''); //active sort
    const [temp, setTemp] = useState([]); //temporarry array for traceback

    const [searchQuery, setSearchQuery] = useState(''); //user input in search bar

    //fetch car information from API runs once at the stat
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
          setDisplayedCars(data_all);
        });
    }, []);

    //updates temp everytime displayedFiltered cars changes (must be a less space consuming way but no time for that)
    useEffect(() => {
      setTemp(displayedCars);
    }, [displayedCars]);   

    //change bool values to stings for the USED attribute of the cars
    const carUsedString = carUsed.map(value => value ? "Used" : "New");

    //changes the second filter dropdown list contents
    const handleFilterChange = (event) => {
      const selectedFilter = event.target.value;
      setFilter_1(selectedFilter);
      if (selectedFilter === ""){
        setFilter_2([]);
      }
      else if (selectedFilter === 'name') {
        setFilter_2(carNames);
      } 
      else if (selectedFilter === 'make') {
        setFilter_2(carMakes);
      }
      else if (selectedFilter === 'model') {
        setFilter_2(carModels);
      }
      else if (selectedFilter === 'year') {
        setFilter_2(carYears);
      }
      else if (selectedFilter === 'color') {
        setFilter_2(carColor);
      }
      else if (selectedFilter === 'used') {
        setFilter_2(carUsedString);
      }
      else if (selectedFilter === 'price') {
        setFilter_2(carPrices);
      }
    };

    //resets the cars shown upon clicking the no filter or no selected option
    const handleReset = (event) => {
      
      setDisplayedCars(data_all);
    };

    //reset for sort button in case of an active filter
    const handleReset2 = (event) => {
      setDisplayedCars(temp);
    };
    
    //changes the cars shown upon clicking the apply filter button
    const handleFilter2Change = (event) => {
      const selectedSort = event.target.value;
      setSelectedFilter_2(selectedSort);
    };

    //function that chooses which cars are going to be shown based on filter
    const handleDisplayedCars = (event) => {
      const selectedFilter = event.target.value;
      let filteredData = data_all; //makes my life easier :)
      //filter the arrays based on input of filter_1
      if (filter_1 === ""){
        filteredData=data_all;
      }
      else if (filter_1 === "name") {
        filteredData = filteredData.filter(car => car.name === selectedFilter);
      } 
      else if (filter_1 === "make") {
        filteredData = filteredData.filter(car => car.make === selectedFilter);
      } 
      else if (filter_1 === "model") {
        filteredData = filteredData.filter(car => car.model === selectedFilter);
      } 
      else if (filter_1 === "year") {
        filteredData = filteredData.filter(car => parseInt(car.year) === parseInt(selectedFilter));
      }
      else if (filter_1 === "color") {
        filteredData = filteredData.filter(car => car.color === selectedFilter);
      }
      else if (filter_1 === "price") {
        filteredData = filteredData.filter(car => parseInt(car.price) === parseInt(selectedFilter));
      }
      else if (filter_1 === "used") {
        filteredData = filteredData.filter(car => car.used === true);
      }
      else if (filter_1 === "new") {
        filteredData = filteredData.filter(car => car.used === false);
      }
      setDisplayedCars(filteredData);
    };

    //handler for sorting
    const handleDisplayedFinitoCars = (event) => {
      const selectedSort = event.target.value;
      let sortedData = displayedCars; //makes my life easier :)
      //sort the arrays based on input of sort
      if (selectedSort === ""){
        sortedData = displayedCars;
      }
      else if (selectedSort === "alphab") {
        if (sortedData.length === 1){
          sortedData = displayedCars;
        }
        else{
          sortedData = sortedData.sort((a, b) => a.name[0].localeCompare(b.name[0]));
        }
      } 
      else if (selectedSort === "PI") {
        if (sortedData.length === 1){
          sortedData = displayedCars;
        }
        else{
          sortedData = sortedData.sort((a, b) => a.price - b.price);
        }
      } 
      else if (selectedSort === "PD") {
        if (sortedData.length === 1){
          sortedData = displayedCars;
        }
        else{
          sortedData = sortedData.sort((a, b) => b.price - a.price);
        }
      }
      setDisplayedCars(sortedData);
    };

    //changes the displayed car when search bar used
    const handleSearchDisplayedCars = (event) => {
      let dummy = data_all; //badum tisssssssss
      setSearchQuery(event.target.value);
      const results = dummy.filter((car) =>
        car.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setDisplayedCars(results);
    }

    //check previous comments for definitions :)
    const handleMultipleChange = (event) => {
      handleDisplayedCars(event);
      handleFilter2Change(event);
    };

    //updates cars to display user input and stores value in searchQuery
    function handleSearchInputChange(event) {
      setSearchQuery(event.target.value);
      handleSearchDisplayedCars(event);
    };

    //updates sort dropdown and stores value in sort
    const handleSortChange = (event) => {
      setSort(event.target.value);
      handleDisplayedCars(event);
      handleDisplayedFinitoCars(event);
    };

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
            {/* Filter dropdown 1*/}
          <div className="butt1">
          <select className="filter" value={filter_1} onChange={handleFilterChange}>
              <option value="" onClick={handleReset}>No Filter</option>
              <option value="name">Name</option>
              <option value="make">Make</option>
              <option value="model">Model</option>
              <option value="year">Year</option>
              <option value="color">Color</option>
              <option value="used">Used</option>
              <option value="new">New</option>
              <option value="price">Price in $</option>
              </select>
            </div>
            {/* Filter dropdown 2*/}
            <div className="butt2">
              <select className="filter" value={selectedFilter_2} onChange={handleMultipleChange}> 
                <option value="" onClick={handleReset}>No Selection</option>
                  {filter_2.map((value) => (
                  <option key={value} value={value}>{value}</option>
                  ))}  
              </select>
            </div>
            {/* Search bar */}
            <input type="text" placeholder="Search car name..." value={searchQuery} onChange={handleSearchInputChange}/>
            {/* Sort dropdown */}
            <div className="butt3">
                <select className="sort" value={sort} onChange={handleSortChange}> 
                  <option value="" onClick={handleReset2}>No Sort</option>
                  <option value="alphab">Alphabetically</option>
                  <option value="PI">Price Increasing</option>  
                  <option value="PD">Price Decreasing</option>
                </select>
              </div>
        </div>
               
    </div>
    {/* <!-- Section break --> */}
    <div className="kitkat"></div>
    {/* <!-- Multiple images displayed --> */}
    <div className="seinfeld">
        {displayedCars.length > 0 ? (
        <div className="image-grid">
            {displayedCars.map((car, i) => (
                <CarDisplayHP key={i} name={car.name} year={car.year} price={car.price}/>))}
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