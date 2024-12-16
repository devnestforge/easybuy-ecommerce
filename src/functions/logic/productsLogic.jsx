import productsServices from '../services/productsServices'

const getProductsLogic = async (idProduct, search) => {
    const dataResp = await productsServices.getProductsService(idProduct, search)
    return dataResp
}

const getPromotionsLogic = async () => {
    const dataResp = await productsServices.getPromotionService()
    return dataResp
}

const getRecomendedLogic = async () => {
    const dataResp = await productsServices.getRecomendedService()
    return dataResp
}

const productsLogic = {
    getPromotionsLogic,
    getRecomendedLogic,
    getProductsLogic
}

export default productsLogic
