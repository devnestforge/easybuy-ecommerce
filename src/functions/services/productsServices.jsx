import requestOptions from './requestOptions'
import generalMappers from '../mappers/generalMapper'
import productsMapper from '../mappers/productsMapper'
import { logError } from '../../logs/ErrorLoger'
import base64 from 'react-native-base64'
import auditoryServices from '../services/auditoryServices'
let responseMapper = []

const getProductsService = async (idProduct, search) => {
    try {
        const token = `Bearer ${localStorage.getItem('token')}`
        const options = requestOptions.headers('GET', token, '')
        let filters = '/' + idProduct
        if (search.trim() === "") {
            filters += '/no';
        }
        const resp = await fetch(global.PRODUCTS + filters, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.data.length > 0 ?
                idProduct === 0 ?
                    generalMappers.successMapper(productsMapper.productMapper(response.data.data), 1)
                    :
                    generalMappers.successProdDetailMapper(productsMapper.productMapper(response.data.data), 1,
                        productsMapper.reviewsMapper(response.data.prodcutReview),
                        productsMapper.imgProdMapper(response.data.prodcutImg),
                        productsMapper.vidProdMapper(response.data.prodcutVideo))
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

const getPromotionService = async () => {
    try {
        const options = requestOptions.headers('GET', '', '')
        const resp = await fetch(global.GET_PROMOTIONS, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.length > 0 ? generalMappers.successMapper(productsMapper.productMapper(response.data), 1) : generalMappers.responseMapper(response, 1)
        } else {
            respAnswer = generalMappers.errorMapper(response)
        }
        return respAnswer
    } catch (error) {
        await logError(error.message, 'getPromotionService', 'productsServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const getRecomendedService = async () => {
    try {
        const options = requestOptions.headers('GET', '', '')
        const resp = await fetch(global.GET_RECOMENDED, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.length > 0 ? generalMappers.successMapper(productsMapper.productMapper(response.data), 1) : generalMappers.responseMapper(response, 1)
        } else {
            respAnswer = generalMappers.errorMapper(response)
        }
        return respAnswer
    } catch (error) {
        await logError(error.message, 'getPromotionService', 'productsServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const getCategoriesService = async () => {
    try {
        const options = requestOptions.headers('GET', '', '')
        const resp = await fetch(global.GET_CATEGORIES, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.length > 0 ? generalMappers.successMapper(productsMapper.categoriMapper(response.data), 1) : generalMappers.responseMapper(response, 1)
        } else {
            respAnswer = generalMappers.errorMapper(response)
        }
        return respAnswer
    } catch (error) {
        await logError(error.message, 'getPromotionService', 'productsServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const getProductsSearchService = async (page, perPage, search, filtersData, priceRange) => {
    try {
        const token = `Bearer ${localStorage.getItem('token')}`
        const options = requestOptions.headers('GET', token, '')
        const filtersJson = encodeURIComponent(JSON.stringify(filtersData));
        let filters = '/' + page + '/' + perPage + '/' + search + '/' + filtersJson + '/' + priceRange
        const resp = await fetch(global.PRODUCTSSEARCH + filters, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.data.length > 0 ?
                generalMappers.successMapper(productsMapper.productSearchMapper(response.data), 1)
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

const saveProductReviewService = async (token, data) => {
    try {
        const secretKey = global.SECRETKEY
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('POST', credentials, data)
        const resp = await fetch(global.SENDREVIEW, options)
        const dataResp = await resp.json()
        responseMapper = generalMappers.responseMapper(dataResp, 1)
    } catch (e) {
        const data = {
            "section_error": "productsServices.jsx front",
            "detail_error": "saveProductReviewService user",
            "mensaje_error": e.message,
            "user_transac": 0,
            "module_transac": "Front saveProductReviewService.jsx saveProductReviewService user",
            "operation_date": new Date(),
            "operation_user": 0,
            "operation_ip": localStorage.getItem('ip'),
            "env": 2
        }

        auditoryServices.catchErrorService(data)
    }
    return responseMapper
}

const getFiltersService = async () => {
    try {
        const options = requestOptions.headers('GET', '', '')
        const resp = await fetch(global.GETFILTERS, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = generalMappers.successMapper(response.data.data)
        } else {
            respAnswer = generalMappers.errorMapper(response)
        }
        return respAnswer
    } catch (error) {
        await logError(error.message, 'getPromotionService', 'productsServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const getProductsByTypeService = async (idProduct, page, perPage, search, filtersData, type) => {
    try {
        const token = `Bearer ${localStorage.getItem('token')}`
        const options = requestOptions.headers('GET', token, '')
        const filtersJson = encodeURIComponent(JSON.stringify(filtersData));
        let filters = '/' + idProduct + '/' + page + '/' + perPage + '/' + search + '/' + filtersJson + '/' + type
        const resp = await fetch(global.PRODUCTS_SEARCH_TYPE + filters, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.data.length > 0 ?
                generalMappers.successMapper(productsMapper.productSearchMapper(response.data), 1)
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

const productsServices = {
    getPromotionService,
    getRecomendedService,
    getProductsService,
    getCategoriesService,
    getProductsSearchService,
    saveProductReviewService,
    getFiltersService,
    getProductsByTypeService
}

export default productsServices
