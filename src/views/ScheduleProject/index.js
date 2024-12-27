import React from 'react';
import { Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Address from './Address';
import PropertyDetails from './PropertyDetails';
import Review from './Review';
import Stack from '@mui/material/Stack';
import Scheduling from './Scheduling';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const steps = ['Customer Information', 'Service Items', 'Scheduling', 'Notes & Attachments'];

// const [customerId, setCustomerId] = useState(0);
// const [jobTitle, setJobTitle] = useState('New Job');
// const [jobDescription, setJobDescription] = useState('New Job');
// const [estimatedPrice, setEstimatedPrice] = useState(0);
// const [truePrice, setTruePrice] = useState(0);
// const [customerName, setCustomerName] = useState('Name');
// const [customerAddress, setCustomerAddress] = useState('Address');
// const [address, setAddress] = useState('Address');
// const [equipment, setEquipment] = useState('Equipment');
// const [equipmentReadyToGo, setEquipmentReadyToGo] = useState(false); // Default to a boolean value
// const [invoicePaid, setInvoicePaid] = useState(false); // Default to a boolean value
// const [whosOnJob, setWhosOnJob] = useState(['']);
// const [serviceItems, setServiceItems] = useState(['']);
// const [frequencies, setFrequencies] = useState([]);

// // const [selectedItemsNew, setSelectedItemsNew] = useState([]);
// const [totalCostNew, setTotalCostNew] = useState(0);

// const dataCallObject = {
//   JobTitle: jobTitle,
//   JobDescription: jobDescription,
//   EstimatedPrice: estimatedPrice,
//   TruePrice: truePrice,
//   CustomerName: customerName,
//   CustomerAddress: customerAddress,
//   Address: address,
//   Equipment: equipment,
//   EquipmentReadyToGo: equipmentReadyToGo,
//   InvoicePaid: invoicePaid,
//   WhosOnJob: whosOnJob,
//   // selectedMembers,
//   ServiceItems: serviceItems,
//   JobNotes: jobNotes,
//   Frequencies: frequencies,
//   JobDate: formatJobDate(jobDate)
// };

// create the customer
// create the Job
// create the invoice (customer idID, job id)

function CustomerModal() {
  const [chosenCustomer, setChosenCustomer] = useState([]);
  const [selectedItemsNew, setSelectedItemsNew] = useState([]);
  const [totalCostNew, setTotalCostNew] = useState(0);
  const [subtotalNew, setSubtotalNew] = useState(0);
  const [jobDate, setJobDate] = useState('');
  const [jobNotes, setJobNotes] = useState('Notes');

  const [discountPercentageNew, setDiscountPercentageNew] = useState(0);
  const [taxPercentageNew, setTaxPercentageNew] = useState(0);

  const handleShowToast = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    }
  };

  const [newFormData, setNewFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    email: '',
    phone: '',
    phone2: '',
    companyName: '',
    tag: [], // Tags as an array
    city: '',
    state: '',
    zip: '',
    notes: '',
    billingSameAddress: true, // Convert to boolean
    invoices: '',
    activeJobs: 0,
    quotes: 0,
    scheduledJobs: 0,
    frequencies: '',
    status: 'Active',
    nextServiceDate: null, // Keep as date
    service: [],
    activeCustomer: true, // Convert to boolean
    created_at: null // Add created_at for timestamp
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    email: '',
    phone: '',
    phone2: '',
    companyName: '',
    tag: [], // Tags as an array
    city: '',
    state: '',
    zip: '',
    notes: '',
    billingSameAddress: true, // Convert to boolean
    invoices: '',
    activeJobs: 0,
    quotes: 0,
    scheduledJobs: 0,
    frequencies: '',
    status: 'Active',
    nextServiceDate: null, // Keep as date
    service: [],
    activeCustomer: true, // Convert to boolean
    created_at: null // Add created_at for timestamp
  });

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Address
            setNewFormData={setNewFormData}
            newFormData={newFormData}
            setFormData={setFormData}
            formData={formData}
            setChosenCustomer={setChosenCustomer}
            chosenCustomer={chosenCustomer}
            handleSaveCustomer={handleSaveCustomer}
          />
        );
      case 1:
        return (
          <PropertyDetails
            setDiscountPercentageNew={setDiscountPercentageNew}
            setTaxPercentageNew={setTaxPercentageNew}
            selectedItemsNew={selectedItemsNew}
            setSelectedItemsNew={setSelectedItemsNew}
            totalCostNew={totalCostNew}
            setTotalCostNew={setTotalCostNew}
            setSubtotalNew={setSubtotalNew}
            subtotalNew={subtotalNew}
            discountPercentageNew={discountPercentageNew}
            taxPercentageNew={taxPercentageNew}
          />
        );
      case 2:
        return <Scheduling setJobDate={setJobDate} />;
      case 3:
        return <Review setJobNotes={setJobNotes} />;
      default:
        throw new Error('Unknown step');
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleClickJob = () => {
    navigate('/JobDashboard');
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const isLessThan600 = useMediaQuery('(max-width:600px)');

  const handleSaveCustomer = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/customers/update/${chosenCustomer[0].id}`, formData);
      console.log('Customer updated:', response.data);

      handleShowToast('Customer updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating customer:', error);
      handleShowToast('Failed to update customer.', 'error');
    }
  };

  const handleSaveItems = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/invoice`, selectedItemsNew);
      console.log('Customer updated:', response.data);

      handleShowToast('Customer updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating customer:', error);
      handleShowToast('Failed to update customer.', 'error');
    }
  };
  const handleSubmitToDB = () => {
    handleSaveCustomer();
  };
  console.log('#1 selectedItemsNew', selectedItemsNew);
  handleSaveItems;
  console.log('#2 totalCostNew', totalCostNew);
  console.log('#3 subtotalNew', subtotalNew);
  console.log('#3.2 discountPercentage', discountPercentageNew);
  console.log('#3.5 taxPercentage', taxPercentageNew);

  console.log('#4 jobDate', jobDate);
  console.log('#5 jobNotes', jobNotes);

  return (
    <Box
      sx={{
        // Ensuring the modal content is properly styled
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiPaper-root': {
          overflowY: 'auto',
          minWidth: isLessThan600 ? 350 : 900
        }
      }}
    >
      <CssBaseline />

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography component="h1" variant="h4" align="center">
          New Job
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Job Added!
            </Typography>
            <Stack direction={'row'}>
              <Typography variant="subtitle1">See Job in dashboard?</Typography>
              <Button onClick={handleClickJob} variant="contained" sx={{ ml: 1 }}>
                See Job
              </Button>
            </Stack>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              {activeStep === steps.length - 1 ? (
                <Button variant="contained" onClick={handleSubmitToDB} sx={{ mt: 3, ml: 1 }}>
                  Submit
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                  Next
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Box>
  );
}

export default CustomerModal;
