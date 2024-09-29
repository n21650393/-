import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, Grid, LinearProgress, Button } from '@mui/material';

function Skills({ setCurrentExp }) {
  const [skills, setSkills] = useState([
    { name: '角色設計', level: 0, exp: 0 },
    { name: '場景繪製', level: 0, exp: 0 },
    { name: '色彩理論', level: 0, exp: 0 },
    { name: '數位繪畫', level: 0, exp: 0 },
    { name: '動畫基礎', level: 0, exp: 0 },
    { name: '構圖技巧', level: 0, exp: 0 },
  ]);

  const [bossChallenge, setBossChallenge] = useState(null);

  useEffect(() => {
    const storedSkills = JSON.parse(localStorage.getItem('skills'));
    if (storedSkills) {
      setSkills(storedSkills);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  const updateSkill = (index, expGain) => {
    setSkills(prevSkills => {
      const newSkills = [...prevSkills];
      newSkills[index].exp += expGain;
      if (newSkills[index].exp >= 100) {
        newSkills[index].level += 1;
        newSkills[index].exp -= 100;
        setCurrentExp(prev => prev + 50); // 升级奖励
      }
      return newSkills;
    });
    checkForBossChallenge();  // 在这里调用
  };

  const checkForBossChallenge = () => {
    const totalLevel = skills.reduce((sum, skill) => sum + skill.level, 0);
    if (totalLevel % 5 === 0 && totalLevel > 0) {
      setBossChallenge({
        description: `BOSS 挑戰：創作一幅融合所有技能的作品`,
        reward: 500,
      });
    }
  };

  const completeBossChallenge = () => {
    setCurrentExp(prev => prev + bossChallenge.reward);
    setBossChallenge(null);
    // 這裡可以添加解鎖新技能的邏輯
  };

  return (
    <Box sx={{ padding: 3, width: '100%', maxWidth: 600 }}>
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <Typography variant="h4" component="h2" className="modal-title" gutterBottom>
          技能
        </Typography>
        <Grid container spacing={3}>
          {skills.map((skill, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="subtitle1" gutterBottom>
                {skill.name} (等級 {skill.level})
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={skill.exp} 
                sx={{ 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'var(--secondary-color)'
                  }
                }}
              />
              <Typography variant="body2" align="right">
                {skill.exp}/100 XP
              </Typography>
              <Button onClick={() => updateSkill(index, 10)}>練習 (+10 XP)</Button>
            </Grid>
          ))}
        </Grid>
        {bossChallenge && (
          <Box mt={3}>
            <Typography variant="h6">{bossChallenge.description}</Typography>
            <Button onClick={completeBossChallenge}>完成挑戰</Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Skills;