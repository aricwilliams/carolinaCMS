import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function PropertyDetails() {
  const [invoice, setInvoice] = React.useState('');
  const [showInvoice, setShowInvoice] = useState(false);
  const handleShowCheckboxInvoice = (event) => {
    setShowInvoice(event.target.checked);
  };

  const handleChangeInvoice = (event) => {
    setInvoice(event.target.value);
  };

  const [landscapingItems] = useState([
    { id: 1, name: 'Shrubs', cost: 30 },
    { id: 2, name: 'Mulch', cost: 25 },
    { id: 3, name: 'Flowering Plants', cost: 20 },
    { id: 4, name: 'Pavers', cost: 50 },
    { id: 5, name: 'Grass Seeds', cost: 15 },
    { id: 6, name: 'Fertilizer', cost: 10 },
    { id: 7, name: 'Garden Tools Set', cost: 100 },
    { id: 8, name: 'Sprinkler System', cost: 200 },
    { id: 9, name: 'Garden Lights', cost: 50 },
    { id: 10, name: 'Hose Reel', cost: 30 },
    { id: 11, name: 'Garden Gloves', cost: 15 },
    { id: 12, name: 'Weed Barrier Fabric', cost: 20 },
    { id: 13, name: 'Boulders', cost: 75 },
    { id: 14, name: 'Trellis', cost: 40 },
    { id: 15, name: 'Fountain', cost: 300 }
    // Add more items as needed
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);

  const handleDescriptionChange = (itemId, newDescription) => {
    const updatedItems = selectedItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, description: newDescription };
      }
      return item;
    });

    setSelectedItems(updatedItems);
  };

  const handleCheckboxChange = (item) => {
    const isItemSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);

    if (!isItemSelected) {
      setSelectedItems([...selectedItems, { ...item, quantity: 1, unitPrice: item.cost }]);
    } else {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = selectedItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setSelectedItems(updatedItems);
  };

  const handleUnitPriceChange = (itemId, newUnitPrice) => {
    const updatedItems = selectedItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, unitPrice: newUnitPrice };
      }
      return item;
    });

    setSelectedItems(updatedItems);
  };

  const calculateSubtotal = () => {
    const newSubtotal = selectedItems.reduce((acc, item) => {
      return acc + item.quantity * item.unitPrice;
    }, 0);
    setSubtotal(newSubtotal);
    calculateTotalCost(newSubtotal);
  };

  const calculateTotalCost = (newSubtotal) => {
    const newDiscount = (newSubtotal * discountPercentage) / 100;
    const newTaxableAmount = newSubtotal - newDiscount;
    const newTax = (newTaxableAmount * taxPercentage) / 100;
    const newTotal = newTaxableAmount + newTax;
    setTotalCost(newTotal);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Property details
      </Typography>

      <Grid item xs={12} sm={6}>
        <Stack>
          <FormControlLabel control={<Checkbox onChange={handleShowCheckboxInvoice} />} label="Existing Invoice?" />
          {showInvoice && (
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Choose Invoice</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={invoice}
                onChange={handleChangeInvoice}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={40}>Luna Star Invoice</MenuItem>
                <MenuItem value={50}>Phoenix Blaze Invoice</MenuItem>
                <MenuItem value={60}>Nova Spark Invoice</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper square={false} elevation={3} sx={{ width: '100%', p: 3 }}>
            <Grid container spacing={3}>
              {landscapingItems.map((item) => (
                <Grid item xs={2} key={item.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    }
                    label={<Typography fontWeight="bold">{item.name}</Typography>}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper square={false} elevation={3} sx={{ width: '100%', p: 3 }}>
            {selectedItems.map((item) => (
              <div key={item.id}>
                <Typography fontWeight="bold" sx={{ my: 1 }}>
                  {item.name}
                </Typography>
                <TextField
                  type="number"
                  label="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
                {' x '}
                <TextField
                  type="number"
                  label="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) => handleUnitPriceChange(item.id, parseInt(e.target.value))}
                />
                {' = '}${item.quantity * item.unitPrice}
                <TextField
                  label="Description"
                  variant="outlined"
                  value={item.description}
                  onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                  sx={{ mt: -2 }}
                />
              </div>
            ))}
            <Typography fontWeight="bold" sx={{ mt: 5 }}>
              Subtotal: ${subtotal.toFixed(2)}
            </Typography>
            <TextField
              label="Discount (%)"
              variant="outlined"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(parseFloat(e.target.value))}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Tax (%)"
              variant="outlined"
              value={taxPercentage}
              onChange={(e) => setTaxPercentage(parseFloat(e.target.value))}
              sx={{ mt: 2 }}
            />
            <Typography fontWeight="bold" sx={{ mt: 5 }}>
              Required Down Payment: ?
            </Typography>
            <br></br>
            <Stack direction={'row'} alignItems="center">
              <Button variant="contained" onClick={calculateSubtotal} sx={{ mt: 3 }}>
                Calculate Total:
              </Button>
              <Typography sx={{ pt: 3, ml: 2 }} fontWeight="bold">
                ${totalCost.toFixed(2)}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
