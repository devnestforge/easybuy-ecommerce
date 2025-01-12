
import '../environments/envionments'
import Home from '../views/Home'
import About from '../views/sections/About'
import Contact from '../views/sections/Contact'
import ProductsSearch from '../views/products/ProductsSearch'
import ProductsDetail from '../views/products/ProductsDetail'
import Checkout from '../views/checkout/Checkout'
import ShoppingCart from '../views/checkout/ShoppingCart'

const routes = [

  { path: global.HOME, exact: true, name: 'Home', element: Home },

  // SECTIONS
  { path: global.ABOUT, exact: true, name: 'About', element: About },
  { path: global.CONTACT, exact: true, name: 'Contact', element: Contact },
  { path: global.PRODUCTSEARCH, exact: true, name: 'ProductsSearch', element: ProductsSearch },
  { path: `${global.PRODUCTDETAIL}/:id`, exact: true, name: 'ProductsDetail', element: ProductsDetail },
  { path: global.VIEWCART, exact: true, name: 'ShoppingCart', element: ShoppingCart },
  { path: global.CHECKOUT, exact: true, name: 'Checkout', element: Checkout },

]

export default routes
