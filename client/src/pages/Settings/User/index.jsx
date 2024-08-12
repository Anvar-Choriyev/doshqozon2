import styles from "./index.module.css";

import UserIcon from "../../../assets/icons/UserIcon.png";
import UserIcon2 from "../../../assets/icons/UserIcon2.png";
import Lock from "../../../assets/icons/Lock.png";
import Lock2 from "../../../assets/icons/Lock2.jpg";
import Exit from "../../../assets/icons/Exit.png";
import Delete from "../../../assets/icons/Delete.png";
import USER from "../../../assets/icons/UserIcon.svg";

import { useContext, useEffect, useRef, useState } from 'react';
import http, { imageURL } from '../../../utils/axios-instance';

import Button from "../../../components/Generics/Button/Button";
import Form from "../../../components/Generics/Form/Form";
import Input from "../../../components/Generics/Input/Input";
import UserSettings from './UserSettings';
import LoginSettings from './LoginSettings';
import AppContext from "../../../context/AppContext";
import useGetImageHandler from "../../../hooks/useGetImage";
import axiosInstance from "../../../utils/axios-instance";
import { toast } from "react-toastify";



const TabUser = () => {
	const [showUser, setShowUser] = useState(true);
	const [showLogin, setShowLogin] = useState(false);
	const { user, setAppData } = useContext(AppContext);
	const ctx = useContext(AppContext);
	const [otherUserInfo,setOtherUserInfo] = useState(null)
	function logOut() {
	  ctx.onReset();
	}
	const userImgRef = useRef();

	const getImageHandler = useGetImageHandler(); // Call the hook here

	useEffect(() => {
		console.log(user);
		getUserInfo();
		getImageHandler(JSON.parse(localStorage.getItem("user"))?.attachmentId);
	}, []);

	const getUserInfo = async () => {
		try {
			const { data: { data } } = await http({
				url: `/users/${user.id}`,
				method: 'GET'
			})
			console.log(data);
			setOtherUserInfo(data);
		} catch (err) {

		}
	}

	const userImageHandler = async ({ target: { files } }) => {
		const formData = new FormData();
		formData.append('food', files[0]);
		try {
			const res = await http({
				url: "attachments/",
				method: "POST",
				data: formData,
				contentType: 'multipart/form-data',
			});
			getImageHandler(res.data.data.newAttachment.id, setAppData, user);
			setAppData({
				user: { ...JSON.parse(localStorage.getItem("user")) },
				token: localStorage.getItem("token"),
				isAuth: true,
			});
		} catch (err) {
			console.log(err);
		}
	}
	const deleteUser=async()=>{
		try {
			const res = await axiosInstance({
			  url: `/users/${user.id}`,
			  method: "DELETE",
			});
			logOut()
		  } catch (error) {
			toast.error(error.response.data.message);
		  }
	  }
	const changeHandler = (e) => {
		const name = e.currentTarget.name;
		if (name === 'user') {
			setShowUser(true);
			setShowLogin(false);
		} else {
			setShowUser(false);
			setShowLogin(true);
		}
	}
	return (
		<div className={styles.user}>
			<div className={styles['user__left']}>
				<Form className={styles['user-img__form']}>
					<label>
						<Input
							type="file"
							accept=".png, .jpg, .gif, .webp .svg"
							ref={userImgRef}
							onChange={event => userImageHandler(event)}
						/>
						<div className={styles['user__img']}>
							<img src={user?.userImage ? `${imageURL}/img/${user.userImage}` || USER : USER} alt='' />
						</div>
					</label>
				</Form>
				<div className={styles['user__body']}>
					<p className={styles['user__name']}>{`${user?.firstName} ${user?.lastName}`}</p>
					<div className={styles['user__stats']}>
						<div className={styles['user__stats-left']}>
							<p className={styles['user__stats-price']}>{otherUserInfo?.totalSum||0}</p>
							<p className={styles['user__stats-currency']}>So'm</p>
							<p className={styles['user__stats-hour']}>ishlagan</p>
						</div>
						<div className={styles['user__stats-right']}>
							<p className={styles['user__stats-price']}>{otherUserInfo?.count||0}</p>
							<p className={styles['user__stats-hour']}>buyurtma</p>
						</div>
					</div>
					<div className={styles['user__stats-actions']}>
						<Button name='user' className={styles['user__btn']} onClick={changeHandler}>
							<img src={showUser ? UserIcon : UserIcon2} />
							<span className={`main-text ${showUser && !showLogin && styles.active}`}>
								Shaxsiy ma'lumotlar
							</span>
						</Button>
						<Button name='login' className={styles['user__btn']} onClick={changeHandler}>
							<img src={showLogin ? Lock : Lock2} />
							<span className={`main-text ${!showUser && showLogin && styles.active}`}>
								Login va Parol
							</span>
						</Button>
						{/* <Button onClick={logOut} className={styles['user__btn']}>
							<img src={Exit} />
							<span className={`main-text`}>
								Chiqish
							</span>
						</Button>
						<Button onClick={deleteUser} className={styles['user__btn']} >
							<img src={Delete} />
							<span className={`main-text`}>
								Hisobni o'chirish
							</span>
						</Button> */}
					</div>
				</div>
			</div>
			<div className={styles['user__right']}>
				{showUser && !showLogin ? <UserSettings /> : <LoginSettings />}
			</div>
		</div>
	);
}

export default TabUser;