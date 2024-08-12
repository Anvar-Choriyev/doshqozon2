import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import http from "../utils/axios-instance";

const useGetUserImage = () => {
    const { setAppData, user } = useContext(AppContext);

    const getUserImage = async (id) => {
        if (id) {

            try {
                const res = await http({
                    url: `/attachments/${id}`,
                });
                localStorage.setItem("user", JSON.stringify({ ...user, attachmentId: id, userImage: res.data.data?.name }));
                setAppData({
                    user: { ...JSON.parse(localStorage.getItem("user")) },
                    token: localStorage.getItem("token"),
                    isAuth: true,
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return getUserImage;
};

export default useGetUserImage;
