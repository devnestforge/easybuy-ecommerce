import auditoryServices from '../services/auditoryServices';

let responseData = [];

const catchErrorLogic = async (data) => {
    const dataResp = await auditoryServices.catchErrorService(data);
    return dataResp;
}

const auditoryLogic = {
    catchErrorLogic
};

export default auditoryLogic;