// Url local
global.URLBACKENDSECURITY = "http://localhost/EasyBuy/easybuy-back/api-ecommerce"
global.IMG = "http://localhost/EasyBuy/easybuy-back/assets/"
global.IMGProd = 'http://localhost/'

// Url AWS
//global.URLBACKENDSECURITY = "http://3.145.112.113/api-security"
//global.IMG = "http://3.145.112.113/assets/"

//BACK

//auditoria
global.LOG_ERROR = global.URLBACKENDSECURITY  + "/logError"
global.GET_IP = "https://api.bigdatacloud.net/data/client-ip"

// secutiry

global.LOGIN = global.URLBACKENDSECURITY  + "/login"
global.REGISTER = global.URLBACKENDSECURITY  + "/register"

// PRODUCTS
global.GET_PROMOTIONS = global.URLBACKENDSECURITY  + "/ecomerce/getPromotions"
global.GET_RECOMENDED = global.URLBACKENDSECURITY  + "/recomended"


// URL FRONT END

// SECUTIRY
global.HOME = "/home"

// SECTIONS
global.ABOUT = "/about-us"
global.CONTACT = "/contact-us"


global.ROUTE_HOME = "*"
global.ROUTE_ANY = "/*"
global.URLPROD = "http://localhost/"
