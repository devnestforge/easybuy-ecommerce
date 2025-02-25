import React, { useEffect, useState } from 'react'
import Spiner from '../../components/modals/Spiner'
import productsLogic from '../../functions/logic/productsLogic'

export default function TodayDeal({ t }) {
    const [load, setLoad] = useState(false)
    const [prodInfo, setProdInfo] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        setLoad(true)
        const prodcuts = await productsLogic.getProductsByTypeLogic(0, 1, global.PEROD_BY_PAGE, 'no', '', global.DEAL_TYPE)
        if (prodcuts.success && prodcuts.data.length > 0) {
            setProdInfo(prodcuts.data)
        } else {
            setProdInfo([])
        }
        setLoad(false)
    }


    return (
        <>
            <Spiner opt={load} />
            <div className="mb-2"></div>
            <div className="container">
                <div
                    className="cta cta-border mb-5"
                    style={{
                        backgroundImage: 'url(assets/images/demos/demo-4/bg-1.jpg)',
                    }}
                >
                    <img
                        src="assets/images/demos/demo-4/camera.png"
                        alt="camera"
                        className="cta-img"
                    />
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="cta-content">
                                <div className="cta-text text-right text-white">
                                    <p>
                                        Shop Today’s Deals <br />
                                        <strong>Awesome Made Easy. HERO7 Black</strong>
                                    </p>
                                </div>
                                <a href="#" className="btn btn-primary btn-round">
                                    <span>Shop Now - $429.99</span>
                                    <i className="icon-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-3"></div>
        </>
    )
}