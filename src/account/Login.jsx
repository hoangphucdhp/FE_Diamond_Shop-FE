import React from "react";
import "../page_user/css/user/login.css";
import style from "../page_user/css/user/login.module.css";
import MainNavbar from "../page_user/components/Navbar";
import Footer from "../page_user/components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router";
import { callAPI } from "../service/API";
import Cookies from "js-cookie";

function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await callAPI(`/api/account/login`, "POST", {
        username,
        password
      });
      if (response) {
        const data = {
          id_account: response.data.id,
          username: response.data.username,
          create_date: response.data.create_date,
          role: response.data.listRole.map((value) => value.role.role_name),
          gender : response.data.infoAccount.gender,
          address: []
        };
        //INFO ACCOUNT
        if (response.data.infoAccount && response.data.infoAccount.fullname) {
          data.fullname = response.data.infoAccount.fullname;
        }

        if (response.data.infoAccount && response.data.infoAccount.image) {
          data.image = response.data.infoAccount.image;
        }

        if (response.data.infoAccount && response.data.infoAccount.id_card) {
          data.id_card = response.data.infoAccount.id_card;
        }

        if (response.data.infoAccount && response.data.infoAccount.phone) {
          data.phone = response.data.infoAccount.phone;
        }

        if (response.data.infoAccount && response.data.infoAccount.email) {
          data.email = response.data.infoAccount.email;
        }

        if (response.data.shop) {
          data.shop = response.data.shop;
        }

        if (response.data.address_account) {
          response.data.address_account.forEach((value) => {
            data.address.push(value);
          });
        }

        //ENCODE
        const base64String = utf8_to_b64(JSON.stringify(data));

        const timeCookie = new Date();
        timeCookie.setTime(timeCookie.getTime() + 60 * 60 * 1000);
        Cookies.set("accountLogin", base64String, { expires: timeCookie });
        console.log(data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav>
        <MainNavbar />
      </nav>
      <div id="main-wrapper" className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card border-0 ">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-6">
                    <div className="p-5">
                      <h6 className="h5 mb-0">
                        Chào mừng đến với Diamond Shop!
                      </h6>
                      <p className="text-muted mt-2 mb-3">
                        Vui lòng điền đầy đủ thông tin đăng nhập.
                      </p>
                      <form>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Tài khoản</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-5 mt-4">
                          <label htmlFor="exampleInputPassword1">
                            Mật khẩu
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="d-flex justify-content-between align-items-center ">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleLogin()}
                          >
                            Đăng nhập
                          </button>
                          <a
                            href="/forgotPass"
                            className="forgot-link float-right text-primary"
                          >
                            Quên mật khẩu?
                          </a>
                        </div>
                        <div className="or mt-4">
                          <span>hoặc</span>
                        </div>
                        <div className={style.groupButtonAuth}>
                          <button type="submit" className={style.button}>
                            <i className="bi bi-twitter"></i> Đăng nhập với
                            Twitter
                          </button>
                          <button type="submit" className={style.button}>
                            <i className="bi bi-facebook"></i> Đăng nhập với
                            Facebook
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 ">
                    <div className="mt-3">
                      <img
                        src="images/san-thuong-mai-dien-tu-la-gi.webp"
                        alt=""
                        style={{ height: "400px" }}
                      ></img>
                    </div>
                    <p className="text-muted text-center mt-3 mb-0">
                      Bạn không có tài khoản?{" "}
                      <a href="/register" className="text-primary ml-1">
                        Đăng ký
                      </a>
                    </p>
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
export default Login;
