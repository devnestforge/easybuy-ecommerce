let responseMapper = [];

const userDataMapper = (data, error) => {
    responseMapper = {
        message: data.message ?? '',
        success: data.error ?? false,
        data: data.data,
        labelError: data.labelError,
        error: data.error
    }

    return responseMapper;
}

const secutiryMapper = {
    userDataMapper
  };
  
  export default secutiryMapper;