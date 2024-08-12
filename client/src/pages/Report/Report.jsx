import styles from "./Report.module.css";
import Layout from "../../components/Layout/Layout";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart/CartContextProvider";
import http from "../../utils/axios-instance";
// components
import ReportList from "./RepoortList";
import cashpng from "../../assets/icons/cash.png";
import terminal from "../../assets/icons/terminal.png";
import { toast } from "react-toastify";
import ReportCardComponent from "../../components/ReportCardComponent/ReportCardComponent";
import Input from "../../components/Generics/Input/Input";
import Button from "../../components/Generics/Button/Button";

const Report = () => {
  const [data, setData] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [filter, setFilter] = useState("today");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    getOrders(filter);
    getCircle(filter);
  }, [filter]);

  const getOrders = async (fill) => {
    try {
      const res = await http({
        url: `/orders?${fill}`,
        method: "GET",
      });
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const getCircle = async (fill) => {
    try {
      const res = await http({
        url: `/reports/circle?${fill}`,
        method: "GET",
      });
      setCategorie(res.data.data.sum);
      setPaymentInfo({
        allPaymentbyCard: res.data.data.allPaymentbyCard,
        allPayments: res.data.data.allPayments,
        allPaymentByCash: res.data.data.allPaymentByCash,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const filterHandler = (filter) => {
    setFilter(filter);
  };
  const filterToChangeDates = () => {
    const fill = `start=${startDate}&end=${endDate}`;
    getOrders(fill);
    getCircle(fill);
    setStartDate(null);
    setEndDate(null);
  };
  return (
    <Layout>
      <div className={`${styles.div}`}>
        <form className={`${styles.form}`}>
          <div className={`${styles.labelsDiv}`}>
            <label>
              <span>Boshlang'ich</span>
              <Input
                value={startDate || ""}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                type="date"
                mode="silver"
              />
            </label>
            <label>
              <span>Tugash</span>
              <Input
                value={endDate || ""}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                type="date"
                mode="silver"
              />
            </label>
          </div>
          {/* <span className={`${styles.spanInput}`}></span> */}
          {/* <label>
            <span>Aniq vaqt bo'yicha</span>
            <Input type="date" mode="silver" />
          </label> */}
          <span className={`${styles.spanInput}`}></span>
          <div>
            <Button
              type="button"
              children={"Qidirish"}
              mode={"orange"}
              disabled={!startDate || !endDate ? true : false}
              size="big"
              onClick={() => filterToChangeDates()}
            />
          </div>
        </form>
        <p className={`${styles.containerP}`}>
          <span
            onClick={() => filterHandler("today")}
            className={`${styles.span} ${
              filter === "today" ? styles.spanActive : ""
            }`}
          >
            Bugun
          </span>
          {"  "}
          <span
            onClick={() => filterHandler("week")}
            className={`${styles.span} ${
              filter === "week" ? styles.spanActive : ""
            }`}
          >
            Haftalik
          </span>
          {"  "}
          <span
            onClick={() => filterHandler("month")}
            className={`${styles.span} ${
              filter === "month" ? styles.spanActive : ""
            }`}
          >
            Oylik
          </span>
          {"  "}
          <span
            onClick={() => filterHandler("year")}
            className={`${styles.span} ${
              filter === "year" ? styles.spanActive : ""
            }`}
          >
            Yillik
          </span>
        </p>
      </div>
      <div className={`${styles.paymentmethods}`}>
        <div className={`${styles.paymentmethodscontainer}`}>
          <div className={styles.paymentcard}>
            <img src={cashpng} alt="cashpng" />
            {paymentInfo ? console.log(paymentInfo) : 0}
            <p className={styles.textMinCost}>Naqd pul: {paymentInfo?.allPaymentByCash || 0}</p>
          </div>
          <div className={styles.paymentcard}>
            <img src={terminal} alt="terminal" />
            <p className={styles.textMinCost}>Terminal: {paymentInfo?.allPaymentbyCard || 0}</p>
          </div>
        </div>
      </div>
      <div className={`${styles.statics}`}>
        {categorie.map((e) => (
          <ReportCardComponent key={e.id} data={e} />
        ))}
      </div>
      <div className={styles.reportlistcontainer}>
        {data?.length > 0 && (
          <ReportList type="allOrders" arr={data} styles={styles} />
        )}
      </div>
    </Layout>
  );
};

export default Report;
