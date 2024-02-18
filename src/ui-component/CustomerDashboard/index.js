import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';
import Paper from '@mui/material/Paper';

function RecentUsersList() {
  const users = [
    { 
      firstName: 'Isabella',
      lastName: 'Christensen',
      address: '123 Main St',
      serviceItem: 'Multch',
      date: '2024-05-11T12:56:00', 
      lorem: 'Lorem Ipsum is simply...' 
    },
    { 
      firstName: 'Mathilde',
      lastName: 'Andersen',
      address: '456 Elm St',
      serviceItem: 'Weekly',
      date: '2024-05-11T10:35:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    },
    { 
      firstName: 'Karla',
      lastName: 'Sorensen',
      address: '789 Oak St',
      serviceItem: 'Bi-Weekly',
      date: '2024-05-09T17:38:00', 
      lorem: 'Lorem Ipsum is simply...' 
    },
    { 
      firstName: 'Ida',
      lastName: 'Jorgensen',
      address: '1011 Pine St',
      serviceItem: 'Irrigation',
      date: '2024-01-19T12:56:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    },
    { 
      firstName: 'Albert',
      lastName: 'Andersen',
      address: '1213 Cedar St',
      serviceItem: 'Monthly',
      date: '2024-02-19T12:56:00', 
      lorem: 'Lorem Ipsum is simply dummy...' 
    },
    { 
      firstName: 'Isabella',
      lastName: 'Christensen',
      address: '123 Main St',
      serviceItem: 'Multch',
      date: '2024-05-11T12:56:00', 
      lorem: 'Lorem Ipsum is simply...' 
    },
    { 
      firstName: 'Mathilde',
      lastName: 'Andersen',
      address: '456 Elm St',
      serviceItem: 'Weekly',
      date: '2024-05-11T10:35:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    },
    { 
      firstName: 'Karla',
      lastName: 'Sorensen',
      address: '789 Oak St',
      serviceItem: 'Bi-Weekly',
      date: '2024-05-09T17:38:00', 
      lorem: 'Lorem Ipsum is simply...' 
    },
    { 
      firstName: 'Ida',
      lastName: 'Jorgensen',
      address: '1011 Pine St',
      serviceItem: 'Irrigation',
      date: '2024-01-19T12:56:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    },
    { 
      firstName: 'Albert',
      lastName: 'Andersen',
      address: '1213 Cedar St',
      serviceItem: 'Monthly',
      date: '2024-02-19T12:56:00', 
      lorem: 'Lorem Ipsum is simply dummy...' 
    },
    { 
      firstName: 'Sophia',
      lastName: 'Martinez',
      address: '789 Birch St',
      serviceItem: 'Bi-Weekly',
      date: '2024-03-20T08:00:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    },
    { 
      firstName: 'William',
      lastName: 'Brown',
      address: '456 Pine St',
      serviceItem: 'Monthly',
      date: '2024-04-15T14:30:00', 
      lorem: 'Lorem Ipsum is simply dummy...' 
    },
    { 
      firstName: 'Olivia',
      lastName: 'Garcia',
      address: '1011 Elm St',
      serviceItem: 'Weekly',
      date: '2024-05-05T09:45:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    },
    { 
      firstName: 'James',
      lastName: 'Smith',
      address: '222 Cedar St',
      serviceItem: 'Irrigation',
      date: '2024-06-10T11:20:00', 
      lorem: 'Lorem Ipsum is simply...' 
    },
    { 
      firstName: 'Amelia',
      lastName: 'Jones',
      address: '777 Maple St',
      serviceItem: 'Monthly',
      date: '2024-07-12T13:15:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    },
    { 
      firstName: 'Liam',
      lastName: 'Wilson',
      address: '888 Oak St',
      serviceItem: 'Weekly',
      date: '2024-08-25T09:30:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    },
    { 
      firstName: 'Charlotte',
      lastName: 'Taylor',
      address: '999 Elm St',
      serviceItem: 'Bi-Weekly',
      date: '2024-09-15T17:00:00', 
      lorem: 'Lorem Ipsum is simply...' 
    },
    { 
      firstName: 'Noah',
      lastName: 'Martinez',
      address: '666 Pine St',
      serviceItem: 'Monthly',
      date: '2024-10-20T12:45:00', 
      lorem: 'Lorem Ipsum is simply dummy...' 
    },
    { 
      firstName: 'Sophia',
      lastName: 'Anderson',
      address: '777 Cedar St',
      serviceItem: 'Weekly',
      date: '2024-11-11T08:15:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    },
    { 
      firstName: 'Logan',
      lastName: 'Thompson',
      address: '888 Birch St',
      serviceItem: 'Bi-Weekly',
      date: '2024-12-05T16:30:00', 
      lorem: 'Lorem Ipsum is simply dummy...' 
    },
    { 
      firstName: 'Mia',
      lastName: 'Davis',
      address: '555 Oak St',
      serviceItem: 'Monthly',
      date: '2025-01-18T11:00:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    },
    { 
      firstName: 'Henry',
      lastName: 'Johnson',
      address: '444 Elm St',
      serviceItem: 'Weekly',
      date: '2025-02-19T09:00:00', 
      lorem: 'Lorem Ipsum is simply...' 
    },
    { 
      firstName: 'Emily',
      lastName: 'Brown',
      address: '333 Pine St',
      serviceItem: 'Bi-Weekly',
      date: '2025-03-12T14:45:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    },
    { 
      firstName: 'Jacob',
      lastName: 'Wilson',
      address: '222 Cedar St',
      serviceItem: 'Monthly',
      date: '2025-04-05T13:20:00', 
      lorem: 'Lorem Ipsum is simply dummy...' 
    },
    { 
      firstName: 'Elizabeth',
      lastName: 'Taylor',
      address: '111 Oak St',
      serviceItem: 'Weekly',
      date: '2025-05-10T10:30:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    },
    { 
      firstName: 'Michael',
      lastName: 'Anderson',
      address: '999 Elm St',
      serviceItem: 'Bi-Weekly',
      date: '2025-06-15T15:00:00', 
      lorem: 'Lorem Ipsum is simply...' 
    },
    { 
      firstName: 'Emma',
      lastName: 'Garcia',
      address: '777 Pine St',
      serviceItem: 'Monthly',
      date: '2025-07-20T12:15:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    },
    { 
      firstName: 'Alexander',
      lastName: 'Martinez',
      address: '666 Cedar St',
      serviceItem: 'Weekly',
      date: '2025-08-25T08:30:00', 
      lorem: 'Lorem Ipsum is simply text of...' 
    }
  ];

  
  const isDateSoon = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const differenceInDays = Math.ceil((date - currentDate) / (1000 * 60 * 60 * 24));
    
    if (differenceInDays <= 0) {
      return 'red'; // Past date
    } else if (differenceInDays <= 3) {
      return '#d1f9ff'; // Within 3 days
    } else {
      return 'white'; // Default color
    }
  };
  
  return (
    <List>
      {users.map((user, index) => (
        <Paper elevation={3} key={index} sx={{ my: 1, backgroundColor: isDateSoon(user.date) }}>
          <ListItem>
            <ListItemText sx={{ width: '20px'}}
              primary="Name" 
              secondary={`${user.firstName} ${user.lastName}`} 
            />
            <ListItemText 
              primary="Address" 
              secondary={`${user.address}`} 
            />
            <ListItemText
              primary="Service Item" 
              secondary={`${user.serviceItem}`} 
              style={{ margin: 0 }}
            />
            <ListItemText
              primary="Date" 
              secondary={user.date} 
              style={{ margin: 0 }}
            />
            <ListItemSecondaryAction>
              <Button color="secondary" variant="contained" style={{ marginRight: 8 }}>
                Edit
              </Button>
              <Button color="error" variant="contained">
                Delete
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}

export default RecentUsersList;
