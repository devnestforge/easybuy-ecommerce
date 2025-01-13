import securityValidation from '../validation/security'
import securityService from '../services/securityService'

let dataResp = []

const loginLogic = async (dataLogin, t) => {
    const validation = await securityValidation.login(dataLogin, t)
    dataResp = validation
   
    if (!dataResp.error) {
        dataResp = await securityService.loginService(dataLogin)
    }

    return dataResp
}

const registerLogic = async (dataLogin, t) => {
    try {
        const validation = await securityValidation.register(dataLogin, t)
        dataResp = validation
        if (!dataResp.error) {
            dataResp = await securityService.registerService(dataLogin)
        }
        return dataResp
    } catch (e) {
        console.log(e.message)
    }
}

const sendLinkLogic = async (dataLogin, t) => {
    const validation = await securityValidation.restore(dataLogin, t)
    dataResp = validation
    if (!dataResp.error) {
        dataResp = await securityService.sendLinkService(dataLogin)
    }

    return dataResp
}

const changePasswordLogic = async (password, passwordConfirm, token) => {
    const dataResp = securityService.changePassword(password, passwordConfirm, token);
    return dataResp;
}

const securityLogic = {
    loginLogic,
    registerLogic,
    sendLinkLogic,
    changePasswordLogic
}

export default securityLogic
