import React, { useState } from 'react';
import { Button, TextField, Input, InputLabel, FormControl } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

function ImageUploadForm({ onUpload }) {
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image && email) {
      onUpload(image, email);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        required
        variant="outlined"
        style={{ margin: '10px 0' }}
      />
      <FormControl>
        <InputLabel htmlFor="image-input">Image</InputLabel>
        <Input
          id="image-input"
          type="file"
          onChange={handleImageChange}
          required
          inputProps={{
            'aria-label': 'Upload button',
          }}
          endAdornment={
            <IconButton
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          }
        />
      </FormControl>
      <Button variant="contained" color="primary" type="submit">
        Upload
      </Button>
    </form>
  );
}

export default ImageUploadForm;
