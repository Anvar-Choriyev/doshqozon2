import { useContext, useEffect, useState } from "react";
import styles from "./FoodItem.module.css";
import http, { imageURL } from "../../../utils/axios-instance";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import Card from "../../../components/Generics/Card/Card";
import Modal from "../../../components/Modal/Modal";
import Content from "../../../components/Modal/content2/Content2";
import getImages from "../../../hooks/useGetImages";
import ChargeCustomer from "../../../components/ChargeCustomer/ChargeCustomer";
import AppContext from "../../../context/AppContext";

const FoodItems = () => {
  const { id } = useParams();
  const [categoryItem, setCategoryItem] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const ctx = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const { categoryId, setCategoryId } = useContext(AppContext);
  // const imageNames = getImages(categoryItem);
  const navigate = useNavigate();
  useEffect(() => {
    getAllCategoryItem(ctx.search);
    getAllCategories();
  }, [ctx.search, id]);
  const getAllCategories = async (search) => {
    try {
      const res = await http({
        url: `/categories${search ? `?search=${search}` : ""}`,
        method: "GET",
      });
      console.log(res);
      setCategories(res.data?.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const activeTabHandler = (id) => {
    setCategoryId(id);
    navigate(`/taomnoma/kategoriyalar?id=${id}`);
  };
  const getAllCategoryItem = async (search) => {
    try {
      const res = await http({
        url: `/foods/${id}/`,
        method: "GET",
      });
      console.log(res);
      setCategoryItem(res.data.data.foodItemsByFood);
      //   setCategoryName(res.data.data.categoryName);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout>
      <div className={styles.mainText}>
        {/* <p className={`title ${styles.categoryText}`}>{categoryName}</p> */}
      </div>
      <div className={styles.tabsContainer}>
        <ul className={styles["tabs"]}>
          <li
            className={`main-text ${
              "barchasi" === categoryId
                ? styles["tab-item-active"]
                : styles["tab-item"]
            }`}
            key={"barchasi"}
            onClick={() => activeTabHandler("barchasi")}
          >
            Barchasi
          </li>
          {categories.map((ctg) => (
            <li
              className={`main-text ${
                ctg.id === categoryId
                  ? styles["tab-item-active"]
                  : styles["tab-item"]
              }`}
              key={ctg.id}
              onClick={() => activeTabHandler(ctg.id)}
            >
              {ctg.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.mainComponent}>
        <div className={`grid-container colored-scroll`}>
          {categoryItem?.length > 0
            ? categoryItem?.map((c, i) => {
                // const image = imageNames[i];
                return (
                  c.attachment.name && (
                    <Card
                      img={`${imageURL}/img/${c.attachment.name}`}
                      key={c.id}
                      id={c.id}
                      name={c.name}
                      number={c.measure}
                      price={c.price}
                      active={c.status === "ACTIVE" ? true : false}
                    />
                  )
                );
              })
            : "Malumot Mavjud Emas"}
        </div>
        <ChargeCustomer />
      </div>

      {open && <Modal children={<Content setOpen={setOpen} />} />}
    </Layout>
  );
};

export default FoodItems;
