import styles from "./index.module.css";
// svg
import Close from "../../../assets/icons/CloseIcon";
import Download from "../../../assets/icons/Download";
import Delete from "../../../assets/icons/Delete";

// generics
import Form from "../../../components/Generics/Form/Form";
import Button from "../../../components/Generics/Button/Button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import http, { imageURL } from '../../../utils/axios-instance';
import { toast } from "react-toastify";
import Input from "../../../components/Generics/Input/Input";
import { useEffect, useRef, useState } from "react";

const Content = ({ setOpen, submitUrl, attachmentId = null, title, btnTitle, schema, getItems, bluePrint }) => {
    const [img, setImg] = useState(null);
    const imgRef = useRef(null);

    useEffect(() => {
        getFood();
    }, []);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
        },
        mode: 'onChange',
    });

    function closeModal(e) {
        e.stopPropagation()
        setOpen(false);
    }

    const getFood = async () => {
        const directory = submitUrl.includes('food');
        try {
            const res = await http({
                url: submitUrl,
                method: 'GET',
            });
            console.log(res,submitUrl);
            console.log(res);
            if (directory) {
                if (submitUrl.includes('items')) {
                    console.log("aaaaaaaa");
                    reset(res.data.data.foodItems[0]);
                    setImg(res.data.data.foodItems[0].attachment)

                } else {
                    reset(res.data.data.mainFood);
                    setImg(res.data.data.mainFood.attachment)
                }
            } else {
                reset({ name: res.data.data.category.name, color: res.data.data.category.color });
                setImg(res.data.data.category.attachment);
            }
        } catch (err) {
            console.log(err);
            // toast.error(err.response.data.message);
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
        } catch (err) {
            console.log(err);
        }
    }

    const deleteHandler = (event) => {
        event.preventDefault();
        setImg(null);
        imgRef.current.value = '';
    }

    const updateFoodImage = async () => {
        try {
            const res = await http({
                url: `/attachments/${img.id}`,
                method: 'PUT',
            });
        } catch (err) {
        }
    }

    const onSubmit = async (data) => {
        const updatedData = { ...data, attachmentId: img?.id };
        try {
            const res = await http({
                url: `/${submitUrl}`,
                method: "PUT",
                data: updatedData,
            });
            toast.success(res.data.message);
            getItems();
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className={styles.content}>
            <Button className={styles['content__close']} onClick={closeModal} size='small' mode='gray' >
                <Close />
            </Button>
            <h3 className={`name-text ${styles['content__title']}`}>{title}</h3>
            <Form className={styles['content__form']} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles['content__fields-block']}>
                    {bluePrint.map(elem => {
                        const itemError = errors[elem.for];
                        return (
                            <label key={elem.for} className={`${styles['content__label']}`}>
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
                                        {...register(elem.for)}
                                    />
                                }
                            </label>

                        );
                    })}
                </div>
                <Button
                    type='submit'
                    className={`main-text ${styles['content__submit-btn']}`}
                    mode='orange'
                    size='big'
                    onClick={updateFoodImage}
                >
                    {btnTitle}
                </Button>
            </Form>
        </section>
    );
}

export default Content;