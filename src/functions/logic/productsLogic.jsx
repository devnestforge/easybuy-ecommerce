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

const getCategoriesLogic = async () => {
    const dataResp = await productsServices.getCategoriesService()
    return dataResp
}

const getProductsSearchLogic = async (page, perPage, search) => {
    const dataResp = await productsServices.getProductsSearchService(page, perPage, search)
    return dataResp
}

const saveProductReviewLogic = async (token, name, title, contenta, rating, email, productId) => {
    let dataSave = {
        name: name,
        creation_ip: localStorage.getItem('ip'),
        title: title,
        content: contenta,
        rating: rating,
        email: email,
        product_id: productId
    }
    const dataResp = await productsServices.saveProductReviewService(token, dataSave)
    return dataResp
}

const productsLogic = {
    getPromotionsLogic,
    getRecomendedLogic,
    getProductsLogic,
    getCategoriesLogic,
    getProductsSearchLogic,
    saveProductReviewLogic
}

export default productsLogic
