import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';

import UserIcon from "../../assets/icons/UserIcon.png";
import UserIcon2 from "../../assets/icons/UserIcon2.png";

import Pan from '../../assets/icons/Pan';

import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';

const RenderIcon = ({ pathname, route }) => {
	if (pathname.includes(route)) {
		if (route === "shaxsiy-ma'lumotlar") {
			return <img src={UserIcon} />
		} else if (route === "foydalanuvchi-qo'shish") {
			return <img src={UserIcon} />
		} else {
			return <Pan mode='dark' />
		}
	} else {
		if (route === "shaxsiy-ma'lumotlar") {
			return <img src={UserIcon2} />
		} else if (route === "foydalanuvchi-qo'shish") {
			return <img src={UserIcon2} />
		} else {
			return <Pan mode='silver' />
		}
	}
}

const Settings = () => {
	const { pathname } = useLocation();
	const { user } = useContext(AppContext);

	return (
		<Layout title="Sozlamalar">
			<div className={styles.settings}>
				<div className={styles['settings__row']}>
					<div className={`settings ${styles['settings__left']}`}>
						
						<NavLink to="/sozlamalar/shaxsiy-ma'lumotlar">
							<RenderIcon pathname={pathname} route="shaxsiy-ma'lumotlar" />
							<span className={`subtitle`}>
								Shaxsiy ma'lumotlar
							</span>
						</NavLink>
						
					</div>
					<div className={styles['settings__right']}>
						<Outlet />
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Settings;