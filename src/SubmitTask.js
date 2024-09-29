import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';

function SubmitTask() {
  const [taskDescription, setTaskDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 這裡處理任務提交邏輯
    console.log('Task submitted:', taskDescription);
    console.log('Image file:', imageFile);
    // 清空表單
    setTaskDescription('');
    setImageFile(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          提交任務
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="描述你的任務完成情況..."
            sx={{ marginBottom: 2 }}
          />
          <input
            accept="image/*"
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            提交任務
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default SubmitTask;