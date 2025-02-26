
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

  { path: global.HOME, name: 'Home', element: Home },

  // SECTIONS
  { path: global.ABOUT, name: 'About', element: About },
  { path: global.CONTACT, name: 'Contact', element: Contact },
  { path: global.PRODUCTSEARCH, name: 'ProductsSearch', element: ProductsSearch },
  { path: `${global.PRODUCTDETAIL}/:id`, name: 'ProductsDetail', element: ProductsDetail },
  { path: global.VIEWCART, name: 'ShoppingCart', element: ShoppingCart },
  { path: global.CHECKOUT, name: 'Checkout', element: Checkout },
  { path: global.RESETPASSWORD, name: 'ResetPasword', element: ResetPasword },
  { path: global.ORDERCONFIRM, name: 'OrderConfirm', element: OrderConfirm },
  { path: global.ORDERCRASTREO, name: 'orderRastreo', element: OrderRastreo },
  { path: global.ORDERDETAIL, name: 'orderDetail', element: OrderDetail },


  { path: global.DEVOLUCION, name: 'Devolucion', element: Devolucion },
  { path: global.ENVIO, name: 'Envio', element: Envio },
  { path: global.GRANTIA, name: 'Garantia', element: Garantia },
  { path: global.METODOPAGO, name: 'MetodosDePago', element: MetodosDePago },
  { path: global.POLITICA, name: 'PoliticaDePrivacidad', element: PoliticaDePrivacidad },
  { path: global.TERMINOS, name: 'TerminosDeUso', element: TerminosDeUso },
  { path: global.RASTREAPEDIDOS, name: 'RastrearPedido', element: RastrearPedido },
  { path: global.AYUDA, name: 'Ayuda', element: Ayuda },

  // USER PAGE
  { path: global.USERPERFIL, name: 'PerfilUser', element: PerfilUser },
  { path: global.ENVIOFACT, name: 'EnvioFacturacion', element: EnvioFacturacion },
  { path: global.HISTORY, name: 'HistorialPedidos', element: HistorialPedidos },

]

export default routes
