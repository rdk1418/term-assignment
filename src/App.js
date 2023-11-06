import React from 'react';
import { useState } from 'react';
import ImageUploadAndManualEntryForm from './ImageUploadAndManualEntryForm';



function App() {

  const [manualEntries, setManualEntries] = useState([]);

  const handleUpload = (image, email) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('email', email);

    // Replace with your API URL
    const API_URL = 'https://your-api-endpoint.com/upload';

    fetch(API_URL, {
      method: 'POST',
      body: formData,
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


  const onManualEntry = (entry) => {
    // Replace with your API URL
    const API_URL = 'https://your-api-endpoint.com/manual-entry';

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Entry added successfully!');
      setManualEntries(prevEntries => [...prevEntries, entry]);
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error adding entry.');
    });
  };
  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ImageUploadAndManualEntryForm onImageUpload={handleUpload} onManualEntry={onManualEntry} />
      <h2>Manual Expense Entries</h2>
      <ul>
        {manualEntries.map((entry, index) => (
          <li key={index}>
            {entry.description} - ${entry.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
