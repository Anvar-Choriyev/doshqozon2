import styles from './index.module.css';
import Input from '../../../../components/Generics/Input/Input';
import { userInputs } from '../../../../mock/settings-page';

const Fields = ({ register, errors, }) => {
    return (
        <div className={styles['user__form-info']}>
            {userInputs.map(elem =>
                <label htmlFor={elem.for} key={elem.id()}>
                    <span className={errors[elem.fieldName] && styles.error}>
                        {errors[elem.fieldName] ? errors[elem.fieldName].message : elem.label}
                    </span>
                    <Input
                        {...register(elem.fieldName)}
                        type={elem.type}
                        id={elem.for}
                        error={!!errors[elem.fieldName]}
                        className={`subtitle`}
                        mode='silver'
                    />
                </label>
            )}
        </div>
    )
}

export default Fields;