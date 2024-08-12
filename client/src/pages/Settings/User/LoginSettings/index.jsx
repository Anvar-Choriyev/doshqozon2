import styles from './index.module.css';

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import http from "../../../../utils/axios-instance"
import Form from '../../../../components/Generics/Form/Form';
import Input from '../../../../components/Generics/Input/Input';
import Button from '../../../../components/Generics/Button/Button';
import Eye from '../../../../assets/icons/Eye';
import AppContext from '../../../../context/AppContext';
import { schemaPassword } from '../../../../mock/settings-page';

const InputLogin = () => {
	const [visible, setVisible] = useState(false);
	const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
		resolver: yupResolver(schemaPassword),
		mode: 'onBlur',
	});
	const { user } = useContext(AppContext);

	const visibilityHandler = () => {
		setVisible(prev => !prev);
	}

	useEffect(() => {
		getUser();
	}, [])

	const getUser = async () => {
		try {
			const { data: { data } } = await http({
				url: `/users/${user.id}`,
				methd: 'GET'
			});
			reset({ username: data.userById.username });
		} catch (err) {
			console.log(err);
		}
	}

	const formSubmit = async (data) => {
		try {
			const res = await http({
				url: `/users/${user.id}/password`,
				method: "PUT",
				data
			})
			toast.success(res.data.message);
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	}
	console.log(errors);
	return (
		<div className={styles.login}>
			<h3 className={styles['login__title']}>Login va Parol</h3>
			<Form onSubmit={handleSubmit(formSubmit)} className={styles['login__form']}>
				<label htmlFor='user'>
					<span className={errors.username ? styles.error : ''}>
						{errors.username ? errors.username.message : 'Foydalanuvchi nomi'}
					</span>
					<Input
						{...register('username')}
						type='text'
						id='user'
						mode='silver'
						error={errors.username}
						className={`subtitle`}
					/>
				</label>
				<label htmlFor='password'>
					<span className={errors.password ? styles.error : ''}>
						{errors.password ? errors.password.message : 'Parol'}
					</span>
					<Input
						{...register('password')}
						type={!visible ? 'password' : 'text'}
						id='password'
						mode='silver'
						error={errors.password}
						className={`subtitle`}
					/>
					<Button className={styles['password-icon']} onClick={visibilityHandler}>
						<Eye mode={visible && '#FEBB1B'} />
					</Button>
				</label>
				{/* <Button size='big' className={`subtitle ${styles['login__btn']}`}>
					<img src={KeyImg} />
					<span>Parolni o'zgartirish</span>
				</Button> */}
				<Button type='submit' mode='orange' size='big' className={styles['login__btn-submit']}>
					O'zgarishlarni saqlash
				</Button>
			</Form>
		</div>

	);
}

export default InputLogin;