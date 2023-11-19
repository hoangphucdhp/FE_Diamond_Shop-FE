import React, { useEffect, useRef, useState } from "react";
import style from "../../css/admin/category/listcategory.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getIdcategoryItemUpdate, getIdcategoryUpdate, reloadPage } from "../../service/Actions";

function ListCategory() {
  const [listCategory, setlistcategory] = useState([])
  const dispatch = useDispatch();
  const data = useSelector((state) => state.allDataCategory);
  const reload = useSelector((state) => state.getreloadPage);

  useEffect(() => {
    if (Array.isArray(data)) {
      setlistcategory(data);
    }
  }, [data,reload]);
  return (
    <React.Fragment>
      <div className={style.listCategory}>
        <div className={style.heading}>
          <div className={style.column}>
            <label className={style.title}>Danh sách phân loại sản phẩm</label>
          </div>
        </div>
        <div className={style.table}>
          <div className={style.tableHeading}>
            <label className={style.column}>ID</label>
            <label className={style.column}>Mã loại</label>
            <label className={style.column}>Hình ảnh</label>
            <label className={style.column}>Tên loại</label>
            <label className={style.column}>Danh sách loại</label>
            <label className={style.column}>Trạng thái</label>
            <label className={style.column}></label>
          </div>
          {listCategory.map((value, index) => (
            <div key={value.id} className={style.tableBody}>
              <label className={style.column}>
                {index}
              </label>
              <label className={style.column}>{value.id}</label>
              <label className={style.column}>
                <img
                  className={style.image}
                  src={`http://localhost:8080/api/uploadImageProduct/${value.image}`}
                  alt="Hình Ảnh"
                ></img>
              </label>
              <label className={style.column}>{value.type_category}</label>
              <div className={style.column}>
                <ul className={style.menu}>
                {value.listCategory?.map((valueCategory, indexCategory) => (
                    <li key={indexCategory} className={style.menuItem}>
                      {valueCategory.type_category_item}
                      <i className="bi bi-pencil-square" onClick={() => {
                        dispatch(getIdcategoryItemUpdate(valueCategory.id));
                      }}></i>

                    </li>
                ))}
                </ul>
              </div>
              <label className={style.column}>
                <span
                  className={style.status}
                  style={{ backgroundColor: value.status ? "green" : "red" }}
                >
                  {value.status ? "Đang hoạt động" : "Dừng hoạt động"}
                </span>
              </label>
              <label className={style.column}>
                <i className="bi bi-pencil-square" onClick={() => {
                  dispatch(getIdcategoryUpdate(value.id));
                  console.log('id',value.id)
                }}></i>
              </label>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ListCategory;
