import React, { useState } from 'react';
import ImageUploadForm from './ImageUploadForm';
import { API_PROCESS_IMAGE_URL, API_ADD_EXPENSE_URL ,API_SUBSCRIPTION_ENDPOINT} from "./util/URLs";
import DisplayData from './DisplayData';
import ManualExpenseForm from './ManualExpenseForm';
import {
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Checkbox,
  FormControlLabel,
  Snackbar
} from '@mui/material';



function App() {
  const [uploadMode, setUploadMode] = useState('image'); // 'image' or 'manual'
  const [email, setEmail] = useState(''); // To store user email
  const [subscriptionConfirmed, setSubscriptionConfirmed] = useState(
    localStorage.getItem('isSubscribed') === 'true'
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarReceipt, setSnackbarReceipt] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
     localStorage.setItem('isSubscribed', event.target.checked);
  
  };

  const handleConfirmEmail = () => {
    if (email) {
      subscribeUser();
    } else {
      alert('Please enter an email address.');
    }
  };

  const subscribeUser = () => {
    // Call your API to subscribe the user
    fetch(API_SUBSCRIPTION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSubscriptionConfirmed(true);
        setSnackbarOpen(true);
        localStorage.setItem('isSubscribed', 'true');
        alert('Subscribed successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error in subscription.');
      });
  };






  const handleUpload = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const base64Image = reader.result.split(',')[1]; // Remove the prefix from the result
      console.log(base64Image)
      fetch(API_PROCESS_IMAGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: base64Image
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSnackbarReceipt(true);
        alert('Image uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error uploading image.');
      });
    };
    reader.onerror = error => console.log('Error: ', error);
  };


  const handleManualAdd = (manualData) => {
    console.log("manualData:"+JSON.stringify(manualData))
    const body=JSON.stringify(manualData)
    // API call to add manual expense data
    fetch(API_ADD_EXPENSE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
    .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('Expense added successfully!');
        
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error adding expense.');
      });
  };
  return (
    <div className="App">
      
      <Typography variant="h4" gutterBottom>
        Expense Tracker
      </Typography>
      
      <ToggleButtonGroup
        value={uploadMode}
        exclusive
        onChange={(event, newMode) => setUploadMode(newMode)}
      >
        <ToggleButton value="image">
          Image Upload
        </ToggleButton>
        <ToggleButton value="manual">
          Manual Add
        </ToggleButton>
      </ToggleButtonGroup>
          {/* Subscription Checkbox and Email Input */}
      {!subscriptionConfirmed && (
        <div style={{ margin: '20px 0' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckChange}
                color="primary"
              />
            }
            label={checked ? 'Subscribed' : 'Subscribe'}
          />
          {checked && (
            <>
              <TextField
                label="Email"
                variant="outlined"
                style={{ marginLeft: 10 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: 10 }}
                onClick={handleConfirmEmail}
              >
                Confirm Email
              </Button>
            </>
          )}
        </div>
      )}

      {/* Snackbar for Subscription Confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="You are subscribed to notifications!"
      />

      {/* Snackbar for Subscription Confirmation */}
      <Snackbar
        open={snackbarReceipt}
        autoHideDuration={6000}
        onClose={() => setSnackbarReceipt(false)}
        message="Receipt upoloaded Successfully!"
      />

      {uploadMode === 'image' && (
        <ImageUploadForm onUpload={handleUpload} />
      )}

      {uploadMode === 'manual' && (
        <ManualExpenseForm onManualAdd={handleManualAdd} />
      )}

      <DisplayData />
    </div>
  );
}

export default App;
