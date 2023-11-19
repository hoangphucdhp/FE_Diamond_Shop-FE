import React from 'react';
import MainNavbar from "../components/Navbar";
import Footer from "../components/Footer";
function OrderList() {

    return (
        <>
            <nav >
                <MainNavbar />
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="header-title pb-3 mt-0">Đơn hàng của tôi</h5>
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead>
                                            <tr className="align-self-center">
                                                <th>Mã hóa đơn</th>
                                                <th>Địa chỉ nhận hàng</th>
                                                <th> Ngày lập</th>
                                                <th> Tổng tiền</th>
                                                <th>Trang thái</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='text-start'>ID001</td>
                                                <td className='text-start'>HCM</td>
                                                <td className='text-start'>5/8/2018</td>
                                                <td className='text-start'>$15,000</td>
                                                <td className='text-start'><span className="badge badge-boxed bg-warning text-dark">chưa giải quyết</span></td>
                                                <td> <a href='/orderDetail'> Xem chi tiết </a> </td>
                                            </tr>
                                        </tbody>
                                    </table>
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

export default OrderList;
