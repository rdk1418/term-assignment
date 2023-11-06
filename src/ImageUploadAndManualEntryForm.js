import React, { useState } from 'react';
import { Button, TextField, Input, FormControl, InputLabel, IconButton, Grid, Paper, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

function ImageUploadAndManualEntryForm({ onImageUpload, onManualEntry }) {
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (image && email) {
      onImageUpload(image, email);
    } else {
      alert('Please fill in all fields for image upload.');
    }
  };

  const handleManualEntrySubmit = (e) => {
    e.preventDefault();
    if (description && amount && email) {
      onManualEntry({ email, description, amount });
    } else {
      alert('Please fill in all fields for manual entry.');
    }
  };

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Upload Receipt
        </Typography>
        <Paper style={{ padding: 16 }}>
          <form onSubmit={handleImageSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="image-input">Receipt Image</InputLabel>
              <Input
                id="image-input"
                type="file"
                onChange={handleImageChange}
                required
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
              Upload and Analyze
            </Button>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Add Expense Manually
        </Typography>
        <Paper style={{ padding: 16 }}>
          <form onSubmit={handleManualEntrySubmit}>
            <TextField
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
              required
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Amount"
              value={amount}
              onChange={handleAmountChange}
              required
              fullWidth
              margin="normal"
              variant="outlined"
              type="number"
            />
            <Button variant="contained" color="primary" type="submit">
              Add Expense
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ImageUploadAndManualEntryForm;
