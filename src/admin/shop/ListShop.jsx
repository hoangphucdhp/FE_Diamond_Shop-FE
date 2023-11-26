import React, { useEffect, useState } from "react";
import style from "../../css/admin/shop/listshop.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllShop, getIdShop } from "../../service/Actions";
import ModelAccess from "./ModelAccess";
import moment from "moment";
import Cookies from "js-cookie";
import listDataAddress from "../../service/AddressVietNam";
import { useNavigate } from "react-router";
import { callAPI } from "../../service/API";
import { Pagination } from "@mui/material";

function formatDate(date) {
  return moment(date).format("DD-MM-YYYY HH:mm:ss");
}
function ListShop() {
  const numberPage = 10; 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setkeyword] = useState('');
  const [keyfind, setkeyfind] = useState('');
  const [reload, setreload] = useState(0)
  const [sortBy,setsortBy]=useState('')
  const [sortType,setsortType]=useState('')
  const [listShop, setListShop] = useState([]);
  const [accountLogin, setAccountLogin] = useState(null);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const data = useSelector((state) => state.idShop);
  useEffect(() => {
    getAccountFromCookie();
    getdata(currentPage);
  }, [reload,currentPage,sortType,data]);


  const getAccountFromCookie = () => {
    const accountCookie = Cookies.get("accountLogin");
    if (accountCookie !== undefined) {
      try {
        const data = JSON.parse(
          decodeURIComponent(escape(window.atob(Cookies.get("accountLogin"))))
        );
        setAccountLogin(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };
  const getdata = async (page) => {
    try {
      const response = await callAPI(`/api/account/getAll?key=${keyfind}&keyword=${keyword}&offset=${(page - 1) * numberPage}&sizePage=${numberPage}&sort=${sortBy}&sortType=${sortType}&shoporaccount=shop`, "GET");
      const responseData = response.data;
      const listShop = responseData.content.map((value) => value.shop);
      setListShop(listShop || []);
      setTotalPages(responseData.totalPages || 1);
      dispatch(getAllShop(responseData.content));
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
      <div className={style.heading}>
          <div className={style.column}>
            <label className={style.title}>Danh sách cửa hàng</label>
            <div className={`${style.formSearch}`}>
              <select
                className={`${style.optionSelect}`}
                value={keyfind}
                onChange={(e) => {
                  setkeyfind(e.target.value)
                }}
              >
                <option value="shop_name">Tên cửa hàng</option>
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
                <label className={style.createDate}>
                  {formatDate(value.create_date)}
                </label>
              </div>
            </div>
            <div className={style.address}>
              <div className={style.title}>Địa chỉ:</div>
              <div className={style.content}>
                <label>
                  Thành phố:{" "}
                  {accountLogin &&
                    accountLogin.address.map((value, index) =>
                      listDataAddress.map((valueCity, index) =>
                        valueCity.codename === value.addressShop?.city
                          ? valueCity.name
                          : null
                      )
                    )}
                </label>
                <label>
                  Quận:{" "}
                  {accountLogin &&
                    accountLogin.address.map((value, index) =>
                      listDataAddress.map((valueCity, index) =>
                        valueCity.codename === value.city
                          ? valueCity.districts.map((valueDistrict, index) =>
                              valueDistrict.codename === value.district
                                ? valueDistrict.wards.map((valueWard, index) =>
                                    valueWard.codename === value.ward ? (
                                      <div
                                        key={valueCity.codename}
                                        className={`${style.address} ${
                                          value.status ? style.active : ""
                                        }`}
                                      >
                                        <div className={style.value}>
                                          {valueCity.name}, {valueDistrict.name}
                                          , {valueWard.name}, {value.address}
                                        </div>
                                      </div>
                                    ) : null
                                  )
                                : null
                            )
                          : null
                      )
                    )}{" "}
                  {value.addressShop?.district}
                </label>
                <label>
                  Đường:{" "}
                  {accountLogin &&
                    accountLogin.address.map((value, index) =>
                      listDataAddress.map((valueCity, index) =>
                        valueCity.codename === value.city
                          ? valueCity.districts.map((valueDistrict, index) =>
                              valueDistrict.codename === value.district
                                ? valueDistrict.wards.map((valueWard, index) =>
                                    valueWard.codename === value.ward ? (
                                      <div
                                        key={valueCity.codename}
                                        className={`${style.address} ${
                                          value.status ? style.active : ""
                                        }`}
                                      >
                                        <div className={style.value}>
                                          {valueCity.name}, {valueDistrict.name}
                                          , {valueWard.name}, {value.address}
                                        </div>
                                      </div>
                                    ) : null
                                  )
                                : null
                            )
                          : null
                      )
                    )}{" "}
                  {value.addressShop?.ward}
                </label>
                <label>Số nhà: {value.addressShop?.address}</label>
              </div>
            </div>
            <div className={style.status}>
              <span
                className={style.statusShop}
                style={{
                  backgroundColor: value.status === 2 ? "red" : "green"
                }}
                onClick={() => {
                  dispatch(getIdShop(value.id));
                  openModal();
                }}
              >
                {value.status === 0
                  ? "Chờ Xác Nhận"
                  : value.status === 1
                  ? "Đang hoạt động"
                  : value.status === 2
                  ? "Cấm hoạt động"
                  : null}
              </span>
            </div>
          </div>
        ))}
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
      {showModal && <ModelAccess status={showModal} toggleShow={closeModal} />}
    </React.Fragment>
  );
}

export default ListShop;