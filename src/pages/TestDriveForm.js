//Parts of this code were omitted (fetching testdrive info) to not cause the website to crash will be added when debugged and fully functional
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TestDriveForm({ onSubmit }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([
    new Date('2022-05-10T00:00:00'),
    new Date('2022-05-12T00:00:00'),
    new Date('2022-05-14T00:00:00')
  ]);
  return (
    <form onSubmit={onSubmit}>
      <div className="form">
        <label>Test Drive Date:</label>
        <DatePicker
          id="test-drive-date"
          selected={selectedDate}
          showTimeSelect
          dateFormat="MM/dd/yyyy  EE hh:mm a"
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TestDriveForm;
