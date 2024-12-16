import requestOptions from '../functions/services/requestOptions';

export const logError = async (error, sectionError, moduleTrans) => {
  try {
    const body = {
        "env": 2,
        "error": error,
        "sectionError": sectionError,
        "moduleTrans": moduleTrans
    }
    const options = requestOptions.options('POST', '', body)
    await fetch(global.ERROR_LOG_ENDPOINT, options);
  } catch (err) {
    console.error('Error al intentar registrar el error:', err);
  }
};
