import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const services = [
  {
    name: 'Lawn Mowing',
    desc: 'Mowing your lawn to perfection',
    price: '$50'
  },
  {
    name: 'Hedge Trimming',
    desc: 'Trimming hedges for a tidy look',
    price: '$80'
  },
  {
    name: 'Weed Control',
    desc: 'Controlling unwanted weeds in your garden',
    price: '$60'
  },
  {
    name: 'Planting',
    desc: 'Planting new flowers or shrubs',
    price: '$100'
  },
  {
    name: 'Mulching',
    desc: 'Adding mulch to retain soil moisture and suppress weeds',
    price: '$70'
  }
];

export default function Review() {
  const [selectedServices, setSelectedServices] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const handleCheckboxChange = (serviceName, price) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter((service) => service !== serviceName));
      setTotalPrice(totalPrice - parseInt(price.replace('$', '')));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
      setTotalPrice(totalPrice + parseInt(price.replace('$', '')));
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Attach services to customer & Notes
      </Typography>
      <List disablePadding>
        {services.map((service) => (
          <ListItem key={service.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={service.name} secondary={service.desc} />
            <Typography variant="body2">{service.price}</Typography>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(service.name, service.price)}
              checked={selectedServices.includes(service.name)}
            />
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        {/* Shipping and Payment details section can remain unchanged */}
      </Grid>
    </React.Fragment>
  );
}
