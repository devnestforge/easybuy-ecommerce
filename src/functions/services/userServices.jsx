import requestOptions from './requestOptions'
import secutiryMapper from '../mappers/secutiryMapper'
import auditoryServices from '../services/auditoryServices'
import base64 from 'react-native-base64'
let responseMapper = []

const saveViewCartService = async (cartDatam, token) => {
    try {
        const secretKey = global.SECRETKEY;
        const credentials = base64.encode(token + ':' + secretKey)
        const options = requestOptions.headers('POST', credentials, cartDatam)
        const resp = await fetch(global.SAVEVIEWCART, options)
        const dataResp = await resp.json()
        responseMapper = secutiryMapper.userDataMapper(dataResp)
    } catch (e) {
        const data = {
            "section_error": "userServices.jsx front",
            "detail_error": "saveViewCartService user",
            "mensaje_error": e.message,
            "user_transac": 0,
            "module_transac": "Front userServices.jsx saveViewCartService user",
            "operation_date": new Date(),
            "operation_user": 0,
            "operation_ip": localStorage.getItem('ip'),
            "env": 2
        }

        auditoryServices.catchErrorService(data)
    }
    return responseMapper
}

const userServices = {
    saveViewCartService
};

export default userServices;
