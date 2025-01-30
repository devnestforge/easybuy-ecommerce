import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { Pagination, Checkbox, FormControlLabel, Slider } from '@mui/material';
import Spiner from '../../components/modals/Spiner'
import productsLogic from '../../functions/logic/productsLogic';

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
    id: 7,
    label: '',
    img: 'assets/images/products/product-7.jpg',
    title: 'Blue utility pinafore denim dress',
    price: '$76.00',
    category: 'Jeans',
    rating: 20,
    reviews: 2,
    thumb: 'assets/images/products/product-7-thumb.jpg',
  }
]

export default function ProductsSearch({ t, data }) {
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 200]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
    getProducts()
    setLoad(false)
  }, [])

  const getProducts = async () => {
    try {
      const product = await productsLogic.getProductsSearchLogic(1, 10, 'no')
      if (product.success && product.data.length > 0) {
        //setProduct(productDetails.data[0])
      } else {
        //setProduct(null)
      }
    } catch (error) {
      console.error('Error fetching product details:', error)
    } finally {
      setLoad(false)
    }
  }

  // Control de filtros
  const handlePriceChange = (event, newValue) => {
    setSelectedPriceRange(newValue);
    setCurrentPage(1);
  };

  const encryptId = (id) => {
    const encrypted = CryptoJS.AES.encrypt(id.toString(), 'secret-key').toString();
    return encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };

  const handleColorChange = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color) // Si ya está seleccionado, eliminarlo
        : [...prevColors, color] // Si no está seleccionado, agregarlo
    );
    setCurrentPage(1); // Resetear a la primera página cuando cambia el filtro de color
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size) // Si ya está seleccionado, eliminarlo
        : [...prevSizes, size] // Si no está seleccionado, agregarlo
    );
    setCurrentPage(1); // Resetear a la primera página cuando cambia el filtro de tamaño
  };

  // Manejo de selección/deselección de categorías
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category) // Si ya está seleccionado, eliminarlo
        : [...prevCategories, category] // Si no está seleccionado, agregarlo
    );
    setCurrentPage(1); // Resetear a la primera página cuando cambia el filtro de categoría
  };

  // Filtros
  const priceFilter = (price) => {
    return price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
  };

  const colorFilter = (product) => {
    if (selectedColors.length === 0) return true;
    return selectedColors.includes(product.color);
  };

  const sizeFilter = (product) => {
    if (selectedSizes.length === 0) return true;
    return selectedSizes.includes(product.size);
  };

  const categoryFilter = (product) => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(product.category);
  };

  // Filtrar productos según los filtros seleccionados
  const filteredProducts = products.filter(
    (product) =>
      priceFilter(product.price.replace('$', '')) &&
      colorFilter(product) &&
      sizeFilter(product) &&
      categoryFilter(product)
  );

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Manejo de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="main">
      <Spiner opt={load} />
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              {/* Lista de Productos */}
              <div className="products mb-3">
                <div className="row justify-content-center">
                  {currentProducts.map((product) => (
                    <div className="col-6 col-md-4 col-lg-4 col-xl-3" key={product.id}>
                      <div className="product product-7 text-center">
                        <figure className="product-media">
                          {product.label && (
                            <span
                              className={`product-label ${product.label === 'Out of Stock' ? 'label-out' : 'label-new'
                                }`}
                            >
                              {product.label}
                            </span>
                          )}
                          <a href={`${global.PRODUCTDETAIL}/${encryptId(product.id)}`}>
                            <img src={product.img} alt="Product" className="product-image" />
                          </a>
                        </figure>

                        <div className="product-body">
                          <div className="product-cat">
                            <a href="!#">{product.category}</a>
                          </div>
                          <h3 className="product-title">
                            <a href={`${global.PRODUCTDETAIL}/${encryptId(product.id)}`}>{product.title}</a>
                          </h3>
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

              {/* MUI Pagination */}
              <Pagination
                count={Math.ceil(filteredProducts.length / productsPerPage)}
                color="primary"
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                size="large"
                page={currentPage}
                onChange={(e, page) => paginate(page)}
                className="pagination justify-content-center"
              />
            </div>

            <aside className="col-lg-3 order-lg-first">
              <div className="sidebar sidebar-shop">
                <div className="widget widget-clean">
                  <label>Filters:</label>
                  <a href="!#" className="sidebar-filter-clear">Clean All</a>
                </div>

                {/* Filtro de Categoría */}
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a data-toggle="collapse" href="#widget-1" role="button" aria-expanded="true" aria-controls="widget-1">
                      Category
                    </a>
                  </h3>
                  <div className="collapse show" id="widget-1">
                    <div className="widget-body">
                      <div className="filter-items filter-items-count">
                        {['Women', 'Dresses', 'Jackets', 'Jeans'].map((category) => (
                          <div className="filter-item" key={category}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={selectedCategories.includes(category)} // Cambiado a múltiples categorías
                                  onChange={() => handleCategoryChange(category)} // Lógica para seleccionar/deseleccionar
                                />
                              }
                              label={category}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filtro de Precio */}
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a data-toggle="collapse" href="#widget-2" role="button" aria-expanded="true" aria-controls="widget-2">
                      Price Range
                    </a>
                  </h3>
                  <div className="collapse show" id="widget-2">
                    <div className="widget-body">
                      <Slider
                        value={selectedPriceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `$${value}`}
                        min={0}
                        max={200}
                        step={10}
                      />
                    </div>
                  </div>
                </div>

                {/* Filtro de Colores */}
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a data-toggle="collapse" href="#widget-3" role="button" aria-expanded="true" aria-controls="widget-3">
                      Colors
                    </a>
                  </h3>
                  <div className="collapse show" id="widget-3">
                    <div className="widget-body">
                      {['Red', 'Blue', 'Black'].map((color) => (
                        <div className="filter-item" key={color}>
                          <FormControlLabel
                            control={<Checkbox checked={selectedColors.includes(color)} onChange={() => handleColorChange(color)} />}
                            label={color}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Filtro de Tamaños */}
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a data-toggle="collapse" href="#widget-4" role="button" aria-expanded="true" aria-controls="widget-4">
                      Sizes
                    </a>
                  </h3>
                  <div className="collapse show" id="widget-4">
                    <div className="widget-body">
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <div className="filter-item" key={size}>
                          <FormControlLabel
                            control={<Checkbox checked={selectedSizes.includes(size)} onChange={() => handleSizeChange(size)} />}
                            label={size}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
