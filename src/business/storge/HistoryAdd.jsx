import React, { useEffect, useState } from "react";
import style from "../../css/business/storge.module.css";
import ProductService from "../../service/ProductService";
import moment from "moment";
import { useSelector } from "react-redux";

function HistoryAdd() {
  const [listProducts, setListProducts] = useState([]);
  const reload = useSelector((state) => state.getreloadPage);

  useEffect(() => {
    getdataProducts();
  }, [reload]);

  const getdataProducts = async () => {
    try {
      const response = await ProductService.getAllProduct(1);
      const allProducts = response.flatMap(product => {
        return product.listStorage.map(storageItem => ({
          ...product,
          storageItem,
        }));
      });

      const sortedProducts = allProducts.sort((a, b) => {
        const dateA = moment(a.storageItem.create_date);
        const dateB = moment(b.storageItem.create_date);
        return dateB - dateA;
      });

      setListProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY HH:mm:ss");
  };

  return (
    <div className={`${style.listProduct}`}>
      <div className={style.table}>
        <div className={style.tableHeading}>
          <label className={style.column}>STT</label>
          <label className={style.column}>Mã SP</label>
          <label className={style.column}>Hình ảnh</label>
          <label className={style.column}>Tên SP</label>
          <label className={style.column}>Loại SP</label>
          <label className={style.column}>Số lượng</label>
          <label className={style.column}>Ngày thực hiện</label>
        </div>
        {listProducts.map((product, index) => (
          <div key={`${product.id}_${index}`} className={style.tableBody}>
            <>
              <label className={style.column}>{index + 1}</label>
              <label className={style.column}>{product.id}</label>
              <label className={style.column}>
                {product?.image_product.length > 0 ? (
                  product?.image_product.map((image) => (
                    <img
                      key={image.id}
                      className={style.image}
                      src={`http://localhost:8080/api/uploadImageProduct/${image.url}`}
                      alt="Hình Ảnh"
                    />
                  ))
                ) : (
                  <img
                    className={style.image}
                    src={`/images/nullImage.png`}
                    alt="Hình Ảnh"
                  />
                )}
              </label>
              <label className={style.column}>{product.product_name}</label>
              <label className={style.column}>
                {product.categoryItem_product.type_category_item}
              </label>
            </>
            <label className={style.column}>
              {product.storageItem.quantity || ""}
            </label>
            <label className={style.column}>
              {formatDate(product.storageItem.create_date) || ""}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryAdd;