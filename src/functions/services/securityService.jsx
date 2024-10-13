import requestOptions from './requestOptions'
import secutiryMapper from '../mappers/secutiryMapper'
import auditoryServices from '../services/auditoryServices'

let responseMapper = [];

const loginService = async (dataLogin, t) => {


    return dataLogin;
}

const registerService = async (dataLogin, t) => {
    try {
        const options = requestOptions.headers('POST', '', dataLogin)
        const resp = await fetch(global.REGISTER, options)
        const dataResp = await resp.json();
        responseMapper = secutiryMapper.userDataMapper(dataResp.data);
    } catch (e) {
        const data = {
            "section_error": "securityService.jsx",
            "detail_error": "Register new user",
            "mensaje_error": e.message,
            "user_transac": dataLogin.email,
            "module_transac": "Front securityService.jsx Register new user",
            "operation_date": new Date(),
            "operation_user": dataLogin.email,
            "operation_ip": localStorage.getItem('ip'),
        };
        auditoryServices.catchErrorLogic(data);
    }
    return responseMapper;
}

const securityService = {
    loginService,
    registerService
};

export default securityService;
