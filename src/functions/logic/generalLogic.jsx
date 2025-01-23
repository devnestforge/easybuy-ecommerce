//import securityValidation from '../validation/security'
import generalService from '../services/generalService'
let responseData = []

const catchErrorLogic = async (dataLogin, t) => {
    //const validation = securityValidation.login(dataLogin, t)
    //const dataResp = await General.obtenerPeriodos(opt)
    return responseData
}

const deleteCharacters = (txt) => {
    const options = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' }
    return txt.split('').map(letter => options[letter] || letter).join('').toString()
}

const getIpClient = async () => {
    const resp = await fetch(global.GET_IP)
    const response = await resp.json()
    return response
}

const getShippingMethods = async () => {
    const dataResp = await generalService.getShippingServices()
    return dataResp
}

const getDiscountLogic = async (code) => {
    const dataResp = await generalService.getDiscountServices(code)
    return dataResp
}

const getPayMethodLogic = async () => {
    const dataResp = await generalService.getPayMethodServices()
    return dataResp
}

const getRegionsLogic = async () => {
    const dataResp = await generalService.getRegionsServices()
    return dataResp
}

const generalLogic = {
    catchErrorLogic,
    deleteCharacters,
    getIpClient,
    getShippingMethods,
    getDiscountLogic,
    getPayMethodLogic,
    getRegionsLogic
}

export default generalLogic