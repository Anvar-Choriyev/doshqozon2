import styles from "./index.module.css";

import { useState, useEffect } from "react";
import http from "../../utils/axios-instance";
import { toast } from "react-toastify";
import Plus from "../../assets/icons/Plus.png"
import Button from "../../components/Generics/Button/Button";
import MyModal from "../../components/Modal/Modal";
import Content from "./Content";
import { initial, bluePrint, schema } from "../../mock/add-category";
import CategoryList from "./CategoryList";
import Layout from "../../components/Layout/Layout";


const CreateCategory = () => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = async () => {
        try {
            const res = await http({
                url: "/categories",
                method: "GET",
            });
            setCategories(res.data?.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    // const getAllImages = async () => {
    //     try {
    //         const res = await http({
    //             url: "/attachments",
    //             method: "GET",
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // getAllImages();

    return (
        <Layout>
            <div className={` ${styles.category}`}>
                <div className={styles['category__top']}>
                    <h3 className={styles['category__title']}>Kategoriyalar</h3>
                    <Button mode='orange' size='small' onClick={() => setOpen(true)}>
                        <img className={styles.addButton} src={Plus} />
                    </Button>
                </div>
                <CategoryList
                    categories={categories}
                    getCategories={getAllCategories}
                />
            </div>
            {open &&
                <MyModal
                    children={
                        <Content
                            initial={initial}
                            bluePrint={bluePrint}
                            schema={schema}
                            setOpen={setOpen}
                            fieldsName='categories'
                            title={`Katego'riya qo'shish`}
                            url='categories'
                            getItems={getAllCategories}
                        />}
                    width={658}
                />}
        </Layout>
    );
}

export default CreateCategory;