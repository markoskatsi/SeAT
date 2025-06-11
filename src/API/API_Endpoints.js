const BASE_URL = "https://softwarehub.uk/unibase/seat/api";

const API_ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  USER_BY_ID: (userId) => `${BASE_URL}/users/${userId}`,
  EMPLOYEES: `${BASE_URL}/users/employees`,

  EVENTS: `${BASE_URL}/events`,
  EVENT_BY_ID: (eventId) => `${BASE_URL}/events/${eventId}`,
};

export default API_ENDPOINTS;
