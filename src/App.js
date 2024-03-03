import { useSelector } from 'react-redux';
import { RecoilRoot } from 'recoil'; // Import RecoilRoot
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <RecoilRoot>
      {' '}
      {/* Wrap the entire application with RecoilRoot */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <ToastContainer /> {/* Add ToastContainer here */}
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </RecoilRoot>
  );
};

export default App;
