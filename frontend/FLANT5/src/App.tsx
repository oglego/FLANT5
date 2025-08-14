import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { FileUpload } from './components/FileUpload';
import { ChatBox } from './components/ChatBox';

function App() {
  return (
    <Box
      sx={{
        backgroundColor: '#1E1E2F', // dark background
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        bgcolor: '#1E1E2F', // dark background
      }}
    >
      <Paper
        elevation={5}
        sx={{
          mt: 6,
          maxWidth: 480,      // less wide
          minHeight: 700,      // a little longer
          width: '100%',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          bgcolor: '#9589C7', // dark background
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          FLANT5 Chat
        </Typography>
        <Box sx={{ backgroundColor: '#9589C7', mb: 4 }}>
          <FileUpload onUpload={() => alert("File uploaded!")} />
        </Box>
        <ChatBox />
      </Paper>
    </Box>
  );
}

export default App;