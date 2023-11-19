import React, { useState, useEffect } from "react";
import style from "../../css/admin/product/editproduct.module.css";


const listImage = [
  "banner-left.jpg",
  "banner-left.jpg",
  "banner-left.jpg",
  "banner-left.jpg",
  "banner-left.jpg",
  "banner-left.jpg",
  "banner-left.jpg",
  "banner-left.jpg",
  "banner-left.jpg"
];
//CHUYỂN ĐỔI TIỀN TỆ
function formatCurrency(price, promotion) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0
  });
  return formatter.format(price - price * (promotion / 100));
}

function EditProduct() {
  return (
    <React.Fragment>
      <div className={style.header}>
        <div className={style.formSearch}>
          <i className={`bi bi-search ${style.icon}`} />
          <input
            className={style.input}
            type="text"
            placeholder="Tìm kiếm..."
          />
        </div>
        <i className={`bi bi-person-circle ${style.iconUser}`} />
      </div>
      <div className={style.formAction}>
        <label className={style.heading}>Thông tin sản phẩm</label>
        <div className={style.listImage}>
          {listImage.map((value,index)=>(
            <div className={style.cardImage} key={index}>
              <img className={style.image} src={`/images/${value}`} alt="Hình Ảnh"></img>
              <label className={style.title}>Ảnh sản phẩm thứ {index + 1}</label>
            </div>
          ))}
        </div>
        <div className={style.formContent}>
          <div className={style.contentLeft}>
            <input
              className={style.input}
              type="text"
              placeholder="Mã sản phẩm"
              readOnly
              disabled
            />
            <input
              className={style.input}
              type="text"
              placeholder="Tên sản phẩm"
              readOnly
              disabled
            />
            <input
              className={style.input}
              type="text"
              placeholder="Tên cửa hàng"
              readOnly
              disabled
            />
            <input
              className={style.input}
              type="text"
              placeholder="Giá sản phẩm"
              readOnly
              disabled
            />
            <input
              className={style.input}
              type="text"
              placeholder="Loại sản phẩm"
              readOnly
              disabled
            />
          </div>
          <div className={style.contentRight}>
            <input
              className={style.input}
              type="text"
              placeholder="Tài khoản chủ cửa hàng"
              readOnly
              disabled
            />
            <input
              className={style.input}
              type="text"
              placeholder="Tên chủ cửa hàng"
              readOnly
              disabled
            />
            <input
              className={style.input}
              type="text"
              placeholder="Ngày tạo"
              readOnly
              disabled
            />
            <input
              className={style.input}
              type="text"
              placeholder="Mô tả"
              readOnly
              disabled
            />
            <select className={style.input}>
              <option value="">Trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="band">Cấm hoạt động</option>
            </select>
          </div>
        </div>
        <div className={style.formButton}>
          <button className={style.button}>
            <i className="bi bi-pencil-square" /> SỬA
          </button>
          <button className={style.button}>
            <i className="bi bi-arrow-clockwise" /> LÀM MỚI
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditProduct;
