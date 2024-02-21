// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default3',
      title: 'Customer Dashboard',
      type: 'item',
      url: '/CustomerDashboard',
      icon: icons.IconDashboard,
    },
    {
      id: 'default2',
      title: 'Crew Dashboard',
      type: 'item',
      url: '/CrewPage',
      icon: icons.IconDashboard,
    },
    {
      id: 'default6',
      title: 'Crew Message',
      type: 'item',
      url: '/CrewMessage',
      icon: icons.IconDashboard,
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
      icon: icons.IconDashboard,
    },
  
  ]
};

export default dashboard;
