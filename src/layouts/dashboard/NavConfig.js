// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;


const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
    roles: ['user'],
  },
  {
    title: 'Subscriptions',
    path: '/subscription',
    icon: getIcon('eva:shopping-bag-fill'),
    roles: ['user'],
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: getIcon('eva:file-text-fill'),
    roles: ['user'],
  },
  {
    title: 'Offers',
    path: '/offers',
    icon: getIcon('eva:people-fill'),
    roles: ['user'],
  },
  {
    title: 'Add Companies',
    path: '/companies',
    icon: getIcon('eva:people-fill'),
    roles: ['business'],
  },
  {
    title: 'Companies',
    path: '/companieslist',
    icon: getIcon('eva:people-fill'),
    roles: ['business'],
  },
];

export default navConfig;
