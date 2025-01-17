let responseMapper = [];

const userDataMapper = (data, error) => {
    responseMapper = {
        message: data.message ?? '',
        success: data.error ? false : true,
        data: data.data,
        labelError: data.labelError,
        variant: data.variant,
        error: data.error
    }

    return responseMapper;
}

const userLoginDataMapper = (data, error) => {
    responseMapper = {
        message: data.message ?? '',
        success: data.error === true ? false : true,
        data: data.data,
        labelError: data.labelError,
        variant: data.variant,
        error: data.error
    }

    return responseMapper;
}

const userSaveCartDataMapper = (data, error) => {
    responseMapper = {
        message: data.message ?? '',
        success: data.error === true ? false : true,
        data: data.data,
        labelError: data.labelError,
        variant: data.variant,
        error: data.error
    }

    return responseMapper;
}

const secutiryMapper = {
    userDataMapper,
    userLoginDataMapper,
    userSaveCartDataMapper
};

export default secutiryMapper;