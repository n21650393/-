import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

function Home({ level }) {
  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          歡迎來到遊戲化學習系統
        </Typography>
        <Typography variant="h6">
          當前等級：{level}
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="body1">
          這裡是您的個人學習中心。完成任務、獲得成就、提升技能，享受學習的樂趣！
        </Typography>
      </Paper>
    </Box>
  );
}

export default Home;