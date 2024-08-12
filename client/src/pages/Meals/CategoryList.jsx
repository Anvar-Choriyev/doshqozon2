import styles from './index.module.css';
import http, { imageURL } from '../../utils/axios-instance';
import { Modal, Menu, Dropdown } from 'antd';
import Button from '../../components/Generics/Button/Button';
import ThreeDots from '../../assets/icons/ThreeDots';
import { toast } from 'react-toastify';
import { useState } from 'react';
import MyModal from '../../components/Modal/Modal';
import Content from './Content/Content2';
import { bluePrint, schemaUpdate } from '../../mock/add-category';
import { Link } from 'react-router-dom';


const CategoryList = ({ categories, getCategories, }) => {
    const [open, setOpen] = useState(false);

    const itemHandler = async (id, method = 'GET', attachmentId = null) => {
        try {
            const res = await http({
                url: `/categories/${id}`,
                method: method,
            });
            if (method === 'GET') {
                setOpen({ open: true, id: id, attachmentId: attachmentId });
            } else {
                toast.success(res.data.message);
                getCategories();
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleItem = (event, item, which = null) => {
        event.preventDefault();
        event.stopPropagation();

        if (which === 'edit') {
            itemHandler(item.id, 'GET', item.attachmentId);
        } else {
            Modal.confirm({
                title: "O'chirish",
                content: `Rostan ham o'chirmoqchimisiz?`,
                okText: 'Ha',
                cancelText: 'Yo\'q',
                onOk: () => {
                    itemHandler(item.id, 'DELETE');
                },
            });
        }
    };
    return (
        <>
            <div className={`colored-scroll ${styles['category__row']}`}>
                {categories.map((ctg) => (
                    <Link to={`${ctg.id}`} key={ctg.id} className={styles['category__card']} >
                        <div className={styles['category__img']}>
                            <img src={`${imageURL}/img/${ctg.attachment.name}`} />
                        </div>
                        <p>{ctg.name}</p>
                        <div className={styles['category__dots']}>
                            <Dropdown
                                placement="topLeft"
                                arrow
                                trigger={['click']}
                                overlay={(
                                    <Menu>
                                        <Menu.Item key="edit">
                                            <span
                                                className={`main-text ${styles['edit-btn']}`}
                                                onClick={(event) => handleItem(event, ctg, 'edit')}
                                            >
                                                Tahrirlash
                                            </span>
                                        </Menu.Item>
                                        <Menu.Item key="delete">
                                            <span
                                                className={`main-text ${styles['edit-btn']}`}
                                                onClick={(event) => handleItem(event, ctg)}
                                            >
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
                        </div >
                    </Link>
                ))}
            </div>
            {open.id && <MyModal
                children={
                    <Content
                        bluePrint={bluePrint}
                        schema={schemaUpdate}
                        setOpen={setOpen}
                        title={`#${open.id}-id lik katego'riyani o'zgartirish`}
                        submitUrl={`categories/${open.id}`}
                        attachmentId={open.attachmentId}
                        getItems={getCategories}
                        btnTitle="Katego'riyani o'zgartirish"
                    />}
                width={658}
            />}
        </>

    )
}

export default CategoryList;