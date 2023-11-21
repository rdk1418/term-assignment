import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
function generateReceiptId() {
    const timestamp = Date.now().toString(); // Create a timestamp as a string
    const randomPortion = Math.random().toString(36).substring(2, 15); // Create a random string
    return `receipt_${timestamp}_${randomPortion}`; // Concatenate them with an underscore
  }
  
function ManualExpenseForm({ onManualAdd }) {
 
  const ReceiptId = generateReceiptId();
  console.log(ReceiptId);
  const [manualData, setManualData] = useState({ReceiptId: ReceiptId, date: '', amount: '', vendor: '' });
  const handleSubmit = (e) => {
    
    e.preventDefault();
    onManualAdd(manualData);
    // Optionally, you can reset the form after submission
    setManualData({ ReceiptId: generateReceiptId(), date: '', amount: '', vendor: '' });
  };

  return (
    <div>
      <h2>Manual Expense Entry</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <TextField
          label="Date"
          type="text"
          value={manualData.date}
          onChange={(e) => setManualData({ ...manualData, date: e.target.value })}
          required
          variant="outlined"
          style={{ margin: '10px 0' }}
        />
        <TextField
          label="Amount"
          type="number"
          value={manualData.amount}
          onChange={(e) => setManualData({ ...manualData, amount: e.target.value })}
          required
          variant="outlined"
          style={{ margin: '10px 0' }}
        />
        <TextField
          label="Vendor"
          type="text"
          value={manualData.vendor}
          onChange={(e) => setManualData({ ...manualData, vendor: e.target.value })}
          required
          variant="outlined"
          style={{ margin: '10px 0' }}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Expense
        </Button>
      </form>
    </div>
  );
}

export default ManualExpenseForm;
