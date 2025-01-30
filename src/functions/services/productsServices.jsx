import requestOptions from './requestOptions'
import generalMappers from '../mappers/generalMapper'
import productsMapper from '../mappers/productsMapper'
import { logError } from '../../logs/ErrorLoger'

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
            respAnswer = response.data.length > 0 ?
                idProduct === 0 ?
                    generalMappers.successMapper(productsMapper.productMapper(response.data), 1)
                    :
                    generalMappers.successMapper(productsMapper.productMapper(response.data), 1)
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


const getProductsSearchService = async (page, perPage, search) => {
    try {
        const token = `Bearer ${localStorage.getItem('token')}`
        const options = requestOptions.headers('GET', token, '')
        let filters = '/' + page + '/' + perPage + '/' + search
        const resp = await fetch(global.PRODUCTSSEARCH + filters, options)
        const response = await resp.json()
        let respAnswer = []
        if (!response.error) {
            respAnswer = response.data.length > 0 ?
                generalMappers.successMapper(productsMapper.productMapper(response.data), 1)
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
    getProductsSearchService
}

export default productsServices
