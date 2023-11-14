// App.js
import React from 'react';
import ImageUploadForm from './ImageUploadForm';
import { API_PUT_NOTES_URL } from "./util/URLs";
import DisplayData from './DisplayData';
function App() {
  const handleUpload = (image, email) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const base64Image = reader.result.split(',')[1]; // Remove the prefix from the result

      fetch(API_PUT_NOTES_URL, {
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

  return (
    <div className="App">
      <h1>Upload your image</h1>
      <ImageUploadForm onUpload={handleUpload} />
      <DisplayData />
    </div>
  );
}

export default App;
