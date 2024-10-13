const responseMapper = (data, error) => {
    let responseMapper = [];
    responseMapper = {
        message: data.message ?? '',
        success: data.error ?? false,
        data: data.data,
        labelError: data.labelError,
        error: data.error
    }

    return responseMapper;
}

const generalMappers = {
    responseMapper
  };
  
  export default generalMappers;