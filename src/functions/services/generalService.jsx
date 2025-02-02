import requestOptions from './requestOptions'
import generalMappers from '../mappers/generalMapper'
import { logError } from '../../logs/ErrorLoger'
import base64 from 'react-native-base64'
import secutiryMapper from '../mappers/secutiryMapper'
import auditoryServices from '../services/auditoryServices'
let responseMapper = []

const getShippingServices = async () => {
    try {
        const token = localStorage.getItem('authToken')
        const secretKey = global.SECRETKEY;
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('GET', credentials, '')
        const resp = await fetch(global.GETSHIPPINGS, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.length > 0 ?
                generalMappers.successMapper(generalMappers.shippingsMapper(response.data), 1)
                :
                generalMappers.responseMapper(response, 1)
        } else {
            respAnswer = generalMappers.errorMapper(response)
        }
        return respAnswer
    } catch (error) {
        await logError(error.message, 'getPromotionService', 'productsServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const getDiscountServices = async (code) => {
    try {
        const token = localStorage.getItem('authToken')
        let tokenSend = 'no'
        const isLoggedIn = !!token
        if (isLoggedIn) {
            tokenSend = token
        }
        const secretKey = global.SECRETKEY;
        const credentials = base64.encode(tokenSend + ':' + secretKey)
        const options = requestOptions.headers('GET', credentials, '')
        const resp = await fetch(global.GETDISCOUTNCODE + "/" + code, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.length > 0 ?
                generalMappers.successMapper(generalMappers.discountMapper(response.data), 1)
                :
                generalMappers.responseMapper(response, 1)
        } else {
            respAnswer = generalMappers.errorMapper(response)
        }
        return respAnswer
    } catch (error) {
        await logError(error.message, 'getPromotionService', 'productsServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const getPayMethodServices = async () => {
    try {
        const token = localStorage.getItem('authToken')
        const secretKey = global.SECRETKEY;
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('GET', credentials, '')
        const resp = await fetch(global.GETPAYMETHOD, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.length > 0 ?
                generalMappers.successMapper(response.data, 1)
                :
                generalMappers.responseMapper(response, 1)
        } else {
            respAnswer = generalMappers.errorMapper(response)
        }
        return respAnswer
    } catch (error) {
        await logError(error.message, 'getPromotionService', 'productsServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const getRegionsServices = async () => {
    try {
        const token = localStorage.getItem('authToken')
        const secretKey = global.SECRETKEY;
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('GET', credentials, '')
        const resp = await fetch(global.GETREGIONS, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.length > 0 ?
                generalMappers.successMapper(response.data, 1)
                :
                generalMappers.responseMapper(response, 1)
        } else {
            respAnswer = generalMappers.errorMapper(response)
        }
        return respAnswer
    } catch (error) {
        await logError(error.message, 'getPromotionService', 'productsServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const sendContactService = async (data) => {
    try {
        const token = localStorage.getItem('authToken')
        const secretKey = global.SECRETKEY
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('POST', credentials, data)
        const resp = await fetch(global.SENDCONTACT, options)
        const dataResp = await resp.json()
        responseMapper = secutiryMapper.userDataMapper(dataResp)
    } catch (e) {
        const data = {
            "section_error": "userServices.jsx front",
            "detail_error": "saveAddressService user",
            "mensaje_error": e.message,
            "user_transac": 0,
            "module_transac": "Front userServices.jsx saveAddressService user",
            "operation_date": new Date(),
            "operation_user": 0,
            "operation_ip": localStorage.getItem('ip'),
            "env": 2
        }

        auditoryServices.catchErrorService(data)
    }
    return responseMapper
}

const generalServices = {
    getShippingServices,
    getDiscountServices,
    getPayMethodServices,
    getRegionsServices,
    sendContactService
}

export default generalServices;
