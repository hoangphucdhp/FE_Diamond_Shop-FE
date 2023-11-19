import React, { useState, useRef } from "react";
import MainNavbar from "../page_user/components/Navbar";
import Footer from "../page_user/components/Footer";
import "../page_user/css/user/profile.css";

function Profile_User() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Xử lý tệp ảnh đã chọn ở đây
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <nav>
        <MainNavbar />
      </nav>
      <div class="container mt-4">
        <div class="row gutters">
          <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div class="card-profile h-100">
              <div class="card-body">
                <div class="account-settings">
                  <div class="user-profile">
                    <div className="user-avatar" style={{ cursor: "pointer" }}>
                      <img
                        src={
                          selectedImage ||
                          "https://bootdey.com/img/Content/avatar/avatar7.png"
                        }
                        alt="user"
                        onClick={handleImageClick}
                      />
                      <input
                        type="file"
                        accept="/image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>
                    <h5 class="user-name">Tên tài khoản</h5>
                    <h6 class="user-date">Ngày tạo: 20/10/2023</h6>
                  </div>
                  <div class="about">
                    <button
                      type="button"
                      class="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Đổi mật khẩu
                    </button>

                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                              Đổi mật khẩu
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div className="col-12">
                              <label for="inputpass1" className="form-label">
                                Mật khẩu cũ:
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="inputpass1"
                              />
                            </div>
                            <div className="col-12">
                              <label for="inputpass2" className="form-label">
                                Mật khẩu:
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="inputpass2"
                              />
                            </div>
                            <div className="col-12">
                              <label for="inputpass3" className="form-label">
                                Nhập lại mật khẩu:
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="inputpass3"
                              />
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Thoát
                            </button>
                            <button type="button" class="btn btn-primary">
                              Lưu thay đổi
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card-profile h-100">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mb-2 text-primary">Thông tin cá nhân</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="username">Tên tài khoản:</label>
                      <input type="text" class="form-control" id="username" />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="fullName">Họ tên:</label>
                      <input type="text" class="form-control" id="fullName" />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="phone">Số điện thoại:</label>
                      <input type="text" class="form-control" id="phone" />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="email">Địa chỉ email:</label>
                      <input type="url" class="form-control" id="email" />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="email">Giới tính:</label>
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
                          <label className="form-check-label" for="gridRadios1">
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
                          <label className="form-check-label" for="gridRadios2">
                            Nữ
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mt-3 mb-2 text-primary">Địa chỉ</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="ciTy">Thành phố:</label>
                      <input type="name" class="form-control" id="ciTy" />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="Street">Đường</label>
                      <input type="name" class="form-control" id="Street" />
                    </div>
                  </div>

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="ward">Phường</label>
                      <input type="text" class="form-control" id="ward" />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="adress">Địa chỉ chi tiết (Số nhà):</label>
                      <input type="text" class="form-control" id="adress" />
                    </div>
                  </div>
                </div>
                <div class="row gutters mt-4">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="text-right">
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        class="btn btn-primary"
                      >
                        Cập nhật
                      </button>
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
    </>
  );
}

export default Profile_User;
