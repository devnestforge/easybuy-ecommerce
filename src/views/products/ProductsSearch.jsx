import React from 'react'
import CryptoJS from 'crypto-js'
//import Spiner from '../../components/modals/Spiner'

const products = [
  {
    id: 1,
    label: 'New',
    img: 'assets/images/products/product-4.jpg',
    title: 'Brown paperbag waist pencil skirt',
    price: '$60.00',
    category: 'Women',
    rating: 20,
    reviews: 2,
    thumb: 'assets/images/products/product-4-thumb.jpg',
    thumb2: 'assets/images/products/product-4-2-thumb.jpg',
    thumb3: 'assets/images/products/product-4-3-thumb.jpg'
  },
  {
    id: 2,
    label: '',
    img: 'assets/images/products/product-5.jpg',
    title: 'Dark yellow lace cut out swing dress',
    price: '$84.00',
    category: 'Dresses',
    rating: 0,
    reviews: 0,
    thumb: 'assets/images/products/product-5-thumb.jpg',
    thumb2: 'assets/images/products/product-5-2-thumb.jpg',
  },
  {
    id: 3,
    label: 'Out of Stock',
    img: 'assets/images/products/product-6.jpg',
    title: 'Khaki utility boiler jumpsuit',
    price: '$120.00',
    category: 'Jackets',
    rating: 80,
    reviews: 6,
  },
  {
    id: 4,
    label: '',
    img: 'assets/images/products/product-7.jpg',
    title: 'Blue utility pinafore denim dress',
    price: '$76.00',
    category: 'Jeans',
    rating: 20,
    reviews: 2,
    thumb: 'assets/images/products/product-7-thumb.jpg',
  },
  {
    id: 5,
    label: '',
    img: 'assets/images/products/product-7.jpg',
    title: 'Blue utility pinafore denim dress',
    price: '$76.00',
    category: 'Jeans',
    rating: 20,
    reviews: 2,
    thumb: 'assets/images/products/product-7-thumb.jpg',
  },
  {
    id: 6,
    label: '',
    img: 'assets/images/products/product-7.jpg',
    title: 'Blue utility pinafore denim dress',
    price: '$76.00',
    category: 'Jeans',
    rating: 20,
    reviews: 2,
    thumb: 'assets/images/products/product-7-thumb.jpg',
  },
  {
    id: 7,
    label: '',
    img: 'assets/images/products/product-7.jpg',
    title: 'Blue utility pinafore denim dress',
    price: '$76.00',
    category: 'Jeans',
    rating: 20,
    reviews: 2,
    thumb: 'assets/images/products/product-7-thumb.jpg',
  },
  {
    id: 8,
    label: '',
    img: 'assets/images/products/product-7.jpg',
    title: 'Blue utility pinafore denim dress',
    price: '$76.00',
    category: 'Jeans',
    rating: 20,
    reviews: 2,
    thumb: 'assets/images/products/product-7-thumb.jpg',
  },
]

