import React, { useState, useEffect, useCallback } from 'react'
import Spiner from '../../components/modals/Spiner'
import productsLogic from '../../functions/logic/productsLogic'
import ProductsGrid from '../../components/ProductsGrid'

export default function ProductsSearch() {
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [load, setLoad] = useState(false)
  //const [category, setCategory] = useState(0)
  //const [brand, setBrand] = useState(0)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [catalogoFilter, setCatalogo] = useState([])
  const [marcaFilter, setMarca] = useState([])
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
  })
  const [searchTerm, setSearchTerm] = useState('no')

  const getProducts = useCallback(async () => {

    try {
      setLoad(true)
      const response = await productsLogic.getProductsSearchLogic(
        currentPage,
        global.PEROD_BY_PAGE,
        searchTerm,
        filters,
        priceRange
      )
      if (response.success && response.data.length > 0) {
        setProducts(response.data)
        setTotalPages(Math.ceil(response.data[0].total / global.PEROD_BY_PAGE))
      } else {
        setProducts([])
        setTotalPages(1)
      }
    } catch (error) {
      setProducts([])
      setTotalPages(1)
    } finally {
      setLoad(false)
    }
  }, [currentPage, filters, priceRange, searchTerm])

  useEffect(() => {
    getFilters()
  }, [])

  useEffect(() => {
    getProducts()
  }, [currentPage, filters, getProducts])

  const paginate = (event, pageNumber) => {
    setCurrentPage(pageNumber)
  }

  /*const handlePriceChange = (e) => {
    setTempPriceRange([+e.target.value, priceRange[1]])
  }

  const handlePriceEnd = () => {
    setPriceRange(tempPriceRange)
    getProducts()
  }*/

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

  return (
    <main className="main">
      <Spiner opt={load} />
      <div className="page-content">
        <div className="col-lg-12">
          <div className="row summary">
            <div className="col-lg-10">
              <ProductsGrid data={products} totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
            </div>
            {/*<div className="col-lg-10">
              <div className="products">
                <div className="products-grid">
                  {products.length > 0 ? (
                    products.map((product) => {
                      const isDiscountAvailable =
                        product.valor_descuento &&
                        product.tarifa_descuento &&
                        product.precio_descuento &&
                        Number(product.valor_descuento) > 0 &&
                        Number(product.tarifa_descuento) > 0 &&
                        Number(product.precio_descuento) > 0;

                      return (
                        <div key={product.id} className="product-card">
                          <div className="product">
                            <figure className="product-media-grid">
                              {isDiscountAvailable === true && <span className="product-label">Oferta</span>}
                              <a href={`${global.PRODUCTDETAIL}/${encryptId(product.id)}`}>
                                <img
                                  src={`${global.IMGProd}${product.url_imagen}`}
                                  alt={product.prod_name}
                                  className="product-image"
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
                                    e.preventDefault();
                                    handleAddToCart(product);
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
                                <a href="!#">{product.cat_name}</a>
                              </div>
                              <h3 className="product-title">
                                <a href={`${global.PRODUCTDETAIL}/${encryptId(product.id)}`}>
                                  {product.prod_name}
                                </a>
                              </h3>
                              <div className="product-title">
                                {isDiscountAvailable ? (
                                  <>
                                    <span className="new-price">${product.precio_descuento}</span>
                                    Antes <span className="old-price">${product.prod_precio}</span>
                                  </>
                                ) : (
                                  <span>${product.prod_precio}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
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
            </div>*/}
            <aside className="col-lg-2 order-lg-first">
              <div className="sidebar sidebar-shop">
                {/* Filtros de productos */}
                <div className="widget widget-clean">
                  <label>Filtros:</label>
                  <a href="!#" className="sidebar-filter-clear" onClick={() => {
                    //setCategory('')
                    //setBrand('')
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
    </main>
  )
}
