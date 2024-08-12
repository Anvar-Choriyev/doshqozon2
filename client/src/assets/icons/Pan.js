import PAN_LIGHT from '../images/sidebar-icons/pan-light.svg';
import PAN_DARK from '../images/sidebar-icons/pan-dark.svg';
import PAN_SILVER from '../images/sidebar-icons/pan-silver.svg';

const Pan = ({ isDark, mode = null }) => {
    if (mode) {
        return <img src={mode === 'silver' ? PAN_SILVER : PAN_DARK} />
    } else {
        return <img src={isDark ? PAN_DARK : PAN_LIGHT} alt="" />
    }

}
export default Pan;