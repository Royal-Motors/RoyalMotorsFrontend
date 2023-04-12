import React from 'react';

const CarListing = () => {
  return (
    <div>
        <div class="mainCarSection">
            <div class="big-car-info">
                <h2>GAC GS5 270T</h2>
                <h2 class="buffer">buffer</h2>
                <button>TEST DRIVE</button>
            </div>
        <img class="mainImg" src="Car pictures/noBackground.png" alt="Main" />
        </div>

        <div class="POWER">
            <div class="Power_inner">
                <h2>HORSE POWER</h2>
                <p>167 hp</p>
            </div>
        </div>

        <div class="FUEL">
            <div class="Power_inner">
                <h2>FUEL CONSUMPTION</h2>
                <p>7L/100Km</p>
            </div>
        </div>

        <div class="info" style={{marginBottom: '0'}}>
            <div class="picture">
                <img class="images" src="Car pictures/2.jpg" alt="pics" />
            </div>
            <div class="aside">
                <div class="title-band">
                    <h1 class="title" id="SPECIFICATIONS">SPECIFICATIONS</h1>
                </div>
                <ol>
                    <li><strong>Vehicle Type:</strong> SUV</li>
                    <li><strong>Fuel: </strong>PETROL</li>
                    <li><strong>Fuel tank capacity:</strong> 55L</li>
                    <li><strong>Color:</strong> Moonlight Grey</li>
                    <li><strong>Transmission Type: </strong>AUTOMATIC</li>
                    <li><strong>Model Year:</strong> 2022</li>
                    <li><strong>Mileage: </strong>14000 KM</li>
                    <li><strong>Price Including VAT:</strong> 16900 USD</li>
                </ol>
            </div>
        </div>
    </div>
  )
}

export default CarListing