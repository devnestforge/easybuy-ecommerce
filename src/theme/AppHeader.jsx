
import React from 'react'

import LoginRegister from '../components/modals/loginRegister'

const NavBar = () => {
    //const [cartTotalProd, setCartTotalProd] = useState(0)

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
                                            <li><a href="!#" onClick={(e) => e.preventDefault()}>Shop Grid 2 Columns</a></li>
                                            <li><a href="!#" onClick={(e) => e.preventDefault()}>Shop Grid 3 Columns</a></li>
                                            <li><a href="!#" onClick={(e) => e.preventDefault()}>Shop Grid 4 Columns</a></li>
                                            <li><a href="!#" onClick={(e) => e.preventDefault()}><span>Shop Boxed No Sidebar<span className="tip tip-hot">Hot</span></span></a></li>
                                            <li><a href="!#" onClick={(e) => e.preventDefault()}>Shop Fullwidth No Sidebar</a></li>
                                            <li><a href="!#" onClick={(e) => e.preventDefault()}>Product Category Boxed</a></li>
                                            <li><a href="!#" onClick={(e) => e.preventDefault()}><span>Product Category Fullwidth<span className="tip tip-new">New</span></span></a></li>
                                            <li><a href="!#" onClick={(e) => e.preventDefault()}>Cart</a></li>
                                            <li><a href="!#" onClick={(e) => e.preventDefault()}>Checkout</a></li>
                                            <li><a href="!#" onClick={(e) => e.preventDefault()}>Wishlist</a></li>
                                            <li><a href="!#" onClick={(e) => e.preventDefault()}>Lookbook</a></li>
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
                                        <li><a href={global.ABOUT}>Nosotros</a></li>
                                        <li><a href={global.CONTACT}>Contactanos</a></li>
                                        <li><a href="#signin-modal" data-toggle="modal"><i className="icon-user"></i>Login</a></li>
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

                                        <div className="megamenu megamenu-md">
                                            <div className="row no-gutters">
                                                <div className="col-md-8">
                                                    <div className="menu-col">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="menu-title">Shop with sidebar</div>
                                                                <ul>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}>Shop List</a></li>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}>Shop Grid 2 Columns</a></li>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}>Shop Grid 3 Columns</a></li>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}>Shop Grid 4 Columns</a></li>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}><span>Shop Market<span className="tip tip-new">New</span></span></a></li>
                                                                </ul>

                                                                <div className="menu-title">Shop no sidebar</div>
                                                                <ul>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}><span>Shop Boxed No Sidebar<span className="tip tip-hot">Hot</span></span></a></li>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}>Shop Fullwidth No Sidebar</a></li>
                                                                </ul>
                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="menu-title">Product Category</div>
                                                                <ul>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}>Product Category Boxed</a></li>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}><span>Product Category Fullwidth<span className="tip tip-new">New</span></span></a></li>
                                                                </ul>
                                                                <div className="menu-title">Shop Pages</div>
                                                                <ul>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}>Cart</a></li>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}>Checkout</a></li>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}>Wishlist</a></li>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}>My Account</a></li>
                                                                    <li><a href="!#" onClick={(e) => e.preventDefault()}>Lookbook</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="header-right">
                            <div className="dropdown cart-dropdown">
                                <a href="!#" onClick={(e) => e.preventDefault()} className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                    <i className="icon-shopping-cart"></i>
                                    <span className="cart-count">0</span>
                                </a>

                                <div className="dropdown-menu dropdown-menu-right">
                                    <div className="dropdown-cart-products">
                                        <div className="product">
                                            <div className="product-cart-details">
                                                <h4 className="product-title">
                                                    <a href="!#" onClick={(e) => e.preventDefault()}>Beige knitted elastic runner shoes</a>
                                                </h4>

                                                <span className="cart-product-info">
                                                    <span className="cart-product-qty">1</span>
                                                    x $84.00
                                                </span>
                                            </div>

                                            <figure className="product-image-container">
                                                <a href="!#" onClick={(e) => e.preventDefault()} className="product-image">
                                                    <img src="assets/images/products/cart/product-1.jpg" alt="product" />
                                                </a>
                                            </figure>
                                            <a href="!#" onClick={(e) => e.preventDefault()} className="btn-remove" title="Remove Product"><i className="icon-close"></i></a>
                                        </div>

                                        <div className="product">
                                            <div className="product-cart-details">
                                                <h4 className="product-title">
                                                    <a href="!#" onClick={(e) => e.preventDefault()}>Blue utility pinafore denim dress</a>
                                                </h4>

                                                <span className="cart-product-info">
                                                    <span className="cart-product-qty">1</span>
                                                    x $76.00
                                                </span>
                                            </div>

                                            <figure className="product-image-container">
                                                <a href="!#" onClick={(e) => e.preventDefault()} className="product-image">
                                                    <img src="assets/images/products/cart/product-2.jpg" alt="product" />
                                                </a>
                                            </figure>
                                            <a href="!#" onClick={(e) => e.preventDefault()} className="btn-remove" title="Remove Product"><i className="icon-close"></i></a>
                                        </div>
                                    </div>

                                    <div className="dropdown-cart-total">
                                        <span>Total</span>

                                        <span className="cart-total-price">$160.00</span>
                                    </div>

                                    <div className="dropdown-cart-action">
                                        <a href="!#" onClick={(e) => e.preventDefault()} className="btn btn-primary">View Cart</a>
                                        <a href="!#" onClick={(e) => e.preventDefault()} className="btn btn-outline-primary-2"><span>Checkout</span><i className="icon-long-arrow-right"></i></a>
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
