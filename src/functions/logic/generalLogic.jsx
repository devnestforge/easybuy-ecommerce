import securityValidation from '../validation/security';
let responseData = [];

const catchErrorLogic = async (dataLogin, t) => {
    const validation = securityValidation.login(dataLogin, t);
    //const dataResp = await General.obtenerPeriodos(opt);
    return responseData;
}

const deleteCharacters = (txt) => {
	const options = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return txt.split('').map( letter => options[letter] || letter).join('').toString();	
}

const getIpClient = async () => {
    const resp = await fetch(global.GET_IP)
    const response = await resp.json();
    return response;
}

const generalLogic = {
    catchErrorLogic,
    deleteCharacters,
    getIpClient
};

export default generalLogic;