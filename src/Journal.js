import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

function Journal() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    // 這裡可以從本地存儲或數據庫加載日誌條目
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const addEntry = () => {
    if (newEntry.trim() !== '') {
      const updatedEntries = [...entries, { date: new Date().toLocaleString(), text: newEntry }];
      setEntries(updatedEntries);
      setNewEntry('');
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
      <Typography variant="h4" gutterBottom>我的學習日誌</Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="今天的學習心得..."
      />
      <Button variant="contained" color="primary" onClick={addEntry} style={{ marginTop: 10 }}>
        添加日誌
      </Button>
      <List>
        {entries.map((entry, index) => (
          <ListItem key={index}>
            <ListItemText primary={entry.text} secondary={entry.date} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Journal;