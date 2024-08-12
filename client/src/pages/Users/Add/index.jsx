import styles from "./index.module.css";

import Button from "../../../components/Generics/Button/Button";
import Form from "../../../components/Generics/Form/Form";
import Input from "../../../components/Generics/Input/Input";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addUserSchema } from "../../../mock/user-dates";
import http, { imageURL } from "../../../utils/axios-instance";
import { useEffect, useRef, useState } from "react";
import Download from "../../../assets/icons/Download";
import Delete from "../../../assets/icons/Delete";
import Eye from "../../../assets/icons/Eye";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios-instance";
import { userUpdateSchema } from "../../../mock/user-update";
import Layout from "../../../components/Layout/Layout";

const userData = ["", "ADMIN", "CASHIER"];

const Add = () => {
  const params = useParams();
  const navigate = useNavigate();
  const isUpdate = params.id !== "new";
  const [img, setImg] = useState(null);
  const [visible, setVisible] = useState(false);
  const [role, setRole] = useState(null);
  const imgRef = useRef(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(isUpdate?userUpdateSchema:addUserSchema),
    defaultValue: {},
    mode: "onChange",
  });
  const getImg = async (id) => {
    try {
      const res = await axiosInstance({
        url: `/attachments/${id}`,
        method: "GET",
      });
      setImg(res.data?.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const getUser = async () => {
    try {
      const res = await axiosInstance({
        url: `/users/${params.id}`,
        method: "GET",
      });
      console.log(res.data?.data);
      res.data?.data?.userById?.attachmentId&&getImg(res.data?.data?.userById.attachmentId)
      reset({...res.data?.data.userById, birthDate: res.data?.data?.userById.birthDate.split('T')[0]});
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (isUpdate) {
      getUser();
    }
  }, []);
  const formSubmit = async (value) => {
    const updatedData = { ...value, attachmentId: img?.id, userRole: role||value.userRole };
    console.log(updatedData);

    try {
      const res = await http({
        url:isUpdate?`/users/${params.id}`: "/users",
        method: isUpdate?"PUT":"POST",
        data: updatedData,
      });
      toast.success(res.data.message);
      navigate("/sozlamalar/foydalanuvchilar")
      setImg(null);
      reset();
    } catch (err) {
      err.response.data.error.errors.map((e) => toast.error(e.msg));
    }
  };

  const imageHandler = async ({ target: { files } }) => {
    const formData = new FormData();
    formData.append("food", files[0]);

    try {
      const res = await http({
        url: `/attachments`,
        method: "POST",
        data: formData,
        contentType: "multipart/form-data",
      });
      setImg(res.data.data.newAttachment);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    setImg(null);
    imgRef.current.value = "";
  };

  const handlePassword = () => {
    setVisible(!visible);
  };

  const handleRoleChange = async (value) => {
    await trigger("userRole");
    setRole(value);
  };
  return (
   <Layout>
    <div className={styles.add}>
      <h2 className={`${styles["add__title"]} `}>{isUpdate?"Foydalanuvchi malumotini yangilash":"Foydalanuvchi qo'shish"}</h2>

      <Form onSubmit={handleSubmit(formSubmit)} className={styles["add__form"]}>
        <div className={styles["form__top"]}>
          <label htmlFor="name" className={``}>
            <span className={errors?.firstName ? styles.error : ""}>
              {errors?.firstName?.message || "Ism"}
            </span>
            <Input {...register("firstName")} className={``} mode="silver" />
          </label>
          <label htmlFor="surname" className={``}>
            <span className={errors?.lastName ? styles.error : ""}>
              {errors?.lastName?.message || "Familiya"}
            </span>
            <Input {...register("lastName")} className={``} mode="silver" />
          </label>
        </div>
        <div className={styles["form__radio"]}>
          <p className={`${styles.error} `}>{errors?.gender?.message}</p>
          <label htmlFor="male" className={``}>
            <span>{errors?.male?.message || "Erkak"}</span>
            <Input
              {...register("gender")}
              className={``}
              mode="silver"
              type="radio"
              value="MALE"
              name="gender"
              id="male"
            />
          </label>
          <label htmlFor="female" className={``}>
            <span>{errors?.female?.message || "Ayol"}</span>
            <Input
              {...register("gender")}
              className={``}
              mode="silver"
              type="radio"
              value="FEMALE"
              name="gender"
              id="female"
            />
          </label>
        </div>
        <div className={styles["form__user-icon"]}>
          <label htmlFor="icon">
            <span>Foydalanuvchi rasmi</span>
            <div className={styles["user-icon__field"]}>
              <Input
                onChange={(event) => imageHandler(event)}
                className={``}
                type="file"
                accept=".png, .jpg, .gif, .webp .svg"
                ref={imgRef}
                id="icon"
              />
              <div className={styles["content__file-actions"]}>
                {img && (
             <div className={styles.img_container}>
                <img
                    // className={styles["user-icon"]}
                    src={`${imageURL}/img/${img?.name}`}
                  />
              </div>

               
                )}
                <div>
                  <Download />
                  {img && <Delete onClick={(event) => deleteHandler(event)} />}
                </div>
              </div>
            </div>
          </label>
        </div>
        {!isUpdate&&<div className={styles["form__password"]}>
          <label htmlFor="password" className={``}>
            <span className={errors?.password ? styles.error : ""}>
              {errors?.password?.message || "Parol"}
            </span>
            <Input
              {...register("password")}
              className={``}
              mode="silver"
              type={visible ? "text" : "password"}
            />
            <Button onClick={handlePassword}>
              <Eye mode={visible ? "#febb1b" : ""} />
            </Button>
          </label>
        </div>}
        {!isUpdate&& <div className={styles["form__username"]}>
          <label htmlFor="username" className={``}>
            <span className={errors?.username ? styles.error : ""}>
              {errors?.username?.message || "Username"}
            </span>
            <Input
              {...register("username")}
              className={``}
              mode="silver"
              type="text"
            />
          </label>
        </div>}
        <div className={styles["form__phone-date"]}>
          <label htmlFor="phone" className={``}>
            <span className={errors?.phoneNumber ? styles.error : ""}>
              {errors?.phoneNumber?.message || "Telefon raqam"}
            </span>
            <Input
              {...register("phoneNumber")}
              className={``}
              mode="silver"
              type="phone"
            />
          </label>
          <label htmlFor="phone" className={``}>
            <span className={errors?.birthDate ? styles.error : ""}>
              {errors?.birthDate?.message || "Tug'ilgan kun"}
            </span>
            <Input
              {...register("birthDate")}
              className={``}
              mode="silver"
              type="date"
            />
          </label>
        </div>
        <div className={styles["form__role"]}>
          <label htmlFor="role" className={``}>
            <span className={errors?.userRole ? styles.error : ""}>
              {errors?.userRole?.message || "Lavozimingizni kiriting"}
            </span>
            <Controller
              name="userRole"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Lavozimni tanlang"
                  defaultValue={userData[0]}
                  style={{ width: 120 }}
                  onChange={(value) => {
                    field.onChange(value);
                    handleRoleChange(value);
                  }}
                  options={userData.map((user) => ({
                    label: user,
                    value: user,
                  }))}
                />
              )}
            />
          </label>
        </div>
        <Button
          type="submit"
          mode="orange"
          size="big"
          className={styles["form__btn"]}
        >
          Saqlash
        </Button>
      </Form>
    </div>
   </Layout> 
  );
};

export default Add;
