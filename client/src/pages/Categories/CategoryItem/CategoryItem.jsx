import { useContext, useEffect, useState } from "react";
import styles from ".././Categories.module.css";
import styles2 from "./CategoryItem.module.css";
import http, { imageURL } from "../../../utils/axios-instance";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import Card from "../../../components/Generics/Card/Card";
import Modal from "../../../components/Modal/Modal";
import Content from "../../../components/Modal/content2/Content2";
import getImages from "../../../hooks/useGetImages";
import ChargeCustomer from "../../../components/ChargeCustomer/ChargeCustomer";
import AppContext from "../../../context/AppContext";

const CategoryItem = ({ id }) => {
  // const { id } = useParams();
  const [categoryItem, setCategoryItem] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const ctx = useContext(AppContext);

  // const imageNames = getImages(categoryItem);

  useEffect(() => {
    getAllCategoryItem(ctx.search);
  }, [ctx.search, id]);

  const getAllCategoryItem = async (search) => {
    try {
      let res;
      if (id === "barchasi") {
        res = await http({
          url: `/foods?search=${search}`,
          method: "GET",
        });
      } else {
        res = await http({
          url: `/categories/${id}?search=${search}`,
          method: "GET",
        });
      }
      id === "barchasi"
        ? setCategoryItem(res?.data?.data)
        : setCategoryItem(res?.data?.data?.foodsArr);

      id === "barchasi"
        ? setCategoryName("Barchasi")
        : setCategoryName(res?.data?.data?.categoryName);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className={styles.mainText}>
        {/* <p className={`title ${styles.categoryText}`}>{categoryName}</p> */}
      </div>

      <div className={styles2.mainContainer}>
        <div className={`grid-container colored-scroll`}>
          {/* {categoryItem.length > 0
            ? categoryItem?.map((c, i) => {
              const image = imageNames[i];
              return (
                image&&<Card
                  img={`${imageURL}/img/${image}`}
                  key={c.id}
                  id={c.id}
                  name={c.name}
                  number={c.measure}
                  price={c.price}
                />
              );
            })
            : "Malumot Mavjud Emas"} */}
          {categoryItem.length > 0
            ? categoryItem?.map((c, i) => {
                // const image = imageNames[i];
                return (
                  <Link key={c.id} to={`/taomnoma/kategoriyalar/${c.id}`}>
                    <Card
                      key={c.id}
                      img={`${imageURL}/img/${c?.attachment?.name}`}
                      name={c.name}
                    />
                  </Link>
                );
              })
            : "Malumot Mavjud Emas"}
        </div>
        <ChargeCustomer />
      </div>

      {open && <Modal children={<Content setOpen={setOpen} />} />}
    </>
  );
};

export default CategoryItem;
