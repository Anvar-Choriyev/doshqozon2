import React from "react";
import style from "./ReportCardComponent.module.css";
import { imageURL } from "../../utils/axios-instance";
const ReportCardComponent = ({data}) => {
  return (
    <div className={`${style.container}`}>
      <span className={`${style.first}`}>{data?.name}</span>
      <div className={`${style.main}`}>
        <div>
          <img height="64px" src={`${imageURL}/img/${data?.img}`} alt="" />
        </div>
        <div>
          <p className={`${style.second}`}>
            {data.sum.toLocaleString()} <span style={{ color: "gray" }}>UZS</span>
          </p>
          <div>
            <span className={`${style.third}`}>
              Oxirgi tushum |{" "}
              <span style={{ color: "#19C655" }}> +{data?.last?.toLocaleString()||0} UZS</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCardComponent;
