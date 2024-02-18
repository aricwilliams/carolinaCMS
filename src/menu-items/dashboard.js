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
      url: '/dashboard/default',
      icon: icons.IconDashboard,
    },
    {
      id: 'default2',
      title: 'Employee Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      target: true
    },
  
  ]
};

export default dashboard;
