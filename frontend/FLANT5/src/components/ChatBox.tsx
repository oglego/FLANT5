import React, { useState } from 'react';
import { Box, TextField, Button, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export const ChatBox = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;
    setMessages([...messages, { text: question, sender: 'user' }]);
    setLoading(true);
    setQuestion("");
    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        body: JSON.stringify({ question }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { text: data.answer, sender: 'bot' }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { text: "Error: Could not get response.", sender: 'bot' }]);
    }
    setLoading(false);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        bgcolor: '#151B54',
        borderColor: '#a78bfa', // purple-300
        color: '#f3e8ff', // purple-100
      }}
    >
      <List sx={{ minHeight: 150, maxHeight: 600, overflow: 'auto', mb: 2 }}>
        {messages.map((msg, idx) => (
          <ListItem
            key={idx}
            sx={{
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              display: 'flex',
            }}
          >
            <ListItemText
              primary={msg.text}
              secondary={msg.sender === 'user' ? 'You' : 'Bot'}
              sx={{
                maxWidth: '70%',
                bgcolor: msg.sender === 'user' ? '#e9d5ff' : '#ede9fe', // purple-200 / purple-50
                borderRadius: 2,
                p: 1,
                textAlign: msg.sender === 'user' ? 'right' : 'left',
                color: '#3d246c', // deep purple text
              }}
            />
          </ListItem>
        ))}
        {loading && (
          <ListItem>
            <CircularProgress size={20} />
          </ListItem>
        )}
      </List>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Type your question..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') ask();
          }}
          disabled={loading}
          sx={{
            bgcolor: '#f3e8ff', // purple-100
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#a78bfa', // purple-300
              },
              '&:hover fieldset': {
                borderColor: '#7c3aed', // purple-500
              },
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: '#a78bfa', // purple-300
            color: '#3d246c',
            '&:hover': {
              bgcolor: '#7c3aed', // purple-500
              color: '#fff',
            },
          }}
          onClick={ask}
          disabled={loading || !question.trim()}
        >
          Ask
        </Button>
      </Box>
    </Paper>
  );
};
