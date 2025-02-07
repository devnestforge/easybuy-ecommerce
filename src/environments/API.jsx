// Url local
global.URLBACKENDSECURITY = "http://localhost/EasyBuy/easybuy-back/api-ecommerce"
global.IMG = "http://localhost/EasyBuy/easybuy-back/assets/"
global.IMGProd = 'http://localhost/'

// Url AWS
//global.URLBACKENDSECURITY = "http://3.145.112.113/api-security"
//global.IMG = "http://3.145.112.113/assets/"

//BACK

//auditoria
global.LOG_ERROR = global.URLBACKENDSECURITY  + "/ecomerce/logError"
global.GET_IP = "https://api.bigdatacloud.net/data/client-ip"

global.SECRETKEY = 'GABRIEL19892025EASYBUY'

// secutiry

global.LOGIN = global.URLBACKENDSECURITY  + "/ecomerce/login"
global.REGISTER = global.URLBACKENDSECURITY  + "/ecomerce/register"
global.RESTORE = global.URLBACKENDSECURITY  + "/ecomerce/sendLink"
global.CHANGEPASSWORD = global.URLBACKENDSECURITY + '/ecomerce/changePassword'

//gENERRAK
global.GETSHIPPINGS = global.URLBACKENDSECURITY + '/ecomerce/getShippings'
global.GETDISCOUTNCODE = global.URLBACKENDSECURITY + '/ecomerce/getDiscountCode'
global.GETPAYMETHOD = global.URLBACKENDSECURITY + '/ecomerce/getPayMethod'
global.GETREGIONS = global.URLBACKENDSECURITY + '/ecomerce/getRegions'
global.SENDCONTACT = global.URLBACKENDSECURITY + '/ecomerce/sentContact'
global.SENDREVIEW = global.URLBACKENDSECURITY + '/ecomerce/sentReview'

// PRODUCTS
global.PRODUCTS = global.URLBACKENDSECURITY  + "/ecomerce/getProducts"
global.GET_PROMOTIONS = global.URLBACKENDSECURITY  + "/ecomerce/getPromotions"
global.GET_RECOMENDED = global.URLBACKENDSECURITY  + "/ecomerce/getRecomended"
global.GET_CATEGORIES = global.URLBACKENDSECURITY  + "/ecomerce/getCategories"
global.GETFILTERS = global.URLBACKENDSECURITY  + "/ecomerce/getFilters"

//user
global.SAVEVIEWCART = global.URLBACKENDSECURITY  + "/ecomerce/saveViewCart"
global.SAVEDITADDRESS = global.URLBACKENDSECURITY  + "/ecomerce/saveEditAddress"
global.SAVEORDERS = global.URLBACKENDSECURITY  + "/ecomerce/saveOrders"
global.GETADDRESS = global.URLBACKENDSECURITY  + "/ecomerce/getAddress"
global.GETORDERTRACK = global.URLBACKENDSECURITY  + "/ecomerce/getOrderTrack"
global.GETCARTBYCODE = global.URLBACKENDSECURITY  + "/ecomerce/getViewCartByCode"
global.GETHISTORYORDERS = global.URLBACKENDSECURITY  + "/ecomerce/getHistoryOrders"
global.PRODUCTSSEARCH = global.URLBACKENDSECURITY  + "/ecomerce/getProductsSearch"
global.GETUSERPROFILE = global.URLBACKENDSECURITY  + "/ecomerce/getUserProfile"
global.SAVEPROFILE = global.URLBACKENDSECURITY  + "/ecomerce/saveProfile"

// URL FRONT END

// SECUTIRY
global.HOME = "/home"

// SECTIONS
global.ABOUT = "/about-us"
global.CONTACT = "/contact-us"
global.PRODUCTSEARCH = '/products'
global.PRODUCTDETAIL = '/products-detail'
global.VIEWCART = '/viewcart'
global.CHECKOUT = '/checkout'
global.RESETPASSWORD = '/cambiar-credenciales/:token'
global.RESETPASSWORDLINK = '/cambiar-credenciales'
global.ORDERCONFIRM = '/orden-ingresada'
global.ORDERCRASTREO = '/orden-rastreo'
global.ORDERDETAIL = '/orden-detalle'

global.DEVOLUCION = '/devolucion'
global.ENVIO = '/envio'
global.GRANTIA = '/garantia'
global.METODOPAGO = '/metodos-de-pago'
global.POLITICA = '/politica'
global.TERMINOS = '/terminos-y-condiciones'
global.RASTREAPEDIDOS = '/rastrea-tus-pedidos'
global.AYUDA = '/ayuda'

// USERS
global.USERPERFIL = '/perfil'
global.ENVIOFACT = '/envio-facturacion'
global.HISTORY = '/historial-pedidos'

global.ROUTE_HOME = "*"
global.ROUTE_ANY = "/*"
global.URLPROD = "http://localhost/"
