import React, { useEffect, useState, useContext } from "react";
import style from "./ChargeCustomer.module.css";
import { toast } from "react-toastify";
import http, { imageURL } from "../../utils/axios-instance";

import { CartContext } from "../../context/cart/CartContextProvider";
import Button from "../Generics/Button/Button";
import Modal from "../Modal/Modal";
import PaymentType from "../Modal/payment-type/PaymentType";
import getImages from "../../hooks/useGetImages";

const ChargeCustomer = (props) => {
  const ctx = useContext(CartContext);
  useEffect(() => {
    setCategories(ctx.orders);
  }, [ctx]);
  const [categories, setCategories] = useState();
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
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "error");
    }
  };
  // const chargeCustomer = () => {
  //   if (takeway) {
  //     setOpen(true);
  //   } else {
  //     createOrder();
  //   }
  // };

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
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
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
      </div> */}

      <div style={{ paddingTop: "2rem", overflow: "auto" }}>
        {categories
          ? categories.map((item, index) => {
              const image = imageNames[index];
              return (
                <div key={item.id}>
                  <div className={style.item}>
                    <div className={style.imgDiv}>
                      <div className={style.img_container}>
                        <img src={`${imageURL}/img/${image}`} alt="" />
                      </div>

                      <p>{item.name}</p>
                    </div>
                    <div className={style.itemChange}>
                      <div className={style.itemChange2}>
                        <Button
                          mode="gray"
                          size="small"
                          style={{ backgroundColor: " #d8d9df" }}
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
          onClick={() => setOpen(true)}
        >
          Charge Customer {ctx.totalPrice.toLocaleString()} sum
        </Button>
      </div>

      {open && <Modal children={<PaymentType setOpen={setOpen} />} />}
    </section>
  );
};

export default ChargeCustomer;
