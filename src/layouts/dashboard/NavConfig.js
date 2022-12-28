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
    icon: getIcon('bxs:offer'),
    roles: ['user'],
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: getIcon('bxs:offer'),
    roles: ['user'],
  },
  {
    title: 'Companies',
    path: '/business/companieslist',
    icon: getIcon('eva:people-fill'),
    roles: ['business'],
  },
  {
    title: 'Add Companies',
    path: '/business/companies',
    icon: getIcon('eva:people-fill'),
    roles: ['business'],
  },
  {
    title: 'Admin',
    path: '/admin/dashboard',
    icon: getIcon('eva:people-fill'),
    roles: ['admin'],
  },
];

export default navConfig;
