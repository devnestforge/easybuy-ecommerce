import userServices from '../services/userServices'

const saveViewCartLogic = async () => {
    let dataResp;
    const token = localStorage.getItem('authToken');
    const isLoggedIn = !!token
    if (isLoggedIn) {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
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

        dataResp = await userServices.saveViewCartService(cartData, token);
    }
    return dataResp
}

const userLogic = {
    saveViewCartLogic
}

export default userLogic
