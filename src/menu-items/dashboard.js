// assets
import { IconDashboard } from '@tabler/icons-react';
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MessageIcon from '@mui/icons-material/Message';
import HardwareIcon from '@mui/icons-material/Hardware';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import AddIcon from '@mui/icons-material/Add';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default312',
      title: 'Home',
      type: 'item',
      url: '/Home',
      icon: HomeIcon
    },
    {
      id: 'default3',
      title: 'Customer Dashboard',
      type: 'item',
      url: '/CustomerDashboard',
      icon: SupervisedUserCircleIcon
    },
    {
      id: 'default2',
      title: 'Job Dashboard',
      type: 'item',
      url: '/JobDashboard',
      icon: HardwareIcon
    },

    {
      id: 'default23',
      title: 'Schedule Project',
      type: 'item',
      url: '/ScheduleProject',
      icon: AttachMoneyIcon
    },
    {
      id: 'default6',
      title: 'Crew Message',
      type: 'item',
      url: '/CrewMessage',
      icon: MessageIcon
    },
    {
      id: 'default243',
      title: 'My Products',
      type: 'item',
      url: '/MyProducts',
      icon: AddCircleIcon
    },
    {
      id: 'default24',
      title: 'Invoice',
      type: 'item',
      url: '/Invoice',
      icon: icons.IconDashboard
    },
    {
      id: 'default22',
      title: 'Schedule Quote',
      type: 'item',
      url: '/ScheduleQuote',
      icon: icons.IconDashboard
    },

    {
      id: 'login3a',
      title: 'Login',
      type: 'item',
      url: '/login',
      icon: icons.IconDashboard,
      target: true
    },
    {
      id: 'default5',
      title: 'Color Utility',
      type: 'item',
      url: '/ColorUtility',
      icon: icons.IconDashboard
    }
  ]
};

export default dashboard;
