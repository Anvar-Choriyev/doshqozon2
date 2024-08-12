import React, { useContext, useEffect, useState } from "react";
import http, { imageURL } from "../../../utils/axios-instance";
import { toast } from "react-toastify";
import style from "./ReportModal.module.css";
import Button from "../../Generics/Button/Button";
import { ReactComponent as Close } from "../../../assets/icons/close.svg";
import print from "print-js";
import AppContext from "../../../context/AppContext";
import Categories from "./../../../pages/Categories/Categories";
const ReportModal = (props) => {
  const [categories, setCategories] = useState([]);
  const { user, setAppData } = useContext(AppContext);

  useEffect(() => {
    getOrderId();
  }, []);
  const getOrderId = async () => {
    try {
      const res = await http({
        url: `/orders/${props.id}`,
      });
      console.log(res);
      setCategories(res.data.data);
    } catch (error) {
      closeModal();
      toast.error(error.response.data.message || "error");
    }
  };
  const printFn = () => {
    const printJSON = categories?.items?.map((i) => {
      return {
        name: i.foodItem.name,
        price: i.foodItem.price,
        quantity: i.quantity,
        itemTotalPrice: i.itemTotalPrice,
      };
    });
    console.log(JSON.stringify(printJSON));
    print({
      printable: printJSON,
      properties: [
        { field: "name", displayName: "nomi" },
        { field: "quantity", displayName: "Soni" },
        { field: "price", displayName: "narxi" },
        { field: "itemTotalPrice", displayName: "umumiy narxi" },
      ],
      header: `<h3>#${props.id}</h2>
              <h1>${categories?.sum?.toLocaleString()} sum</h1>
      `,
      type: "json",
    });
  };
  function closeModal(e) {
    e?.stopPropagation();
    props.setOpen(false);
  }
  console.log(categories);

  return (
    <section className={style.container}>
      <Close className={style.close} onClick={closeModal} />
      <div className={style.block}>
        <p>{categories?.mainFood?.name}</p>
        <p className={style.pText}>{props?.number}</p>
        <p className={style.pSum}>
          {categories?.mainFood?.price}
          {/* 100 000 so'm */}
        </p>
      </div>
      {categories
        ? categories?.items?.map((i) => (
            <div key={i.id}>
              <div className={style.item}>
                <div className={style.imgDiv}>
                  {/* shuni qo'shdim */}
                  <div className={style.img_container}>
                    <img
                      src={`${imageURL}/img/${i.foodItem.attachment.name}`}
                      alt=""
                    />
                  </div>

                  <p>{i.foodItem.name}</p>
                </div>
                <div className={style.itemChange}>
                  {/* <Button
                    mode="gray"
                    size="small"
                    newFont={true}
                    disabled={true}
                  >
                    -
                  </Button> */}
                  <p>{i.quantity}</p>
                  {/* <Button
                    mode="orange"
                    size="small"
                    newFont={true}
                    disabled={true}
                  >
                    +
                  </Button> */}
                </div>
                <p className={style.equalWidth}>
                  {i.foodItem.price.toLocaleString()} sum
                </p>
              </div>
            </div>
          ))
        : ""}{" "}
      <div>
        <Button
          style={{ marginTop: "15px" }}
          mode="orange"
          size="big"
          disabled={true}
          newFont={true}
        >
          Umumiy narxi {categories?.sum?.toLocaleString()} sum
        </Button>
      </div>
      <button type="button" onClick={printFn}>
        Print JSON Data
      </button>
    </section>
  );
};

export default ReportModal;
