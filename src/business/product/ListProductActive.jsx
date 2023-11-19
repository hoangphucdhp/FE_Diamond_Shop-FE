import React, { useEffect, useRef, useState } from "react";
import style from "../../css/business/product.module.css";
import ModelEdit from "./updateProduct";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { callAPI } from "../../service/API";
import { ThongBao, Toastify } from "../../service/ThongBao";

const numberPage = 10;
//DANH SÁCH SẢN PHẨM

//CHUYỂN ĐỔI TIỀN TỆ
function formatCurrency(price, promotion) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0
  });
  return formatter.format(price - price * (promotion / 100));
}

export default function ListProduct() {
  //MODEL EDIT
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [datacategory, setcategorydata] = useState([]);
  const [categoryItemData, setcategoryItem] = useState([]);
  const [listProduct, setdataproduct] = useState([]);
  const [valueCategory, setValueCategory] = useState("");
  const [valueCategoryItem, setValueCategoryItem] = useState("");

  //PAGE
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(listProduct.length / numberPage);
  const handlePageChange = page => {
    if (listProduct.length <= numberPage || page <= 0) {
      setCurrentPage(1);
    } else {
      if (page > totalPages) {
        setCurrentPage(totalPages);
      } else {
        setCurrentPage(page);
      }
    }
  };

  const listPage = listProduct.slice(
    (currentPage - 1) * numberPage,
    currentPage * numberPage
  );

  function handleClickEditProduct(event) {
    const rowElement = event.currentTarget.parentElement.parentElement;

    const columns = Array.from(rowElement.querySelectorAll("label"));
    const id = columns[1].innerText;

    setModalData({
      id,
      datacategory,
      getdataProduct
    });

    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({});
  };

  const log = useRef(true);
  useEffect(() => {
    if (log.current) {
      log.current = false;
      getdataProduct();
      getdataCategory();
    }
  }, []);

  const getdataProduct = async () => {
    const url = `/api/product/find?key=${valueOption}&valueKeyword=${textInput}&idCategoryItem=${valueCategoryItem}&minQuantity=${numberMinValue}&maxQuantity=${numberMaxValue}&status=1&stocking=&shop=1`;
    const response = await callAPI(url, "GET");
    if (response) {
      setdataproduct(response.data);
      setCurrentPage(1);
    }
    console.log(response.data);
  };

  const getdataCategory = async () => {
    const reponse = await callAPI(`/api/category`, "GET");
    if (reponse) {
      setcategorydata(reponse);
    }
  };

  const getdataCategoryItem = async id => {
    const reponseItem = await callAPI(`/api/category/${id}`, "GET");
    if (reponseItem) {
      setcategoryItem(reponseItem.listCategory);
    }
  };

  //FORM SEARCH
  const [selectedOption, setSelectedOption] = React.useState("");
  const [valueOption, setValueOption] = React.useState("");
  const [textInput, setTextInput] = useState("");

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

  //LOẠI SẢN PHẨM
  const handleChangeCategory = event => {
    const selectedOptionValue = event.target.value;
    setValueCategory(selectedOptionValue);
    if (selectedOptionValue !== "") {
      getdataCategoryItem(event.target.value);
    }
    if (selectedOptionValue === "") {
      setValueCategoryItem("");
    }
  };

  const handleChangeCategoryItem = event => {
    const selectedOptionValue = event.target.value;
    if (selectedOptionValue !== "") {
      setValueCategoryItem(selectedOptionValue);
    }
  };
  //INPUT NUMBER
  const [numberMinValue, setNumberMinValue] = useState(0);
  const [numberMaxValue, setNumberMaxValue] = useState(0);

  const handleDelete = async id => {
    await callAPI(`/api/product/${id}`, "DELETE");
    getdataProduct();
  };
  //TÌM KIẾM
  const handleFind = async () => {
    const url = `/api/product/find?key=${valueOption}&valueKeyword=${textInput}&idCategoryItem=${valueCategoryItem}&minQuantity=${numberMinValue}&maxQuantity=${numberMaxValue}&status=1&stocking=`;
    const response = await callAPI(url, "GET");
    if (response) {
      setdataproduct(response.data);
      setCurrentPage(1);
    }
    ThongBao(response.message, response.status);
    console.log(response.data);
  };
  return (
    <React.Fragment>
      <div className={`${style.action}`}>
        <div className={`${style.formSearch}`}>
          <select
            value={valueOption}
            onChange={handleChangeOption}
            className={`${style.optionSelect}`}
          >
            <option value="">Lựa chọn</option>
            <option value="id">Mã Sản Phẩm</option>
            <option value="product_name">Tên Sản Phẩm</option>
          </select>
          <input
            className={`${style.inputSearch}`}
            type="text"
            placeholder={`${selectedOption ? selectedOption : "Tìm kiếm"}...`}
            onChange={e => setTextInput(e.target.value)}
          />
        </div>
        <div className={`${style.typeProduct}`}>
          <label>Ngành hàng</label>
          <select
            value={valueCategory}
            onChange={handleChangeCategory}
            className={`${style.optionSelectType}`}
          >
            <option value="">Loại Sản Phẩm...</option>
            {datacategory.map((value, index) => {
              return (
                <option key={index} value={value.id}>
                  {value.type_category}
                </option>
              );
            })}
          </select>
          {valueCategory !== ""
            ? <select
                value={valueCategoryItem}
                onChange={handleChangeCategoryItem}
                className={`${style.optionSelectType}`}
              >
                <option value="">Phân Loại Sản Phẩm...</option>
                {categoryItemData.map((value, index) => {
                  return (
                    <option key={index} value={value.id}>
                      {value.type_category_item}
                    </option>
                  );
                })}
              </select>
            : null}
        </div>
        <div className={`${style.storge}`}>
          <label>Kho Hàng</label>
          <input
            type="number"
            className={`${style.inputNumber} ms-3`}
            value={numberMinValue}
            onChange={e => setNumberMinValue(e.target.value)}
          />
          <span> - </span>
          <input
            type="number"
            className={`${style.inputNumber}`}
            value={numberMaxValue}
            onChange={e => setNumberMaxValue(e.target.value)}
          />
        </div>
        <button
          className={`${style.buttonSearch}`}
          onClick={() => handleFind()}
        >
          Tìm Kiếm
        </button>
      </div>
      <div className={`${style.listProduct}`}>
        <div className={style.table}>
          <div className={style.tableHeading}>
            <label className={style.column}>STT</label>
            <label className={style.column}>Mã SP</label>
            <label className={style.column}>Hình ảnh</label>
            <label className={style.column}>Tên SP</label>
            <label className={style.column}>Loại SP</label>
            <label className={style.column}>Giá SP</label>
            <label className={style.column}>Trạng thái</label>
            <label className={style.column}>Ngày tạo</label>
            <label className={style.column} />
          </div>
          {listPage.map((value, index) =>
            <div key={index} className={style.tableBody}>
              <label className={style.column}>
                {(currentPage - 1) * numberPage + index + 1}
              </label>
              <label className={style.column}>
                {value[0]}
              </label>
              <label className={style.column}>
                {Array.isArray(value[1])
                  ? value[1].map((item, index) =>
                      <img
                        key={index}
                        className={style.image}
                        src={`http://localhost:8080/api/uploadImageProduct/${item}`}
                        alt="Hình Ảnh"
                      />
                    )
                  : <img
                      className={style.image}
                      src={`/images/nullImage.png`}
                      alt="Hình Ảnh"
                    />}
              </label>
              <label className={style.column}>
                {value[2]}
              </label>
              <label className={style.column}>
                {value[3]}
              </label>
              <label className={style.column}>
                {formatCurrency(value[4], 0)}
              </label>
              <label className={style.column}>
                <span
                  className={style.status}
                  style={{
                    backgroundColor:
                      value[6] === 0
                        ? "#34219E"
                        : value[6] === 1
                          ? "green"
                          : value[6] === 2 ? "red" : "#E74C3C"
                  }}
                  value={`${value[6]}`}
                >
                  {value[6] === 0
                    ? "Chờ Phê Duyệt"
                    : value[6] === 1
                      ? "Đang Hoạt Động"
                      : value[6] === 2
                        ? "Dừng Hoạt Động"
                        : value[6] === 3 ? "Cấm hoạt động" : "Lỗi"}
                </span>
              </label>
              <label className={style.column}>
                {value[5]}
              </label>
              <label className={style.column}>
                <i
                  className={`bi bi-pencil-square ${style.buttonEdit}`}
                  onClick={handleClickEditProduct}
                />
              </label>
            </div>
          )}
        </div>
        <div className={`${style.buttonPage}`}>
          <Nav.Link className={`btn`} onClick={() => handlePageChange(1)}>
            <i className="bi bi-chevron-bar-left" />
          </Nav.Link>
          {currentPage - 1 > 0
            ? <Nav.Link
                className={`btn`}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </Nav.Link>
            : null}

          <Nav.Link className={`btn ${style.btnActivePage}`}>
            {currentPage}
          </Nav.Link>
          {currentPage + 1 <= totalPages
            ? <Nav.Link
                className={`btn`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </Nav.Link>
            : null}
          <Nav.Link
            className={`btn`}
            onClick={() => handlePageChange(totalPages)}
          >
            <i className="bi bi-chevron-bar-right" />
          </Nav.Link>
        </div>
      </div>
      {isModalOpen &&
        <ModelEdit
          onReload={getdataProduct}
          data={modalData}
          closeModal={closeModal}
        />}
    </React.Fragment>
  );
}
