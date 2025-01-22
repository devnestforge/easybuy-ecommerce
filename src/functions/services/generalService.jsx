import requestOptions from './requestOptions'
import generalMappers from '../mappers/generalMapper'
import { logError } from '../../logs/ErrorLoger'
import base64 from 'react-native-base64'

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

const generalServices = {
    getShippingServices,
    getDiscountServices,
    getPayMethodServices
}

export default generalServices;
