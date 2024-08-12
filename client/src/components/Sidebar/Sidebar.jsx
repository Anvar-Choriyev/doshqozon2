import styles from './Sidebar.module.css';

import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';

import SidebarList from './SidebarList';
import Button from '../Generics/Button/Button';
import Chervon from "../../assets/icons/Chervon";
import { imageURL } from '../../utils/axios-instance';
import USER from '../../assets/icons/UserIcon.svg';
import useGetImageHandler from "../../hooks/useGetImage";

const attachmentId = JSON.parse(localStorage.getItem("user"))?.attachmentId;

const Sidebar = () => {

	const location = useLocation();
	const { user, visible, setVisibility } = useContext(AppContext);
	const getImageHandler = useGetImageHandler();


	useEffect(() => {
		attachmentId && getImageHandler(JSON.parse(localStorage.getItem("user"))?.attachmentId);
	}, []);

	const handleVisibility = () => {
		setVisibility({
			visible: !visible
		});
	}
	console.log(user,"sidebar malumot");

	return (
		<aside className={`${styles['aside']} ${visible ? styles['aside-hide'] : ''}`}>
			<nav className={styles['aside__menu']}>
				<ul className={styles['aside__list']}>
					<SidebarList location={location} />
				</ul>
			</nav>
			<div className={styles["aside__user"]}>
				<div className={styles["aside__user-pic"]}>
					<img src={user?.userImage ? `${imageURL}/img/${user.userImage}`:USER} alt='' />
				</div>
				<h3 className={styles["aside__user-title"]}>
					{`${user?.firstName} ${user?.lastName}`}
				</h3>
				<p className={`main-text ${styles["aside__user-desc"]}`}>
					{user?.userRole}
				</p>
				{/* <Button
					mode='orange'
					size='big'
					className={`main-text ${styles['aside__user-btn']}`}
				>
					Profilni ochish
				</Button> */}
			</div>
			<Button
				mode="orange"
				size="small"
				className={styles['hide-btn']}
				onClick={handleVisibility}
			>
				<Chervon />
			</Button>
		</aside>
	)
}

export default Sidebar;