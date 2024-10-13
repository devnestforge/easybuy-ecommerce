
const headers = (method, Authorization, bodyData) => {
  const headers = { 'Content-Type': 'application/json' }
  headers.Authorization = 'Bearer ' + Authorization;
  headers.Canal = global.CANAL
  let requestOptions;
  if (method === "POST" || method === "PUT") {
    requestOptions = {
      method: method,
      headers,
      body: JSON.stringify(bodyData)
    }
  } else {
    requestOptions = {
      method: method,
      headers
    }
  }
  return requestOptions
}

const requestOptions = {
  headers
};

export default requestOptions;