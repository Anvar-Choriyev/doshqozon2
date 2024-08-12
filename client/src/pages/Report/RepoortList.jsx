import { useContext, useState } from "react";
import ReportModal from "../../components/Modal/report-modal/ReportModal";
import Modal from "../../components/Modal/Modal";
import AppContext from "../../context/AppContext";

const ReportList = ({ arr, styles }) => {
  const [open, setOpen] = useState(false);
	const ctx = useContext(AppContext);
  console.log(ctx);
  return (
    <ul className={` ${styles["orders-list"]}`}>
      {arr.map((order, index) => (
        <li
          style={{ cursor: "pointer" }}
          key={index}
          className={styles["orders-item"]}
          onClick={() => setOpen(order.id)}
        >
          <div className={styles["orders-item__left"]}>
            <h3 className="name-text">
              <span>Buyurtma #{order?.id}</span>
              <span className={styles.status}>{order?.paymentType}</span>
            </h3>
          </div>
          {console.log(order)}
          <div className={styles["orders-item__right"]}>
            <h3 className="name-text">
              <span>{order?.totalPrice?.toLocaleString()} so‘m</span>
            </h3>
            <p className={`main-text ${styles["orders-item__desc"]}`}>
              {new Date(order.createdAt).toLocaleString("uz-Uz", {
                day: "2-digit",
              }) === new Date().toLocaleString("uz-Uz", { day: "2-digit" })
                ? new Date(order.createdAt).toLocaleString("uz-Uz", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : new Date(order.createdAt).toLocaleString("uz-Uz", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    month: "2-digit",
                  })}
            </p>
            {ctx.user?.userRole==="ADMIN"&&<p className={`main-text ${styles["orders-item__desc"]}`}>
                  Sotuvchi: {order.stuff.firstName}
            </p>}
          </div>
        </li>
      ))}
      {open && <Modal children={<ReportModal id={open} setOpen={setOpen} />} />}
    </ul>
  );
};
export default ReportList;
