import React from 'react'
import t from '../translations/i18n'
import LoginRegister from '../components/modals/loginRegister'
import RestorePassword from '../components/modals/RestorePassword'
import { useCart } from '../functions/context/CartProvider'

const NavBar = () => {
    const { cartItems, removeFromCart, getTotalItems } = useCart()
    const totalItems = getTotalItems()

    const token = localStorage.getItem('authToken')
    const envio = parseFloat(localStorage.getItem('envio')) || 0
    const discountAmount = parseFloat(localStorage.getItem('discountAmount')) || 0

    const handleLogout = () => {
        localStorage.clear()
        window.location.href = "/home"
    }


    const calculateTotal = () => {
        const total = cartItems.reduce((total, item) => {
            const itemTotal = item.precio_descuento > 0
                ? item.precio_descuento * item.quantity
                : item.price * item.quantity
            const iva = item.precio_descuento > 0
                ? item.iva_descuento * item.quantity
                : item.iva
            return total + itemTotal + iva;
        }, 0) + envio - discountAmount
        return total.toFixed(2)
    }

    return (
        <>
            <div className="mobile-menu-overlay"></div>
            <LoginRegister />
            <RestorePassword />
            <div className="mobile-menu-container mobile-menu-light">
                <div className="mobile-menu-wrapper">
                    <span className="mobile-menu-close"><i className="icon-close"></i></span>
                    <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="mobile-menu-link" data-toggle="tab" href="#mobile-menu-tab" role="tab" aria-controls="mobile-menu-tab" aria-selected="true">Menu</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="mobile-menu-tab" role="tabpanel" aria-labelledby="mobile-menu-link">
                            <nav className="mobile-nav">
                                <ul className="mobile-menu">
                                    <li className="active">
                                        <a href="!#" onClick={(e) => e.preventDefault()}>Departamentos</a>
                                        <ul>
                                            <li><a href="!#" onClick={(e) => e.preventDefault()}>Shop List</a></li>
                                            {/* Other links */}
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <header className="header">
                <div className="header-top">
                    <div className="container-fluid">
                        <div className="header-left">
                            <div className="header-dropdown">
                                <a href="!#" onClick={(e) => e.preventDefault()}>Español</a>
                                <div className="header-menu">
                                    <ul>
                                        <li><a href="!#" onClick={(e) => e.preventDefault()}>Inglés</a></li>
                                        <li><a href="!#" onClick={(e) => e.preventDefault()}>Español</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="header-right">
                            <ul className="top-menu">
                                <li>
                                    <a href="!#" onClick={(e) => e.preventDefault()}>Links</a>
                                    <ul>
                                        <li><i className="icon-phone"></i>Call: +0123 456 789</li>
                                        <li><a href={global.ABOUT}>{t('about.about_easybuy')}</a></li>
                                        <li><a href={global.CONTACT}>{t('about.contact_easybuy')}</a></li>
                                        {!token ? (
                                            <li><a href="#signin-modal" data-toggle="modal"><i className="icon-user"></i>{t('auth.login_easybuy')}</a></li>
                                        ) : (
                                            <li className="nav-item dropdown">
                                                <a href="!#" className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="icon-user"></i> Perfil <i className="icon-down-open"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                                    <a className="dropdown-item" href={global.USERPERFIL}>{t('auth.user_profile')}</a>
                                                    <a className="dropdown-item" href={global.ENVIOFACT}>{t('auth.user_addrress')}</a>
                                                    <a className="dropdown-item" href={global.HISTORY}>{t('auth.user_history')}</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" href="!#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                                                        {t('auth.user_logout')}
                                                    </a>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="header-middle sticky-header">
                    <div className="container-fluid">
                        <div className="header-left">
                            <button className="mobile-menu-toggler">
                                <span className="sr-only">Toggle mobile menu</span>
                                <i className="icon-bars"></i>
                            </button>
                            <a href="/home" className="logo">
                                <img src={t('branding.img_logo')} alt="Molla Logo" width="105" height="25" />
                            </a>
                        </div>
                        <div className="header-right">
                            <div className="dropdown cart-dropdown">
                                <a href="!#" onClick={(e) => e.preventDefault()} className="dropdown-toggle">
                                    <i className="icon-shopping-cart"></i>
                                    <span className="cart-count">{totalItems}</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <div className="dropdown-cart-products">
                                        {cartItems.length === 0 ? (
                                            <p>{t('shopping.Empty_cart')}</p>
                                        ) : (
                                            cartItems.map(item => (
                                                <div className="product" key={item.id}>
                                                    <div className="product-cart-details">
                                                        <h4 className="product-title">
                                                            <a href="!#" onClick={(e) => e.preventDefault()}>{item.name}</a>
                                                        </h4>
                                                        <span className="cart-product-info">
                                                            {item.precio_descuento > 0 ? (
                                                                <>
                                                                    <span className="cart-product-price">
                                                                        <span style={{ textDecoration: 'line-through', color: 'red' }}>
                                                                            ${item.price.toFixed(2)}
                                                                        </span>
                                                                    </span>
                                                                    <span className="cart-product-price">${item.precio_descuento.toFixed(2)}</span>
                                                                </>
                                                            ) : (
                                                                <span className="cart-product-price">${item.price.toFixed(2)}</span>
                                                            )}
                                                            <span className="cart-product-qty"> x {item.quantity}</span>
                                                        </span>
                                                    </div>
                                                    <figure className="product-image-container">
                                                        <a href="!#" className="product-image">
                                                            <img src={`${global.IMGProd}${item.imageUrl}`} alt={item.name} />
                                                        </a>
                                                    </figure>
                                                    <a href="!#" onClick={(e) => { e.preventDefault(); removeFromCart(item.id) }} className="btn-remove" title="Remove Product">
                                                        <i className="icon-close"></i>
                                                    </a>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="dropdown-cart-total">
                                        <span>{t('shopping.Total')}</span>
                                        <span className="cart-total-price">${calculateTotal()}</span>
                                    </div>
                                    <div className="dropdown-cart-action">
                                        <a href={global.VIEWCART} className="btn btn-primary">Ver Carrito</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default NavBar
