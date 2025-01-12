import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import productsLogic from '../../functions/logic/productsLogic'
import Spiner from '../../components/modals/Spiner'
import ErrorPage from '../../components/error'

const decryptId = (encryptedId) => {
  const base64 = encryptedId.replace(/-/g, '+').replace(/_/g, '/') + '=='
  const bytes = CryptoJS.AES.decrypt(base64, 'secret-key')
  return bytes.toString(CryptoJS.enc.Utf8)
}

export default function ProductsDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
    const decryptedId = decryptId(id)
    getProductsDetail(decryptedId)
    setLoad(false)
  }, [id])

  const getProductsDetail = async (productId) => {
    try {
      const productDetails = await productsLogic.getProductsLogic(productId, '')
      if (productDetails.success && productDetails.data.length > 0) {
        setProduct(productDetails.data[0])
      } else {
        setProduct(null)
      }
    } catch (error) {
      console.error('Error fetching product details:', error)
    } finally {
      setLoad(false)
    }
  }

  if (!product) {
    return <ErrorPage />
  }

  return (
    <main className="main">
      <Spiner opt={load} />
      <br />
      <div className="page-content">
        <div className="container">
          <div className="product-details-top">
            <div className="row">
              <div className="col-md-6">
                <div className="product-gallery product-gallery-vertical">
                  <div className="row">
                    <figure className="product-main-image">
                      {product.url_imagen ? (
                        <img
                          id="product-zoom"
                          src={`${global.IMGProd}${product.url_imagen}`}
                          alt={product.prod_name}
                        />
                      ) : (
                        <div>No image available</div>
                      )}
                    </figure>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="product-details">
                  <h1 className="product-title">{product.prod_name}</h1>

                  <div className="product-price">
                    ${product.prod_precio}
                  </div>

                  <div className="product-content">
                    <p>
                    {product.prod_descripcion}
                    </p>
                  </div>

                  <div className="details-filter-row details-row-size">
                    <label htmlFor="qty">Qty:</label>
                    <div className="product-details-quantity">
                      <input
                        type="number"
                        id="qty"
                        className="form-control"
                        defaultValue="1"
                        min="1"
                        max="10"
                        step="1"
                        data-decimals="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="product-details-action">
                    <a href="!#" className="btn-product btn-cart"><span>add to cart</span></a>
                  </div>

                  <div className="product-details-footer">
                    <div className="product-cat">
                      <span>Category:</span>
                      <a href="!#">{product.cat_name}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-details-tab">
            <ul className="nav nav-pills justify-content-center" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="product-desc-link" data-toggle="tab" href="#product-desc-tab" role="tab" aria-controls="product-desc-tab" aria-selected="true">Description</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="product-info-link" data-toggle="tab" href="#product-info-tab" role="tab" aria-controls="product-info-tab" aria-selected="false">Additional information</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="product-shipping-link" data-toggle="tab" href="#product-shipping-tab" role="tab" aria-controls="product-shipping-tab" aria-selected="false">Shipping & Returns</a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="product-desc-tab" role="tabpanel" aria-labelledby="product-desc-link">
                <div className="product-desc-content">
                  <h3>Product Information</h3>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.</p>
                </div>
              </div>
              <div className="tab-pane fade" id="product-info-tab" role="tabpanel" aria-labelledby="product-info-link">
                <div className="product-desc-content">
                  <h3>Additional information</h3>
                  <p>Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede.</p>
                </div>
              </div>
              <div className="tab-pane fade" id="product-shipping-tab" role="tabpanel" aria-labelledby="product-shipping-link">
                <div className="product-desc-content">
                  <h3>Shipping & Returns</h3>
                  <p>Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
