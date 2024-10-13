/* eslint-disable import/no-anonymous-default-export */

const apiValidation = (apiData) => {
 
    let data = {
        "message": '',
        "error": false
    };

    if (apiData.error) {
        data = {
            "message": '',
            "error": true
        };
    }
    return data;
}

const apiError500 = () => {
 
    let data = {
        "message": 'Error 500 de conexión consulte con el administrador',
        "error": true,
        "variant": "error"
    };

    return data;
}

export default {
    apiValidation,
    apiError500
}
