import userServices from '../services/userServices'
import formValidation from '../validation/FormValidation'

const getAddressLogic = async (idAddress, search) => {
    let dataResp
    const token = localStorage.getItem('authToken')
    const isLoggedIn = !!token
    if (isLoggedIn) {
        dataResp = await userServices.getAddressServices(idAddress, search, token)
    }
    return dataResp
}

const saveViewCartLogic = async () => {
    let dataResp
    const token = localStorage.getItem('authToken')
    const isLoggedIn = !!token
    if (isLoggedIn) {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || []
        const discountCode = localStorage.getItem('discountCode') || null
        const shippingCost = localStorage.getItem('shippingCost') || ""
        const discountAmount = parseFloat(localStorage.getItem('discountAmount')) || 0

        const cartData = {
            storedCartItems,
            discountCode,
            shippingCost,
            discountAmount,
            "ip": localStorage.getItem('ip')
        }

        dataResp = await userServices.saveViewCartService(cartData, token)
    }
    return dataResp
}

const saveAddressLogic = async (data, id) => {
    const validation = formValidation.FormValidatiopn(data, 'E')
    let dataResp = validation
    const token = localStorage.getItem('authToken')
    const isLoggedIn = !!token
    if (!validation.error && isLoggedIn) {
        let dataSave = {
            id: data.idAddress.value,
            nombres: data.nombres.value,
            apellidos: data.apellidos.value,
            provincia: data.provincia.value,
            ciudad: data.ciudad.value,
            direccion: data.direccion.value,
            referencia: data.referencia.value,
            codigoPostal: data.codigoPostal.value,
            telefono: data.telefono.value,
            esPrincipal: data.esPrincipal.checked,
            status: 'CONFIGH0002',
            creation_ip: localStorage.getItem('ip')
        }
        dataResp = await userServices.saveAddressService(dataSave, token);
    }
    return dataResp;
}

const savePrincipalLogic = async (data) => {
    let dataResp = []
    const token = localStorage.getItem('authToken')
    const isLoggedIn = !!token
    if (isLoggedIn) {
        let dataSave = {
            id: data.id,
            nombres: data.nombres,
            apellidos: data.apellidos,
            provincia: data.provincia,
            ciudad: data.ciudad,
            direccion: data.direccion,
            referencia: data.referencia,
            codigoPostal: data.codigoPostal,
            telefono: data.telefono,
            esPrincipal: true,
            status: 'CONFIGH0002',
            creation_ip: localStorage.getItem('ip')
        }
        dataResp = await userServices.saveAddressService(dataSave, token);
    }
    return dataResp;
}

const saveOrderLogic = async (payMethod, linkRastreo, linkOrderDetail, linkOrderConfirm) => {
    let dataResp = []
    const token = localStorage.getItem('authToken')
    const isLoggedIn = !!token
    if (isLoggedIn) {
        let dataSave = {
            metodoPago: payMethod.nemonico_metodos_pago,
            creation_ip: localStorage.getItem('ip'),
            linkRastreo: linkRastreo,
            linkOrderDetail: linkOrderDetail,
            linkOrderConfirm: linkOrderConfirm
        }
        dataResp = await userServices.saveOrderService(dataSave, token);
    }
    return dataResp;
}

const getRastreoLogic = async (order) => {
    let dataResp
    const token = localStorage.getItem('authToken')
    const isLoggedIn = !!token
    if (isLoggedIn) {
        dataResp = await userServices.getRastreoServices(order, token)
    }
    return dataResp
}

const getOrderDetailLogic = async (idAddress, search) => {
    let dataResp
    const token = localStorage.getItem('authToken')
    const isLoggedIn = !!token
    if (isLoggedIn) {
        dataResp = await userServices.getAddressServices(idAddress, search, token)
    }
    return dataResp
}

const getWiewcartByCodeLogic = async (code) => {
    let dataResp
    const token = localStorage.getItem('authToken')
    const isLoggedIn = !!token
    if (isLoggedIn) {
        dataResp = await userServices.getWiewcartByCodeServices(code, token)
    }
    return dataResp
}

const getHistoryOrdersLogic = async () => {
    let dataResp
    const token = localStorage.getItem('authToken')
    const isLoggedIn = !!token
    if (isLoggedIn) {
        dataResp = await userServices.getHistoryOrdersServices(token)
    }
    return dataResp
}

const getUserProfileInfoLogic = async (token) => {
    let dataResp
    const isLoggedIn = !!token
    if (isLoggedIn) {
        dataResp = await userServices.getUserProfileInfoServices(token)
    }
    return dataResp
}

const saveProfileLogic = async (dataSave) => {
    let dataResp = []
    const token = localStorage.getItem('authToken')
    const isLoggedIn = !!token
    if (isLoggedIn) {
        dataResp = await userServices.saveProfileService(dataSave, token);
    }
    return dataResp;
}

const userLogic = {
    saveViewCartLogic,
    saveAddressLogic,
    getAddressLogic,
    savePrincipalLogic,
    saveOrderLogic,
    getRastreoLogic,
    getOrderDetailLogic,
    getWiewcartByCodeLogic,
    getHistoryOrdersLogic,
    getUserProfileInfoLogic,
    saveProfileLogic
}

export default userLogic
