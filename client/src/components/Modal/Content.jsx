import React, { useEffect, useState, useContext } from "react";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import style from "./Content.module.css";
import { toast } from "react-toastify";
import http, { imageURL } from "../../utils/axios-instance";

import { CartContext } from "../../context/cart/CartContextProvider";
import Button from "../Generics/Button/Button";

const Content = (props) => {
  const ctx = useContext(CartContext);

  const [categories, setCategories] = useState([]);
  const [allFods, setAllFods] = useState([]);
  useEffect(() => {
    !props.url && getAllCategories();
  }, []);
  useEffect(() => {
    console.log(allFods);
  }, []);
  const addAllFodsFn = (items, all) => {
    if (all) {
      for (let i = 0; i < items.length; i++) {
        const existingItemIndex = allFods.findIndex(
          (e) => e.id === items[i].id
        );
        const existingItem = allFods[existingItemIndex];
        let updatedItems;
        if (existingItem) {
          updatedItems = [...allFods];
          updatedItems[existingItemIndex] = {
            ...existingItem,
            count: existingItem?.count || 0 + 1,
          };
          setAllFods(updatedItems);
        } else {
          setAllFods([...allFods, { ...items[i], count: 1 }]);
        }
      }
    } else {
      const existingItemIndex = allFods.findIndex((e) => e.id === items.id);
      const existingItem = allFods[existingItemIndex];
      let updatedItems;
      if (existingItem) {
        updatedItems = [...allFods];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          count: (existingItem?.count || 0) + 1,
        };
        setAllFods(updatedItems);
      } else {
        setAllFods([...allFods, { ...items, count: 1 }]);
      }
    }
  };
  const removeAllFodsItemFn = (id) => {
    const existingItemIndexOnRemove = allFods.findIndex((i) => i.id === id);
    const existingItemOnRemove = allFods[existingItemIndexOnRemove];
    let updatedItemsOnRemove;

    if (existingItemOnRemove) {
      if (existingItemOnRemove?.count === 1) {
        updatedItemsOnRemove = allFods.filter(
          (i) => i.id !== existingItemOnRemove.id
        );
      } else {
        updatedItemsOnRemove = [...allFods];
        updatedItemsOnRemove[existingItemIndexOnRemove] = {
          ...existingItemOnRemove,
          count: existingItemOnRemove?.count - 1,
        };
      }

      return setAllFods(updatedItemsOnRemove);
    }
  };
  const getAllCategories = async () => {
    try {
      const res = await http({
        url: `/food-items/${props.id}`,
        method: "GET",
      });
      console.log(res);
      setCategories(res.data.data);
      addAllFodsFn(res?.data?.data?.foodItems, true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  function closeModal(e) {
    e.stopPropagation();
    props.setOpen(false);
  }

  function add(item) {
    console.log(allFods);
    for (let i = 0; i < allFods.length; i++) {
      console.log(allFods[i].count);
      ctx.onAddItem({
        id: allFods[i].id,
        price: allFods[i].price,
        name: allFods[i].name,
        attachmentId: allFods[i].attachmentId,
        count: allFods[i].count,
      });
    }
    setAllFods([]);
  }

  function remove(id) {
    ctx.onRemoveItem(id);
  }

  return (
    <section className={style.container}>
      <Close className={style.close} onClick={closeModal} />
      <div className={style.block}>
        {categories?.main?.img && (
          <div className={style.img_container}>
            <img
              style={{ borderRadius: "50%" }}
              height="150px"
              width="150px"
              src={`${imageURL}/img/${categories?.main?.img}`}
              alt=""
            />
          </div>
        )}
        <p>{categories?.main?.name}</p>
        <p className={style.pText}>{categories?.main?.measure}</p>
        <p className={style.pSum}>{categories?.main?.price}</p>
      </div>
      {console.log(categories)}
      {/* {categories?.foodItem?.length > 0 ? ( */}
      {categories?.foodItems?.length > 0 ? (
        categories?.foodItems?.map((i) => (
          <div key={i.id}>
            <div className={style.item}>
              <div className={style.imgDiv}>
                {/*                 
                {i.attachment.name&&<img
                  height="64px"
                  width="64px"
                  src={`${imageURL}/img/${i.attachment.name}`}
                  alt=""
                />} */}
                {i.attachment.name && (
                  <div className={style.img_container2}>
                    <img src={`${imageURL}/img/${i.attachment.name}`} alt="" />
                  </div>
                )}

                <p>{i.name}</p>
              </div>
              <div className={style.itemChange}>
                <Button
                  mode="gray"
                  size="small"
                  newFont={true}
                  onClick={() => removeAllFodsItemFn(i.id)}
                >
                  -
                </Button>
                {console.log(allFods.filter((e) => e.id === i.id)[0])}
                <p>{allFods.filter((e) => e.id === i.id)[0]?.count || 0}</p>
                <Button
                  mode="orange"
                  size="small"
                  newFont={true}
                  onClick={() => addAllFodsFn(i)}
                >
                  +
                </Button>
              </div>
            </div>
            <Button
              mode="orange"
              size="big"
              newFont={true}
              onClick={() => add()}
            >
              Qo'shish
            </Button>
          </div>
        ))
      ) : (
        //      <div key={categories?.foodItem?.id}>
        //   <div className={style.item}>
        //     <div className={style.imgDiv}>
        //       <img
        //         height="64px"
        //         width="64px"
        //         src={`${imageURL}/img/${categories?.foodItem?.attachment.name}`}
        //         alt=""
        //       />

        //       <p>{categories?.foodItem?.name}</p>
        //     </div>
        //     <div className={style.itemChange}>
        //       <Button
        //         mode="gray"
        //         size="small"
        //         newFont={true}
        //         onClick={() => removeAllFodsItemFn(categories?.foodItem?.id)}
        //       >
        //         -
        //       </Button>
        //       {console.log(allFods.filter((e) => e.id === categories?.foodItem?.id)[0])}
        //       <p>{allFods.filter((e) => e.id === categories?.foodItem?.id)[0]?.count || 0}</p>
        //       <Button
        //         mode="orange"
        //         size="small"
        //         newFont={true}
        //         onClick={() => addAllFodsFn(categories?.foodItem)}
        //       >
        //         +
        //       </Button>
        //     </div>
        //   </div>
        //   <Button
        //     mode="orange"
        //     size="big"
        //     newFont={true}
        //     onClick={() => add()}
        //   >
        //     Qo'shish
        //   </Button>
        // </div>
        <>
          <div key={categories?.mainFood?.id}>
            <div className={style.item}>
              <div className={style.imgDiv}>
                {categories?.mainFood?.attachment.name && (
                  <img
                    height="64px"
                    width="64px"
                    src={`${imageURL}/img/${categories?.mainFood?.attachment.name}`}
                    alt=""
                  />
                )}

                <p>{categories?.mainFood?.name}</p>
              </div>
              <div className={style.itemChange}>
                <Button
                  mode="gray"
                  size="small"
                  newFont={true}
                  onClick={() => removeAllFodsItemFn(categories?.mainFood?.id)}
                >
                  -
                </Button>
                {console.log(
                  allFods.filter((e) => e.id === categories?.mainFood?.id)[0]
                )}
                <p>
                  {allFods.filter((e) => e.id === categories?.mainFood?.id)[0]
                    ?.count || 0}
                </p>
                <Button
                  mode="orange"
                  size="small"
                  newFont={true}
                  onClick={() => addAllFodsFn(categories?.mainFood)}
                >
                  +
                </Button>
              </div>
            </div>
            <Button
              mode="orange"
              size="big"
              newFont={true}
              onClick={() => add()}
            >
              Qo'shish
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default Content;
