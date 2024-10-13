import requestOptions from './requestOptions'


const catchErrorService = async (data, t) => {
    try {
        const options = requestOptions.headers('POST','', data)
        const resp = await fetch(global.LOG_ERROR, options)
        const response = await resp.json();
        return response;
    } catch (e) {
    
    }
}

const auditoryServices = {
    catchErrorService
};

export default auditoryServices;
