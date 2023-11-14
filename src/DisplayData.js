// DisplayData.js
import React, { useState, useEffect } from 'react';
import { API_GET_NOTES_URL } from "./util/URLs";

const DisplayData = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(API_GET_NOTES_URL)
      .then(response => response.json())
      .then(data => {
        setRecords(data);
      })
      .catch((error) => {
        console.error('Error fetching records:', error);
      });
  }, []);

  return (
    <div>
      <h2>Expense Records</h2>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            Date: {record.Date}, Amount: {record.Amount}, Vendor: {record.Vendor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayData;
