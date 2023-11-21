import React, { useState } from 'react';
import { Button, TextField, Input, InputLabel, FormControl } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

function ImageUploadForm({ onUpload }) {

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image ) {
      onUpload(image);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      
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
