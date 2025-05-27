import generalMappers from "../mappers/generalMapper"

let data = {}
let resp = {}

const validarCorreo = (correo) => {
  const regexCorreo = global.REGEX_CORREO
  return regexCorreo.test(correo)
}

// Función para validar la contraseña
const validarContrasena = (contrasena) => {
  const regexContrasena = global.REGEX_PASSWORD
  return regexContrasena.test(contrasena)
}

const login = (credenciales, t) => {
  if (!credenciales.email && !credenciales.password) {
    data = {
      message: t('errors.login_error_message'),
      code: t('errors.code_error_message'),
      labelError: t('errors.code_label_warning'),
      variant: t('errors.code_label_warning'),
      data: [],
      success: false,
      error: true
    }
    resp = generalMappers.loginRegisterMapper(data)
  } else if (!credenciales.email) {
    data = {
      message: t('errors.email_error_message'),
      code: t('errors.code_error_message'),
      labelError: t('errors.code_label_warning'),
      variant: t('errors.code_label_warning'),
      data: [],
      success: false,
      error: true
    }
    resp = generalMappers.loginRegisterMapper(data)
  } else if (!credenciales.password) {
    data = {
      message: t('errors.password_error_message'),
      code: t('errors.code_error_message'),
      labelError: t('errors.code_label_warning'),
      variant: t('errors.code_label_warning'),
      data: [],
      success: false,
      error: true
    }
    resp = generalMappers.loginRegisterMapper(data)
  } else if (!validarCorreo(credenciales.email)) {
    data = {
      message: t('errors.email_error_message'),
      code: t('errors.code_error_message'),
      labelError: t('errors.code_label_warning'),
      variant: t('errors.code_label_warning'),
      data: [],
      success: false,
      error: true
    }
    resp = generalMappers.loginRegisterMapper(data)
  } else {
    data = {
      message: '',
      code: t('errors.code_success_message'),
      labelError: t('errors.code_label_success'),
      variant: t('errors.code_label_success'),
      data: [],
      success: false,
      error: false
    }
    resp = generalMappers.responseMapper(data)
  }

  return resp
}

const register = (credenciales, t) => {
  if (!credenciales.email && !credenciales.password) {
    data = {
      message: t('errors.login_error_message'),
      code: t('errors.code_error_message'),
      labelError: t('errors.code_label_warning'),
      variant: t('errors.code_label_warning'),
      data: [],
      success: false,
      error: true
    }
    resp = generalMappers.loginRegisterMapper(data)
  } else if (!credenciales.email) {
    data = {
      message: t('errors.email_error_message'),
      code: t('errors.code_error_message'),
      labelError: t('errors.code_label_warning'),
      variant: t('errors.code_label_warning'),
      data: [],
      success: false,
      error: true
    }
    resp = generalMappers.loginRegisterMapper(data)
  } else if (!credenciales.password) {
    data = {
      message: t('errors.password_error_message'),
      code: t('errors.code_error_message'),
      labelError: t('errors.code_label_warning'),
      variant: t('errors.code_label_warning'),
      data: [],
      success: false,
      error: true
    }
    resp = generalMappers.loginRegisterMapper(data)
  } else if (!validarCorreo(credenciales.email)) {
    data = {
      message: t('errors.email_error_message'),
      code: t('errors.code_error_message'),
      labelError: t('errors.code_label_warning'),
      variant: t('errors.code_label_warning'),
      data: [],
      success: false,
      error: true
    }
    resp = generalMappers.loginRegisterMapper(data)
  } else if (validarContrasena(credenciales.password)) {
    data = {
      message: t('errors.strong_password_error_message'),
      code: t('errors.code_error_message'),
      labelError: t('errors.code_label_warning'),
      variant: t('errors.code_label_warning'),
      data: [],
      success: false,
      error: true
    }
    resp = generalMappers.loginRegisterMapper(data)
  } else if (!credenciales.policy) {
    data = {
      message: t('errors.policy_error_message'),
      code: t('errors.code_error_message'),
      labelError: t('errors.code_label_warning'),
      variant: t('errors.code_label_warning'),
      data: [],
      success: false,
      error: true
    }
    resp = generalMappers.loginRegisterMapper(data)
  } else {
    data = {
      message: '',
      code: t('errors.code_success_message'),
      labelError: t('errors.code_label_success'),
      variant: t('errors.code_label_success'),
      data: [],
      success: false,
      error: false
    }
    resp = generalMappers.responseMapper(data)
  }

  return resp
}

const restore = (credenciales, t) => {
  if (!credenciales.email) {
    data = {
      message: t('errors.login_error_message'),
      code: t('errors.code_error_message'),
      labelError: t('errors.code_label_warning'),
      variant: t('errors.code_label_warning'),
      data: [],
      success: false,
      error: true
    }
    resp = generalMappers.loginRegisterMapper(data)
  } else if (!validarCorreo(credenciales.email)) {
    data = {
      message: t('errors.email_error_message'),
      code: t('errors.code_error_message'),
      labelError: t('errors.code_label_warning'),
      variant: t('errors.code_label_warning'),
      data: [],
      success: false,
      error: true
    }
    resp = generalMappers.loginRegisterMapper(data)
  } else {
    data = {
      message: '',
      code: t('errors.code_success_message'),
      labelError: t('errors.code_label_success'),
      variant: t('errors.code_label_success'),
      data: [],
      success: false,
      error: false
    }
    resp = generalMappers.responseMapper(data)
  }

  return resp
}

const securityValidation = {
  login,
  register,
  restore
}

export default securityValidation