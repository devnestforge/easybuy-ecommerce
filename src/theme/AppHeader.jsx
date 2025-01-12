import React from 'react'
import t from '../translations/i18n'
import LoginRegister from '../components/modals/loginRegister'
import { useCart } from '../functions/context/CartProvider'

const NavBar = () => {
    const { cartItems, addToCart, removeFromCart, getTotalItems } = useCart() // Obtener los items del carrito y las funciones
    const totalItems = getTotalItems()
    return (
        <>
            <div className="mobile-menu-overlay"></div>
            <LoginRegister />
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
                                        <li><a href={global.ABOUT}>{t('about_easybuy')}</a></li>
                                        <li><a href={global.CONTACT}>{t('contact_easybuy')}</a></li>
                                        <li><a href="#signin-modal" data-toggle="modal"><i className="icon-user"></i>{t('login_easybuy')}</a></li>
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
                                <img src="/assets/images/logo.png" alt="Molla Logo" width="105" height="25" />
                            </a>
                            <nav className="main-nav">
                                <ul className="menu sf-arrows">
                                    <li className="megamenu-container active">
                                        <a href="!#" onClick={(e) => e.preventDefault()} className="sf-with-ul">Departamentos</a>
                                        {/* Megamenu content */}
                                    </li>
                                </ul>
                            </nav>
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
                                            <p>No hay productos en el carrito.</p>
                                        ) : (
                                            cartItems.map(item => (
                                                <div className="product" key={item.id}>
                                                    <div className="product-cart-details">
                                                        <h4 className="product-title">
                                                            <a href="!#" onClick={(e) => e.preventDefault()}>{item.name}</a>
                                                        </h4>
                                                        <span className="cart-product-info">
                                                            <span className="cart-product-qty">{item.quantity}</span> x ${item.price}
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
                                        <span>Total</span>
                                        <span className="cart-total-price">${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
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
