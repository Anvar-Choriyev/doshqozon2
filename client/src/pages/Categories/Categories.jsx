import styles from "./Categories.module.css";
import { useContext, useEffect, useState } from "react";
import http from "../../utils/axios-instance";
import { imageURL } from "../../utils/axios-instance";
import { toast } from "react-toastify";
import Card from "../../components/Generics/Card/Card";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import Content from "../../components/Modal/content2/Content2";
import ChargeCustomer from "../../components/ChargeCustomer/ChargeCustomer";
import AppContext from "../../context/AppContext";
import ReportList from "../Report/RepoortList";
import stylesReport from "../Report/Report.module.css";
import { CartContext } from "../../context/cart/CartContextProvider";
import CategoryItem from "./CategoryItem/CategoryItem";
import { useSearchParams } from "react-router-dom";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const ctx = useContext(AppContext);
  const { categoryId, setCategoryId } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const ctxCart = useContext(CartContext);
  const myParam = searchParams.get("id");

  useEffect(() => {
    getAllCategories(ctx.search);
    setCategoryId("barchasi");
  }, [ctx.search]);
  useEffect(() => {
    getOrders();
  }, [ctxCart.orders]);
  const getAllCategories = async (search) => {
    console.log(search, "searchhhhhhh");
    try {
      const res = await http({
        url: `/categories${search ? `?search=${search}` : ""}`,
        method: "GET",
      });
      console.log(res);
      setCategories(res.data?.data);
      myParam ? setCategoryId(myParam) : setCategoryId(res.data?.data[0].id);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const activeTabHandler = (id) => {
    setCategoryId(id);
  };
  const getOrders = async () => {
    try {
      const res = await http({
        url: `/orders`,
        method: "GET",
      });
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout>
      <div className={styles.mainText}>
        <p className={`title ${styles.categoryText}`}>Kategoriyalar</p>
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
      {categoryId && <CategoryItem id={categoryId} />}

      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
        }}
      >
        <div className="grid-container colored-scroll ">
          {/* {categories.map((ctg) => (
            <Link key={ctg.id} to={`/taomnoma/kategoriyalar/${ctg.id}`}>
              <Card
                key={ctg.id}
                img={`${imageURL}/img/${ctg.attachment.name}`}
                name={ctg.name}
              />
            </Link>
          ))} */}
        </div>
        {/* <ChargeCustomer /> */}
      </div>
      <div style={{ height: "100%", marginTop: "10px" }}>
        {data?.length > 0 && (
          <ReportList type="allOrders" arr={data} styles={stylesReport} />
        )}
      </div>

      <div>{open && <Modal children={<Content setOpen={setOpen} />} />}</div>
    </Layout>
  );
};

export default Categories;
