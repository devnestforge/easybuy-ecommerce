
import '../environments/envionments'
import Home from '../views/Home'
import About from '../views/sections/About'
import Contact from '../views/sections/Contact'
import ProductsSearch from '../views/products/ProductsSearch'
import ProductsDetail from '../views/products/ProductsDetail'
import Checkout from '../views/checkout/Checkout'
import ShoppingCart from '../views/checkout/ShoppingCart'
import ResetPasword from '../views/user/ResetPassword'
import PerfilUser from '../views/user/Perfil'
import EnvioFacturacion from '../views/user/EnvioFacturacion'
import HistorialPedidos from '../views/user/HistorialPedidos'
import Devolucion from '../views/sections/Devolucion'
import Envio from '../views/sections/Envio'
import Garantia from '../views/sections/Garantia'
import MetodosDePago from '../views/sections/MetodosDePago'
import PoliticaDePrivacidad from '../views/sections/PoliticaDePrivacidad'
import TerminosDeUso from '../views/sections/TerminosDeUso'
import RastrearPedido from '../views/sections/RastrearPedido'
import Ayuda from '../views/sections/Ayuda'
import OrderConfirm from '../views/checkout/orderConfirm'
import OrderDetail from '../views/user/OrderDetail'
import OrderRastreo from '../views/user/OrderRastreo'

const routes = [

  { path: global.HOME, exact: true, name: 'Home', element: Home },

  // SECTIONS
  { path: global.ABOUT, exact: true, name: 'About', element: About },
  { path: global.CONTACT, exact: true, name: 'Contact', element: Contact },
  { path: global.PRODUCTSEARCH, exact: true, name: 'ProductsSearch', element: ProductsSearch },
  { path: `${global.PRODUCTDETAIL}/:id`, exact: true, name: 'ProductsDetail', element: ProductsDetail },
  { path: global.VIEWCART, exact: true, name: 'ShoppingCart', element: ShoppingCart },
  { path: global.CHECKOUT, exact: true, name: 'Checkout', element: Checkout },
  { path: global.RESETPASSWORD, exact: true, name: 'ResetPasword', element: ResetPasword },
  { path: global.ORDERCONFIRM, exact: true, name: 'OrderConfirm', element: OrderConfirm },
  { path: global.ORDERCRASTREO, exact: true, name: 'orderRastreo', element: OrderRastreo },
  { path: global.ORDERDETAIL, exact: true, name: 'orderDetail', element: OrderDetail },


  { path: global.DEVOLUCION, exact: true, name: 'Devolucion', element: Devolucion },
  { path: global.ENVIO, exact: true, name: 'Envio', element: Envio },
  { path: global.GRANTIA, exact: true, name: 'Garantia', element: Garantia },
  { path: global.METODOPAGO, exact: true, name: 'MetodosDePago', element: MetodosDePago },
  { path: global.POLITICA, exact: true, name: 'PoliticaDePrivacidad', element: PoliticaDePrivacidad },
  { path: global.TERMINOS, exact: true, name: 'TerminosDeUso', element: TerminosDeUso },
  { path: global.RASTREAPEDIDOS, exact: true, name: 'RastrearPedido', element: RastrearPedido },
  { path: global.AYUDA, exact: true, name: 'Ayuda', element: Ayuda },

  // USER PAGE
  { path: global.USERPERFIL, exact: true, name: 'PerfilUser', element: PerfilUser },
  { path: global.ENVIOFACT, exact: true, name: 'EnvioFacturacion', element: EnvioFacturacion },
  { path: global.HISTORY, exact: true, name: 'HistorialPedidos', element: HistorialPedidos },

]

export default routes
