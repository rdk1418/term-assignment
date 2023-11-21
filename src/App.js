import React, { useState } from 'react';
import ImageUploadForm from './ImageUploadForm';
import { API_PROCESS_IMAGE_URL, API_ADD_EXPENSE_URL, API_GET_EXPENSE_FROM_DYNAMO ,API_SUBSCRIPTION_ENDPOINT} from "./util/URLs";
import DisplayData from './DisplayData';
import ManualExpenseForm from './ManualExpenseForm';
import {
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField
} from '@mui/material';

function App() {
  const [uploadMode, setUploadMode] = useState('image'); // 'image' or 'manual'
  const [email, setEmail] = useState(''); // To store user email
  const [isSubscribed, setIsSubscribed] = useState(false); // To manage subscription toggle


  const handleSubscriptionToggle = () => {
    setIsSubscribed(!isSubscribed);
    if (isSubscribed) {
      // Call your API to subscribe the user
      subscribeUser();
    }
  };

  const subscribeUser = () => {
    // Assuming you have an API endpoint to subscribe the user
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
      alert('Subscribed successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error in subscription.');
    });
  };



  const handleUpload = (image, email) => {
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
          file: base64Image,
          email: email,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
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
 {/* Subscription Toggle and Email Input */}
 <div style={{ margin: '20px 0' }}>
        <ToggleButton
          value="check"
          selected={isSubscribed}
          onChange={handleSubscriptionToggle}
        >
          {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </ToggleButton>
        {isSubscribed && (
          <TextField
            label="Email"
            variant="outlined"
            style={{ marginLeft: 10 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
      </div>
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
