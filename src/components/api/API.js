import apiEndpoints from "./apiEndpoints.js";

const API = {};

API.get = (endpoint) => callFetch(endpoint, "GET", null);
API.post = (endpoint, data) => callFetch(endpoint, "POST", data);
API.put = (endpoint, data) => callFetch(endpoint, "PUT", data);
API.delete = (endpoint) => callFetch(endpoint, "DELETE", null);

const callFetch = async (endpoint, method, record) => {
  // Build request object
  let requestObj = { method: method };
  if (record)
    requestObj = {
      ...requestObj,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(record),
    };

  try {
    let result = null;
    const endpointAddress = endpoint;
    const response = await fetch(endpointAddress, requestObj);
    if (response.status !== 204) result = await response.json();
    if (response.status >= 200 && response.status < 300) {
      return { isSuccess: true, result };
    } else {
      return {
        isSuccess: false,
        message:
          result && result.message ? result.message : response.statusText,
        response: result,
        status: response.status,
      };
    }
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

export default API;
