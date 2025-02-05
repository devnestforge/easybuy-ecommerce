import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import productsLogic from '../../functions/logic/productsLogic'
import Spiner from '../../components/modals/Spiner'
import ErrorPage from '../../components/error'
import { useCart } from '../../functions/context/CartProvider'
import t from '../../translations/i18n'
import RatingStars from '../../components/RatingStars'
import { useSnackbar } from 'notistack'

const decryptId = (encryptedId) => {
  const base64 = encryptedId.replace(/-/g, '+').replace(/_/g, '/') + '=='
  const bytes = CryptoJS.AES.decrypt(base64, 'secret-key')
  return bytes.toString(CryptoJS.enc.Utf8)
}

export default function ProductsDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [load, setLoad] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [productId, setProductId] = useState(1)
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState('product-desc-tab')
  const [rating, setRating] = useState(0)
  const token = localStorage.getItem('authToken')
  const isLoggedIn = !!token
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    setLoad(true)
    const decryptedId = decryptId(id)
    setProductId(decryptedId)
    getProductsDetail(decryptedId)
  }, [id])

  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Samanta J.",
      rating: (5 / 5) * 100,
      date: "6 days ago",
      title: "Good, perfect size",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!",
      helpful: 2,
      unhelpful: 0,
    },
    {
      id: 2,
      user: "John Doe",
      rating: (1 / 5) * 100,
      date: "5 days ago",
      title: "Very good",
      content: "Sed, molestias, tempore? Ex dolor esse iure hic veniam laborum blanditiis laudantium iste amet. Cum non voluptate eos enim, ab cumque nam, modi, quas iure illum repellendus, blanditiis perspiciatis beatae!",
      helpful: 0,
      unhelpful: 0,
    }
  ])

  const [newReview, setNewReview] = useState({
    name: '',
    title: '',
    content: '',
    rating: 0,
    cedula: '',
    email: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }))
  }

  const handleAddReview = async (e) => {
    setLoad(true)
    e.preventDefault()
    if (!newReview.title.trim() || !newReview.content.trim()) {
      enqueueSnackbar("Por favor, completa todos los campos antes de enviar la reseña.", {
        variant: 'warning',
        anchorOrigin: {
          vertical: global.SNACKBARVER,
          horizontal: global.SNACKBARHOR
        }
      })
      return
    }

    if (!isLoggedIn) {
      if (!newReview.name.trim() || !newReview.email.trim()) {
        enqueueSnackbar("Por favor, completa todos los campos antes de enviar la reseña", {
          variant: 'warning',
          anchorOrigin: {
            vertical: global.SNACKBARVER,
            horizontal: global.SNACKBARHOR
          }
        })
        return
      }
    }

    if (isLoggedIn) {
      if (rating === 0) {
        enqueueSnackbar("Por favor, selecciona una calificación.", {
          variant: 'warning',
          anchorOrigin: {
            vertical: global.SNACKBARVER,
            horizontal: global.SNACKBARHOR
          }
        })
        return
      }
    }

    const resp = await productsLogic.saveProductReviewLogic(token, newReview.name, newReview.title, newReview.content, rating, newReview.email, productId)
    enqueueSnackbar(resp.data.message, {
      variant: resp.data.variant,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    })

    if (resp.success) {

      const newReviewData = {
        ...newReview,
        rating,
        id: reviews.length + 1,
        date: "Just now",
        helpful: 0,
        unhelpful: 0,
      }

      setReviews((prevReviews) => [...prevReviews, newReviewData])

      setNewReview({ name: "", title: "", content: "" })
      setRating(0)
      setLoad(false)
    }
  }

  const getProductsDetail = async (productId) => {
    try {
      const productDetails = await productsLogic.getProductsLogic(productId, '')
      if (productDetails.success && productDetails.data.length > 0) {
        setProduct(productDetails.data[0])
        setReviews(productDetails.review)
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
                    <label htmlFor="qty">{t('products.Qty')}:</label>
                    <div className="product-details-quantity">
                      <input
                        type="number"
                        id="qty"
                        className="form-control"
                        value={quantity}
                        onChange={handleQuantityChange}
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
                      onClick={handleAddToCart}
                    >
                      <span>{t('products.add_to_cart')}</span>
                    </button>
                  </div>

                  <div className="product-details-footer">
                    <div className="product-cat">
                      <span>{t('products.category')}</span>
                      <a href="!#">{product.cat_name}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="product-details-tab">
                  <ul className="nav nav-pills justify-content-center" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="product-desc-link" data-toggle="tab" href="#product-desc-tab" role="tab" aria-controls="product-desc-tab" aria-selected="true">{t('products.Description')}</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="product-info-link" data-toggle="tab" href="#product-info-tab" role="tab" aria-controls="product-info-tab" aria-selected="false">{t('products.Aditgional_info')}</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="product-shipping-link" data-toggle="tab" href="#product-shipping-tab" role="tab" aria-controls="product-shipping-tab" aria-selected="false">{t('products.Shipping_returns_info')}</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="product-review-link" data-toggle="tab" href="#product-review-tab" role="tab" aria-controls="product-review-tab" aria-selected="false">{t('products.reviews')}</a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className={`tab-pane fade ${activeTab === 'product-desc-tab' ? 'show active' : ''}`}
                      id="product-desc-tab"
                      role="tabpanel"
                      aria-labelledby="product-desc-link"
                    >
                      <div className="product-desc-content">
                        <h3>{t('products.Description')}</h3>
                        <p>{product.observacion}</p>
                      </div>
                    </div>

                    <div
                      className={`tab-pane fade ${activeTab === 'product-info-tab' ? 'show active' : ''}`}
                      id="product-info-tab"
                      role="tabpanel"
                      aria-labelledby="product-info-link"
                    >
                      <div className="product-desc-content">
                        <h3>{t('products.Aditgional_info')}</h3>
                        <div className="row">
                          <div className="col-md-6">
                            <ul>
                              <li><strong>{t('product_details.Weight_prod')}</strong> {product.peso || "N/A"}</li>
                              <li><strong>{t('product_details.Height_prod')}</strong> {product.alto || "N/A"}</li>
                              <li><strong>{t('product_details.Width_prod')}</strong> {product.ancho || "N/A"}</li>
                              <li><strong>{t('product_details.Length_prod')}</strong> {product.largo || "N/A"}</li>
                              <li><strong>{t('product_details.Size_prod')}</strong> {product.talla || "N/A"}</li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <ul>
                              <li><strong>{t('product_details.Dimensions_prod')}</strong> {product.dimensiones || "N/A"}</li>
                              <li><strong>{t('product_details.Release_Date_prod')}</strong> {product.fecha_lanzamiento || "N/A"}</li>
                              <li><strong>{t('product_details.Manufacturer_prod')}</strong> {product.fabricante || "N/A"}</li>
                              <li><strong>{t('product_details.Year_prod')}</strong> {product.anio_fabricacion || "N/A"}</li>
                              <li><strong>{t('product_details.Warranty_prod')}</strong> {product.garantia || "N/A"}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`tab-pane fade ${activeTab === 'product-shipping-tab' ? 'show active' : ''}`}
                      id="product-shipping-tab"
                      role="tabpanel"
                      aria-labelledby="product-shipping-link"
                    >
                      <div className="product-desc-content">
                        <h3>{t('products.Shipping_returns_info')}</h3>
                        <p>{t('shipping.shipping_intro')}</p>
                        <h4>{t('shipping.return_policy_title')}</h4>
                        <p>{t('shipping.return_policy_intro')}</p>
                        <ul>
                          <li>{t('shipping.return_condition_1')}</li>
                          <li>{t('shipping.return_condition_2')}</li>
                          <li>{t('shipping.return_condition_3')}</li>
                        </ul>
                        <h4>{t('shipping.terms_conditions_title')}</h4>
                        <p>{t('shipping.terms_conditions_intro')}</p>
                        <p>{t('shipping.contact_for_more_info')}</p>
                      </div>
                    </div>

                    <div
                      className={`tab-pane fade ${activeTab === 'product-review-tab' ? 'show active' : ''}`}
                      id="product-review-tab"
                      role="tabpanel"
                      aria-labelledby="product-review-link"
                    >
                      <div className="reviews">

                        <div className="reviews mt-1">
                          <h3>Reviews ({reviews.length})</h3>
                          {reviews.map((review) => (
                            <div key={review.id} className="review">
                              <div className="row no-gutters">
                                <div className="col-auto">
                                  <h4>
                                    <a href="#">{review.name}</a>
                                  </h4>
                                  <div className="ratings-container">
                                    <div className="ratings">
                                      <div
                                        className="ratings-val"
                                        style={{ width: `${review.rating}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                  <span className="review-date">{review.date}</span>
                                </div>
                                <div className="col">
                                  <h4>
                                    <a href="#">{review.user}</a>
                                  </h4>
                                  <h4>{review.title}</h4>
                                  <div className="review-content">
                                    <p>{review.content}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="touch-container row justify-content-center">
                          <div className="col-md-9 col-lg-7 mt-2">
                            <div className="text-center">
                              <h2 className="title mb-1">{t('products.Review')}</h2>
                              <p className="mb-3">{t('products.Tittle')}</p>
                            </div>
                            <form onSubmit={handleAddReview} className="contact-form mb-2">
                              <div className="row">
                                {!isLoggedIn && (
                                  <>
                                    <div className="col-sm-12">
                                      <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder={t('products.Email')}
                                        required
                                        value={newReview.email}
                                        onChange={handleInputChange}
                                      />
                                    </div>

                                    <div className="col-sm-12">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder={t('products.Name')}
                                        required
                                        value={newReview.name}
                                        onChange={handleInputChange}
                                      />
                                    </div>
                                  </>
                                )}
                                <div className="col-sm-12">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder={t('products.Review_tittle')}
                                    required
                                    value={newReview.title}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="col-sm-12">
                                  <textarea
                                    className="form-control"
                                    name="content"
                                    rows="4"
                                    required
                                    value={newReview.content}
                                    onChange={handleInputChange}
                                    placeholder={t('products.Review_text')}
                                  ></textarea>
                                </div>
                                {isLoggedIn && (
                                  <div className="col-sm-12">
                                    <label>{t('products.rate')}</label>
                                    <RatingStars initialRating={rating} onRatingChange={setRating} />
                                  </div>
                                )}
                              </div>
                              <div className="text-center mt-1">
                                <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
                                  {t('products.send_comment')}
                                </button>
                              </div>
                            </form>
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
      </div>
    </main>
  )
}

