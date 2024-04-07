import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

const sampleData = {
  totalProfit: 6000,
  targetProfit: 10000
};

const MyCard = ({ title, value, onClick }) => {
  return (
    <Grid item xs={12} sm={2}>
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
  const percentageAchieved = (sampleData.totalProfit / sampleData.targetProfit) * 100;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/CustomerDashboard');
  };

  return (
    <>
      <Grid container spacing={3} style={{ marginBottom: 20 }}>
        <Grid item xs={12} sm={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Target till 4/14/24
              </Typography>
              <Typography variant="body1">{`$${sampleData.totalProfit} / $${sampleData.targetProfit}`}</Typography>
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
