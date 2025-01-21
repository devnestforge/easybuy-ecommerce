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
        const shippingCost = parseFloat(localStorage.getItem('shippingCost')) || 0
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

const userLogic = {
    saveViewCartLogic,
    saveAddressLogic,
    getAddressLogic,
    savePrincipalLogic
}

export default userLogic
