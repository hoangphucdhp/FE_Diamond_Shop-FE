import React from "react";
import "../page_user/css/user/login.css";
import MainNavbar from "../page_user/components/Navbar";
import Footer from "../page_user/components/Footer";
import ReCAPTCHA from "react-google-recaptcha";
// import "../css/user/register_login.css"

function Login() {
  const showPassword = (event) => {
    const eye = event.currentTarget;
    const inputPass = document.querySelector("input#password");
    eye.classList.toggle("bi-eye");
    if (eye.classList.contains("bi-eye")) {
      inputPass.type = "text";
    } else {
      inputPass.type = "password";
    }
  };

  const onChange = () => {};
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
                      <div className="mb-5">
                        <h3 className="h4 font-weight-bold text-theme">
                          Đăng nhập
                        </h3>
                      </div>
                      <h6 className="h5 mb-0">
                        Chào mừng đến với Diamond Shop!
                      </h6>
                      <p className="text-muted mt-2 mb-5">
                        Nhập địa chỉ email và mật khẩu của bạn để truy cập.
                      </p>
                      <form>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Địa chỉ email
                          </label>
                          <input
                            typeName="email"
                            className="form-control"
                            id="exampleInputEmail1"
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
                          />
                        </div>
                        <div className="d-flex justify-content-between">
                          <button type="submit" className="btn btn-primary">
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
                        <div className="row gutters">
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <button
                              type="submit"
                              className="btn btn-danger btn-block"
                            >
                              Twitter
                            </button>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                              Facebook
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 ">
                    <div className="p-5">
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
