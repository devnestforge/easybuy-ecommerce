import React from 'react'

export default function Outlet() {

    return (
        <>
            <div className="page-header text-center" style={{ backgroundImage: "url('assets/images/page-header-bg.jpg')" }}>
                <div className="container">
                    <div className="heading text-center mb-3">
                        <h2 className="title">Deals & Outlet</h2>
                        <div className="title-desc">Todays deal and more</div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 deal-col">
                            <div className="deal" style={{ backgroundImage: "url('assets/images/demos/demo-4/deal/bg-1.jpg')" }}>
                                <div className="deal-top">
                                    <h2>Deal of the Day.</h2>
                                    <h4>Limited quantities. </h4>
                                </div>

                                <div className="deal-content">
                                    <h3 className="product-title"><a href="product.html">Home Smart Speaker with  Google Assistant</a></h3>

                                    <div className="product-price">
                                        <span className="new-price">$129.00</span>
                                        <span className="old-price">Was $150.99</span>
                                    </div>

                                    <a href="product.html" className="btn btn-link"><span>Shop Now</span><i className="icon-long-arrow-right"></i></a>
                                </div>

                                <div className="deal-bottom">
                                    <div className="deal-countdown daily-deal-countdown" data-until="+10h"></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 deal-col">
                            <div className="deal" style={{ backgroundImage: "url('assets/images/demos/demo-4/deal/bg-2.jpg')" }}>
                                <div className="deal-top">
                                    <h2>Your Exclusive Offers.</h2>
                                    <h4>Sign in to see amazing deals.</h4>
                                </div>

                                <div className="deal-content">
                                    <h3 className="product-title"><a href="product.html">Certified Wireless Charging  Pad for iPhone / Android</a></h3>

                                    <div className="product-price">
                                        <span className="new-price">$29.99</span>
                                    </div>

                                    <a href="login.html" className="btn btn-link"><span>Sign In and Save money</span><i className="icon-long-arrow-right"></i></a>
                                </div>

                                <div className="deal-bottom">
                                    <div className="deal-countdown offer-countdown" data-until="+11d"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="more-container text-center mt-1 mb-5">
                        <a href="!#" className="btn btn-outline-dark-2 btn-round btn-more"><span>Shop more Outlet deals</span><i className="icon-long-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </>
    )
}
