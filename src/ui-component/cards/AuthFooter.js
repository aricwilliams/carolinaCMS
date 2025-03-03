// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://startechcode.com" target="_blank" underline="hover">
      Best CRM For Landscapers
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://startechcode.com" target="_blank" underline="hover">
      &copy; startechcode.com
    </Typography>
  </Stack>
);

export default AuthFooter;
