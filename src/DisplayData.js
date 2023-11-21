import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { API_GET_EXPENSE_FROM_DYNAMO } from "./util/URLs";

const DisplayData = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(API_GET_EXPENSE_FROM_DYNAMO, {
      method: 'POST', // Set the method to POST
      headers: {
        'Content-Type': 'application/json', // Set the appropriate header if sending JSON
        // Include other headers as needed
      },
      body: JSON.stringify({
        // Include any necessary body data as a stringified JSON
      }),
    })
    .then(response => response.json())
    .then(data => {
      const parsedData = JSON.parse(data.body); // Make sure that this line is still applicable for your POST response
      setRecords(parsedData);
      console.log(parsedData);
    })
    .catch((error) => {
      console.error('Error fetching records:', error);
    });
  }, []);
  
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Expense Records
      </Typography>
      <List>
        {records.map((record, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Date: ${record.Date.S}`}
              secondary={`Amount: ${record.Amount.S}, Vendor: ${record.Vendor.S}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DisplayData;
