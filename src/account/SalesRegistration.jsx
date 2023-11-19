import React, { useState, useRef } from "react";
import "../page_user/css/user/profile.css";
import MainNavbar from "../page_user/components/Navbar";
import Footer from "../page_user/components/Footer";

export default function SalesRegistration() {
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
    <div>
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
                    <h5 class="user-name">Hình ảnh</h5>
                    {/* <h6 class="user-date">Ngày tạo: 20/10/2023</h6> */}
                  </div>
                  {/* <div class="about">

                    
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card-profile h-100">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mt-3 mb-2 text-primary">Thông tin cửa hàng</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="ciTy">Tên cửa hàng:</label>
                      <input type="name" class="form-control" id="ciTy" />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="ciTy">Thành phố:</label>
                      <input type="name" class="form-control" id="ciTy" />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="Street">Đường:</label>
                      <input type="name" class="form-control" id="Street" />
                    </div>
                  </div>

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="ward">Phường:</label>
                      <input type="text" class="form-control" id="ward" />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="adress">Địa chỉ chi tiết:</label>
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
                        class="btn btn-success"
                      >
                        Đăng ký
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
    </div>
  );
}
