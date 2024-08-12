import styles from "./index.module.css";
// svg
import Plus from "../../../assets/icons/Plus.png"

import { useEffect, useState } from "react";
import Button from "../../../components/Generics/Button/Button";
import Modal from "../../../components/Modal/Modal";
import Content from "../Content";
// import { initial, bluePrint, schema } from '../../../mock/add-food';
import { initial, bluePrint, schema } from '../../../mock/add-main-food';
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios-instance";
import Layout from "../../../components/Layout/Layout";


const CreateCategoryItem = () => {
	const [categoryName, setCategoryName] = useState("");
	const [categoryItem, setCategoryItem] = useState([]);
	const [open, setOpen] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		getAllCategoryItem();
	}, []);

	const getAllCategoryItem = async () => {
		try {
			const res = await axiosInstance({
				url: `/categories/${id}`,
				method: "GET",
			});
			console.log(res);
			setCategoryItem(res.data.data.foodsArr);
			setCategoryName(res.data.data.categoryName);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
		<div className={styles.items}>
			<div className={styles['items__top']}>
				<h3 className={`title ${styles.categoryText}`}>{categoryName}</h3>
				<Button mode='orange' size='small' onClick={() => setOpen(true)}>
					<img className={styles['items__top-btn']} src={Plus} />
				</Button>
			</div>
			<ItemList
				id={id}
				categoryItems={categoryItem}
				getItems={getAllCategoryItem}
				categoryName={categoryName}
			/>
			{open &&
				<Modal
					children={
						<Content
							initial={initial}
							schema={schema}
							bluePrint={bluePrint}
							setOpen={setOpen}
							fieldsName='foods'
							title={`Yangi taom qo'shish`}
							url='foods'
							id={id}
							getItems={getAllCategoryItem}
						/>
					}
					width={658}
				/>}
		</div>
		</Layout>
	);
}

export default CreateCategoryItem;