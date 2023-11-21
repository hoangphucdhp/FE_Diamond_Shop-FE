import React from "react";
import MainNavbar from "../page_user/components/Navbar";
import Footer from "../page_user/components/Footer";
import style from "../page_user/css/user/register.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ThongBao } from "../service/ThongBao";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [valiCode, setValicode] = useState("");
  const navigate = useNavigate();
  const domain = process.env.REACT_APP_API || "http://localhost:8080";

  const clearInput = ()=>{
    setUsername("")
    setPassword("")
    setRepassword("")
    setCode("")
    setEmail("")
    setCheckbox(false)
    setValicode("")
  }
  const handleValidate = async e => {
    if (
      username === "" ||
      password === "" ||
      email === "" ||
      repassword === ""
    ) {
      ThongBao("Vui lòng nhập đầy đủ thông tin!", "error");
    } else {
      axios
        .post(domain + "/api/account/" + email)
        .then(response => {
          if (response.data.success) {
            ThongBao(response.data.message, "success");
            setValicode(response.data.code);
          }else{
            ThongBao(response.data.message, "error");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleRegis = async e => {
    if (username === "" || password === "" || email === "" || code === "") {
      ThongBao("Vui lòng nhập đầy đủ thông tin!", "error");
    } else {
      if (checkbox === false) {
        ThongBao(
          "Vui lòng đồng ý với các điều khoản trước khi đăng ký!",
          "error"
        );
      } else {
        if (password === repassword) {
          if (code === valiCode) {
            axios
              .post(domain + "/api/account/register/" + email, {
                username,
                password
              })
              .then(response => {
                console.log(response);
                if (response.data.success) {
                  ThongBao("Đăng ký thành công!", "success");
                  clearInput()
                }else{
                  ThongBao(response.data.message, "error");
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            ThongBao("Mã xác nhận không chính xác!", "error");
          }
        } else {
          ThongBao("Mật khẩu không trùng khớp!", "error");
        }
      }
    }
  };
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
                    <div className="mt-3">
                      <img
                        src="images/register.png"
                        alt=""
                        style={{ height: "400px" }}
                      />
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
                      <h6 className="h5 mb-0">
                        Chào mừng đến với Diamond Shop!
                      </h6>
                      <p className="text-muted mt-2 mb-4">
                        Vui lòng nhập tất cả thông tin vào form bên dưới.
                      </p>
                      <form className="row g-3">
                        <div className="col-12">
                          <label for="inputUsername" className="form-label">
                            Tài khoản:
                          </label>
                          <input
                            type="text"
                            className={`form-control ${style.input}`}
                            id="username"
                            onChange={e => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="col-12">
                          <label for="inputAddress2" className="form-label">
                            Mật khẩu:
                          </label>
                          <input
                            type="password"
                            className={`form-control ${style.input}`}
                            id="passwordd"
                            onChange={e => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-12">
                          <label for="inputAddress2" className="form-label">
                            Nhập lại mật khẩu:
                          </label>
                          <input
                            type="password"
                            className={`form-control ${style.input}`}
                            id="repassword"
                            onChange={e => setRepassword(e.target.value)}
                          />
                        </div>
                        <div className="col-12">
                          <label for="inputAddress2" className="form-label">
                            Email
                          </label>
                          <input
                            type="text"
                            className={`form-control ${style.input}`}
                            id="email"
                            onChange={e => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="col-8">
                          <input
                            type="text"
                            className={`form-control ${style.input}`}
                            id="code"
                            placeholder="CODE"
                            onChange={e => setCode(e.target.value)}
                          />
                        </div>
                        <div className="col-4">
                          <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={() => handleValidate()}
                          >
                            Gửi mã
                          </button>
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="checkBox"
                              value={true}
                              onChange={e => setCheckbox(e.target.value)}
                            />
                            <label className="form-check-label" for="gridCheck">
                              Đã đọc và đồng ý với các{" "}
                              <a href="/policy">chính sách và điều khoản</a>
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleRegis}
                          >
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