export default function ProductsSearch({ t, data }) {

  const encryptId = (id) => {
    const encrypted = CryptoJS.AES.encrypt(id.toString(), 'secret-key').toString()
    return encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

  return (
    <main className="main">
      <div className="page-content">
    	  <br/>
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              {/* Products List */}
              <div className="products mb-3">
                <div className="row justify-content-center">
                  {products.map(product => (
                    <div className="col-6 col-md-4 col-lg-4 col-xl-3" key={product.id}>
                      <div className="product product-7 text-center">
                        <figure className="product-media">
                          {product.label && (
                            <span className={`product-label ${product.label === 'Out of Stock' ? 'label-out' : 'label-new'}`}>
                              {product.label}
                            </span>
                          )}
                          <a href={`${global.PRODUCTDETAIL}/${encryptId(product.id)}`}>
                            <img src={product.img} alt="Product" className="product-image" />
                          </a>

                          <div className="product-action-vertical">
                            <a href="popup/quickView.html" className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                          </div>

                          <div className="product-action">
                            <a href="!#" className="btn-product btn-cart"><span>add to cart</span></a>
                          </div>
                        </figure>

                        <div className="product-body">
                          <div className="product-cat">
                            <a href="!#">{product.category}</a>
                          </div>
                          <h3 className="product-title"><a href={`${global.PRODUCTDETAIL}/${encryptId(product.id)}`}>{product.title}</a></h3>
                          <div className="product-price">
                            {product.label === 'Out of Stock' ? (
                              <span className="out-price">{product.price}</span>
                            ) : (
                              <span>{product.price}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <a className="page-link page-link-prev" href="!#" aria-label="Previous" tabindex="-1" aria-disabled="true">
                      <span aria-hidden="true"><i className="icon-long-arrow-left"></i></span>Prev
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page"><a className="page-link" href="!#">1</a></li>
                  <li className="page-item"><a className="page-link" href="!#">2</a></li>
                  <li className="page-item"><a className="page-link" href="!#">3</a></li>
                  <li className="page-item-total">of 6</li>
                  <li className="page-item">
                    <a className="page-link page-link-next" href="!#" aria-label="Next">
                      Next <span aria-hidden="true"><i className="icon-long-arrow-right"></i></span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <aside className="col-lg-3 order-lg-first">
              <div className="sidebar sidebar-shop">
                <div className="widget widget-clean">
                  <label>Filters:</label>
                  <a href="!#" className="sidebar-filter-clear">Clean All</a>
                </div>

                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a data-toggle="collapse" href="#widget-1" role="button" aria-expanded="true" aria-controls="widget-1">
                      Category
                    </a>
                  </h3>

                  <div className="collapse show" id="widget-1">
                    <div className="widget-body">
                      <div className="filter-items filter-items-count">
                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="cat-1" />
                            <label className="custom-control-label" htmlFor="cat-1">Dresses</label>
                          </div>
                          <span className="item-count">3</span>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="cat-2" />
                            <label className="custom-control-label" htmlFor="cat-2">T-shirts</label>
                          </div>
                          <span className="item-count">0</span>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="cat-3" />
                            <label className="custom-control-label" htmlFor="cat-3">Bags</label>
                          </div>
                          <span className="item-count">4</span>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="cat-4" />
                            <label className="custom-control-label" htmlFor="cat-4">Jackets</label>
                          </div>
                          <span className="item-count">2</span>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="cat-5" />
                            <label className="custom-control-label" htmlFor="cat-5">Shoes</label>
                          </div>
                          <span className="item-count">2</span>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="cat-6" />
                            <label className="custom-control-label" htmlFor="cat-6">Jumpers</label>
                          </div>
                          <span className="item-count">1</span>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="cat-7" />
                            <label className="custom-control-label" htmlFor="cat-7">Jeans</label>
                          </div>
                          <span className="item-count">1</span>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="cat-8" />
                            <label className="custom-control-label" htmlFor="cat-8">Sportwear</label>
                          </div>
                          <span className="item-count">0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a data-toggle="collapse" href="#widget-2" role="button" aria-expanded="true" aria-controls="widget-2">
                      Size
                    </a>
                  </h3>

                  <div className="collapse show" id="widget-2">
                    <div className="widget-body">
                      <div className="filter-items">
                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="size-1" />
                            <label className="custom-control-label" htmlFor="size-1">XS</label>
                          </div>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="size-2" />
                            <label className="custom-control-label" htmlFor="size-2">S</label>
                          </div>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" checked id="size-3" />
                            <label className="custom-control-label" htmlFor="size-3">M</label>
                          </div>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" checked id="size-4" />
                            <label className="custom-control-label" htmlFor="size-4">L</label>
                          </div>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="size-5" />
                            <label className="custom-control-label" htmlFor="size-5">XL</label>
                          </div>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="size-6" />
                            <label className="custom-control-label" htmlFor="size-6">XXL</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a data-toggle="collapse" href="#widget-3" role="button" aria-expanded="true" aria-controls="widget-3">
                      Colour
                    </a>
                  </h3>

                  <div className="collapse show" id="widget-3">
                    <div className="widget-body">
                      <div className="filter-colors">
                        <a href="!#" style={{ background: "#b87145" }}><span className="sr-only">Color Name</span></a>
                        <a href="!#" style={{ background: "#f0c04a" }}><span className="sr-only">Color Name</span></a>
                        <a href="!#" style={{ background: "#333333" }}><span className="sr-only">Color Name</span></a>
                        <a href="!#" className="selected" style={{ background: "#cc3333" }}><span className="sr-only">Color Name</span></a>
                        <a href="!#" style={{ background: "#3399cc" }}><span className="sr-only">Color Name</span></a>
                        <a href="!#" style={{ background: "#669933" }}><span className="sr-only">Color Name</span></a>
                        <a href="!#" style={{ background: "#f2719c" }}><span className="sr-only">Color Name</span></a>
                        <a href="!#" style={{ background: "#ebebeb" }}><span className="sr-only">Color Name</span></a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a data-toggle="collapse" href="#widget-4" role="button" aria-expanded="true" aria-controls="widget-4">
                      Brand
                    </a>
                  </h3>

                  <div className="collapse show" id="widget-4">
                    <div className="widget-body">
                      <div className="filter-items">
                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="brand-1" />
                            <label className="custom-control-label" htmlFor="brand-1">Next</label>
                          </div>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="brand-2" />
                            <label className="custom-control-label" htmlFor="brand-2">River Island</label>
                          </div>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="brand-3" />
                            <label className="custom-control-label" htmlFor="brand-3">Geox</label>
                          </div>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="brand-4" />
                            <label className="custom-control-label" htmlFor="brand-4">New Balance</label>
                          </div>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="brand-5" />
                            <label className="custom-control-label" htmlFor="brand-5">UGG</label>
                          </div>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="brand-6" />
                            <label className="custom-control-label" htmlFor="brand-6">F&F</label>
                          </div>
                        </div>

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="brand-7" />
                            <label className="custom-control-label" htmlFor="brand-7">Nike</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a data-toggle="collapse" href="#widget-5" role="button" aria-expanded="true" aria-controls="widget-5">
                      Price
                    </a>
                  </h3>

                  <div className="collapse show" id="widget-5">
                    <div className="widget-body">
                      <div className="filter-price">
                        <div className="filter-price-text">
                          Price Range:
                          <span id="filter-price-range"></span>
                        </div>
                        <div id="price-slider"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}

