import generalMappers from "../mappers/generalMapper";

let data = {};
let resp = {};

const validarCorreo = (correo) => {
  const regexCorreo = global.REGEX_CORREO;
  return regexCorreo.test(correo);
};

// Función para validar la contraseña
const validarContrasena = (contrasena) => {
  const regexContrasena = global.REGEX_PASSWORD;
  return regexContrasena.test(contrasena);
};

const login = (credenciales, t) => {
  if (!credenciales.email && !credenciales.password) {
    data = {
      message: t('login_error_message'),
      code: t('code_error_message'),
      labelError: t('code_label_warning'),
      data: [],
      error: true
    }
    resp = generalMappers.responseMapper(data);
  } else if (!credenciales.email) {
    data = {
      message: t('email_error_message'),
      code: t('code_error_message'),
      labelError: t('code_label_warning'),
      data: [],
      error: true
    }
    resp = generalMappers.responseMapper(data);
  } else if (!credenciales.password) {
    data = {
      message: t('password_error_message'),
      code: t('code_error_message'),
      labelError: t('code_label_warning'),
      data: [],
      error: true
    }
    resp = generalMappers.responseMapper(data);
  } else if (!validarCorreo(credenciales.email)) {
    data = {
      message: t('email_error_message'),
      code: t('code_error_message'),
      labelError: t('code_label_warning'),
      data: [],
      error: true
    }
    resp = generalMappers.responseMapper(data);
  } else {
    data = {
      message: '',
      code: t('code_success_message'),
      labelError: t('code_label_success'),
      data: [],
      error: false
    }
    resp = generalMappers.responseMapper(data);
  }

  return resp
}

const register = (credenciales, t) => {
  if (!credenciales.email && !credenciales.password) {
    data = {
      message: t('login_error_message'),
      code: t('code_error_message'),
      labelError: t('code_label_warning'),
      data: [],
      error: true
    }
    resp = generalMappers.responseMapper(data);
  } else if (!credenciales.email) {
    data = {
      message: t('email_error_message'),
      code: t('code_error_message'),
      labelError: t('code_label_warning'),
      data: [],
      error: true
    }
    resp = generalMappers.responseMapper(data);
  } else if (!credenciales.password) {
    data = {
      message: t('password_error_message'),
      code: t('code_error_message'),
      labelError: t('code_label_warning'),
      data: [],
      error: true
    }
    resp = generalMappers.responseMapper(data);
  } else if (!validarCorreo(credenciales.email)) {
    data = {
      message: t('email_error_message'),
      code: t('code_error_message'),
      labelError: t('code_label_warning'),
      data: [],
      error: true
    }
    resp = generalMappers.responseMapper(data);
  } else if (validarContrasena(credenciales.password)) {
    data = {
      message: t('strong_password_error_message'),
      code: t('code_error_message'),
      labelError: t('code_label_warning'),
      data: [],
      error: true
    }
    resp = generalMappers.responseMapper(data);
  } else if (!credenciales.policy) {
    data = {
      message: t('policy_error_message'),
      code: t('code_error_message'),
      labelError: t('code_label_warning'),
      data: [],
      error: true
    }
    resp = generalMappers.responseMapper(data);
  } else {
    data = {
      message: '',
      code: t('code_success_message'),
      labelError: t('code_label_success'),
      data: [],
      error: false
    }
    resp = generalMappers.responseMapper(data);
  }

  return resp
}

const securityValidation = {
  login,
  register
};

export default securityValidation;