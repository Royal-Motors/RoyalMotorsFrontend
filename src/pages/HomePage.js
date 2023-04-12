/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./HomePage.css"

const HomePage = () => {
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
            <div className="butt1">
                <button className="filter">
                    <div>Filter</div>
                </button>
            </div>

            <form action="/search">
                <input type="text" placeholder="Search..." />
                <button type="submit"><i className="fa fa-search"></i></button>
            </form>

            <div className="butt2">
                <button className="sort">
                    <div>Sort by</div>
                </button>
            </div>
        </div>
    </div>

    {/* <!-- Section break --> */}
    <div className="kitkat"></div>
    {/* <!-- Multiple images displayed --> */}
    <div className="seinfeld">
        <div className="image-grid">
            <div className="image-box">
                <img id="GridPic" src="Car pictures/3.jpg" alt="" />
                <a style={{cursor: 'pointer'}}>
                    <div className="color-box">
                        <p className="CarName">Car name</p>
                    </div>
                </a>
            </div>
            <div className="image-box">
                <img id="GridPic" src="Car pictures/3.jpg" alt="" />
                <a style={{cursor: 'pointer'}}>
                    <div className="color-box">
                        <p className="CarName">Car name</p>
                    </div>
                </a>
            </div>
            <div className="image-box">
                <img id="GridPic" src="Car pictures/3.jpg" alt="" />
                <a style={{cursor: 'pointer'}}>
                    <div className="color-box">
                        <p className="CarName">Car name</p>
                    </div>
                </a>
            </div>
            <div className="image-box">
                <img id="GridPic" src="Car pictures/3.jpg" alt="" />
                <a style={{cursor: 'pointer'}}>
                    <div className="color-box">
                        <p className="CarName">Car name</p>
                    </div>
                </a>
            </div>
            <div className="image-box">
                <img id="GridPic" src="Car pictures/3.jpg" alt="" />
                <a style={{cursor: 'pointer'}}>
                    <div className="color-box">
                        <p className="CarName">Car name</p>
                    </div>
                </a>
            </div>
            <div className="image-box">
                <img id="GridPic" src="Car pictures/3.jpg" alt="" />
                <a style={{cursor: 'pointer'}}>
                    <div className="color-box">
                        <p className="CarName">Car name</p>
                    </div>
                </a>
            </div>
            <div className="image-box">
                <img id="GridPic" src="Car pictures/3.jpg" alt="" />
                <a style={{cursor: 'pointer'}}>
                    <div className="color-box">
                        <p className="CarName">Car name</p>
                    </div>
                </a>
            </div>
            <div className="image-box">
                <img id="GridPic" src="Car pictures/3.jpg" alt="" />
                <a style={{cursor: 'pointer'}}>
                    <div className="color-box">
                        <p className="CarName">Car name</p>
                    </div>
                </a>
            </div>
            <div className="image-box">
                <img id="GridPic" src="Car pictures/3.jpg" alt="" />
                <a style={{cursor: 'pointer'}}>
                    <div className="color-box">
                        <p className="CarName">Car name</p>
                    </div>
                </a>
            </div>
        </div>

    </div>
    {/* <!-- Section break --> */}
    <div className="kitkat"></div>

    </div>
  )
}

export default HomePage