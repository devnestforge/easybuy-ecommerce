import React, { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import { Pagination } from '@mui/material'
import Spiner from '../../components/modals/Spiner'
import productsLogic from '../../functions/logic/productsLogic'
import { useCart } from '../../functions/context/CartProvider'
import t from '../../translations/i18n'
import Modal from 'react-modal'
import { useSnackbar } from 'notistack'
import userLogic from '../../functions/logic/userLogic'

export default function ProductsSearch() {
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [load, setLoad] = useState(false)
  const [category, setCategory] = useState(0)
  const [brand, setBrand] = useState(0)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const { addToCart } = useCart()
  const token = localStorage.getItem('authToken')
  const isLoggedIn = !!token
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [tempPriceRange, setTempPriceRange] = useState([0, 1000])
  const [catalogoFilter, setCatalogo] = useState([])
  const [marcaFilter, setMarca] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
  })
  const [searchTerm, setSearchTerm] = useState('no')

  useEffect(() => {
    getFilters()
  }, [])

  useEffect(() => {
    getProducts()
  }, [currentPage, filters])

  const handlePriceChange = (e) => {
    setTempPriceRange([+e.target.value, priceRange[1]])
  }

  const handlePriceEnd = () => {
    setPriceRange(tempPriceRange)
    getProducts()
  }

  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)
  }

  const getFilters = async () => {
    try {
      setLoad(true)
      const response = await productsLogic.getFiltersLogic()
      if (response.success) {
        setCatalogo(response.data.categorias)
        setMarca(response.data.marcas)
      } else {

      }
    } catch (error) {

    } finally {
      setLoad(false)
    }
  }

  const getProducts = async () => {
    try {
      setLoad(true)
      const response = await productsLogic.getProductsSearchLogic(
        currentPage,
        8,
        searchTerm,
        filters,
        priceRange
      )
      if (response.success && response.data.length > 0) {
        setProducts(response.data)
        setTotalPages(Math.ceil(response.data[0].total / 8))
      } else {
        setProducts([])
        setTotalPages(1)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
      setTotalPages(1)
    } finally {
      setLoad(false)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentProduct(null)
  }

  const paginate = (event, pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleAddToCart = async (item) => {
    setLoad(true)
    const quantity = 1 // Puedes manejar esto dinámicamente si lo necesitas
    const iva = item.iva_precio * quantity // Cálculo del IVA
    const total = item.prod_precio * quantity + iva
    const updatedCartItem = {
      id: item.id,
      empresa_id: item.empresa_id,
      name: item.prod_name,
      price: item.prod_precio,
      iva,
      total,
      tarifa: item.tarifa,
      valor_descuento: item.valor_descuento,
      tarifa_descuento: item.tarifa_descuento,
      precio_descuento: item.precio_descuento,
      total_descuento: item.total_descuento,
      iva_descuento: item.iva_descuento,
      quantity,
      imageUrl: item.url_imagen,
    };
    const updatedCartItems = [updatedCartItem];
    if (isLoggedIn) {
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
    } else {
      addToCart(updatedCartItem)
    }
    setLoad(false)
  }

  const handleQuickViewClick = (e, product) => {
    e.preventDefault()
    openModal(product)
  }

  const openModal = (product) => {
    setCurrentProduct(product)
    setIsModalOpen(true)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      let updatedFilter

      if (filterType === "category" || filterType === "brand") {
        updatedFilter = prevFilters[filterType].includes(value)
          ? prevFilters[filterType].filter((item) => item !== value)
          : [...prevFilters[filterType], value]
      } else if (filterType === "price") {
        updatedFilter = value
      }

      return { ...prevFilters, [filterType]: updatedFilter }
    })

    setTimeout(() => getProducts(), 0)
  }

  const encryptId = (id) => {
    const encrypted = CryptoJS.AES.encrypt(id.toString(), 'secret-key').toString()
    return encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  }

  return (
    <main className="main">
      <Spiner opt={load} />
      <div className="page-content">

        <div className="col-lg-12">
          <div className="row summary">
            <div className="col-lg-9">
              <div className="products mb-3">
                <div className="row justify-content-center">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <div className="col-6 col-md-3 col-lg-3" key={product.id}>
                        <div className="product product-7 text-center custom-product-card">
                          <figure className="product-media">
                            {product.label && (
                              <span
                                className={`product-label ${product.label === 'Out of Stock' ? 'label-out' : 'label-new'
                                  }`}
                              >
                                {product.prod_name}
                              </span>
                            )}
                            <a href={`${global.PRODUCTDETAIL}/${encryptId(product.id)}`}>
                              <img
                                src={`${global.IMGProd}${product.url_imagen}`}
                                alt="Product"
                                className="custom-product-image"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="!#"
                                className="btn-product-icon btn-quickview"
                                title="Quick view"
                                onClick={(e) => handleQuickViewClick(e, product)}
                              >
                                <span>{t('products.quick_view')}</span>
                              </a>
                            </div>
                            <div className="product-action">
                              <a
                                href="!#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleAddToCart(product)
                                }}
                                className="btn-product btn-cart"
                                title={t('products.add_to_cart')}
                              >
                                <span>{t('products.add_to_cart')}</span>
                              </a>
                            </div>
                          </figure>
                          <div className="product-body">
                            <div className="product-cat">
                              <a href="#">{product.cat_name}</a>
                            </div>
                            <h3 className="product-title">
                              <a href={`${global.PRODUCTDETAIL}/${encryptId(product.id)}`}>
                                {product.prod_name}
                              </a>
                            </h3>
                            <div className="product-price">
                              {product.label === 'Out of Stock' ? (
                                <span className="out-price">{product.prod_precio}</span>
                              ) : (
                                <span>{product.prod_precio}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">No hay productos disponibles.</p>
                  )}
                </div>
              </div>

              <Pagination
                count={totalPages || 1}
                color="primary"
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                size="large"
                page={currentPage}
                onChange={paginate}
                className="pagination justify-content-center"
              />
            </div>
            <aside className="col-lg-3 order-lg-first">
              <div className="sidebar sidebar-shop">
                {/* Filtros de productos */}
                <div className="widget widget-clean">
                  <label>Filtros:</label>
                  <a href="#" className="sidebar-filter-clear" onClick={() => {
                    setCategory('')
                    setBrand('')
                    setPriceRange([0, 1000])
                  }}>Limpiar filtros</a>
                </div>
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a
                      data-toggle="collapse"
                      href="#widget-search"
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-search"
                    >
                      Buscar
                    </a>
                  </h3>
                  <div className="collapse show" id="widget-search">
                    <div className="col-lg-12">
                      <form className="contact-form mb-2 d-flex">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control text-right"
                            name="title"
                            placeholder="Buscar por nombre"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            required
                          />
                          <button type="submit" className="btn-search input-group-text">
                            <i className="icon-search"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                </div>


                {/* Filtro de Categoría */}
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a data-toggle="collapse" href="#widget-1" role="button" aria-expanded="true" aria-controls="widget-1">
                      Categoría
                    </a>
                  </h3>
                  <div className="collapse show" id="widget-1">
                    <div className="widget-body">
                      <div className="filter-items filter-items-count">
                        {catalogoFilter.map(({ id, nombre, count, nemonico_cat }) => (
                          <div className="filter-item" key={id}>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={nemonico_cat}

                                onChange={() => handleFilterChange("category", nemonico_cat)}
                              />
                              <label className="custom-control-label" htmlFor={nemonico_cat}>
                                {nombre}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filtro de Marca */}
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a data-toggle="collapse" href="#widget-4" role="button" aria-expanded="true" aria-controls="widget-4">
                      Marca
                    </a>
                  </h3>
                  <div className="collapse show" id="widget-4">
                    <div className="widget-body">
                      <div className="filter-items">
                        {marcaFilter.map(({ id, nombre, nemonico_marca }) => (
                          <div className="filter-item" key={id}>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={nemonico_marca}
                                onChange={() => handleFilterChange("brand", nemonico_marca)}
                              />
                              <label className="custom-control-label" htmlFor={nemonico_marca}>
                                {nombre}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filtro de Precio 
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a data-toggle="collapse" href="#widget-5" role="button" aria-expanded="true" aria-controls="widget-5">
                      Price
                    </a>
                  </h3>
                  <div className="collapse show" id="widget-5">
                    <div className="widget-body">
                      <div className="filter-items">
                        <label>
                          <input
                            type="range"
                            min="0"
                            max="1000"
                            step="10"
                            value={tempPriceRange[0]}
                            onChange={handlePriceChange}
                            onMouseUp={handlePriceEnd}
                            onTouchEnd={handlePriceEnd}
                          />
                          ${tempPriceRange[0]} - ${priceRange[1]}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>*/}

              </div>
            </aside>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Quick View Modal"
        className="quick-view-modal"
        overlayClassName="quick-view-overlay"
      >
        <button className="close-modal" onClick={closeModal}>X</button>
        {currentProduct && (
          <div className="container quickView-container">
            <div className="quickView-content">
              <div className="row">
                {/* Left side: Product Info */}
                <div className="col-lg-7 col-md-6">
                  <div className="product-left-modal">
                    <img
                      src={`${global.IMGProd}${currentProduct.url_imagen}`}
                      alt={currentProduct.prod_name}
                      className="product-image-products"
                    />
                  </div>
                </div>

                {/* Right side: Product Details */}
                <div className="col-lg-5 col-md-6">
                  <h2 className="product-title-modal">{currentProduct.prod_name}</h2>
                  <h3 className="product-price-modal">${currentProduct.prod_precio}</h3>

                  <div className="product-txt-modal">
                    {currentProduct.prod_desc || 'No description available.'}
                  </div>

                  {/* Quantity input */}
                  <label htmlFor="qty">{t('products.Qty')}</label>
                  <div className="product-details-quantity">
                    <input
                      type="number"
                      id="qty"
                      className="form-control qty-input"
                      value="1"
                      min="1"
                      max="10"
                      step="1"
                      required
                    />
                  </div>

                  {/* Actions: Add to Wishlist, Add to Cart */}
                  <div className="product-details-action">
                    <a href="!#"
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(currentProduct)
                      }}
                      className="btn-product btn-cart">
                      <span>{t('products.add_to_cart')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </main>
  )
}
