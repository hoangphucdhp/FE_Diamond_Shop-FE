import React, { useEffect, useState } from "react";
import style from "../../css/admin/shop/listshop.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIdShop } from "../../service/Actions";
import ModelAccess from "./ModelAccess";
import moment from 'moment';
function formatDate(date){
  return moment(date).format("DD-MM-YYYY HH:mm:ss");
}
function ListShop() {
  const [listShop, setListShop] = useState([])
  const dispatch = useDispatch();
  const data = useSelector((state) => state.allDataShop);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (Array.isArray(data)) {
      const listShop = data.map(value=>value.shop)
      setListShop(listShop);
    }

  }, [data]);

  return (
    <React.Fragment>
      <div className={style.filter}>
        <label className={style.heading}>Danh sách cửa hàng</label>
      </div>
      <div className={style.listShop}>
        {listShop?.map((value, index) => (
          <div className={style.cardShop} key={index}>
            <div className={style.heading}>
              <img
                className={style.image}
                src={`http://localhost:8080/api/uploadImageProduct/${value.image}`}
                alt="Hình Ảnh"
              ></img>
              <div className={style.content}>
                <label className={style.shopName}>{value.shop_name}</label>
                <label className={style.createDate}>{formatDate(value.create_date)}</label>
              </div>
            </div>
            <div className={style.address}>
              <div className={style.title}>Địa chỉ:</div>
              <div className={style.content}>
                <label>Thành phố: {value.addressShop?.city}</label>
                <label>Quận: {value.addressShop?.district}</label>
                <label>Đường: {value.addressShop?.ward}</label>
                <label>Số nhà: {value.addressShop?.address}</label>
              </div>
            </div>
            <div className={style.status}>
              <span
                className={style.statusShop}
                style={{ backgroundColor: value.status === 2 ? "red" : "green" }}
                onClick={() => {
                  dispatch(getIdShop(value.id));
                  openModal();
                }}
              >
                {value.status === 0
                  ? "Chờ Xác Nhận"
                  : value.status === 1 ? "Đang hoạt động" : value.status === 2 ? "Cấm hoạt động" : null}
              </span>
            </div>
          </div>
        ))}
      </div>
      {showModal && <ModelAccess status={showModal} toggleShow={closeModal} />}
    </React.Fragment>
  );
}

export default ListShop;
