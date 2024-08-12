import DASHBOARD_LIGHT from '../images/sidebar-icons/dashboard-light.svg';
import DASHBOARD_DARK from '../images/sidebar-icons/dashboard-dark.svg';

const DashboardIcon = ({ isDark }) => <img src={isDark ? DASHBOARD_DARK : DASHBOARD_LIGHT} alt="" />;
export default DashboardIcon;