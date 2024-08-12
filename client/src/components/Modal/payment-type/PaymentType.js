import React, { useEffect, useState, useContext } from "react";
import { ReactComponent as Close } from "../../../assets/icons/close.svg";
import style from "./PaymentType.module.css";
import http from "../../../utils/axios-instance";
import { toast } from "react-toastify";
import Button from "../../Generics/Button/Button";
import { CartContext } from "../../../context/cart/CartContextProvider";
import terminal from "../../../assets/icons/terminal.png";
import cashIcon from "../../../assets/icons/cash.png";

const PaymentType = (props) => {
  const ctx = useContext(CartContext);

  const [id, setId] = useState(null);
  const createOrder = async (type) => {
    try {
      const res = await http({
        url: `/orders`,
        method: "POST",
        data: {
          orderType: "TAKEAWAY",
          paymentType: type,
          items: ctx.orders,
        },
      });
      closeModal();
      toast.success("Buyurtma yaratildi");
      ctx.onReset();
      setId(res.data.data.orderId);
    } catch (error) {
      closeModal();
      toast.error(error.response.data.message || "error");
    }
  };
  const changePayment = async (data) => {
    try {
      const res = await http({
        url: `/payments/`,
        method: "POST",
        data: {
          paymentType: data,
          orderId: id,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "error");
    }
  };

  function closeModal(e) {
    e?.stopPropagation();
    props.setOpen(false);
  }
  return (
    <section className={style.container}>
      <Close className={style.close} onClick={closeModal} />
      <div className={style.divButton}>
        <Button
          className={style.buttonCash}
          mode="orange"
          size="big"
          newFont={true}
          onClick={() => createOrder("CARD")}
        >
          <img src={terminal} alt="terminal" />
          <h6>Terminal orqali</h6>
        </Button>
        <Button
          className={style.buttonCash}
          mode="orange"
          size="big"
          newFont={true}
          onClick={() => createOrder("CASH")}
        >
          <img src={cashIcon} alt="cashIcon" />
          <h6>Naqd pul orqali</h6>
        </Button>
      </div>
    </section>
  );
};

export default PaymentType;
