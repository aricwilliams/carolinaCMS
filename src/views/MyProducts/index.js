import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox,
  Button,
  TextField
} from '@mui/material';
import axios from 'axios';

const LandscapeInvoice = () => {
  const [landscapingItems, setLandscapingItems] = useState([]);
  const [newItem, setNewItem] = useState({ ProductDetail: '', Cost: '' });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchLandscapingItems();
  }, []);

  // Fetch all items
  const fetchLandscapingItems = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products');
      const items = response.data;
      setLandscapingItems(items);

      // Initialize selectedItems state
      const initialSelectedItems = {};
      items.forEach((item) => {
        initialSelectedItems[item.Id] = item.QuickSelectOption;
      });
      setSelectedItems(initialSelectedItems);
    } catch (error) {
      console.error('Error fetching landscaping items:', error);
    }
  };

  const handleCheckboxChange = async (itemId, newQuickSelectOption) => {
    try {
      // Find the item in the current state
      const itemToUpdate = landscapingItems.find((item) => item.Id === itemId);

      if (!itemToUpdate) {
        console.error(`Item with Id ${itemId} not found`);
        return;
      }

      // Make the PUT request with all fields
      await axios.put(`http://127.0.0.1:8000/api/products/${itemId}/`, {
        ProductDetail: itemToUpdate.ProductDetail, // Include existing ProductDetail
        Cost: itemToUpdate.Cost, // Include existing Cost
        QuickSelectOption: newQuickSelectOption // Update QuickSelectOption
      });

      // Update the local state
      setLandscapingItems((prevItems) =>
        prevItems.map((item) => (item.Id === itemId ? { ...item, QuickSelectOption: newQuickSelectOption } : item))
      );
    } catch (error) {
      console.error('Error updating QuickSelectOption:', error);
    }
  };

  // Handle new item form submission
  const handleNewItemSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/products', {
        ProductDetail: newItem.ProductDetail,
        Cost: parseFloat(newItem.Cost), // Convert to number
        QuickSelectOption: false
      });
      setLandscapingItems((prevItems) => [...prevItems, response.data]);
      setNewItem({ ProductDetail: '', Cost: '' });
    } catch (error) {
      console.error('Error creating new item:', error);
    }
  };

  // Handle edit
  const handleEditClick = (item) => {
    setEditItem({ ...item }); // Set the selected item in edit mode
  };

  const handleEditChange = (field, value) => {
    setEditItem((prevEditItem) => ({
      ...prevEditItem,
      [field]: value
    }));
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/products/${editItem.Id}/`, {
        ProductDetail: editItem.ProductDetail,
        Cost: parseFloat(editItem.Cost), // Convert to number
        QuickSelectOption: editItem.QuickSelectOption
      });
      setLandscapingItems((prevItems) => prevItems.map((item) => (item.Id === editItem.Id ? { ...editItem } : item)));
      setEditItem(null); // Exit edit mode
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  // Handle item deletion
  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${itemId}/`);
      setLandscapingItems((prevItems) => prevItems.filter((item) => item.Id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Landscape Services Invoice
      </Typography>

      {/* Add New Item Form */}
      <form onSubmit={handleNewItemSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          label="Service Detail"
          value={newItem.ProductDetail}
          onChange={(e) => setNewItem({ ...newItem, ProductDetail: e.target.value })}
          required
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Cost"
          type="number"
          value={newItem.Cost}
          onChange={(e) => setNewItem({ ...newItem, Cost: e.target.value })}
          required
          style={{ marginRight: '10px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Service
        </Button>
      </form>

      {/* Display Items Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Active Service?</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {landscapingItems.map((item) => (
              <TableRow key={item.Id}>
                <TableCell>
                  {editItem && editItem.Id === item.Id ? (
                    <TextField value={editItem.ProductDetail} onChange={(e) => handleEditChange('ProductDetail', e.target.value)} />
                  ) : (
                    item.ProductDetail
                  )}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={item.QuickSelectOption || false}
                    onChange={() => handleCheckboxChange(item.Id, !item.QuickSelectOption)}
                  />
                </TableCell>
                <TableCell>
                  {editItem && editItem.Id === item.Id ? (
                    <TextField value={editItem.Cost} type="number" onChange={(e) => handleEditChange('Cost', e.target.value)} />
                  ) : (
                    `$${item.Cost}`
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.Id === item.Id ? (
                    <>
                      <Button variant="contained" color="primary" onClick={handleEditSave} style={{ marginRight: '10px' }}>
                        Save
                      </Button>
                      <Button variant="contained" onClick={() => setEditItem(null)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="contained" color="primary" onClick={() => handleEditClick(item)} style={{ marginRight: '10px' }}>
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleDeleteItem(item.Id)}>
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LandscapeInvoice;
