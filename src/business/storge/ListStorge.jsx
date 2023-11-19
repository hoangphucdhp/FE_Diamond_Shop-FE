import React, { useEffect, useRef, useState } from "react";
import style from "../../css/business/storge.module.css";
import ProductService from "../../service/ProductService";
import { useSelector } from "react-redux";

function ListStorge() {
  const [listProduct, setdataproduct] = useState([]);
  const reload = useSelector((state) => state.getreloadPage);
  useEffect(() => {
      getdataProduct()
  }, [reload]);

  const getdataProduct = async () => {
    try {
      const response = await ProductService.getAllProduct(1);
      if (response && Array.isArray(response)) {
        console.log('Response:', response);
        setdataproduct(response);
      } else {
        console.error('Invalid or empty response received');
      }
    } catch (error) {
      console.error('Error fetching and setting products:', error);
    }
  };

  return (
    <React.Fragment>
      <div className={`${style.listProduct}`}>
        <div className={style.table}>
          <div className={style.tableHeading}>
            <label className={style.column}>STT</label>
            <label className={style.column}>Mã SP</label>
            <label className={style.column}>Hình ảnh</label>
            <label className={style.column}>Tên SP</label>
            <label className={style.column}>Loại SP</label>
            <label className={style.column}>Số lượng</label>

          </div>
          {listProduct.map((value, index) =>
            <div key={index} className={style.tableBody}>
              <label className={style.column}>
                {index}
              </label>
              <label className={style.column}>
                {value.id}
              </label>
              <label className={style.column}>
                {value?.image_product.length > 0 ? (value?.image_product.map((value) => (
                  <img className={style.image} src={`http://localhost:8080/api/uploadImageProduct/${value.url}`} alt="Hình Ảnh"></img>)
                )) : <img className={style.image} src={`/images/nullImage.png`} alt="Hình Ảnh"></img>}
              </label>
              <label className={style.column}>
                {value.product_name}
              </label>
              <label className={style.column}>
                {value.categoryItem_product.type_category_item}
              </label>
              <label className={style.column}>
                {value.listStorage?.reduce((total, storage) => total + storage.quantity, 0)}
              </label>

            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ListStorge;