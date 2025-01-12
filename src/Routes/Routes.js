
import '../environments/envionments'
import Home from '../views/Home'
import About from '../views/sections/About'
import Contact from '../views/sections/Contact'
import ProductsSearch from '../views/products/ProductsSearch'
import ProductsDetail from '../views/products/ProductsDetail'

const routes = [

  { path: global.HOME, exact: true, name: 'Home', element: Home },

  // SECTIONS
  { path: global.ABOUT, exact: true, name: 'About', element: About },
  { path: global.CONTACT, exact: true, name: 'Contact', element: Contact },
  { path: global.PRODUCTSEARCH, exact: true, name: 'ProductsSearch', element: ProductsSearch },
  { path: `${global.PRODUCTDETAIL}/:id`, exact: true, name: 'ProductsDetail', element: ProductsDetail },

]

export default routes
