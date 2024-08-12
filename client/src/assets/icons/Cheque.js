import CHEQUE_LIGHT from '../images/sidebar-icons/cheque-light.svg';
import CHEQUE_DARK from '../images/sidebar-icons/cheque-dark.svg';

const Cheque = ({ isDark }) => <img src={isDark ? CHEQUE_DARK : CHEQUE_LIGHT} alt="" />

export default Cheque;