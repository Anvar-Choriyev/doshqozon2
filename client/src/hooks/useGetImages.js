import { useEffect, useState } from "react";
import http from "../utils/axios-instance";

const useGetImages = (data) => {
  const [imageNames, setImageNames] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const names = await Promise.all(
        data.map(async (item) => await getImagesHandler(item?.attachmentId))
      );
      setImageNames(names);
    };
    data && fetchImages();
  }, [data]);

  const getImagesHandler = async (id) => {
    try {
      const res = await http({
        url: `/attachments/${id}`,
      });
      return res.data.data.name;
    } catch (error) {
      console.log(error);
    }
  };

  return imageNames;
};
export default useGetImages;
