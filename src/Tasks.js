import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Typography, Paper, Box, LinearProgress, Snackbar } from '@mui/material';

// 自定義一個簡單的勾選圖標
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
  </svg>
);

function Tasks({ setCurrentExp }) {
  const [tasks, setTasks] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const generateDailyTasks = () => {
    const allTasks = [
      { id: 1, text: '畫一個角色的頭部設計', exp: 20 },
      { id: 2, text: '使用3種顏色完成一個小插圖', exp: 30 },
      { id: 3, text: '嘗試畫出一個簡單的陰影效果', exp: 25 },
      { id: 4, text: '練習畫一個角色的手部動作', exp: 35 },
      { id: 5, text: '用16x16像素設計一個遊戲道具', exp: 40 },
      { id: 6, text: '設計一個半透明材質的服裝', exp: 30 },
      { id: 7, text: '為角色添加光影效果', exp: 25 },
      { id: 8, text: '完成一個指定的像素畫挑戰', exp: 40 },
    ];
    return shuffleArray(allTasks).slice(0, 5).map(task => ({ ...task, completed: false }));
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('lastTaskReset');
    
    if (storedDate !== today) {
      const newTasks = generateDailyTasks();
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      localStorage.setItem('lastTaskReset', today);
    } else {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      setTasks(storedTasks);
    }
  }, []);  // 空依赖数组，因为我们只想在组件挂载时运行这个效果

  const completeTask = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    const task = tasks.find(t => t.id === id);
    setCurrentExp(prev => prev + task.exp);
    setSnackbarMessage(`任務完成！獲得 ${task.exp} 經驗值`);
    setOpenSnackbar(true);

    if (updatedTasks.every(task => task.completed)) {
      const bonusExp = 50;
      setCurrentExp(prev => prev + bonusExp);
      setSnackbarMessage(`恭喜！你已完成今日所有任務！獲得額外 ${bonusExp} 經驗值！`);
      setOpenSnackbar(true);
    }
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasksCount / totalTasks) * 100;

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h2" className="modal-title" gutterBottom>
          每日任務
        </Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ marginBottom: 2 }} />
        <Typography variant="body2" gutterBottom>
          完成進度: {completedTasksCount} / {totalTasks}
        </Typography>
        <List>
          {tasks.map(task => (
            <ListItem key={task.id} disablePadding sx={{ marginBottom: 2, animation: task.completed ? 'fadeOut 0.5s' : 'none' }}>
              <ListItemText 
                primary={task.text} 
                secondary={`${task.exp} XP`} 
                sx={{ 
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'text.secondary' : 'text.primary'
                }}
              />
              {task.completed ? (
                <CheckIcon />
              ) : (
                <Button variant="contained" onClick={() => completeTask(task.id)}>
                  完成
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}

export default Tasks;