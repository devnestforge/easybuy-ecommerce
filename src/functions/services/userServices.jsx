import requestOptions from './requestOptions'
import secutiryMapper from '../mappers/secutiryMapper'
import auditoryServices from '../services/auditoryServices'
import generalMappers from '../mappers/generalMapper'
import { logError } from '../../logs/ErrorLoger'
import base64 from 'react-native-base64'
import userMapper from '../mappers/userMapper'
let responseMapper = []

const getAddressServices = async (idAddress, search, token) => {
    try {
        const secretKey = global.SECRETKEY
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('GET', credentials, '')
        let filters = '/' + idAddress
        if (search.trim() === "") {
            filters += '/no'
        }
        const resp = await fetch(global.GETADDRESS + filters, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.length > 0 ?
                idAddress === 0 ?
                    generalMappers.successMapper(userMapper.userAddressMapper(response.data), 1)
                    :
                    generalMappers.successMapper(userMapper.userAddressMapper(response.data), 1)
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

const saveViewCartService = async (cartDatam, token) => {
    try {
        const secretKey = global.SECRETKEY
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('POST', credentials, cartDatam)
        const resp = await fetch(global.SAVEVIEWCART, options)
        const dataResp = await resp.json()
        responseMapper = secutiryMapper.userDataMapper(dataResp)
    } catch (e) {
        const data = {
            "section_error": "userServices.jsx front",
            "detail_error": "saveViewCartService user",
            "mensaje_error": e.message,
            "user_transac": 0,
            "module_transac": "Front userServices.jsx saveViewCartService user",
            "operation_date": new Date(),
            "operation_user": 0,
            "operation_ip": localStorage.getItem('ip'),
            "env": 2
        }

        auditoryServices.catchErrorService(data)
    }
    return responseMapper
}

const saveAddressService = async (dataSave, token) => {
    try {
        const secretKey = global.SECRETKEY
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('POST', credentials, dataSave)
        const resp = await fetch(global.SAVEDITADDRESS, options)
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

const saveOrderService = async (payMethod, token) => {
    try {
        const secretKey = global.SECRETKEY
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('POST', credentials, payMethod)
        const resp = await fetch(global.SAVEORDERS, options)
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

const getRastreoServices = async (order, token) => {
    try {
        const secretKey = global.SECRETKEY
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('GET', credentials, '')
        let filters = '/' + order
        const resp = await fetch(global.GETORDERTRACK + filters, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.length > 0 ?
                generalMappers.successMapper(userMapper.userTrackingMapper(response.data), 1)
                :
                generalMappers.responseMapper(response, 1)
        } else {
            respAnswer = generalMappers.errorMapper(response)
        }
        return respAnswer
    } catch (error) {
        await logError(error.message, 'getPromotionService', 'getRastreoServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const getWiewcartByCodeServices = async (order, token) => {
    try {
        const secretKey = global.SECRETKEY
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('GET', credentials, '')
        let filters = '/' + order
        const resp = await fetch(global.GETCARTBYCODE + filters, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.length > 0 ?
                generalMappers.successMapper(userMapper.userTrackingMapper(response.data), 1)
                :
                generalMappers.responseMapper(response, 1)
        } else {
            respAnswer = generalMappers.errorMapper(response)
        }
        return respAnswer
    } catch (error) {
        await logError(error.message, 'getPromotionService', 'getWiewcartByCodeServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const getHistoryOrdersServices = async (token) => {
    try {
        const secretKey = global.SECRETKEY
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('GET', credentials, '')
        const resp = await fetch(global.GETHISTORYORDERS, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.length > 0 ?
                generalMappers.successMapper(userMapper.userTrackingMapper(response.data), 1)
                :
                generalMappers.responseMapper(response, 1)
        } else {
            respAnswer = generalMappers.errorMapper(response)
        }
        return respAnswer
    } catch (error) {
        await logError(error.message, 'getPromotionService', 'getHistoryOrdersServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const getUserProfileInfoServices = async (token) => {
    try {
        const secretKey = global.SECRETKEY
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('GET', credentials, '')
        const resp = await fetch(global.GETUSERPROFILE, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.length > 0 ?
                generalMappers.successMapper(userMapper.userProfileMapper(response.data), 1)
                :
                generalMappers.responseMapper(response, 1)
        } else {
            respAnswer = generalMappers.errorMapper(response)
        }
        return respAnswer
    } catch (error) {
        await logError(error.message, 'getPromotionService', 'getUserProfileInfoServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const saveProfileService = async (dataSave, token) => {
    try {
        const secretKey = global.SECRETKEY
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('POST', credentials, dataSave)
        const resp = await fetch(global.SAVEPROFILE, options)
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

const userServices = {
    saveViewCartService,
    saveAddressService,
    getAddressServices,
    saveOrderService,
    getRastreoServices,
    getWiewcartByCodeServices,
    getHistoryOrdersServices,
    getUserProfileInfoServices,
    saveProfileService
}

export default userServices
