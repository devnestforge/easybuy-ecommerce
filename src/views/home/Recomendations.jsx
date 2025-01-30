import React, { useState } from 'react'
import Modal from 'react-modal'
import CryptoJS from 'crypto-js'
import { useCart } from '../../functions/context/CartProvider'
import Spiner from '../../components/modals/Spiner'


Modal.setAppElement('#root')

export default function Recommendations({ t, data }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const { addToCart } = useCart()
    const [load, setLoad] = useState(false);

    const handleAddToCart = (item) => {
        setLoad(true)
        const quantity = 1 // Puedes manejar esto dinámicamente si lo necesitas
        const iva = item.iva_precio * quantity // Cálculo del IVA
        const total = item.prod_precio * quantity + iva

        addToCart({
            id: item.id,
            empresa_id: item.empresa_id,
            name: item.prod_name,
            price: item.prod_precio,
            iva,
            total,
            tarifa: item.tarifa,
            valor_descuento: item.valor_descuento,
            tarifa_descuento: item.tarifa_descuento,
            precio_descuento: item.precio_descuento,
            total_descuento: item.total_descuento,
            iva_descuento: item.iva_descuento,
            quantity,
            imageUrl: item.url_imagen,
        })
        setLoad(false)
    }

    const openModal = (product) => {
        setCurrentProduct(product)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setCurrentProduct(null)
    }

    const handleQuickViewClick = (e, product) => {
        e.preventDefault()
        openModal(product)
    }

    if (!Array.isArray(data)) {
        console.error('Data is not an array:', data)
        return <p>Error: Invalid data format</p>
    }

    const encryptId = (id) => {
        const encrypted = CryptoJS.AES.encrypt(id.toString(), 'secret-key').toString()
        return encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    }

    return (
        <>
            <Spiner opt={load} />
            <div className="container-fluid for-you">
                <div className="heading heading-flex mb-3">
                    <div className="heading-left">
                        <h2 className="title">{t('products.products')}</h2>
                    </div>

                    <div className="heading-right">
                        <a href={global.PRODUCTSEARCH} className="title-link">
                            {t('products.view_more_products')} <i className="icon-long-arrow-right"></i>
                        </a>
                    </div>
                </div>

                <div className="products">
                    <div className="row justify-content-center">
                        {data.map((item) => {
                            const isDiscountAvailable = item.valor_descuento &&
                                item.tarifa_descuento &&
                                item.precio_descuento &&
                                Number(item.valor_descuento) > 0 &&
                                Number(item.tarifa_descuento) > 0 &&
                                Number(item.precio_descuento) > 0

                            return (
                                <div key={item.id} className="col-6 col-md-4 col-lg-3">
                                    {isDiscountAvailable ? (
                                        // Tarjeta de descuento
                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <span className="product-label label-circle label-sale">Oferta</span>
                                                <a href={`${global.PRODUCTDETAIL}/${encryptId(item.id)}`}>
                                                    <img
                                                        src={`${global.IMGProd}${item.url_imagen}`}
                                                        alt={item.prod_name}
                                                        className="product-image-products"
                                                    />
                                                </a>
                                                <div className="product-action">
                                                    <a href="!#"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handleAddToCart(item)
                                                        }}
                                                        className="btn-product btn-cart" title={t('products.add_to_cart')}>
                                                        <span>{t('products.add_to_cart')}</span>
                                                    </a>
                                                    <a
                                                        href="!#"
                                                        className="btn-product btn-quickview"
                                                        title="Quick view"
                                                        onClick={(e) => handleQuickViewClick(e, item)}
                                                    >
                                                        <span>{t('products.quick_view')}</span>
                                                    </a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">{item.cat_name}</a>
                                                </div>
                                                <h3 className="product-title">
                                                    <a href="product.html">{item.prod_name}</a>
                                                </h3>
                                                <div className="product-price">
                                                    <span className="new-price">${item.precio_descuento}</span>
                                                    <span className="old-price">Antes ${item.prod_precio}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // Tarjeta original
                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <a href={`${global.PRODUCTDETAIL}/${encryptId(item.id)}`}>
                                                    <img
                                                        src={`${global.IMGProd}${item.url_imagen}`}
                                                        alt={item.prod_name}
                                                        className="product-image-products"
                                                    />
                                                </a>
                                                <div className="product-action">
                                                    <a href="!#"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handleAddToCart(item)
                                                        }}
                                                        className="btn-product btn-cart" title={t('products.add_to_cart')}>
                                                        <span>{t('products.add_to_cart')}</span>
                                                    </a>
                                                    <a
                                                        href="!#"
                                                        className="btn-product btn-quickview"
                                                        title="Quick view"
                                                        onClick={(e) => handleQuickViewClick(e, item)}
                                                    >
                                                        <span>{t('products.quick_view')}</span>
                                                    </a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">{item.cat_name}</a>
                                                </div>
                                                <h3 className="product-title">
                                                    <a href="product.html">{item.prod_name}</a>
                                                </h3>
                                                <div className="product-price">${item.prod_precio}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}


                    </div>
                </div>
            </div>


            {/* Modal for Quick View */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Quick View Modal"
                className="quick-view-modal"
                overlayClassName="quick-view-overlay"
            >
                <button className="close-modal" onClick={closeModal}>X</button>
                {currentProduct && (
                    <div className="container quickView-container">
                        <div className="quickView-content">
                            <div className="row">
                                {/* Left side: Product Info */}
                                <div className="col-lg-7 col-md-6">
                                    <div className="product-left-modal">
                                        <img
                                            src={`${global.IMGProd}${currentProduct.url_imagen}`}
                                            alt={currentProduct.prod_name}
                                            className="product-image-products"
                                        />
                                    </div>
                                </div>

                                {/* Right side: Product Details */}
                                <div className="col-lg-5 col-md-6">
                                    <h2 className="product-title-modal">{currentProduct.prod_name}</h2>
                                    <h3 className="product-price-modal">${currentProduct.prod_precio}</h3>

                                    <div className="product-txt-modal">
                                        {currentProduct.prod_desc || 'No description available.'}
                                    </div>

                                    {/* Quantity input */}
                                    <label htmlFor="qty">{t('products.Qty')}</label>
                                    <div className="product-details-quantity">
                                        <input
                                            type="number"
                                            id="qty"
                                            className="form-control qty-input"
                                            value="1"
                                            min="1"
                                            max="10"
                                            step="1"
                                            required
                                        />
                                    </div>

                                    {/* Actions: Add to Wishlist, Add to Cart */}
                                    <div className="product-details-action">
                                        <a href="!#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleAddToCart(currentProduct)
                                            }}
                                            className="btn-product btn-cart">
                                            <span>{t('products.add_to_cart')}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

        </>
    )
}
