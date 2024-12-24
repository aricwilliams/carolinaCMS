import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import axios from 'axios';

export default function PropertyDetails() {
  const isLessThan600 = useMediaQuery('(max-width:600px)');
  const [error, setError] = useState('new');

  // const [invoiceData, setInvoiceData] = useState({
  //   Id: null,
  //   LandscapingJobId: null,
  //   CustomerId: null,
  //   TotalAmount: 0.0,
  //   TaxRate: 0.0,
  //   TaxAmount: 0.0,
  //   DiscountAmount: 0.0,
  //   SubtotalAmount: 0.0,
  //   PaidAmount: 0.0,
  //   IsPaid: false,
  //   IsSent: false,
  //   ReqDownPayment: false,
  //   DownPaymentAmount: 0.0,
  //   Notes: '',
  //   DateIssued: null,
  //   DueDate: null
  // });

  const [landscapingItems, setLandscapingItems] = useState([]);

  // Fetch items from the API
  const fetchLandscapingItems = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products');
      const items = response.data;
      setLandscapingItems(items);

      // Initialize selectedItems state based on QuickSelectOption
      const initialSelectedItems = {};
      items.forEach((item) => {
        initialSelectedItems[item.Id] = item.QuickSelectOption;
      });
      setSelectedItems(initialSelectedItems);
      if (response != 200) {
        setError('Failed to fetch landscaping items');
      }
    } catch (error) {
      console.error('Error fetching landscaping items:', error);
    }
  };

  // Fetch data when the component loads
  useEffect(() => {
    fetchLandscapingItems();
  }, []);

  // const fetchInvoiceData = async () => {
  //   try {
  //     const response = await axios.get('http://127.0.0.1:8000/api/invoice');
  //     const invoices = response.data;

  //     // Ensure invoices is an array
  //     const invoiceArray = Array.isArray(invoices) ? invoices : [invoices];

  //     // Map through the array to create properly formatted objects
  //     const formattedInvoices = invoiceArray.map((invoice) => ({
  //       Id: invoice.Id || null,
  //       LandscapingJobId: invoice.LandscapingJobId || null,
  //       CustomerId: invoice.CustomerId || null,
  //       TotalAmount: invoice.TotalAmount || 0.0,
  //       TaxRate: invoice.TaxRate || 0.0,
  //       TaxAmount: invoice.TaxAmount || 0.0,
  //       DiscountAmount: invoice.DiscountAmount || 0.0,
  //       SubtotalAmount: invoice.SubtotalAmount || 0.0,
  //       PaidAmount: invoice.PaidAmount || 0.0,
  //       IsPaid: invoice.IsPaid || false,
  //       IsSent: invoice.IsSent || false,
  //       ReqDownPayment: invoice.ReqDownPayment || false,
  //       DownPaymentAmount: invoice.DownPaymentAmount || 0.0,
  //       Notes: invoice.Notes || '',
  //       DateIssued: invoice.DateIssued || null,
  //       DueDate: invoice.DueDate || null
  //     }));

  //     // Update state with the formatted array
  //     setInvoiceData(formattedInvoices);
  //   } catch (error) {
  //     setError('Failed to fetch landscaping items');
  //     console.error('Error fetching invoice data:', error);
  //   }
  // };

  // // Fetch data when the component loads
  // useEffect(() => {
  //   fetchInvoiceData();
  // }, []);

  const [selectedItemsNew, setSelectedItemsNew] = useState([]);
  const [totalCostNew, setTotalCostNew] = useState(0);

  const [subtotalNew, setSubtotalNew] = useState(0);

  const [discountPercentageNew, setDiscountPercentageNew] = useState(0);
  const [taxPercentageNew, setTaxPercentageNew] = useState(0);

  const handleDescriptionChangeNew = (itemId, newDescription) => {
    const updatedItems = selectedItemsNew.map((item) => {
      if (item.id === itemId) {
        return { ...item, description: newDescription };
      }
      return item;
    });

    setSelectedItemsNew(updatedItems);
  };

  const handleCheckboxChangeNew = (item) => {
    const isItemSelected = selectedItemsNew.some((selectedItem) => selectedItem.Id === item.Id);

    if (!isItemSelected) {
      const updatedItems = [...selectedItemsNew, { ...item, quantity: 1, unitPrice: item.cost }];
      setSelectedItemsNew(updatedItems);
    } else {
      const updatedItems = selectedItemsNew.filter((selectedItem) => selectedItem.Id !== item.Id);
      setSelectedItemsNew(updatedItems);
    }
  };

  const handleQuantityChangeNew = (itemId, newQuantity) => {
    const updatedItems = selectedItemsNew.map((item) => {
      if (item.Id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setSelectedItemsNew(updatedItems);
  };

  const handleUnitPriceChangeNew = (itemId, newUnitPrice) => {
    const updatedItems = selectedItemsNew.map((item) => {
      if (item.Id === itemId) {
        return { ...item, unitPrice: newUnitPrice };
      }
      return item;
    });

    setSelectedItemsNew(updatedItems);
  };

  const calculateSubtotalNew = () => {
    const newSubtotal = selectedItemsNew.reduce((acc, item) => {
      return acc + item.quantity * item.Cost;
    }, 0);
    setSubtotalNew(newSubtotal);
    calculateTotalCostNew(newSubtotal);
  };

  const calculateTotalCostNew = (newSubtotal) => {
    const newDiscount = (newSubtotal * discountPercentageNew) / 100;
    const newTaxableAmount = newSubtotal - newDiscount;
    const newTax = (newTaxableAmount * taxPercentageNew) / 100;
    const newTotal = newTaxableAmount + newTax;
    setTotalCostNew(newTotal);
  };

  // {error && <Typography color="error">{error}</Typography>}
  // {error && <Typography color="error">{error}</Typography>}
  // {error && <Typography color="error">{error}</Typography>}
  // {error && <Typography color="error">{error}</Typography>}
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Invoice details
      </Typography>
      {error != 'new' && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        <Box
          sx={{
            // Ensuring the modal content is properly styled
            display: 'flex',
            alignItems: 'center',
            margin: 'auto',
            justifyContent: 'center',
            '& .MuiPaper-root': {
              overflowY: 'auto',
              minWidth: isLessThan600 ? 320 : 900
            }
          }}
        >
          <Grid item xs={12}>
            <Paper square={false} elevation={3} sx={{ width: '100%', p: 3 }}>
              <Grid container spacing={3}>
                {landscapingItems.map((item) => (
                  <Grid item xs={isLessThan600 ? 4 : 2} key={item.Id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="secondary"
                          checked={selectedItemsNew.some((selectedItem) => selectedItem.Id === item.Id)}
                          onChange={() => handleCheckboxChangeNew(item)}
                        />
                      }
                      label={<Typography fontWeight="bold">{item.ProductDetail}</Typography>}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Box>
        <Box
          sx={{
            // Ensuring the modal content is properly styled
            display: 'flex',
            alignItems: 'center',
            margin: 'auto',
            marginTop: '20px',
            justifyContent: 'center',
            '& .MuiPaper-root': {
              overflowY: 'auto',
              minWidth: isLessThan600 ? 320 : 900
            }
          }}
        >
          <Grid item xs={12}>
            <Paper square={false} elevation={3} sx={{ width: '100%', p: 3 }}>
              {selectedItemsNew.map((item) => (
                <div key={item.Id}>
                  <Typography fontWeight="bold" sx={{ my: 1 }}>
                    {item.ProductDetail}
                  </Typography>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChangeNew(item.Id, parseInt(e.target.value))}
                  />
                  {' x '}
                  <TextField
                    type="number"
                    label="Unit Price"
                    value={item.Cost}
                    onChange={(e) => handleUnitPriceChangeNew(item.Id, parseInt(e.target.value))}
                  />
                  {' = '}${item.quantity * item.Cost}
                  <TextField
                    label="Description"
                    variant="outlined"
                    value={item.ProductDetail}
                    onChange={(e) => handleDescriptionChangeNew(item.Id, e.target.value)}
                    sx={{ mt: -2 }}
                  />
                </div>
              ))}
              <Typography fontWeight="bold" sx={{ mt: 5 }}>
                Subtotal: ${subtotalNew}
              </Typography>
              <TextField
                label="Discount (%)"
                variant="outlined"
                value={discountPercentageNew}
                onChange={(e) => setDiscountPercentageNew(parseFloat(e.target.value))}
                sx={{ mt: 2, mr: 2 }}
              />
              <TextField
                label="Tax (%)"
                variant="outlined"
                value={taxPercentageNew}
                onChange={(e) => setTaxPercentageNew(parseFloat(e.target.value))}
                sx={{ mt: 2 }}
              />{' '}
              <br></br>
              <Stack direction={'row'} alignItems="center">
                <Button variant="contained" onClick={calculateSubtotalNew} sx={{ mt: 3 }}>
                  Calculate Total:
                </Button>
                <Typography sx={{ pt: 3, ml: 2 }} fontWeight="bold">
                  ${totalCostNew}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Box>
      </Grid>
    </React.Fragment>
  );
}
