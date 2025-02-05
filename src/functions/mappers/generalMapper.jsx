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
        success: true,
        totalRows: rowsTotal,
        message: global.SUCCESS_MESSAGE_GET,
        variant: global.VARIANT_SUCCESS,
        data: data
    }
    return responseMapper
}

const successProdDetailMapper = async (data, rowsTotal, review, prodImgs) => {
    let responseMapper = []
    responseMapper = {
        code: '200',
        success: true,
        totalRows: rowsTotal,
        message: global.SUCCESS_MESSAGE_GET,
        variant: global.VARIANT_SUCCESS,
        data: data,
        review: review,
        prodImgs: prodImgs
    }
    return responseMapper
}

const loginRegisterMapper = async (data, rowsTotal) => {
    let responseMapper = []
    responseMapper = {
        message: data.message ?? '',
        success: data.error ?? false,
        data: [],
        variant: data.labelError,
        error: data.error
    }
    return responseMapper
}

const shippingsMapper = (data) => {
    let prodMapper = [];
    for (var i = 0; i < data.length; i++) {
        prodMapper[i] = {
            id: data[i].id ?? '',
            nemonicoTiposEnvio: data[i].nemonico_tipos_envio ?? '',
            nombre: data[i].nombre ?? '',
            costo: data[i].costo ?? '',
            dias: data[i].dias ?? '',
            descripcion: data[i].descripcion ?? ''
        }
        prodMapper.push();
    }
    return prodMapper;
}

const discountMapper = (data) => {
    let prodMapper = [];
    for (var i = 0; i < data.length; i++) {
        prodMapper[i] = {
            codigo: data[i].codigo ?? '',
            descuento: data[i].descuento ?? '',
            observation: data[i].observation ?? ''
        }
        prodMapper.push();
    }
    return prodMapper;
}

const generalMappers = {
    responseMapper,
    successMapper,
    errorMapper,
    loginRegisterMapper,
    shippingsMapper,
    discountMapper,
    successProdDetailMapper
}

export default generalMappers