import securityValidation from '../validation/security';
import securityService from '../services/securityService';

let dataResp = [];

const loginLogic = async (dataLogin, t) => {
    const validation = securityValidation.loginService(dataLogin, t);
    dataResp = validation;
    if (!dataResp.error) {
       // dataResp = await General.obtenerPeriodos(opt);
    }

    return dataResp;
}

const registerLogic = async (dataLogin, t) => {
    try {
        const validation = await securityValidation.register(dataLogin, t);
        dataResp = validation
        if (!dataResp.error) {
            dataResp = await securityService.registerService(dataLogin);
        }
        return dataResp;
    } catch (e) {
        console.log(e.message)
    }
}

const securityLogic = {
    loginLogic,
    registerLogic
};

export default securityLogic;
