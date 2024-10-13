/* eslint-disable import/no-anonymous-default-export */

const FormValidatiopn = (Data, saveType) => {
    // falta la validación de cada campo
    let data = {
        "message": '',
        "error": false
    };
    Object.entries(Data).forEach(([key, value2]) => {
        if (typeof Data[key].value != "undefined") {
            if (Data[key].name !== "" &&
                (Data[key].name !== "weight" && Data[key].name !== "height" && Data[key].name !== "width" && Data[key].name !== "lengthd"
                    && Data[key].name !== "size" && Data[key].name !== "dimensions" && Data[key].name !== "launchDate" && Data[key].name !== "warranty"
                    && Data[key].name !== "manufacturer" && Data[key].name !== "manufacturingYear" && Data[key].name !== "observation" && Data[key].name !== "meteriales"
                    && Data[key].name !== "modelo")) {
                if (Data[key].value === "") {
                    let message = "";
                    message = Data[key].placeholder;
                    if (Data[key].name === "estados") { message = "Seleccione estado del producto" }
                    if (Data[key].name === "marca") { message = "Seleccione una marca" }
                    if (Data[key].name === "tipoProd") { message = "Seleccione tipo de producto" }
                    if (Data[key].name === "categoria") { message = "Seleccione un categoría" }
                    if (Data[key].name === "departa") { message = "Seleccione departamento" }
                    
                    data = {
                        "message": message,
                        "error": true,
                        "variant": 'warning',
                    }
                    return data;
                }
            }
            if (saveType === "I") {
                if (Data[key].name === "identification") {
                    if (!isValidCI(Data[key].value)) {
                        data = {
                            "message": 'Ingrese una cédula valida',
                            "variant": 'warning',
                            "error": true
                        }
                        return data;
                    }
                }
            }
            if (Data[key].name === "email") {
                if (!isValidEmail(Data[key].value)) {
                    data = {
                        "message": 'Ingrese un correo válido',
                        "variant": 'warning',
                        "error": true
                    }
                    return data;
                }
            }
        }
    })

    return data;
}

const isValidEmail = (email) => {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    // Using test we can check if the text match the pattern
    if (!validEmail.test(email)) {
        return false
    }
    return true
}

const isValidCI = (ci) => {
    var isNumeric = true;
    var total = 0,
        individual;

    for (var position = 0; position < 10; position++) {
        // Obtiene cada posición del número de cédula
        // Se convierte a string en caso de que 'ci' sea un valor numérico
        individual = ci.toString().substring(position, position + 1)

        if (isNaN(individual)) {
            isNumeric = false;
            break;
        } else {
            // Si la posición es menor a 9
            if (position < 9) {
                // Si la posición es par, osea 0, 2, 4, 6, 8.
                if (position % 2 === 0) {
                    // Si el número individual de la cédula es mayor a 5
                    if (parseInt(individual) * 2 > 9) {
                        // Se duplica el valor, se obtiene la parte decimal y se aumenta uno 
                        // y se lo suma al total
                        total += 1 + ((parseInt(individual) * 2) % 10);
                    } else {
                        // Si el número individual de la cédula es menor que 5 solo se lo duplica
                        // y se lo suma al total
                        total += parseInt(individual) * 2;
                    }
                    // Si la posición es impar (1, 3, 5, 7)
                } else {
                    // Se suma el número individual de la cédula al total
                    total += parseInt(individual);
                }
            }
        }
    }

    if ((total % 10) !== 0) {
        total = (total - (total % 10) + 10) - total;
    } else {
        total = 0;
    }


    if (isNumeric) {
        // El total debe ser igual al último número de la cédula
        // La cédula debe contener al menos 10 dígitos
        if (ci.toString().length !== 10) {
            return false;
        }

        // El número de cédula no debe ser cero
        if (parseInt(ci, 10) === 0) {
            return false;
        }

        // El total debe ser igual al último número de la cédula
        if (total !== parseInt(individual)) {
            return false;
        }

        return true;
    }

    return false;
}

export default {
    FormValidatiopn,
    isValidEmail,
    isValidCI
}
