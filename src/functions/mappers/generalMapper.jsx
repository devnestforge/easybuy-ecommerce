const responseMapper = (data, error) => {
    let responseMapper = []
    responseMapper = {
        message: data.message ?? '',
        success: data.variant === "success" ? true : false,
        data: data.data,
        labelError: data.variant,
        error: data.error
    }

    return responseMapper
}

const errorMapper = (data, error) => {
    let responseMapper = []
    responseMapper = {
        message: data.message ?? '',
        success: data.error ?? false,
        data: [],
        error: data.error
    }

    return responseMapper
}

const successMapper = async (data, rowsTotal) => {
    let responseMapper = []
    responseMapper = {
        code: '200',
        success: 'true',
        totalRows: rowsTotal,
        message: global.SUCCESS_MESSAGE_GET,
        variant: global.VARIANT_SUCCESS,
        data: data
    }
    return responseMapper
}

const generalMappers = {
    responseMapper,
    successMapper,
    errorMapper
  }
  
  export default generalMappers