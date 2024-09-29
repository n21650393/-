import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Paper, Box } from '@mui/material';

function Achievements() {
  const [achievements, setAchievements] = useState([
    { id: 1, name: '初次登入', description: '第一次使用系統', unlocked: false },
    { id: 2, name: '勤奮學習', description: '連續完成7天任務', unlocked: false },
    { id: 3, name: '技能大師', description: '解鎖所有技能', unlocked: false },
  ]);

  useEffect(() => {
    // 檢查並解鎖成就
    const updatedAchievements = achievements.map(achievement => {
      switch (achievement.id) {
        case 1:
          achievement.unlocked = true; // 初次登入自動解鎖
          break;
        case 2:
          // 這裡需要檢查連續完成任務的邏輯
          break;
        case 3:
          // 這裡需要檢查所有技能是否解鎖
          break;
        default:
          break;
      }
      return achievement;
    });
    setAchievements(updatedAchievements);
    localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h2" className="modal-title" gutterBottom>
          成就
        </Typography>
        <List>
          {achievements.map(achievement => (
            <ListItem key={achievement.id}>
              <ListItemText 
                primary={achievement.name} 
                secondary={achievement.description}
                sx={{ color: achievement.unlocked ? 'text.primary' : 'text.secondary' }}
              />
              <Typography variant="body2">
                {achievement.unlocked ? '已解鎖' : '未解鎖'}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Achievements;