import styles from './Form.module.css';

const Form = ({ children, ...rest }) => {
	return (
		<form {...rest}>
			{children}
		</form>
	)
}

export default Form;