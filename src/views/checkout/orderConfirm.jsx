import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
import Spiner from '../../components/modals/Spiner'
import { useSearchParams } from 'react-router-dom';

/*const decryptId = (encryptedId) => {
    const base64 = encryptedId.replace(/-/g, '+').replace(/_/g, '/') + '==' // Decodifica la id
    const bytes = CryptoJS.AES.decrypt(base64, 'secret-key')
    return bytes.toString(CryptoJS.enc.Utf8)
}*/

export default function OrderConfirm() {

    const [load, setLoad] = useState(false)
    const [searchParams] = useSearchParams();
    const order = searchParams.get('order');

    useEffect(() => {
        setLoad(true)
        /*const decryptedId = decryptId(id)
        console.log(id)
        setOrderId(decryptedId)
        alert(load)*/
        setLoad(false)
    }, [])


    return (
        <main className="main">
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#">Order</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Confirmation
                        </li>
                    </ol>
                </div>
            </nav>

            <div className="container">
                <div
                    className="page-header page-header-big text-center"
                    style={{ backgroundImage: "url('assets/images/order-confirmation-bg.jpg')" }}
                >
                    <h1 className="page-title text-white">Order Confirmation</h1>
                </div>
            </div>

            <div className="page-content pb-0">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="title mb-2">Thank you for your purchase!</h2>
                            <p className="mb-4">
                                Your order has been successfully placed. Here is your order number:
                            </p>
                            <h3 className="mb-4 text-primary">Order #12433334234</h3>
                            <p className="mb-4">
                                You can view your order details or continue shopping by clicking the buttons below:
                            </p>
                            <a href="/order-details" className="btn btn-outline-primary-2 btn-minwidth-sm">
                                <span>View Order Details</span>
                                <i className="icon-long-arrow-right"></i>
                            </a>
                            <a href="/" className="btn btn-outline-primary-2 btn-minwidth-sm ml-2">
                                <span>Continue Shopping</span>
                                <i className="icon-long-arrow-right"></i>
                            </a>
                        </div>
                    </div>

                    <hr className="mt-5 mb-5" />

                    <div className="stores mb-4 mb-lg-5">
                        <h2 className="title text-center mb-3">Visit Our Stores</h2>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="store">
                                    <div className="row">
                                        <div className="col-sm-5 col-xl-6">
                                            <figure className="store-media mb-2 mb-lg-0">
                                                <img src="assets/images/stores/img-1.jpg" alt="Store 1" />
                                            </figure>
                                        </div>
                                        <div className="col-sm-7 col-xl-6">
                                            <div className="store-content">
                                                <h3 className="store-title">Wall Street Plaza</h3>
                                                <address>88 Pine St, New York, NY 10005, USA</address>
                                                <div>
                                                    <a href="tel:+19878766543">+1 987-876-6543</a>
                                                </div>
                                                <h4 className="store-subtitle">Store Hours:</h4>
                                                <div>Monday - Saturday 11am to 7pm</div>
                                                <div>Sunday 11am to 6pm</div>
                                                <a href="#" className="btn btn-link" target="_blank">
                                                    <span>View Map</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="store">
                                    <div className="row">
                                        <div className="col-sm-5 col-xl-6">
                                            <figure className="store-media mb-2 mb-lg-0">
                                                <img src="assets/images/stores/img-2.jpg" alt="Store 2" />
                                            </figure>
                                        </div>
                                        <div className="col-sm-7 col-xl-6">
                                            <div className="store-content">
                                                <h3 className="store-title">One New York Plaza</h3>
                                                <address>88 Pine St, New York, NY 10005, USA</address>
                                                <div>
                                                    <a href="tel:+19878766543">+1 987-876-6543</a>
                                                </div>
                                                <h4 className="store-subtitle">Store Hours:</h4>
                                                <div>Monday - Friday 9am to 8pm</div>
                                                <div>Saturday 9am to 2pm</div>
                                                <div>Sunday Closed</div>
                                                <a href="#" className="btn btn-link" target="_blank">
                                                    <span>View Map</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

