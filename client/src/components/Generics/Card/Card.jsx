import { useState } from "react";
import styles from "./Card.module.css";
import Content from "../../Modal/Content";
import Modal from "../../Modal/Modal";

const Card = (props) => {
  const [open, setOpen] = useState(false);
  const cardOpenHandler = () => {
    if (props.active) {
      setOpen(true);
    }
  };
  return (
    <div className={styles.container}>
      <div
        className={`${styles.card}`}
        style={{ cursor: "pointer" }}
        onClick={cardOpenHandler}
      >
        <div className={styles.card_img}>
          <img src={props.img} alt="product" />
        </div>
        <span className={styles["product-name"]}>{props.name}</span>
        {props.number && (
          <span className={styles["product-number"]}>{props.number}</span>
        )}
        {props.price && (
          <span className={styles["product-price"]}>{props.price}</span>
        )}
        {/* <button onClick={() => setOpen(true)}>Modal</button> */}
        {open && (
          <Modal
            children={
              <Content id={props.id} number={props.number} setOpen={setOpen} />
            }
          />
        )}
      </div>
      <div
        className={`${styles["block-card"]} ${
          props.active === false ? `${styles["block-card-active"]}` : ""
        }`}
      >
        <p style={{ color: "red", fontSize: "20px", paddingTop: "10px" }}>
          Bu taom hozirda <br /> mavjud emas!
        </p>
      </div>
    </div>
  );
};
export default Card;
