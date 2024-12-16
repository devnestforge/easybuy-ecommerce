import requestOptions from './requestOptions'
import generalMappers from '../mappers/generalMapper'
import productsMapper from '../mappers/productsMapper'
import { logError } from '../../logs/ErrorLoger'

const getProductsService = async (idProduct, search) => {
    try {
        const token = `Bearer ${localStorage.getItem('token')}`
        const options = requestOptions.headers('GET', token, '')
        let filters = ''
        if (search.trim() !== "") {
          filters += '&nombreBusqueda=' + search;
        }
        const resp = await fetch(global.GET_PROMOTIONS + filters, options)
        const response = await resp.json()
        //if (data.success && data.code === global.SUCCESS_CODE) {
        //}
        return response
    } catch (error) {
        await logError(error.message, 'getPromotionService', 'productsServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const getPromotionService = async () => {
    try {
        const options = requestOptions.headers('GET','', '')
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
        const options = requestOptions.headers('GET','', '')
        const resp = await fetch(global.GET_RECOMENDED, options)
        const response = await resp.json()
        //if (data.success && data.code === global.SUCCESS_CODE) {
        //}
        return response
    } catch (error) {
        await logError(error.message, 'getRecomendedService', 'productsServices.jsx')
        return { error: global.MESSAGE_ERROR_CATCH }
    }
}

const productsServices = {
    getPromotionService,
    getRecomendedService,
    getProductsService
}

export default productsServices
