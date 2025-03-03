import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const MyCard = ({ title, value, onClick }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
            <Stack spacing={1}>
              <Link
                onClick={onClick}
                color="primary"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'none', cursor: 'pointer' } }}
                variant="overline"
              >
                {title}
              </Link>
              <Typography variant="h4" style={{ textAlign: 'center' }}>
                {value}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

function Home() {
  // const isLessThan600 = useMediaQuery('(max-width:600px)');
  let totalProfit = 200;
  const sampleData = {
    targetProfit: 10000
  };
  // const buttonStyle = {
  //   border: 'none',
  //   outline: 'none',
  //   backgroundColor: 'transparent',
  //   color: '#61B7FA',
  //   padding: '1px 1px', // Adjust padding as needed
  //   cursor: 'pointer',
  //   fontSize: '0.8rem',
  //   marginTop: '10px'
  // };
  // const iconStyle = {
  //   transform: 'rotate(180deg)' // Rotate the icon 180 degrees
  // };

  const percentageAchieved = (totalProfit / sampleData.targetProfit) * 100;
  const navigate = useNavigate();
  // Function to handle incrementing totalProfit
  // const incrementTotalProfit = () => {
  //   setTotalProfit((prevTotalProfit) => prevTotalProfit + 100);
  // };

  // // Function to handle decrementing totalProfit
  // const decrementTotalProfit = () => {
  //   setTotalProfit((prevTotalProfit) => prevTotalProfit - 100);
  // };
  const handleClick = () => {
    navigate('/CustomerDashboard');
  };

  // const [file, setFile] = useState(null);

  // const onFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const onUpload = async () => {
  //   const formData = new FormData();
  //   formData.append('video', file);

  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/api/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     alert(response.data.message);
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     alert('Error uploading file');
  //   }
  // };
  return (
    <>
      {/* {userHasData == false ? (
        <>
          <Grid container spacing={3} style={{ marginBottom: 20 }}>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 5 }}>
              <Stack direction="column">
                <Typography variant="h3" gutterBottom>
                  You have no Jobs or Customers, Please add some!
                </Typography>
                <Box sx={{ my: 2 }}></Box>
                <>
                  <Stack direction="row">
                    <Button
                      onClick={handleMakeNewCustomerNoData}
                      variant="outlined"
                      sx={{
                        ml: '20%',
                        mb: 1,
                        animation: isButtonClicked ? 'bounce 1s infinite' : 'none',
                        '@keyframes bounce': {
                          '0%, 20%, 50%, 80%, 100%': {
                            transform: 'translateY(0)'
                          },
                          '40%': {
                            transform: 'translateY(-10px)'
                          },
                          '60%': {
                            transform: 'translateY(-5px)'
                          }
                        }
                      }}
                    >
                      Add First Customer
                    </Button>
                    <Button
                      onClick={handleMakeNewProjectNoData}
                      variant="outlined"
                      sx={{
                        ml: 1,
                        mb: 1,
                        animation: isButtonClicked ? 'myAnim 2s ease 0s infinite normal forwards' : 'none',
                        '@keyframes myAnim': {
                          '0%, 100%': {
                            transform: 'rotate(0deg)',
                            'transform-origin': '50% 100%'
                          },
                          '10%': {
                            transform: 'rotate(2deg)'
                          },
                          '20%, 40%, 60%': {
                            transform: 'rotate(-4deg)'
                          },
                          '30%, 50%, 70%': {
                            transform: 'rotate(4deg)'
                          },
                          '80%': {
                            transform: 'rotate(-2deg)'
                          },
                          '90%': {
                            transform: 'rotate(2deg)'
                          }
                        }
                      }}
                    >
                      Add First Project
                    </Button>
                  </Stack>
                </>
              </Stack>
            </Grid>
          </Grid>
        </>
      ) : ( */}
      <Grid container spacing={3} style={{ marginBottom: 20 }}>
        <Grid item xs={12} sm={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Target till 4/14/24
              </Typography>
              <Typography variant="body1">{`$${totalProfit} / $${sampleData.targetProfit}`}</Typography>
              <LinearProgress
                variant="determinate"
                value={percentageAchieved}
                sx={{
                  height: 20,
                  borderRadius: 10,
                  marginTop: 2,
                  marginBottom: 2,
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 10,
                    backgroundColor: '#4caf50'
                  }
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {`${percentageAchieved}% Achieved`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* <Box style={{ margin: isLessThan600 ? 'auto' : 0 }}>
              <Button style={buttonStyle} onClick={decrementTotalProfit} variant="contained" disableElevation>
                <PlayArrowIcon style={iconStyle} />
              </Button>
              <Button style={buttonStyle} onClick={incrementTotalProfit} variant="contained" disableElevation>
                <PlayArrowIcon />
              </Button>
            </Box> */}
      </Grid>
      <Grid container spacing={3}>
        <MyCard title="Unpaid Invoices" value={5} onClick={handleClick} />
        <MyCard title="Invoices Total" value={14} onClick={handleClick} />
        <MyCard title="Projects Total" value={19} onClick={handleClick} />
        <MyCard title="Unaccepted Quotes" value={2} onClick={handleClick} />
        <MyCard title="Potential Deals" value={3} onClick={handleClick} />
        <MyCard title="Completed Sales" value={13} onClick={handleClick} />
      </Grid>
    </>
  );
}

export default Home;
