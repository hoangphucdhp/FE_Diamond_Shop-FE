import React, { useState } from "react";
import style from "../../css/admin/product/listproduct.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Nav from "react-bootstrap/Nav";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";

const numberPage = 10;
const listBill = [
  {
    idProduct: "product001",
    productName: "Áo Sơ Mi Nam Cực Quyến Rũ",
    shopName: "Thời Trang Nam",
    price: 123456,
    createDate: "20/10/2023",
    status: 0
  },
  {
    idProduct: "product001",
    productName: "Áo Sơ Mi Nam Cực Quyến Rũ",
    shopName: "Thời Trang Nam",
    price: 123456,
    createDate: "20/10/2023",
    status: 1
  },
  {
    idProduct: "product001",
    productName: "Áo Sơ Mi Nam Cực Quyến Rũ",
    shopName: "Thời Trang Nam",
    price: 123456,
    createDate: "20/10/2023",
    status: 2
  }
];

function ListProduct() {
  //PAGE
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(listBill.length / numberPage);

  if (currentPage < 1) {
    setCurrentPage(1);
  } else if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }
  const startIndex = (currentPage - 1) * numberPage;
  const endIndex = startIndex + numberPage;

  const listPage = listBill.slice(startIndex, endIndex);

  const handlePageChange = page => {
    setCurrentPage(page);
  };
  //CHUYỂN ĐỔI TIỀN TỆ
  function formatCurrency(price, promotion) {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0
    });
    return formatter.format(price - price * (promotion / 100));
  }

  //FORM SEARCH
  const [selectedOption, setSelectedOption] = React.useState("");
  const [valueOption, setValueOption] = React.useState("");
  const handleChangeOption = event => {
    const selectedOptionValue = event.target.value;
    let text = "";
    setValueOption(selectedOptionValue);
    const options = event.target.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === selectedOptionValue) {
        text = options[i].innerText;
        break;
      }
    }

    setSelectedOption(text);
  };

  return (
    <React.Fragment>
      <div className={style.listProduct}>
        <div className={style.heading}>
          <div className={style.column}>
            <label className={style.title}>Danh sách sản phẩm</label>
            <div className={`${style.formSearch}`}>
              <select
                value={valueOption}
                onChange={handleChangeOption}
                className={`${style.optionSelect}`}
              >
                <option value="idProduct">Mã sản phẩm</option>
                <option value="productName">Tên sản phẩm</option>
                <option value="shopName">Tên cửa hàng</option>
              </select>
              <input
                className={`${style.inputSearch}`}
                type="text"
                placeholder={`${selectedOption
                  ? selectedOption
                  : "Tìm kiếm"}...`}
              />
              <button className={`${style.buttonSearch}`}>Tìm Kiếm</button>
            </div>
          </div>
        </div>
        <div className={style.table}>
          <div className={style.tableHeading}>
            <label className={style.column}>ID</label>
            <label className={style.column}>Mã sản phẩm</label>
            <label className={style.column}>Tên sản phẩm</label>
            <label className={style.column}>Tên cửa hàng</label>
            <label className={style.column}>Ngày tạo</label>
            <label className={style.column}>Trạng thái</label>
            <label className={style.column} />
            <label className={style.column} />
          </div>
          {listPage.map((value, index) =>
            <div key={index} className={style.tableBody}>
              <label className={style.column}>
                {currentPage * numberPage - numberPage + index + 1}
              </label>
              <label className={style.column}>
                {value.idProduct}
              </label>
              <label className={style.column}>
                {value.productName}
              </label>
              <label className={style.column}>
                {value.shopName}
              </label>
              <label className={style.column}>
                {value.createDate}
              </label>
              <label className={style.column}>
                <span
                  className={style.status}
                  style={{
                    backgroundColor:
                      value.status === 0
                        ? "#34219E"
                        : value.status === 1
                          ? "green"
                          : value.status === 2 ? "red" : "#E74C3C"
                  }}
                  value={`${value.status}`}
                >
                  {value.status === 0
                    ? "Chờ Phê Duyệt"
                    : value.status === 1
                      ? "Đang Hoạt Động"
                      : value.status === 2 ? "Cấm Hoạt Động" : "Lỗi"}
                </span>
              </label>
              <label className={style.column}>
                <a
                  href="#updateStatus"
                  className={`btn ${style.updateStatus}`}
                  style={{
                    backgroundColor:
                      value.status === 0
                        ? "green"
                        : value.status === 1
                          ? "red"
                          : value.status === 2 ? "green" : "#E74C3C"
                  }}
                  value={`${value.status}`}
                >
                  {value.status === 0
                    ? "Duyệt Sản Phẩm"
                    : value.status === 1
                      ? "Cấm Hoạt Động"
                      : value.status === 2 ? "Mở Hoạt Động" : "Lỗi"}
                </a>
              </label>
              <label className={style.column}>
                <Link to="/admin/bills/billdetail">Xem Chi Tiết</Link>
              </label>
            </div>
          )}
        </div>
        <div className={`${style.buttonPage}`}>
          <Nav.Link className={`btn`} onClick={() => handlePageChange(1)}>
            <i className="bi bi-chevron-bar-left" />
          </Nav.Link>
          <Nav.Link
            className={`btn`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <i className="bi bi-caret-left" />
          </Nav.Link>
          <Nav.Link
            className={`btn`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <i className="bi bi-caret-right" />
          </Nav.Link>
          <Nav.Link
            className={`btn`}
            onClick={() =>
              handlePageChange(Math.ceil(listBill.length / numberPage))}
          >
            <i className="bi bi-chevron-bar-right" />
          </Nav.Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ListProduct;
