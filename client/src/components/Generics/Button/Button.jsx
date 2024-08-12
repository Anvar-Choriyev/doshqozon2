import styles from "./Button.module.css";

const Button = ({ children, type, mode, size, newFont, bordered, className,onClick, ...rest }) => {
	return (
		<button
			type={type || 'button'}
			className={`
				${styles.button}
				${newFont && styles['new-font']}
				${styles[mode]}
				${styles[size]}
				${bordered && styles.bordered}
				${className}
				`}
				onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	)
}

export default Button;