import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import t from '../../translations/i18n'
import productsLogic from '../../functions/logic/productsLogic'
import Spiner from '../../components/modals/Spiner'
import ErrorPage from '../../components/error'
import { useCart } from '../../functions/context/CartProvider' // Importa el hook de CartContext

const decryptId = (encryptedId) => {
  const base64 = encryptedId.replace(/-/g, '+').replace(/_/g, '/') + '==' // Decodifica la id
  const bytes = CryptoJS.AES.decrypt(base64, 'secret-key')
  return bytes.toString(CryptoJS.enc.Utf8)
}

export default function ProductsDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [load, setLoad] = useState(false)
  const { addToCart } = useCart()  // Usa el hook de CartContext para acceder a la función addToCart

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

  const handleAddToCart = () => {
    const quantity = parseInt(document.getElementById('qty').value, 10) || 1; // Obtén la cantidad seleccionada, por defecto 1
    addToCart({
      id: product.prod_id,
      name: product.prod_name,
      price: product.prod_precio,
      quantity, // Pasamos la cantidad seleccionada
      imageUrl: product.url_imagen, // Pasamos la URL de la imagen del producto
    });
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
                        required
                      />
                    </div>
                  </div>

                  <div className="product-details-action">
                    <button
                      className="btn-product btn-cart"
                      onClick={handleAddToCart} // Agrega el producto al carrito al hacer clic
                    >
                      <span>add to cart</span>
                    </button>
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
                <a className="nav-link active" id="product-desc-link" data-toggle="tab" href="#product-desc-tab" role="tab" aria-controls="product-desc-tab" aria-selected="true">{t('Description')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="product-info-link" data-toggle="tab" href="#product-info-tab" role="tab" aria-controls="product-info-tab" aria-selected="false">{t('Aditgional_info')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="product-shipping-link" data-toggle="tab" href="#product-shipping-tab" role="tab" aria-controls="product-shipping-tab" aria-selected="false">{t('Shipping_returns_info')}</a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="product-desc-tab" role="tabpanel" aria-labelledby="product-desc-link">
                <div className="product-desc-content">
                  <h3>{t('Description')}</h3>
                  <p>{product.observacion}</p>
                </div>
              </div>
              <div className="tab-pane fade" id="product-info-tab" role="tabpanel" aria-labelledby="product-info-link">
                <div className="product-desc-content">
                  <h3>{t('Aditgional_info')}</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <ul>
                        <li><strong>{t('Weight_prod')}</strong> {product.peso || "N/A"}</li>
                        <li><strong>{t('Height_prod')}</strong> {product.alto || "N/A"}</li>
                        <li><strong>{t('Width_prod')}</strong> {product.ancho || "N/A"}</li>
                        <li><strong>{t('Length_prod')}</strong> {product.largo || "N/A"}</li>
                        <li><strong>{t('Size_prod')}</strong> {product.talla || "N/A"}</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                        <li><strong>{t('Dimensions_prod')}</strong> {product.dimensiones || "N/A"}</li>
                        <li><strong>{t('Release_Date_prod')}</strong> {product.fecha_lanzamiento || "N/A"}</li>
                        <li><strong>{t('Manufacturer_prod')}</strong> {product.fabricante || "N/A"}</li>
                        <li><strong>{t('Year_prod')}</strong> {product.anio_fabricacion || "N/A"}</li>
                        <li><strong>{t('Warranty_prod')}</strong> {product.garantia || "N/A"}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="product-shipping-tab" role="tabpanel" aria-labelledby="product-shipping-link">
                <div className="product-desc-content">
                  <h3>{t('Shipping_returns_info')}</h3>
                  <p>{t('shipping_intro')}</p>
                  <h4>{t('return_policy_title')}</h4>
                  <p>{t('return_policy_intro')}</p>
                  <ul>
                    <li>{t('return_condition_1')}</li>
                    <li>{t('return_condition_2')}</li>
                    <li>{t('return_condition_3')}</li>
                  </ul>
                  <h4>{t('terms_conditions_title')}</h4>
                  <p>{t('terms_conditions_intro')}</p>
                  <p>{t('contact_for_more_info')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
