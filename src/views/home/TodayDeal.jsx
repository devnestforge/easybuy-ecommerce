import React, { useEffect, useState } from 'react'
import Spiner from '../../components/modals/Spiner'
import productsLogic from '../../functions/logic/productsLogic'
import CryptoJS from 'crypto-js'

export default function TodayDeal({ t }) {
    const [load, setLoad] = useState(false)
    const [prodInfo, setProdInfo] = useState(null)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        setLoad(true)
        const prodcuts = await productsLogic.getProductsByTypeLogic(0, 1, global.PEROD_BY_PAGE, 'no', '', global.SUPER_TYPE)
        if (prodcuts.success && prodcuts.data.length > 0) {
            setProdInfo(prodcuts.data[0]) // Toma el primer producto
        } else {
            setProdInfo(null)
        }
        setLoad(false)
    }

    const encryptId = (id) => {
        const encrypted = CryptoJS.AES.encrypt(id.toString(), 'secret-key').toString()
        return encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
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
                    {prodInfo && (
                        <img
                            src={`${global.IMGProd}${prodInfo.url_imagen}`}
                            alt={prodInfo.prod_name}
                            className="cta-img product-image-super-deals"
                        />
                    )}
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="cta-content">
                                <div className="cta-text text-right text-white">
                                    <p>
                                        {t('Super oferta')} <br />
                                        <strong>{prodInfo ? prodInfo.prod_name : 'Oferta Especial'}</strong>
                                    </p>
                                </div>
                                {prodInfo && (
                                    <a href={`${global.PRODUCTDETAIL}/${encryptId(prodInfo.id)}`} className="btn btn-primary btn-round">
                                        <span>
                                            {t('compra ahora')} - ${prodInfo.precio_descuento}
                                        </span>
                                        <i className="icon-long-arrow-right"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-3"></div>
        </>
    )
}
