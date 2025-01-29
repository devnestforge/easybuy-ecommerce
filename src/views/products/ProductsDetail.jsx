import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import productsLogic from '../../functions/logic/productsLogic'
import Spiner from '../../components/modals/Spiner'
import ErrorPage from '../../components/error'
import { useCart } from '../../functions/context/CartProvider' // Importa el hook de CartContext
import { ProductionQuantityLimitsSharp } from '@mui/icons-material'

const decryptId = (encryptedId) => {
  const base64 = encryptedId.replace(/-/g, '+').replace(/_/g, '/') + '==' // Decodifica la id
  const bytes = CryptoJS.AES.decrypt(base64, 'secret-key')
  return bytes.toString(CryptoJS.enc.Utf8)
}

export default function ProductsDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [load, setLoad] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    setLoad(true)
    const decryptedId = decryptId(id)
    getProductsDetail(decryptedId)
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
    const iva = product.iva_precio // * ProductionQuantityLimitsSharp
    
    //const total = product.prod_precio * quantity + iva
    addToCart({
      id: product.id,
      empresa_id: product.empresa_id,
      name: product.prod_name,
      price: product.prod_precio,
      iva: product.iva_precio,
      total: product.total_precio,
      tarifa: product.tarifa,
      valor_descuento: product.valor_descuento,
      tarifa_descuento: product.tarifa_descuento,
      precio_descuento: product.precio_descuento,
      total_descuento: product.total_descuento,
      iva_descuento: product.iva_descuento,
      quantity,
      imageUrl: product.url_imagen,
    })
  }

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(10, Number(e.target.value)))
    setQuantity(value)
  }

  const isDiscountAvailable =
    product.valor_descuento &&
    product.tarifa_descuento &&
    product.precio_descuento &&
    Number(product.valor_descuento) > 0 &&
    Number(product.tarifa_descuento) > 0 &&
    Number(product.precio_descuento) > 0

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
                  <span className="product-label label-circle label-sale">Oferta</span>
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
                    {isDiscountAvailable ? (
                      <>
                      
                        <span className="new-price">${product.precio_descuento}</span>
                        <span className="old-price">antes ${product.prod_precio}</span>
                        
                      </>
                    ) : (
                      <span>${product.prod_precio}</span>
                    )}
                  </div>

                  <div className="product-content">
                    <p>{product.prod_descripcion}</p>
                  </div>

                  <div className="details-filter-row details-row-size">
                    <label htmlFor="qty">Qty:</label>
                    <div className="product-details-quantity">
                      <input
                        type="number"
                        id="qty"
                        className="form-control"
                        value={quantity} // Valor ligado al estado
                        onChange={handleQuantityChange} // Controlador para actualizar el estado
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

          {/* Resto del código (tabs y detalles adicionales) */}
        </div>
      </div>
    </main>
  )
}

