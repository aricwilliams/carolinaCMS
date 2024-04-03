import { useSelector } from 'react-redux';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { LocalizationProvider } from '@mui/x-date-pickers';

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <RecoilRoot>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <ToastContainer />
          <NavigationScroll>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* Move LocalizationProvider here */}
              <Routes />
            </LocalizationProvider>
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </RecoilRoot>
  );
};

export default App;
