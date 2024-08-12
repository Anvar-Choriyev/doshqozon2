import styles from '../CategoryItem/index.module.css';

import http from "../../../utils/axios-instance";
import ThreeDots from "../../../assets/icons/ThreeDots";
import { Dropdown, Menu, Modal } from 'antd';
import { imageURL } from "../../../utils/axios-instance";
import Button from "../../../components/Generics/Button/Button";
import Content from '../Content/Content2';
import MyModal from '../../../components/Modal/Modal';
import { bluePrint, schema } from '../../../mock/additional-item';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Switch } from 'antd';
const List = ({ categoryItems, getItems, status }) => {
    const [open, setOpen] = useState(null);
    const onChange =async (checked,id) => {
        const res = await http({
            url: `food-items/${id}/status`,
            method: "PUT",
            data:{
                status: checked===true?'ACTIVE':'BLOCKED'
            }
        });
        getItems()
      };
    const itemHandler = async (id, method = 'GET', url = '/food-items') => {
        try {
            const res = await http({
                url: `${url}/${id}`,
                method: method,
            });
            if (method === 'GET') {
                setOpen({ id: id, attachmentId: res.data.data.attachmentId });
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
            console.log(item);
            Modal.confirm({
                title: 'O\'chirish',
                content: `Rostan ham  o'chirmoqchimisiz?`,
                okText: 'Ha',
                cancelText: 'Yo\'q',
                onOk: () => {
                    itemHandler(item.id, "DELETE", '/food-items');
                }
            });
        }
    };

    return (
        <>
            {categoryItems?.length > 0 ? (
                categoryItems?.map((item) => {
                    return (
                        <div className={styles.item} key={item.id}>
                            <div className={styles['item__img']}>
                                <img src={`${imageURL}/img/${item.attachment?.name}`} />
                            </div>
                            <p className={`name-text`}>{item.name}</p>
                            {status&&<Switch checked={item.status==="ACTIVE"?true:false} onChange={(e)=>onChange(e,item.id)} />}
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
                <h1 className={`subtitle`}>"Malumot Mavjud Emas"</h1>
            )}
            {open?.id && <MyModal
                children={
                    <Content
                        bluePrint={bluePrint}
                        schema={schema}
                        setOpen={setOpen}
                        title={`Qo'shimcha taomni o'zgartirish`}
                        submitUrl={`food-items/${open.id}`}
                        getItems={getItems}
                        attachmentId={open.attachmentId}
                        btnTitle="Taomni o'zgartirish"
                    />}
                width={658}
            />}
        </>
    )
}

export default List;