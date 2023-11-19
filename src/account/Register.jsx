import React from "react";
import MainNavbar from "../page_user/components/Navbar";
import Footer from "../page_user/components/Footer";

export default function register() {
  return (
    <div>
      <nav>
        <MainNavbar />
      </nav>
      <div id="main-wrapper" className="container ">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card border-0 ">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-6 ">
                    <div className="p-5">
                      <img
                        src="images/register.png"
                        alt=""
                        style={{ height: "480px" }}
                      ></img>
                    </div>
                    <p className="text-muted text-center mt-3 mb-0">
                      Bạn đã có tài khoản?{" "}
                      <a href="/login" className="text-primary ml-1">
                        Đăng nhập
                      </a>
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <div className="p-4">
                      <div className="mb-2">
                        <h3 className="h4 font-weight-bold text-theme">
                          Đăng ký
                        </h3>
                      </div>
                      <h6 className="h5 mb-0">
                        Chào mừng đến với Diamond Shop!
                      </h6>
                      <p className="text-muted mt-2 mb-4">
                        Vui lòng nhập tất cả thông tin vào form bên dưới.
                      </p>
                      <form className="row g-3">
                        <div className="col-md-6">
                          <label for="inputUsername" className="form-label">
                            Tên tài khoản:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputUsername"
                          />
                        </div>
                        <div className="col-md-6">
                          <label for="inputFullname" className="form-label">
                            Họ tên:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputFullname"
                          />
                        </div>
                        <div className="col-md-6">
                          <label for="inputUsername" className="form-label">
                            Số điện thoại:
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="inputUsername"
                          />
                        </div>
                        <div className="col-md-6">
                          <label for="inputFullname" className="form-label">
                            Email:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputFullname"
                          />
                        </div>
                        <div className="col-12">
                          <label for="inputAddress" className="form-label">
                            Giới tính:
                          </label>
                          <div className="d-flex">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gridRadios"
                                id="gridRadios1"
                                value="option1"
                                checked
                              />
                              <label
                                className="form-check-label"
                                for="gridRadios1"
                              >
                                Nam
                              </label>
                            </div>
                            <div
                              className="form-check "
                              style={{ marginLeft: "40px" }}
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gridRadios"
                                id="gridRadios2"
                                value="option2"
                              />
                              <label
                                className="form-check-label"
                                for="gridRadios2"
                              >
                                Nữ
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label for="inputAddress2" className="form-label">
                            Mật khẩu:
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="inputFullname"
                          />
                        </div>
                        <div className="col-12">
                          <label for="inputAddress2" className="form-label">
                            Nhập lại mật khẩu:
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="inputFullname"
                          />
                        </div>

                        <div className="col-12">
                          <label for="inputAddress2" className="form-label">
                            Hình ảnh:
                          </label>
                          <div className="mb-3">
                            <input
                              className="form-control"
                              type="file"
                              id="formFile"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label for="inputCity" className="form-label">
                            Thành phố:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputCity"
                          />
                        </div>
                        <div className="col-md-4">
                          <label for="inputCity" className="form-label">
                            Đường:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputCity"
                          />
                        </div>
                        <div className="col-md-4">
                          <label for="inputCity" className="form-label">
                            Phường:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputCity"
                          />
                        </div>
                        <div className="col-12">
                          <label for="inputCity" className="form-label">
                            Địa chỉ chi tiết (Số nhà):
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                          ></textarea>
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="gridCheck"
                            />
                            <label className="form-check-label" for="gridCheck">
                              Đã đọc và đồng ý với các{" "}
                              <a href="/policy">chính sách và điều khoản</a>
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <button type="submit" className="btn btn-primary">
                            Đăng ký
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
