import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Checkbox } from '@mui/material';
import axios from 'axios';

const LandscapeInvoice = () => {
  const [landscapingItems, setLandscapingItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    const fetchLandscapingItems = async () => {
      try {
        const response = await axios.get('https://localhost:7185/api/Products');
        const items = response.data;
        setLandscapingItems(items);

        // Initialize selectedItems state
        const initialSelectedItems = {};
        items.forEach((item) => {
          initialSelectedItems[item.id] = item.quickSelectOption;
        });
        setSelectedItems(initialSelectedItems);
      } catch (error) {
        console.error('Error fetching landscaping items:', error);
      }
    };

    fetchLandscapingItems();
  }, []);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: !prevSelectedItems[itemId]
    }));
  };

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
              <TableCell>Quick Select Option</TableCell>
              <TableCell>Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {landscapingItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.name}
                  <br />
                  <Typography variant="body2" color="textSecondary">
                    {item.productDetail}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Checkbox checked={selectedItems[item.id] || false} onChange={() => handleCheckboxChange(item.id)} />
                </TableCell>
                <TableCell>${item.cost.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LandscapeInvoice;
