import React, { useState, useRef, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon from MUI
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

function CrewMessage() {
  const [selectedConversation, setSelectedConversation] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const isLessThan600 = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetch('http://localhost:3001/api/messages')
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
        const uniqueSenders = Array.from(new Set(data.map((msg) => msg.senderName)));
        setConversations(uniqueSenders);
        if (uniqueSenders.length > 0) {
          setSelectedConversation(uniqueSenders[0]); // Set the first conversation as the default
        }
      })
      .catch((error) => console.error('Error fetching messages:', error));
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const formatDate = (date) => {
    const formattedDate =
      date.getFullYear() +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(date.getDate()).padStart(2, '0') +
      ' ' +
      String(date.getHours()).padStart(2, '0') +
      ':' +
      String(date.getMinutes()).padStart(2, '0') +
      ':' +
      String(date.getSeconds()).padStart(2, '0');
    return formattedDate;
  };

  const handleSubmit = () => {
    const date = new Date();
    const formattedDate = formatDate(date);

    const newMessage = {
      id: messages.length + 1,
      senderName: 'You', // Assuming the user's name is 'You'
      messageText: inputMessage,
      timestamp: formattedDate
    };

    const messageToSend = {
      landscapingJobId: 10, // Assuming this is the required ID
      senderName: 'You', // Assuming the user's name is 'You'
      messageText: inputMessage,
      participants: [selectedConversation, 'You'],
      timestamp: formattedDate,
      messageRead: false
    };

    fetch('http://localhost:3001/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageToSend)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        console.log('data', data);
        setInputMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  const handleChange = (event) => {
    setSelectedConversation(event.target.value);
  };

  const handleDelete = (messageId) => {
    const updatedMessages = messages.filter((message) => message.id !== messageId);
    setMessages(updatedMessages);
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="conversation-select-label" sx={{ marginBottom: '40px', color: 'white' }}>
              Select Conversation
            </InputLabel>
            <div style={{ color: 'white' }}>d</div>

            <Select labelId="conversation-select-label" id="conversation-select" value={selectedConversation} onChange={handleChange}>
              {conversations.map((sender, index) => (
                <MenuItem key={index} value={sender}>
                  {sender}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TabPanel value={selectedConversation} index={selectedConversation}>
            <Typography variant="h6">Messages</Typography>
            <List sx={{ maxHeight: isLessThan600 ? 'calc(100vh - 350px)' : 400, overflow: 'auto' }}>
              {messages
                .filter((message) => message.senderName === selectedConversation)
                .map((message) => (
                  <ListItem
                    key={message.id}
                    alignItems="flex-start"
                    style={{ flexDirection: 'row', justifyContent: message.senderName === 'You' ? 'flex-end' : 'flex-start' }}
                  >
                    <ListItemText
                      primary={
                        <>
                          <Typography variant="body2" component="span" color="text.secondary" ml={1}>
                            {message.senderName}
                          </Typography>
                          <Typography variant="body2" component="span" color="text.secondary" ml={1}>
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </>
                      }
                      secondary={
                        <>
                          <Stack direction="column">
                            <Typography variant="body2" component="span" fontWeight="bold">
                              {message.messageText}
                            </Typography>
                          </Stack>{' '}
                          <IconButton onClick={() => handleDelete(message.id)} aria-label="delete message">
                            <DeleteIcon />
                          </IconButton>
                        </>
                      }
                      style={{ textAlign: message.senderName === 'You' ? 'right' : 'left' }}
                    />
                  </ListItem>
                ))}
              <div ref={messagesEndRef} />
            </List>{' '}
            <div style={{ width: '100%' }}>
              <TextField
                label="Type a message..."
                variant="outlined"
                fullWidth
                value={inputMessage}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <div style={{ textAlign: isLessThan600 ? 'center' : 'left' }}>
                <Button variant="contained" onClick={handleSubmit} sx={{ mt: 1, display: 'inline-block' }}>
                  Send
                </Button>
              </div>
            </div>
          </TabPanel>
        </Paper>
      </Grid>
    </>
  );
}

export default CrewMessage;
