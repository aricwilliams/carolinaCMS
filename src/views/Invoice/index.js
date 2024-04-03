import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Menu, MenuItem } from '@mui/material';

const LandscapeInvoice = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [landscapingItems] = React.useState([
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
  ]);

  const subtotal = landscapingItems.reduce((acc, item) => acc + item.cost, 0);
  const taxRate = 0.1; // 10% tax rate for example
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Landscape Services Invoice
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {landscapingItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>${item.cost.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" align="right">
                  Subtotal: ${subtotal.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" align="right">
                  Tax ({(taxRate * 100).toFixed(2)}%): ${tax.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="h6" align="right">
                  Total: ${total.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '20px' }}>
        <Button id="invoice-menu" aria-controls="invoice-menu" aria-haspopup="true" onClick={handleMenuClick} variant="contained">
          Options
        </Button>
        <Menu id="invoice-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Save Invoice</MenuItem>
          <MenuItem onClick={handleClose}>Send Invoice</MenuItem>
          <MenuItem onClick={handleClose}>Schedule to Send Invoice</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default LandscapeInvoice;
