import React from 'react'

export default function Trendings() {

    return (
        <>

            <div className="bg-light pt-5 pb-6">
                <div className="container trending-products">
                    <div className="heading heading-flex mb-3">
                        <div className="heading-left">
                            <h2 className="title">Trending Products</h2>
                        </div>

                        <div className="heading-right">
                            <ul className="nav nav-pills nav-border-anim justify-content-center" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="trending-top-link" data-toggle="tab" href="#trending-top-tab" role="tab" aria-controls="trending-top-tab" aria-selected="true">Top Rated</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="trending-best-link" data-toggle="tab" href="#trending-best-tab" role="tab" aria-controls="trending-best-tab" aria-selected="false">Best Selling</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="trending-sale-link" data-toggle="tab" href="#trending-sale-tab" role="tab" aria-controls="trending-sale-tab" aria-selected="false">On Sale</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-5col d-none d-xl-block">
                            <div className="banner">
                                <a href="!#">
                                    <img src="assets/images/demos/demo-4/banners/banner-4.jpg" alt="banner" />
                                </a>
                            </div>
                        </div>

                        <div className="col-xl-4-5col">
                            <div className="tab-content tab-content-carousel just-action-icons-sm">
                                <div className="tab-pane p-0 fade show active" id="trending-top-tab" role="tabpanel" aria-labelledby="trending-top-link">
                                    <div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow" data-toggle="owl"
                                        data-owl-options='{
                                            "nav": true, 
                                            "dots": false,
                                            "margin": 20,
                                            "loop": false,
                                            "responsive": {
                                                "0": {
                                                    "items":2
                                                },
                                                "480": {
                                                    "items":2
                                                },
                                                "768": {
                                                    "items":3
                                                },
                                                "992": {
                                                    "items":4
                                                }
                                            }
                                        }'>
                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <span className="product-label label-circle label-top">Top</span>
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-6.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">Headphones</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">Bose - SoundSport  wireless headphones</a></h3>
                                                <div className="product-price">
                                                    $199.99
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '100%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 4 Reviews )</span>
                                                </div>

                                                <div className="product-nav product-nav-dots">
                                                    <a href="!#" style={{ background: '#69b4ff' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" style={{ background: '#ff887f' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" className="active" style={{ background: '#333333' }}><span className="sr-only">Color name</span></a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-7.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">Video Games</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">Microsoft - Refurbish Xbox One S 500GB</a></h3>
                                                <div className="product-price">
                                                    $279.99
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '60%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 6 Reviews )</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <span className="product-label label-circle label-new">New</span>
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-8.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">Smartwatches</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">Apple Watch Series 4 Gold Aluminum Case</a></h3>
                                                <div className="product-price">
                                                    $499.99
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '80%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 4 Reviews )</span>
                                                </div>

                                                <div className="product-nav product-nav-dots">
                                                    <a href="!#" style={{ background: '#edd2c8' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" style={{ background: '#eaeaec' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" className="active" style={{ background: '#333333' }}><span className="sr-only">Color name</span></a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <span className="product-label label-circle label-top">Top</span>
                                                <span className="product-label label-circle label-sale">Sale</span>
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-9.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">TV & Home Theater</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">Sony - Class LED 2160p Smart 4K Ultra HD</a></h3>
                                                <div className="product-price">
                                                    <span className="new-price">$1,699.99</span>
                                                    <span className="old-price">Was $1,999.99</span>
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '80%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 10 Reviews )</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <span className="product-label label-circle label-new">New</span>
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-3.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">Tablets</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">Apple - 11 Inch iPad Pro  with Wi-Fi 256GB </a></h3>
                                                <div className="product-price">
                                                    $899.99
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '80%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 4 Reviews )</span>
                                                </div>

                                                <div className="product-nav product-nav-dots">
                                                    <a href="!#" style={{ background: '#edd2c8' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" style={{ background: '#eaeaec' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" className="active" style={{ background: '#333333' }}><span className="sr-only">Color name</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane p-0 fade" id="trending-best-tab" role="tabpanel" aria-labelledby="trending-best-link">
                                    <div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow" data-toggle="owl"
                                        data-owl-options='{
                                            "nav": true, 
                                            "dots": false,
                                            "margin": 20,
                                            "loop": false,
                                            "responsive": {
                                                "0": {
                                                    "items":2
                                                },
                                                "480": {
                                                    "items":2
                                                },
                                                "768": {
                                                    "items":3
                                                },
                                                "992": {
                                                    "items":4
                                                }
                                            }
                                        }'>
                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <span className="product-label label-circle label-new">New</span>
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-3.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">Tablets</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">Apple - 11 Inch iPad Pro  with Wi-Fi 256GB </a></h3>
                                                <div className="product-price">
                                                    $899.99
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '80%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 4 Reviews )</span>
                                                </div>

                                                <div className="product-nav product-nav-dots">
                                                    <a href="!#" style={{ background: '#edd2c8' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" style={{ background: '#eaeaec' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" className="active" style={{ background: '#333333' }}><span className="sr-only">Color name</span></a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-2.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">Audio</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">Bose - SoundLink Bluetooth Speaker</a></h3>
                                                <div className="product-price">
                                                    $79.99
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '60%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 6 Reviews )</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <span className="product-label label-circle label-top">Top</span>
                                                <span className="product-label label-circle label-sale">Sale</span>
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-4.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">Cell Phone</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">Google - Pixel 3 XL  128GB</a></h3>
                                                <div className="product-price">
                                                    <span className="new-price">$35.41</span>
                                                    <span className="old-price">Was $41.67</span>
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '100%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 10 Reviews )</span>
                                                </div>

                                                <div className="product-nav product-nav-dots">
                                                    <a href="!#" className="active" style={{ background: '#edd2c8' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" style={{ background: '#eaeaec' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" style={{ background: '#333333' }}><span className="sr-only">Color name</span></a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <span className="product-label label-circle label-top">Top</span>
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-5.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">TV & Home Theater</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">Samsung - 55" Class  LED 2160p Smart</a></h3>
                                                <div className="product-price">
                                                    $899.99
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '60%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 5 Reviews )</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <span className="product-label label-circle label-top">Top</span>
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-1.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">Laptops</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">MacBook Pro 13" Display, i5</a></h3>
                                                <div className="product-price">
                                                    $1,199.99
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '100%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 4 Reviews )</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane p-0 fade" id="trending-sale-tab" role="tabpanel" aria-labelledby="trending-sale-link">
                                    <div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow" data-toggle="owl"
                                        data-owl-options='{
                                            "nav": true, 
                                            "dots": false,
                                            "margin": 20,
                                            "loop": false,
                                            "responsive": {
                                                "0": {
                                                    "items":2
                                                },
                                                "480": {
                                                    "items":2
                                                },
                                                "768": {
                                                    "items":3
                                                },
                                                "992": {
                                                    "items":4
                                                }
                                            }
                                        }'>
                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <span className="product-label label-circle label-new">New</span>
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-8.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">Smartwatches</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">Apple Watch Series 4 Gold Aluminum Case</a></h3>
                                                <div className="product-price">
                                                    $499.99
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '80%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 4 Reviews )</span>
                                                </div>

                                                <div className="product-nav product-nav-dots">
                                                    <a href="!#" style={{ background: '#edd2c8' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" style={{ background: '#eaeaec' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" className="active" style={{ background: '#333333' }}><span className="sr-only">Color name</span></a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <span className="product-label label-circle label-top">Top</span>
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-6.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">Headphones</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">Bose - SoundSport  wireless headphones</a></h3>
                                                <div className="product-price">
                                                    $199.99
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '100%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 4 Reviews )</span>
                                                </div>

                                                <div className="product-nav product-nav-dots">
                                                    <a href="!#" style={{ background: '#69b4ff' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" style={{ background: '#ff887f' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" className="active" style={{ background: '#333333' }}><span className="sr-only">Color name</span></a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-7.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">Video Games</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">Microsoft - Refurbish Xbox One S 500GB</a></h3>
                                                <div className="product-price">
                                                    $279.99
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '60%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 6 Reviews )</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product product-2">
                                            <figure className="product-media">
                                                <span className="product-label label-circle label-new">New</span>
                                                <a href="product.html">
                                                    <img src="assets/images/demos/demo-4/products/product-3.jpg" alt="Product" className="product-image" />
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="!#" className="btn-product-icon btn-wishlist" title="Add to wishlist"></a>
                                                </div>

                                                <div className="product-action">
                                                    <a href="!#" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                                </div>
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="!#">Tablets</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">Apple - 11 Inch iPad Pro  with Wi-Fi 256GB </a></h3>
                                                <div className="product-price">
                                                    $899.99
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: '80%' }}></div>
                                                    </div>
                                                    <span className="ratings-text">( 4 Reviews )</span>
                                                </div>

                                                <div className="product-nav product-nav-dots">
                                                    <a href="!#" style={{ background: '#edd2c8' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" style={{ background: '#eaeaec' }}><span className="sr-only">Color name</span></a>
                                                    <a href="!#" className="active" style={{ background: '#333333' }}><span className="sr-only">Color name</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}