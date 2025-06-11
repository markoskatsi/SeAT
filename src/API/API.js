const API = {};

API.get = (endpoint, params) => callFetch(endpoint, "GET", null, params);
API.post = (endpoint, data) => callFetch(endpoint, "POST", data);
API.put = (endpoint, data) => callFetch(endpoint, "PUT", data);
API.delete = (endpoint) => callFetch(endpoint, "DELETE");

export default API;

const callFetch = async (endpoint, method, dataObj = null, params = null) => {
  // Build request object
  let requestObj = { method: method }; // GET, POST, PUT or DELETE
  if (dataObj)
    requestObj = {
      ...requestObj,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(dataObj),
    };

  // Query parameters
  let url = endpoint;
  if (params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  // Call the fetch and process the return
  try {
    const response = await fetch(url, requestObj);
    let result = null;

    if (response.status !== 204)
      try {
        result = await response.json();
      } catch (error) {
        console.error("Error parsing response:", error);
        console.log("API response:", response);
      }

    const isSuccess = response.status >= 200 && response.status < 300;
    console.log(
      `API response status: ${response.status}, success: ${isSuccess}`
    );

    return response.status >= 200 && response.status < 300
      ? { isSuccess: true, result }
      : { isSuccess: false, message: `${result.message}` };
  } catch (error) {
    console.error("API call failed:", error);
    return { isSuccess: false, message: error.message };
  }
};
