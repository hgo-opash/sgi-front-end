// component
import Iconify from '../../components/Iconify';
import dashboardIcon from '../../images/dashboard.png'
import subscriptionIcon from '../../images/subscription.png'
import reportIcon from '../../images/reports.png'
import offersIcon from '../../images/offers.png'
import calendarIcon from '../../images/calendar.png'

// ----------------------------------------------------------------------

const getIcon = (name) => <img src={name} alt={name} width={15} height={15} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: getIcon(dashboardIcon),
    roles: ['user'],
  },
  {
    title: 'Subscriptions',
    path: '/subscription',
    icon: getIcon(subscriptionIcon),
    roles: ['user'],
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: getIcon(reportIcon),
    roles: ['user'],
  },
  // {
  //   title: 'Offers',
  //   path: '/offers',
  //   icon: getIcon(offersIcon),
  //   roles: ['user'],
  // },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: getIcon(calendarIcon),
    roles: ['user'],
  },
  {
    title: 'Companies',
    path: '/business/companieslist',
    // icon: getIcon('eva:people-fill'),
    roles: ['business'],
  },
  {
    title: 'Add Companies',
    path: '/business/companies',
    // icon: getIcon('eva:people-fill'),
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
