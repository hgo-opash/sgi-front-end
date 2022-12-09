// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Subscriptions',
    path: '/subscription',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Offers',
    path: '/offers',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Companies',
    path: '/companies',
    icon: getIcon('eva:people-fill'),
  },
];

export default navConfig;
