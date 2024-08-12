import React, { useEffect, useState, useContext } from "react";
import { ReactComponent as Close } from "../../../assets/icons/close.svg";
import style from "./Content2.module.css";
import { toast } from "react-toastify";
import http, { imageURL } from "../../../utils/axios-instance";

import { CartContext } from "../../../context/cart/CartContextProvider";
import Button from "../../Generics/Button/Button";
import Modal from "../Modal";
import PaymentType from "../payment-type/PaymentType";
import getImages from "../../../hooks/useGetImages";

const Content = (props) => {
  const ctx = useContext(CartContext);

  const [categories, setCategories] = useState(ctx.orders);
  const [open, setOpen] = useState(false);
  const [takeway, setTakeway] = useState(true);

  const imageNames = getImages(categories);

  const createOrder = async () => {
    try {
      const res = await http({
        url: `/orders`,
        method: "POST",
        data: {
          orderType: "DINE_IN",
          items: ctx.orders,
        },
      });
      ctx.onReset();
      closeModal();
    } catch (error) {
      toast.error(error.response.data.message || "error");
    }
  };

  const chargeCustomer = () => {
    if (takeway) {
      setOpen(true);
    } else {
      createOrder();
    }
  };

  function closeModal(e) {
    e?.stopPropagation();
    props.setOpen(false);
  }

  function add(item) {
    ctx.onAddItem({
      id: item.id,
      price: item.price,
      name: item.name,
      imgUrl: item.imgUrl,
      count: 1,
    });
  }

  function remove(id) {
    ctx.onRemoveItem(id);
  }

  return (
    <section className={style.container}>
      <Close className={style.close} onClick={closeModal} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: ".5rem",
        }}
      >
        <input
          checked={takeway}
          onChange={() => setTakeway(!takeway)}
          type="checkbox"
          id="TAKEWAY"
          name="TAKEWAY"
          value="TAKEWAY"
        />
        <label for="TAKEWAY">Hozir To'lash</label>
      </div>
      <div style={{ paddingTop: "2rem" }}>
        {categories
          ? categories.map((item, index) => {
              const image = imageNames[index];
              return (
                <div key={item.id}>
                  <div className={style.item}>
                    <div className={style.imgDiv}>
                      {/* <img height="64px" width="64px" src={item.imgUrl} alt="" /> */}

                      {/* shuni qo'shdim */}
                      <div className={`${style["image_container"]}`}>
                        <img src={`${imageURL}/img/${image}`} alt="" />
                      </div>

                      <p>{item.name}</p>
                    </div>
                    <div className={style.itemChange}>
                      <div className={style.itemChange2}>
                        <Button
                          mode="gray"
                          size="small"
                          newFont={true}
                          onClick={() => remove(item.id)}
                        >
                          -
                        </Button>
                        <p>
                          {ctx.orders.filter((e) => e.id === item.id)[0]
                            ?.count || 0}
                        </p>
                        <Button
                          mode="orange"
                          size="small"
                          newFont={true}
                          onClick={() => add(item)}
                        >
                          +
                        </Button>
                      </div>

                      <p className={style.equalWidth}>
                        {item.price.toLocaleString()} sum
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Button
          mode="orange"
          size="big"
          disabled={ctx.totalPrice === 0}
          newFont={true}
          onClick={chargeCustomer}
        >
          Charge Customer {ctx.totalPrice.toLocaleString()} sum
        </Button>
      </div>
      {open && (
        <Modal
          children={<PaymentType setOpen={setOpen} closeModal={closeModal} />}
        />
      )}
    </section>
  );
};

export default Content;
