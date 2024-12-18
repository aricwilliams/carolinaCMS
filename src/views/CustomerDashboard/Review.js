import React, { useEffect } from 'react';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import axios from 'axios';

export default function Review({ formData, handleInputChange }) {
  // const [availableServices, setAvailableServices] = useState([]);
  // const [additionalServiceOptions, setAdditionalServiceOptions] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [selectedAdditionalService, setSelectedAdditionalService] = useState('');

  // const { service: selectedServices = [] } = formData;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        const services = response.data.map((service) => ({
          name: service.name,
          detail: service.productDetail,
          cost: service.cost,
          quickSelectOption: service.quickSelectOption
        }));

        const quickSelectServices = services.filter((service) => service.quickSelectOption);
        const additionalServices = services.filter((service) => !service.quickSelectOption);

        setAvailableServices(quickSelectServices);
        setAdditionalServiceOptions(additionalServices);

        // Initialize selected services and total price with quick select options
        setTotalPrice(0);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // const handleCheckboxChange = (serviceName, price) => {
  //   let updatedServices;
  //   let updatedPrice = totalPrice;

  //   if (selectedServices.includes(serviceName)) {
  //     updatedServices = selectedServices.filter((service) => service !== serviceName);
  //     updatedPrice -= parseInt(price.replace('$', ''), 10);
  //   } else {
  //     updatedServices = [...selectedServices, serviceName];
  //     updatedPrice += parseInt(price.replace('$', ''), 10);
  //   }

  //   setTotalPrice(updatedPrice);
  //   handleInputChange({
  //     target: {
  //       name: 'service', // Ensure this matches the key in formData
  //       value: updatedServices
  //     }
  //   });
  // };

  // const handleAddService = () => {
  //   const serviceToAdd = additionalServiceOptions.find((service) => service.name === selectedAdditionalService);
  //   if (serviceToAdd) {
  //     setAvailableServices([...availableServices, serviceToAdd]);
  //     setAdditionalServiceOptions(additionalServiceOptions.filter((service) => service.name !== selectedAdditionalService));
  //     setSelectedAdditionalService('');
  //   }
  // };

  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Fast Addon services to customer & Add Notes
      </Typography>
      <List disablePadding>
        {availableServices?.map((service) => (
          <ListItem key={service.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={service.name} />
            <ListItemText primary={service.productDetail} />
            <Typography variant="body2">{service.cost}</Typography>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(service.name, service.cost)}
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
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={8}>
          <Select value={selectedAdditionalService} onChange={(e) => setSelectedAdditionalService(e.target.value)} displayEmpty fullWidth>
            <MenuItem value="" disabled>
              Select additional service
            </MenuItem>
            {additionalServiceOptions.map((service) => (
              <MenuItem key={service.name} value={service.name}>
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary" onClick={handleAddService} disabled={!selectedAdditionalService}>
            Add Service
          </Button>
        </Grid>
      </Grid> */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <TextField
          id="outlined-multiline-static"
          name="notes"
          label="Notes"
          multiline
          placeholder="Example: Customer will not speak with Joe"
          rows={8}
          sx={{ width: '100%' }}
          value={formData.notes || ''}
          onChange={handleInputChange}
        />
      </Grid>
    </React.Fragment>
  );
}
