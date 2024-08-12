import styles from './index.module.css';
import Foods from './Foods';


const Fields = ({ fields, bluePrint, fieldsName, errors, register, remove, update, watch, id, }) => {
    return (
        <div className={`${fields.length > 1 && 'colored-scroll'} ${styles['content__fields-wrapper']}`}>
            {fields.map((field, index) =>
                <Foods
                    field={field}
                    index={index}
                    bluePrint={bluePrint}
                    fieldsName={fieldsName}
                    errors={errors}
                    register={register}
                    update={update}
                    remove={remove}
                    watch={watch}
                    id={id}
                />
            )}
        </div>
    );
}

export default Fields;