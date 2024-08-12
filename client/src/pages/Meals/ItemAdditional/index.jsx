import styles from "../CategoryItem/index.module.css";

// svg
import Plus from "../../../assets/icons/Plus.png"

import { useEffect, useState } from "react";
import Button from "../../../components/Generics/Button/Button";
import Modal from "../../../components/Modal/Modal";
import Content from "../Content";
import { initial, bluePrint, schema } from '../../../mock/additional-item';
import http from '../../../utils/axios-instance';
import { useLocation, useParams } from "react-router-dom";
import List from "./List";
import Layout from "../../../components/Layout/Layout";


const ItemAdditional = () => {
    const [categoryItem, setCategoryItem] = useState([]);
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const [categoryId, setCategoryId] = useState(null);


    useEffect(() => {
        getAllCategoryItem();
    }, []);

    const getAllCategoryItem = async () => {
        try {
            const res = await http({
                url: `/foods/${id}`,
                method: "GET",
            });
            console.log(res);
            setCategoryId(res.data.data.mainFood.categoryId);
            setCategoryItem(res.data.data.foodItemsByFood);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
        <div className={styles.items}>
            <div className={styles['items__top']}>
                <h3 className={`title ${styles.categoryText}`}>Qo'shimcha taom qo'shish</h3>
                <Button mode='orange' size='small' onClick={() => setOpen(true)}>
                    <img className={styles['items__top-btn']} src={Plus} />
                </Button>
            </div>
            <List
                categoryItems={categoryItem}
                getItems={getAllCategoryItem}
                status={true}
            />
            {open &&
                <Modal
                    children={
                        <Content
                            initial={initial}
                            schema={schema}
                            bluePrint={bluePrint}
                            setOpen={setOpen}
                            fieldsName='foodItems'
                            title={`Qo'shimcha taom qo'shish`}
                            url={`food-items`}
                            id={id}
                            categoryId={categoryId}
                            getItems={getAllCategoryItem}
                        />
                    }
                    width={658}
                />}
        </div>
        </Layout>
    );
}

export default ItemAdditional;