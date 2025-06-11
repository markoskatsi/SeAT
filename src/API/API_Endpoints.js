const BASE_URL = "https://softwarehub.uk/unibase/staysafe/v1/api";

const API_ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  USER_BY_ID: (userId) => `${BASE_URL}/users/${userId}`,
  USER_CONTACTS: (userId) => `${BASE_URL}/users/contacts/${userId}`,
  ACTIVITIES: `${BASE_URL}/activities`,
  ACTIVITIES_BY_USER: (userId) => `${BASE_URL}/activities/users/${userId}`,
  LOCATIONS: `${BASE_URL}/locations`,
  LOCATIONS_BY_USER: (userId) => `${BASE_URL}/locations/users/${userId}`,
  STATUS: `${BASE_URL}/status`,
  CONTACTS: `${BASE_URL}/contacts`,
  POSITIONS: `${BASE_URL}/positions`,
};

export default API_ENDPOINTS;
