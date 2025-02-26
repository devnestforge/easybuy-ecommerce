import React, { useEffect, useState } from 'react'
import Spiner from '../../components/modals/Spiner'
import productsLogic from '../../functions/logic/productsLogic'
import CryptoJS from 'crypto-js'

export default function Promotions({ t }) {
    const [load, setLoad] = useState(false)
    const [prodInfo, setProdInfo] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        setLoad(true)
        const prodcuts = await productsLogic.getProductsByTypeLogic(0, 1, global.PEROD_BY_PAGE, 'no', '', global.DEAL_TYPE)
        console.log(prodcuts)
        if (prodcuts.success && prodcuts.data.length > 0) {
            setProdInfo(prodcuts.data)
        } else {
            setProdInfo([])
        }
        setLoad(false)
    }

    const encryptId = (id) => {
        const encrypted = CryptoJS.AES.encrypt(id.toString(), 'secret-key').toString()
        return encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    }

    return (
        <>
            <div className="mb-2"></div>
            <div className="container-fluid">
                <div className="heading heading-flex mb-3">
                    <div className="heading-left">
                        <h2 className="title">{t('products.promotions')}</h2>
                    </div>
                </div>
                {load ? <Spiner /> : (
                    <div className="row justify-content-center">
                        {prodInfo.slice(0, 3).map((product, index) => (
                            <div className="col-md-6 col-lg-4" key={product.id}>
                                <a href="!#" className="product-card-deals-link">
                                    <div className="product-card-deals">
                                        <div className="product-card-text-deals">
                                            <h4 className="product-category-deals">{product.cat_name}</h4>
                                            <h3 className="product-title-deals">
                                                <strong>{product.prod_name}</strong>
                                                <div className="product-title">
                                                    <span className="new-price">${product.precio_descuento}</span>
                                                    Antes <span className="old-price">${product.prod_precio}</span>
                                                </div>
                                                Ahorra ${ (product.prod_precio - product.precio_descuento).toFixed(2) }
                                            </h3>
                                            <a href={`${global.PRODUCTDETAIL}/${encryptId(product.id)}`} className="product-link-deals">comprar ahora<i className="icon-long-arrow-right"></i></a>
                                        </div>
                                        <div className="product-card-image-deals">
                                            <img src={`${global.IMGProd}${product.url_imagen}`} alt={product.prod_name} className="product-image-deals" />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-3"></div>
        </>
    )
}