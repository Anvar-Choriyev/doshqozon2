import styles from './index.module.css';

import ThreeDots from "../../../assets/icons/ThreeDots";
import { Dropdown, Menu, Modal } from 'antd';
import { imageURL } from "../../../utils/axios-instance";
import Button from "../../../components/Generics/Button/Button";
import Content from '../Content/Content2';
import MyModal from '../../../components/Modal/Modal';
import { bluePrint, schemaUpdate } from '../../../mock/add-food';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../utils/axios-instance';


const FoodList = ({ categoryItems, getItems }) => {
    const [open, setOpen] = useState(null);

    const itemHandler = async (id, method = 'GET', url = '/foods') => {
        try {
            const res = await axiosInstance({
                url: `${url}/${id}`,
                method: method,
            });
            if (method === 'GET') {
                setOpen({ open: true, id: id, attachmentId: res.data.data.mainFood.attachmentId });
            } else {
                toast.success(res.data.message);
                getItems();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleItem = (item, which = null) => {
        if (which === 'edit') {
            itemHandler(item.id);
        } else {
            Modal.confirm({
                title: 'O\'chirish',
                content: `Rostan ham  o'chirmoqchimisiz?`,
                okText: 'Ha',
                cancelText: 'Yo\'q',
                onOk: () => {
                    itemHandler(item.id, "DELETE", "/food-items");
                }
            });
        }
    };

    return (
        <>
            {categoryItems.length > 0 ? (
                categoryItems?.map((item) => {
                    return (
                        <div className={styles.item} key={item.id}>
                            <Link to={`qo'shimcha/${item.id}`}>
                                <div className={styles['item__img']}>
                                    <img src={`${imageURL}/img/${item.attachment.name}`} />
                                </div>
                                <p className={`name-text`}>{item.name}</p>
                            </Link>
                            <Dropdown
                                placement="bottomLeft"
                                arrow
                                trigger="onclick"
                                overlay={(
                                    <Menu>
                                        <Menu.Item key="edit" onClick={() => handleItem(item, 'edit')}>
                                            <span className={`main-text ${styles['edit-btn']}`}>
                                                Tahrirlash
                                            </span>
                                        </Menu.Item>
                                        <Menu.Item key="delete" onClick={() => handleItem(item)}>
                                            <span className={`main-text ${styles['edit-btn']}`}>
                                                O'chirish
                                            </span>
                                        </Menu.Item>
                                    </Menu>
                                )}
                            >
                                <Button>
                                    <ThreeDots />
                                </Button>
                            </Dropdown>
                        </div>
                    );
                })
            ) : (
                <h1 className={`title`}>"Malumot Mavjud Emas"</h1>
            )}
            {open && <MyModal
                children={
                    <Content
                        bluePrint={bluePrint}
                        schema={schemaUpdate}
                        setOpen={setOpen}
                        title={`#${open.id}-id lik taomni o'zgartirish`}
                        submitUrl={`foods/${open.id}`}
                        attachmentId={open.attachmentId}
                        getItems={getItems}
                        btnTitle="Taomni o'zgartirish"
                    />}
                width={658}
            />}
        </>
    )
}

export default FoodList;