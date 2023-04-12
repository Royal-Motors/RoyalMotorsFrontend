import React from 'react';
const CompareCars = () => {
  return (
    <div className='CompareTable'>
        <table className='ComparingTable'>
      <tr style={{borderRadius: '0px', boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0)'}}>
        <td style={{visibility: 'hidden'}}>Vehicle Type</td>
        <td id="firstCar"><img src="Car pictures/noBackground - flipped.png" alt="" /></td>
        <td id="secondCar"><img src="Car pictures/noBackground.png" alt="" /></td>
      </tr>
      <tr>
        <td >Vehicle Type</td>
        <td>Row 1, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr >
        <td>Brand</td>
        <td>Row 2, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr>
        <td>Model</td>
        <td>Row 3, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr>
        <td>Version</td>
        <td>Row 3, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr>
        <td>Capacity</td>
        <td>Row 3, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr>
        <td>Fuel</td>
        <td>Row 3, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr>
        <td>Color</td>
        <td>Row 3, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr>
        <td>Transmission Type</td>
        <td>Row 3, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr>
        <td>Model Year</td>
        <td>Row 3, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr >
        <td>Mileage</td>
        <td>Row 3, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr >
        <td>Price</td>
        <td>Row 3, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
    </table>
    </div>
  )
}

export default CompareCars