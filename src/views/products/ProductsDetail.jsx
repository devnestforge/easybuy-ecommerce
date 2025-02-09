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
import userLogic from '../../functions/logic/userLogic'

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
  const [isVisible, setIsVisible] = useState(true)
  //const [mainMedia, setMainImage] = useState('')
  const [mainMedia, setMainMedia] = useState([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [imagesVideos, setImagesVideos] = useState([])

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    setActiveTab('product-desc-tab')
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const decryptedId = decryptId(id)
    setProductId(decryptedId)
    getProductsDetail(decryptedId)
  }, [id])

  const [reviews, setReviews] = useState([])

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

  const handleMediaClick = (media, index) => {
    if (media.hasOwnProperty("url_video")) {
      setMainMedia({ type: "video", url: `${global.IMGProd}${media.url_video}` });
    } else {
      setMainMedia({ type: "image", url: `${global.IMGProd}${media.url_imagen}` });
    }
    setSelectedImageIndex(index);
  }

  const getProductsDetail = async (productId) => {
    try {

      setLoad(true)
      const productDetails = await productsLogic.getProductsLogic(productId, '')
      if (productDetails.success && productDetails.data.length > 0) {
        setMainMedia({ type: "image", url: global.IMGProd + productDetails.data[0].url_imagen })
        setProduct(productDetails.data[0])
        setReviews(productDetails.review)
        setImagesVideos(productDetails)
      } else {
        setProduct(null)
      }
    } catch (error) {
      console.error('Error fetching product details:', error)
    } finally {
      setLoad(false)
    }
    setLoad(false)
  }

  if (!product) {
    return <ErrorPage />
  }

  const handleAddToCart = async () => {
    setLoad(true)
    const updatedCartItem = {
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
    };

    const updatedCartItems = [updatedCartItem];
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

    /*addToCart({
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
    })*/
  }

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(10, Number(e.target.value)))
    setQuantity(value)
  }

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + Number(review.rating), 0)
    const averageRating = totalRating / reviews.length
    return averageRating;
  }

  const averageRatingPercentage = getAverageRating()

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
            <div className="row summary">

              {/* Panel Izquierdo: Imagen */}
              <div className="col-md-8">
                <div className="product-gallery product-gallery-vertical">
                  <div className="row position-relative">
                    <span className="product-label label-circle label-sale">Oferta</span>
                    <figure className="product-main-image">
                      {mainMedia ? (
                        mainMedia.type === "image" ? (
                          <img id="product-zoom" src={mainMedia.url} alt="product" className="img-fluid" />
                        ) : (
                          <video id="product-zoom" controls className="img-fluid">
                            <source src={mainMedia.url} type="video/mp4" />
                            Tu navegador no soporta la reproducción de videos.
                          </video>
                        )
                      ) : (
                        <div>No media available</div>
                      )}
                    </figure>
                    <div id="product-zoom-gallery" className="product-image-gallery">
                      {[...(imagesVideos.prodImgs || []), ...(imagesVideos.prodVid || [])].map((media, index) => {
                        const isVideo = media.hasOwnProperty("url_video");
                        return (
                          <a
                            key={`${index}-${isVideo ? media.url_video : media.url_imagen}`}
                            id={`${index}-${isVideo ? media.url_video : media.url_imagen}`}
                            className={`product-gallery-item ${index === selectedImageIndex ? "active" : ""}`}
                            href="!#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleMediaClick(media, index);
                            }}
                            data-zoom-image={isVideo ? "" : `${global.IMGProd}${media.url_imagen}`}
                          >
                            {isVideo ? (
                              <video width="100" height="100" controls>
                                <source src={`${global.IMGProd}${media.url_video}`} type="video/mp4" />
                                Tu navegador no soporta la reproducción de videos.
                              </video>
                            ) : (
                              <img src={`${global.IMGProd}${media.url_imagen}`} alt={`product ${index + 1}`} />
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mx-auto">
                <div className="product-details panel p-4 shadow-sm rounded bg-white">
                  <h1 className="product-title text-center mb-3">{product.prod_name}</h1>
                  <div className="ratings-container d-flex justify-content-center align-items-center border-bottom pb-2 mb-3">
                    Calificación promedio:
                    <div className="ratings">
                      <div
                        className="ratings-val"
                        style={{ width: `${averageRatingPercentage}%` }}
                      ></div>
                    </div>
                    <a className="ratings-text" href="#product-review-link" id="review-link">Reviews ({reviews.length})</a>
                  </div>
                  <div className="product-price d-flex justify-content-center align-items-center border-bottom pb-2 mb-3">
                    {isDiscountAvailable ? (
                      <>Precio -
                        <span className="new-price text-success fw-bold fs-4">${product.precio_descuento}</span>
                        <span className="old-price text-muted text-decoration-line-through ms-3">Antes: ${product.prod_precio}</span>
                      </>
                    ) : (
                      <>Precio - <span className="fs-4">${product.prod_precio}</span></>
                    )}
                  </div>

                  {/* Descripción */}
                  <div className="product-content text-center mb-4">
                    <p className="text-muted">{product.prod_descripcion}</p>
                  </div>

                  {/* Cantidad y Botón */}
                  <div className="details-filter-row details-row-size d-flex justify-content-center align-items-center mb-4">
                    <label htmlFor="qty" className="fw-bold me-2">{t('products.Qty')}:</label>
                    <input
                      type="number"
                      id="qty"
                      className="form-control w-25 text-center"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max="10"
                      step="1"
                      required
                    />
                  </div>

                  <div className="product-details-action text-center mb-4">
                    <button className="btn btn-primary w-100 fw-bold py-2" onClick={handleAddToCart}>
                      {t('products.add_to_cart')}
                    </button>
                  </div>

                  {/* Categoría */}
                  <div className="product-details-footer text-center border-top pt-3">
                    <span className="fw-bold">{t('products.category')}:</span>
                    <a href="!#" className="text-primary ms-2">{product.cat_name}</a>
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
                                    <a href="!#">{review.name}</a>
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
                                    <a href="!#">{review.user}</a>
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
      <div className={`sticky-bar ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <figure className="product-media">
                <a href="product.html">
                  <img src={`${global.IMGProd}${product.url_imagen}`} alt="Product" />
                </a>
              </figure>
              <h4 className="product-title">
                {product.prod_name}
              </h4>
            </div>

            <div className="col-6 justify-content-end">
              <div className="product-price">
                {isDiscountAvailable ? (
                  <>
                    <span className="new-price text-success fw-bold fs-4">${product.precio_descuento}</span>
                    <span className="old-price text-muted text-decoration-line-through ms-3">Antes: ${product.prod_precio}</span>
                  </>
                ) : (
                  <><span className="fs-4">${product.prod_precio}</span></>
                )}
              </div>
              <div className="product-details-quantity">
                <input
                  type="number"
                  id="sticky-cart-qty"
                  className="form-control"
                  value="1"
                  min="1"
                  max="10"
                  step="1"
                  data-decimals="0"
                  required
                />
              </div>

              <div className="product-details-action">
                <button className="btn-primary w-100 fw-bold py-2" onClick={handleAddToCart}>
                  {t('products.add_to_cart')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

