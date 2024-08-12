import styles from './Input.module.css';
import { forwardRef } from 'react';

const Input = forwardRef(({ type, mode, error, className, ...rest }, ref) => {
	return (
		<input
			ref={ref}
			className={`${styles.input} ${styles[`input__${mode}`]} ${error ? styles['input__error'] : ''} ${className}`}
			type={type || 'input'}
			{...rest}
		/>
	);
});

export default Input;