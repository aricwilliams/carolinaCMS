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
  Select,
  IconButton,
  Box,
  useMediaQuery
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [newConversation, setNewConversation] = useState('');
  const isLessThan600 = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/conversations')
      .then((response) => response.json())
      .then((data) => {
        setConversations(data);
        if (data.length > 0) {
          setSelectedConversation(data[0].conversation_id); // Set the first conversation as the default
        }
      })
      .catch((error) => console.error('Error fetching conversations:', error));
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetch(`http://127.0.0.1:8000/api/messages?conversation_id=${selectedConversation}`)
        .then((response) => response.json())
        .then((data) => {
          setMessages(data);
        })
        .catch((error) => console.error('Error fetching messages:', error));
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleNewConversationChange = (event) => {
    setNewConversation(event.target.value);
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
    if (!inputMessage || !selectedConversation) return;

    const date = new Date();
    const formattedDate = formatDate(date);

    const newMessage = {
      // message_id: messages.length + 1,
      sender_name: 'You', // Assuming the user's name is 'You'
      message_text: inputMessage,
      timestamp: formattedDate,
      conversation_id: selectedConversation,
      landscaping_job_id: 10, // Assuming this is the required ID
      message_read: false
    };

    fetch('http://127.0.0.1:8000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        setInputMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  const handleChange = (event) => {
    setSelectedConversation(event.target.value);
  };
  const handleNewConversation = () => {
    if (!newConversation) return;

    const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format datetime to 'YYYY-MM-DD HH:MM:SS'

    fetch('http://127.0.0.1:8000/api/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        created_at: currentTime,
        updated_at: currentTime,
        name: newConversation
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setConversations((prevConversations) => [...prevConversations, data]);
        setSelectedConversation(data.conversation_id);
        setNewConversation('');
      })
      .catch((error) => console.error('Error creating conversation:', error)); // Ensure this is chained correctly
  };

  const handleDelete = (messageId) => {
    fetch(`http://127.0.0.1:8000/api/messages/${messageId}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const updatedMessages = messages.filter((message) => message.message_id !== messageId);
        setMessages(updatedMessages);
      })
      .catch((error) => console.error('Error deleting message:', error));
  };
  console.log('ddd', conversations);
  return (
    <>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Stack direction="row" spacing={2} sx={{ padding: '20px' }}>
            <Box sx={{ width: '50%' }}>
              <FormControl fullWidth>
                <InputLabel id="conversation-select-label">Select Conversation</InputLabel>
                <Select labelId="conversation-select-label" id="conversation-select" value={selectedConversation} onChange={handleChange}>
                  {conversations.map((conversation) => (
                    <MenuItem key={conversation.conversation_id} value={conversation.conversation_id}>
                      {conversation.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: '50%' }}>
              <TextField
                label="New Conversation"
                variant="outlined"
                fullWidth
                value={newConversation}
                onChange={handleNewConversationChange}
                sx={{ mt: 2 }}
              />
              <Button variant="contained" onClick={handleNewConversation} sx={{ mt: 1, display: 'inline-block' }}>
                Add Conversation
              </Button>
            </Box>
          </Stack>

          <TabPanel value={selectedConversation} index={selectedConversation}>
            <Typography variant="h6">Messages</Typography>
            <List sx={{ maxHeight: isLessThan600 ? 'calc(100vh - 350px)' : 400, overflow: 'auto' }}>
              {messages
                .filter((message) => message.conversation_id === selectedConversation)
                .map((message) => (
                  <ListItem
                    key={message.message_id}
                    alignItems="flex-start"
                    style={{ flexDirection: 'row', justifyContent: message.sender_name === 'You' ? 'flex-end' : 'flex-start' }}
                  >
                    <ListItemText
                      primary={
                        <>
                          <Typography variant="body2" component="span" color="text.secondary" ml={1}>
                            {message.sender_name}
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
                              {message.message_text}
                            </Typography>
                          </Stack>{' '}
                          <IconButton onClick={() => handleDelete(message.message_id)} aria-label="delete message">
                            <DeleteIcon />
                          </IconButton>
                        </>
                      }
                      style={{ textAlign: message.sender_name === 'You' ? 'right' : 'left' }}
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
