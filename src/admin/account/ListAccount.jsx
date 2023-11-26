import React, { useEffect, useState } from "react";
import style from "../../css/admin/account/listaccount.module.css";
import { callAPI } from "../../service/API";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import ModelEdit from "./ModelEdit";
import { getIdAccountAdmin } from "../../service/Actions";
import { Pagination } from "@mui/material";

function formatDate(date) {
  return moment(date).format("DD-MM-YYYY HH:mm:ss");
}
function ListAccount() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.idAccountAdmin);
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const numberPage = 10; 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setkeyword] = useState('');
  const [keyfind, setkeyfind] = useState('');
  const [reload, setreload] = useState(0)
  const [sortBy,setsortBy]=useState('')
  const [sortType,setsortType]=useState('')


  useEffect(() => {
    getdata(currentPage);
  }, [data, currentPage, reload,sortType]);


  const getdata = async (page) => {
    try {
      const response = await callAPI(`/api/account/getAll?key=${keyfind}&keyword=${keyword}&shoporaccount=account&offset=${(page - 1) * numberPage}&sizePage=${numberPage}&sort=${sortBy}&sortType=${sortType}`, "GET");
      const responseData = response.data;
      setAccounts(responseData || []);
      setTotalPages(responseData.totalPages || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };


  return (
    <React.Fragment>
      <div className={style.listAccount}>
        <div className={style.heading}>
          <div className={style.column}>
            <label className={style.title}>Danh sách sản phẩm</label>
            <div className={`${style.formSearch}`}>
              <select
                className={`${style.optionSelect}`}
                value={keyfind}
                onChange={(e) => {
                  setkeyfind(e.target.value)
                }}
              >
                <option value="fullname">Tên tài khoản</option>
                <option value="username">Tên đăng nhập</option>
              </select>
              <input
                className={`${style.inputSearch}`}
                type="text"
                onChange={(e) => {
                  setkeyword(e.target.value)
                }}
              />
              <button className={`${style.buttonSearch}`} onClick={() => { setreload(reload + 1) }}>Tìm Kiếm</button>
            </div>
          </div>
        </div>

        {/* Sort */}
        <div className={`${style.typeProduct}`}>
          <label>Sắp xếp</label>
          <select
            value={sortBy}
            onChange={(e)=>{
              setsortBy(e.target.value)
            }}
            className={`${style.optionSelectType}`}
          >
            <option value="">Lựa chọn...</option>
                <option value={'id'}>
                    Mã tài khoản
                </option>
                <option value={'username'}>
                    Tên đăng nhập
                </option>
                <option value={'create_date'}>
                    Ngày tạo
                </option>
          </select>
          {sortBy !== ''
            ? <select
              value={sortType}
              onChange={(e)=>{
                setsortType(e.target.value)
              }}
              className={`${style.optionSelectType}`}
            >
              <option value="asc">Tăng dần</option>
              <option value="desc">Giảm dần</option>
            </select>
            : null}
        </div>

        <label className={style.heading}>Danh sách tài khoản</label>
        <div className={style.table}>
          <div className={style.tableHeading}>
            <label className={style.column}>STT</label>
            <label className={style.column}>ID</label>
            <label className={style.column}>Hình ảnh</label>
            <label className={style.column}>Tên tài khoản</label>
            <label className={style.column}>Họ & tên</label>
            <label className={style.column}>Giới tính</label>
            <label className={style.column}>Số điện thoại</label>
            <label className={style.column}>Email</label>
            <label className={style.column}>Ngày tạo</label>
            <label className={style.column}>Loại tài khoản</label>
            <label className={style.column}>Trạng thái</label>
            <label className={style.column}></label>
          </div>
          {accounts?.content?.map((value, index) => (
            <div key={index} className={style.tableBody}>
              <label className={style.column}>
                {index + 1}
              </label>
              <label className={style.column}>{value.id}</label>
              <label className={style.column}><img
                className={style.image}
                src={`http://localhost:8080/api/uploadImageProduct/${value.infoAccount?.image}`}
                alt="Hình Ảnh"
              ></img></label>
              <label className={style.column}>{value.username}</label>
              <label className={style.column}>{value.infoAccount?.fullname}</label>
              <label className={style.column}>{value.infoAccount?.gender}</label>
              <label className={style.column}>{value.infoAccount?.phone}</label>
              <label className={style.column}>{value.infoAccount?.email}</label>
              <label className={style.column}>{formatDate(value.create_date)}</label>
              <label className={style.column}>{value.role?.role.role_name}</label>
              <label className={style.column}>
                <span
                  className={style.statusAccount}
                  style={{ backgroundColor: value.status ? "green" : "red" }}
                >
                  {value.status ? "Đang hoạt động" : "Cấm hoạt động"}
                </span>
              </label>
              <label className={style.column}>
                <i className={`bi bi-pencil-square`} onClick={() => {
                  dispatch(getIdAccountAdmin(value.id));
                  openModal();
                }}></i>
              </label>
            </div>
          ))}
        </div>

        <div className={style.paginationContainer} style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            boundaryCount={2}
            variant="outlined"
            shape="rounded"
            size="large"
            showFirstButton
            showLastButton
          />
        </div>


      </div>
      {showModal && <ModelEdit status={showModal} toggleShow={closeModal} />}
    </React.Fragment >
  );
}

export default ListAccount;