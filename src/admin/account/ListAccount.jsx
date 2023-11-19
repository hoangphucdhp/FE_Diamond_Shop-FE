import React, { useEffect, useState } from "react";
import style from "../../css/admin/account/listaccount.module.css";
import Nav from "react-bootstrap/Nav";
import axios from "axios";

const numberPage = 10;
function ListAccount() {

  const [accounts, setAccounts] = useState([]);
  const fecthAPi = () => {
    axios.get(`http://localhost:8080/api/account/getAll`)
      .then((response) => {
        setAccounts(response.data.data)
      }).catch((e) => {
        console.log(e)
      })
  }
  useEffect(() => {
    fecthAPi()
  },[])
  console.log(accounts)
  return (
    <React.Fragment>
      <div className={style.listAccount}>
        <label className={style.heading}>Danh sách tài khoản</label>
        <div className={style.table}>
          <div className={style.tableHeading}>
            <label className={style.column}>ID</label>
            <label className={style.column}>Tên tài khoản</label>
            <label className={style.column}>Họ & tên</label>
            <label className={style.column}>Giới tính</label>
            <label className={style.column}>Số điện thoại</label>
            <label className={style.column}>Email</label>
            <label className={style.column}>Ngày tạo</label>
            <label className={style.column}>Trạng thái</label>
            <label className={style.column}></label>
          </div>
          {accounts?.content?.map((value, index) => (
            <div key={index} className={style.tableBody}>
              <label className={style.column}>
                {index + 1}
              </label>
              <label className={style.column}>{value.username}</label>
              <label className={style.column}>{value.infoAccount?.fullname}</label>
              <label className={style.column}>{value.infoAccount?.gender}</label>
              <label className={style.column}>{value.infoAccount?.phone}</label>
              <label className={style.column}>{value.infoAccount?.email}</label>
              <label className={style.column}>{value.create_date}</label>
              <label className={style.column}>
                <span
                  className={style.statusAccount}
                  style={{ backgroundColor: value.status ? "green" : "red" }}
                >
                  {value.status ? "Đang hoạt động" : "Dừng hoạt động"}
                </span>
              </label>
              <label className={style.column}>
                <Nav.Link href="#edit">
                  <i className={`bi bi-pencil-square`}></i>
                </Nav.Link>
              </label>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ListAccount;