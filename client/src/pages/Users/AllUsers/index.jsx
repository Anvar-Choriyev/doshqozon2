import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios-instance";
import { toast } from "react-toastify";
import BasicTable from "../../../components/Generics/Table";
import Button from "../../../components/Generics/Button/Button";
import ThreeDots from "../../../assets/icons/ThreeDots";
import { Dropdown, Menu, Modal } from "antd";
import styles from "./index.module.css";
import Plus from "../../../assets/icons/Plus.png";
import Layout from "../../../components/Layout/Layout";

const AllUsers = () => {
    const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const getAllUsers = async () => {
    try {
      const res = await axiosInstance({
        url: "/users",
        method: "GET",
      });
      console.log(res.data?.data);
      setUsers(res.data?.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteUser=async(id)=>{
    try {
        const res = await axiosInstance({
          url: `/users/${id}`,
          method: "DELETE",
        });
        getAllUsers()
        toast.success("User muvaffaqiyatli o'chirildi");
      } catch (error) {
        toast.error(error.response.data.message);
      }
  }
  useEffect(() => {
    getAllUsers();
  }, []);
  const handleItem = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
      Modal.confirm({
        title: "O'chirish",
        content: `Rostan ham o'chirmoqchimisiz?`,
        okText: "Ha",
        cancelText: "Yo'q",
        onOk: () => {
            deleteUser(id);
        },
      });
    
  };
  const packageCols = [
    {
      id: "FIO",
      Header: "FIO",
      accessor: (s) => {
        return (
          <h2>
            {s.firstName} {s.lastName}
          </h2>
        );
      },
    },
    {
      id: "PhoneNumber",
      Header: "Telefon raqami",
      accessor: "phoneNumber",
    },
    {
      id: "UserName",
      Header: "Role",
      accessor: "userRole",
    },
    {
      id: "Amallar",
      Header: "Amallar",
      accessor: (user) => (
        <div className={styles["category__dots"]}>
          <Dropdown
            placement="topLeft"
            arrow
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="edit">
                  <Link
                    to={`./${user.id}`}
                    className={`main-text ${styles["edit-btn"]}`}
                  >
                    Tahrirlash
                  </Link>
                </Menu.Item>
                <Menu.Item key="delete">
                  <span
                    className={`main-text ${styles["edit-btn"]}`}
                    onClick={(event) => handleItem(event, user.id)}
                  >
                    O'chirish
                  </span>
                </Menu.Item>
              </Menu>
            }
          >
            <Button>
              <ThreeDots />
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ];
  return (
    <Layout>
        <div className={` ${styles.category}`}>
                <div className={styles['category__top']}>
                    <h3 className={styles['category__title']}>Foydalanuvchilar</h3>
                    <Button mode='orange' size='small' onClick={()=>navigate('./new')}>
                        <img className={styles.addButton} src={Plus} />
                    </Button>
                </div>
                {users && <BasicTable columns={packageCols} data={users} />}
            </div>
        </Layout>
  );
};

export default AllUsers;
