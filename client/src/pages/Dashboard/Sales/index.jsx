import styles from "./index.module.css";
import { useEffect, useState } from "react";

import Daily from "../Daily";
import { options } from "../../../mock/periods";
import { imageURL } from "../../../utils/axios-instance";

const Sales = ({ allData }) => {
  const [foods, setFoods] = useState(null);

  useEffect(() => {
    setFoods(allData);
  }, [allData]);
  console.log(foods);
  return (
    <>
      <Daily url="/foods/report" setFunc={setFoods} />
      <ul className={`colored-scroll ${styles["sales"]}`}>
        {foods?.length > 0 ? (
          foods.map(({ foodItem, itemTotalPrice, createdAt, id, count }) => {
            const date = new Date(createdAt);
            const formattedDate = date.toLocaleDateString(undefined, options);
            return (
              <li key={id} className={styles["sales__item"]}>
                <img
                  src={`${imageURL}/img/${foodItem.attachment.name}`}
                  alt={foodItem.name}
                />
                <p className={`subtitle`}>{foodItem.name || "Taom"}</p>
                <p className={`subtitle`}>{itemTotalPrice}</p>
                <p className={`subtitle`}>Soni: {count}</p>
              </li>
            );
          })
        ) : (
          <h2 className={styles["sales__center"]}>Ma'lumot mavjud emas</h2>
        )}
      </ul>
    </>
  );
};
export default Sales;
