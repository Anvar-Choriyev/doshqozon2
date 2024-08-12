import styles from './index.module.css';

import Button from '../../../components/Generics/Button/Button';
import Download from '../../../assets/icons/Download';
import Input from '../../../components/Generics/Input/Input';
import Delete from '../../../assets/icons/Delete';
import { useRef, useState } from 'react';
import http, { imageURL } from '../../../utils/axios-instance';

const Foods = ({ field, index, bluePrint, fieldsName, errors, register, remove, update, watch, id, }) => {
    const [img, setImg] = useState(null);
    const imgRef = useRef(null);
    const subscription = watch(fieldsName.index?.name);


    const updateHandler = (res = null, type = 'return') => {
        if (fieldsName === 'foods' || fieldsName === 'foodItems') {
            update(index, {
                name: subscription[fieldsName][index].name,
                price: subscription[fieldsName][index].price,
                measure: subscription[fieldsName][index].measure,
                [fieldsName === 'foodItems' ? 'foodId' : 'categoryId']: id,
                attachmentId: res.data.data.newAttachment.id,
            });
        } else {
            update(index,
                {
                    name: subscription.categories[index].name,
                    attachmentId: type === 'update' ? res.data.data.newAttachment.id : '',
                    color: subscription.categories[index].color,
                });
        }
    }

    const imageHandler = async ({ target: { files } }) => {
        const formData = new FormData();
        formData.append('food', files[0]);
        try {
            const res = await http({
                url: `/attachments/`,
                method: 'POST',
                data: formData,
                contentType: 'multipart/form-data',
            });
            setImg(res.data.data.newAttachment);
            updateHandler(res, 'update');
        } catch (err) {
            console.log(err);
        }
    }

    const deleteHandler = (event) => {
        event.preventDefault();
        setImg(null);
        imgRef.current.value = '';

        updateHandler();
    }

    return (
        <div key={field.id} className={styles['content__fields-block']}>
            {bluePrint.map(elem => {
                const itemError = errors[fieldsName] && errors[fieldsName][index] && errors[fieldsName][index][elem.for];
                return <label key={elem.for} className={`${styles['content__label']}`}>
                    <span className={`main-text ${(itemError) ? styles.error : ''}`}>
                        {
                            (itemError) ? itemError.message : elem.label
                        }
                    </span>
                    {elem.type === 'file' ?
                        <div className={`${styles['content__file']}  ${img ? styles.space : ''}`}>
                            <Input
                                onChange={(event) => imageHandler(event)}
                                className={`subtitle`}
                                type={elem.type}
                                accept=".png, .jpg, .gif, .webp .svg"
                                ref={imgRef}
                            />
                            {img && <img className={styles['content__img-food']} src={`${imageURL}/img/${img?.name}`} />}
                            <div className={styles['content__file-actions']}>
                                <Download />
                                {img && <Delete onClick={deleteHandler} />}
                            </div>
                        </div>
                        :
                        <Input
                            className={`subtitle`}
                            type={elem.type}
                            mode='silver'
                            error={itemError}
                            {...register(`${fieldsName}.${index}.${elem.for}`)}
                        />
                    }
                </label>
            }
            )}
            <Button className={styles['content__btn-delete']} onClick={() => remove(index)}>
                <Delete />
            </Button>
        </div>
    )
}

export default Foods;