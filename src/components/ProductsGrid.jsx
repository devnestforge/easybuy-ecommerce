import React, { useState } from 'react'
import CryptoJS from 'crypto-js'
import { Pagination } from '@mui/material'
import Spiner from '../components/modals/Spiner'
import { useCart } from '../functions/context/CartProvider'
import t from '../translations/i18n'
import Modal from 'react-modal'
import { useSnackbar } from 'notistack'
import userLogic from '../functions/logic/userLogic'

export default function ProductsGrid({ data = [{}], totalPages, paginate, currentPage = 1 }) {
    const [load, setLoad] = useState(false)
    const { addToCart } = useCart()
    const token = localStorage.getItem('authToken')
    const isLoggedIn = !!token
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const [quantity, setQuantity] = useState(1) // Agregar estado para la cantidad
    const { enqueueSnackbar } = useSnackbar()

    const closeModal = () => {
        setIsModalOpen(false)
        setCurrentProduct(null)
        setQuantity(1) // Resetear la cantidad cuando se cierre el modal
    }

    const handleAddToCart = async (item) => {
        setLoad(true)
        const iva = item.iva_precio * quantity
        const total = item.prod_precio * quantity + iva
        const updatedCartItem = {
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
        }
        const updatedCartItems = [updatedCartItem]
        if (isLoggedIn) {
            const response = await userLogic.saveViewCartLogic(updatedCartItems)
            setLoad(false)
            enqueueSnackbar(response.data.message, {
                variant: response.variant,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
            if (response.success) {
                addToCart(updatedCartItem)
            }
        } else {
            addToCart(updatedCartItem)
        }
        setLoad(false)
    }

    const handleQuickViewClick = (e, product) => {
        e.preventDefault()
        openModal(product)
    }

    const openModal = (product) => {
        setCurrentProduct(product)
        setIsModalOpen(true)
    }

    const encryptId = (id) => {
        const encrypted = CryptoJS.AES.encrypt(id.toString(), 'secret-key').toString()
        return encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    }

    // Función para manejar el cambio de cantidad
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
    }

    return (
        <>
            <Spiner opt={load} />
            <div className="products">
                <div className="products-grid">
                    {data.length > 0 ? (
                        data.map((product) => {
                            const isDiscountAvailable =
                                product.valor_descuento &&
                                product.tarifa_descuento &&
                                product.precio_descuento &&
                                Number(product.valor_descuento) > 0 &&
                                Number(product.tarifa_descuento) > 0 &&
                                Number(product.precio_descuento) > 0

                            return (
                                <div key={product.id} className="product-card">
                                    <div className="product">
                                        <figure className="product-media-grid">
                                            {isDiscountAvailable === true && <span className="product-label">Oferta</span>}
                                            <a href={`${global.PRODUCTDETAIL}/${encryptId(product.id)}`}>
                                                <img
                                                    src={`${global.IMGProd}${product.url_imagen}`}
                                                    alt={product.prod_name}
                                                    className="product-image"
                                                />
                                            </a>
                                            <div className="product-action-vertical">
                                                <a
                                                    href="!#"
                                                    className="btn-product-icon btn-quickview"
                                                    title="Quick view"
                                                    onClick={(e) => handleQuickViewClick(e, product)}
                                                >
                                                    <span>{t('products.quick_view')}</span>
                                                </a>
                                            </div>
                                            <div className="product-action">
                                                <a
                                                    href="!#"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleAddToCart(product)
                                                    }}
                                                    className="btn-product btn-cart"
                                                    title={t('products.add_to_cart')}
                                                >
                                                    <span>{t('products.add_to_cart')}</span>
                                                </a>
                                            </div>
                                        </figure>
                                        <div className="product-body">
                                            <div className="product-cat">
                                                <a href="!#">{product.cat_name}</a>
                                            </div>
                                            <h3 className="product-title">
                                                <a href={`${global.PRODUCTDETAIL}/${encryptId(product.id)}`}>
                                                    {product.prod_name}
                                                </a>
                                            </h3>
                                            <div className="product-title">
                                                {isDiscountAvailable ? (
                                                    <>
                                                        <span className="new-price">${product.precio_descuento}</span>
                                                        Antes <span className="old-price">${product.prod_precio}</span>
                                                    </>
                                                ) : (
                                                    <span>${product.prod_precio}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <p className="text-center">No hay productos disponibles.</p>
                    )}
                </div>
            </div>
            <Pagination
                count={totalPages || 1}
                color="primary"
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                size="large"
                page={currentPage}
                onChange={paginate}
                className="pagination justify-content-center"
            />
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
                                            value={quantity}
                                            min="1"
                                            max="10"
                                            step="1"
                                            onChange={handleQuantityChange}
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
