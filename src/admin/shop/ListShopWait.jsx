import React, { useEffect, useState } from "react";
import style from "../../css/admin/shop/listshop.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIdShop } from "../../service/Actions";
import { Nav } from "react-bootstrap";
import moment from 'moment';
function ListShopWait() {
  const [ListShopWait, setListShopwait] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector(state => state.allDataShop);

  useEffect(
    () => {
      if (Array.isArray(data)) {
        console.log(data)
        const listFilter = data.filter(a => {
          return a.shop.status === 0
        }
        )
        setListShopwait(listFilter);
      }
    },
    [data]
  );
  function formatDate(date) {
    return moment(date).format("DD-MM-YYYY HH:mm:ss");
  }
  return (
    <React.Fragment>
      <div className={style.listShopActive}>
        <div className={style.table}>
          <div className={style.tableHeading}>
            <label className={style.column}>ID</label>
            <label className={style.column}>Tên cửa hàng</label>
            <label className={style.column}>Chủ sở hữu</label>
            <label className={style.column}>Ngày tạo</label>
            <label className={style.column}>Trạng thái</label>
            <label className={style.column}>Hình ảnh</label>
            <label className={style.column} />
          </div>
          {ListShopWait.map((value, index) =>
            <div key={index} className={style.tableBody}>
              <label className={style.column}>
                {index}
              </label>
              <label className={style.column}>
                {value.shop.shop_name}
              </label>
              <label className={style.column}>
                {value.username}
              </label>
              <label className={style.column}>
                {formatDate(value.shop.create_date)}
              </label>
              <label className={style.column}>
                <span
                  className={style.status}
                  style={{
                    backgroundColor: value.shop.status === 0 ? "#34219E" : null,
                    padding: "5px 10px"
                  }}
                  value={`${value.shop.status}`}
                >
                  {value.shop.status === 0 ? "Chờ Xác Nhận" : null}
                </span>
              </label>
              <label className={style.column}>
                <img
                  style={{ width: "100px" }}
                  src={`http://localhost:8080/api/uploadImageProduct/${value.shop.image}`}
                  alt="Hình Ảnh"
                />
              </label>

              <label
                className={style.column}
                onClick={() => {
                  dispatch(getIdShop(value.shop.id));
                }}
              >
                <Link to="/admin/shop/shopdetail">Xem Chi Tiết</Link>
              </label>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ListShopWait;
