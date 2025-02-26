import React, { useEffect, useState } from 'react';
import Spiner from '../../components/modals/Spiner';
import productsLogic from '../../functions/logic/productsLogic';

export default function Outlet() {
    const [load, setLoad] = useState(false);
    const [prodInfo, setProdInfo] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoad(true);
        const products = await productsLogic.getProductsByTypeLogic(0, 1, global.PEROD_BY_PAGE, 'no', '', global.SUPER_TYPE);
        if (products.success && products.data.length > 0) {
            setProdInfo(products.data[0]); // Toma el primer producto
        } else {
            setProdInfo(null);
        }
        setLoad(false);
    };

    return (
        <>
            <div className="page-header text-center" style={{ backgroundImage: "url('assets/images/page-header-bg.jpg')" }}>
                <div className="container">
                    <div className="heading text-center mb-3">
                        <h2 className="title">Deals & Outlet</h2>
                        <div className="title-desc">Today's deal and more</div>
                    </div>

                    {load ? (
                        <Spiner />
                    ) : (
                        <div className="row">
                            {prodInfo && (
                                <>
                                    <div className="col-lg-6 deal-col">
                                        <div className="deal" style={{ backgroundImage: `url('${global.IMGProd}${prodInfo.url_imagen}')` }}>
                                            <div className="deal-top">
                                                <h2>Deal of the Day.</h2>
                                                <h4>Limited quantities.</h4>
                                            </div>

                                            <div className="deal-content">
                                                <h3 className="product-title">
                                                    <a href="product.html">{prodInfo.prod_name} - {prodInfo.prod_descripcion}</a>
                                                </h3>

                                                <div className="product-price">
                                                    <span className="new-price">${prodInfo.precio_descuento}</span>
                                                    <span className="old-price">Was ${prodInfo.prod_precio}</span>
                                                </div>

                                                <a href="product.html" className="btn btn-link">
                                                    <span>Shop Now</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </a>
                                            </div>

                                            <div className="deal-bottom">
                                                <div className="deal-countdown daily-deal-countdown" data-until="+10h"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 deal-col">
                                        <div className="deal" style={{ backgroundImage: `url('${global.IMGProd}${prodInfo.url_imagen}')` }}>
                                            <div className="deal-top">
                                                <h2>Your Exclusive Offers.</h2>
                                                <h4>Sign in to see amazing deals.</h4>
                                            </div>

                                            <div className="deal-content">
                                                <h3 className="product-title">
                                                    <a href="product.html">{prodInfo.prod_name} - {prodInfo.prod_descripcion}</a>
                                                </h3>

                                                <div className="product-price">
                                                    <span className="new-price">${prodInfo.precio_descuento}</span>
                                                </div>

                                                <a href="login.html" className="btn btn-link">
                                                    <span>Sign In and Save money</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </a>
                                            </div>

                                            <div className="deal-bottom">
                                                <div className="deal-countdown offer-countdown" data-until="+11d"></div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <div className="more-container text-center mt-1 mb-5">
                        <a href="!#" className="btn btn-outline-dark-2 btn-round btn-more">
                            <span>Shop more Outlet deals</span>
                            <i className="icon-long-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
