import requestOptions from './requestOptions'
import secutiryMapper from '../mappers/secutiryMapper'
import auditoryServices from '../services/auditoryServices'
import base64 from 'react-native-base64'

let responseMapper = []

const loginService = async (dataLogin, t) => {
    try {
        const token = base64.encode(dataLogin.email + ':' + dataLogin.password)
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const discountCode = localStorage.getItem('discountCode') || null
        const shippingCost = localStorage.getItem('shippingCost') || ''
        const discountAmount = parseFloat(localStorage.getItem('discountAmount')) || 0

        const cartData = {
            storedCartItems,
            discountCode,
            shippingCost,
            discountAmount,
            "ip": localStorage.getItem('ip')
        }
        const options = requestOptions.headers('POST', token, cartData)
        const resp = await fetch(global.LOGIN, options)
        const dataResp = await resp.json()
        responseMapper = secutiryMapper.userLoginDataMapper(dataResp)
    } catch (e) {
        const data = {
            "section_error": "securityService.jsx front",
            "detail_error": "login user",
            "mensaje_error": e.message,
            "user_transac": 0,
            "module_transac": "Front securityService.jsx login user",
            "operation_date": new Date(),
            "operation_user": 0,
            "operation_ip": localStorage.getItem('ip'),
            "env": 2
        }

        auditoryServices.catchErrorService(data)
    }
    return responseMapper
}

const registerService = async (dataLogin, t) => {
    try {
        const options = requestOptions.headers('POST', '', dataLogin)
        const resp = await fetch(global.REGISTER, options)
        const dataResp = await resp.json()
        responseMapper = secutiryMapper.userSaveCartDataMapper(dataResp)
    } catch (e) {
        const data = {
            "section_error": "securityService.jsx front",
            "detail_error": "Register new user",
            "mensaje_error": e.message,
            "user_transac": 0,
            "module_transac": "Front securityService.jsx Register new user",
            "operation_date": new Date(),
            "operation_user": 0,
            "operation_ip": localStorage.getItem('ip'),
            "env": 2
        }

        auditoryServices.catchErrorService(data)
    }
    return responseMapper
}

const sendLinkService = async (dataLogin, t) => {
    try {
        const token = base64.encode(dataLogin.email + '_' + dataLogin.link)
        const options = requestOptions.headers('POST', token, '')
        const resp = await fetch(global.RESTORE, options)
        const dataResp = await resp.json()
        responseMapper = secutiryMapper.userDataMapper(dataResp)
    } catch (e) {
        const data = {
            "section_error": "securityService.jsx front",
            "detail_error": "sendLinkService PASSWORD user",
            "mensaje_error": e.message,
            "user_transac": 0,
            "module_transac": "Front securityService.jsx sendLinkService PASSWORD user",
            "operation_date": new Date(),
            "operation_user": 0,
            "operation_ip": localStorage.getItem('ip'),
            "env": 2
        }

        auditoryServices.catchErrorService(data)
    }
    return responseMapper
}

const changePassword = async (password, passwordConfirm, token) => {
    try {
        const info = base64.encode(password + ' ' + token)
        const options = requestOptions.headers('POST', info, '')
        const resp = await fetch(global.CHANGEPASSWORD, options)
        const dataResp = await resp.json()
        responseMapper = secutiryMapper.userDataMapper(dataResp)
    } catch (e) {
        const data = {
            "section_error": "securityService.jsx front",
            "detail_error": "sendLinkService changePassword user",
            "mensaje_error": e.message,
            "user_transac": 0,
            "module_transac": "Front securityService.jsx sendLinkService changePassword user",
            "operation_date": new Date(),
            "operation_user": 0,
            "operation_ip": localStorage.getItem('ip'),
            "env": 2
        }

        auditoryServices.catchErrorService(data)
    }
    return responseMapper
}

const securityService = {
    loginService,
    registerService,
    sendLinkService,
    changePassword
}

export default securityService
