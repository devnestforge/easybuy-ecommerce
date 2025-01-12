import React, { useState } from 'react'
import Modal from 'react-modal'
import CryptoJS from 'crypto-js'

Modal.setAppElement('#root')

export default function Recommendations({ t, data }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)

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
            <div className="container-fluid for-you">
                <div className="heading heading-flex mb-3">
                    <div className="heading-left">
                        <h2 className="title">{t('products')}</h2>
                    </div>

                    <div className="heading-right">
                        <a href={global.PRODUCTSEARCH} className="title-link">
                            {t('view_more_products')} <i className="icon-long-arrow-right"></i>
                        </a>
                    </div>
                </div>

                <div className="products">
                    <div className="row justify-content-center">
                        {data.map((item) => (
                            <div key={item.id} className="col-6 col-md-4 col-lg-3">
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
                                            <a href="!#" className="btn-product btn-cart" title={t('add_to_cart')}>
                                                <span>{t('add_to_cart')}</span>
                                            </a>
                                            {/* Aquí es donde agregamos el evento onClick para abrir el modal */}
                                            <a
                                                href="!#"
                                                className="btn-product btn-quickview"
                                                title="Quick view"
                                                onClick={(e) => handleQuickViewClick(e, item)}  // Prevent redirection and open modal
                                            >
                                                <span>{t('quick_view')}</span>
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
                            </div>
                        ))}
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
                                    <label htmlFor="qty">{t('Qty')}</label>
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
                                        <a href="!#" className="btn-product btn-cart">
                                            <span>{t('add_to_cart')}</span>
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
