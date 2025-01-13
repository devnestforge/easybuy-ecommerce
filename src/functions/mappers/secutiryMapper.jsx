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

const secutiryMapper = {
    userDataMapper
};

export default secutiryMapper;