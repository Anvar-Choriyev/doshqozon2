import SETTTINGS_LIGHT from '../images/sidebar-icons/settings-light.svg';
import SETTTINGS_DARK from '../images/sidebar-icons/settings-dark.svg';

const SettingIcon = ({ isDark }) => <img src={isDark ? SETTTINGS_DARK : SETTTINGS_LIGHT} alt="" />

export default SettingIcon;