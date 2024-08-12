import styles from "./index.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaPersonal } from "../../../../mock/settings-page";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import http from "../../../../utils/axios-instance";

import Form from "../../../../components/Generics/Form/Form";
import Input from "../../../../components/Generics/Input/Input";
import Button from "../../../../components/Generics/Button/Button";
import AppContext from "../../../../context/AppContext";
import Fields from "./Fields";
import useGetImageHandler from "../../../../hooks/useGetImage";

const UserData = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(schemaPersonal),
  });
  const [attachmentId, setAttachmentId] = useState();
  const { user, setAppData } = useContext(AppContext);
  const getImageHandler = useGetImageHandler();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const {
        data: { data },
      } = await http({
        url: `/users/${user?.id}`,
        method: "GET",
      });
      setAttachmentId(data.userById.attachmentId);
      reset({
        ...data.userById,
        birthDate: data.userById.birthDate.split("T")[0],
      });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const formSubmit = async (formData) => {
    if (
      isDirty ||
      attachmentId !== JSON.parse(localStorage.getItem("user")).attachmentId
    ) {
      const newData = {
        ...formData,
        attachmentId: JSON.parse(localStorage.getItem("user")).attachmentId,
      };
      try {
        const {
          data: { data, message },
        } = await http({
          url: `/users/${user?.id}`,
          method: "PUT",
          data: newData,
        });
        setAppData({
          user: {
            firstName: data.firstName,
            lastName: data.lastName,
            ...data,
            userImage: data.attachment.name,
          },
          token: localStorage.getItem("token"),
          isAuth: true,
        });
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data));
        getImageHandler(data.attachmentId, setAppData, user);
        toast.success(message);
        reset({ ...data, birthDate: data.birthDate.split("T")[0] });
        setAttachmentId(data.attachmentId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateFoodImage = async () => {
    try {
      const res = await http({
        url: `/attachments/${user?.attachmentId}`,
        method: "PUT",
      });
    } catch (err) {}
  };
  return (
    <div className={styles.user}>
      <h3 className={styles["user__title"]}>Shaxsiy ma'lumot</h3>
      <Form
        onSubmit={handleSubmit(formSubmit)}
        className={styles["user__form"]}
      >
        <div className={styles["user__form-radio"]}>
          <label htmlFor="male" className={`subtitle`}>
            <span>Erkak</span>
            <Input
              {...register("gender")}
              type="radio"
              value="MALE"
              id="male"
            />
          </label>
          <label htmlFor="female" className={`subtitle`}>
            <span>Ayol</span>
            <Input
              {...register("gender")}
              type="radio"
              value="FEMALE"
              id="female"
            />
          </label>
        </div>
        <Fields register={register} errors={errors} />
        <Button
          type="submit"
          mode="orange"
          size="big"
          className={styles["user__btn"]}
          onClick={updateFoodImage}
        >
          O'zgarishlarni saqlash
        </Button>
      </Form>
    </div>
  );
};

export default UserData;
