import React, { useState } from 'react';
import { Typography, Button, Paper, Box } from '@mui/material';

function Challenge({ level, onComplete }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          等級 {level} 挑戰
        </Typography>
        <Typography variant="body1" gutterBottom>
          完成這個挑戰來進入下一個段位！
        </Typography>
        {!isCompleted ? (
          <Button variant="contained" color="primary" onClick={handleComplete}>
            完成挑戰
          </Button>
        ) : (
          <Typography variant="h6" color="secondary">
            恭喜！你已完成挑戰！
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default Challenge;