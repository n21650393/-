import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, Snackbar } from '@mui/material';

function UploadWork({ addBackgroundImage }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addBackgroundImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    console.log('Uploading:', { title, description, file });
    setOpenSnackbar(true);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h4" component="h2" className="modal-title" gutterBottom>
        上傳作品
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="作品標題"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="作品描述"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" sx={{ mt: 2, mb: 2 }}>
            選擇文件
          </Button>
        </label>
        {file && <Typography variant="body2">{file.name}</Typography>}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          上傳
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="作品上傳成功！已添加到背景輪播中。"
      />
    </Paper>
  );
}

export default UploadWork;