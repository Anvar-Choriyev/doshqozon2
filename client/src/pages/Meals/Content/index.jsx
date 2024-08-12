import styles from "./index.module.css";
// svg
import Close from "../../../assets/icons/CloseIcon";
import Plus from "../../../assets/icons/Plus";

// generics
import Form from "../../../components/Generics/Form/Form";
import Button from "../../../components/Generics/Button/Button";

import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Fields from "./Fields";
import http from '../../../utils/axios-instance';
import { toast } from "react-toastify";


const Content = ({ initial, bluePrint, schema, fieldsName, title, setOpen, getItems, url, id, categoryId = null,main }) => {
    const { register, handleSubmit, control, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            [fieldsName]: [initial]
        },
        mode: 'onChange'
    });


    const { fields, append, remove, update } = useFieldArray({
        control,
        name: fieldsName,
    });

    function closeModal(e) {
        e.stopPropagation()
        setOpen(false)
    }

    const onSubmit = async (data) => {
        data[fieldsName].map(elem => updateFoodImage(elem.attachmentId));
        const newUrl = fieldsName === 'foodItems' ? `/${url}/${id}` : `/${url}`;
        const newData = fieldsName === 'foodItems' && data.foodItems.map(elem => ({ ...elem, 'categoryId': categoryId,foodId:id }));
        try {
            const res = await http({
                url: newUrl,
                method: "POST",
                data: fieldsName === 'foodItems' ? { foodItems: newData } : data,
            });
            toast.success(res.data.message);
            setOpen(false);
            getItems();
        } catch (error) {
            console.log(error);
        }
    }

    const updateFoodImage = async (id) => {
        try {
            const res = await http({
                url: `/attachments/${id}`,
                method: 'PUT',
            });
        } catch (err) {
        }
    }

    return (
        <section className={styles.content}>
            <Button className={styles['content__close']} onClick={closeModal} size='small' mode='gray' >
                <Close />
            </Button>
            <h3 className={`name-text ${styles['content__title']}`}>{title}</h3>
            <Form className={styles['content__form']} onSubmit={handleSubmit(onSubmit)}>
                <Fields
                    fields={fields}
                    bluePrint={bluePrint}
                    fieldsName={fieldsName}
                    errors={errors}
                    register={register}
                    update={update}
                    remove={remove}
                    watch={watch}
                    id={id}
                />
                <div className={styles['content__add-btns-wrapper']}>
                    <Button
                        mode="gray"
                        size='small'
                        className={styles['content__add-btn']}
                        onClick={() => append(initial)}
                    >
                        <Plus />
                    </Button>
                    {fields.length > 1 &&
                        <Button
                            mode="red"
                            size='big'
                            className={`${styles['content__add-btn']} ${styles['content__add-btn-righted']}`}
                            onClick={() => remove()}
                        >
                            Xammasini o'chirish
                        </Button>
                    }
                </div>
                <Button
                    type='submit'
                    className={`main-text ${styles['content__submit-btn']}`}
                    mode='orange'
                    size='big'
                >
                    "Taomni qo'shish"
                </Button>
            </Form>
        </section>
    );
}

export default Content;