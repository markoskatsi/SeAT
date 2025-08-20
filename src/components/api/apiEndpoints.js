const BASE_URL = "https://softwarehub.uk/unibase/seat/api";

const apiEndpoints = {
  USERS: `${BASE_URL}/users`,
  ROLES: `${BASE_URL}/roles`,
  USERTYPES: `${BASE_URL}/usertypes`,
  USER_BY_EMAIL: (email) => `${BASE_URL}/users/email/${email}`,
  USER_BY_ID: (userId) => `${BASE_URL}/users/${userId}`,

  EVENTS: `${BASE_URL}/events`,
  EVENT_BY_ID: (eventId) => `${BASE_URL}/events/${eventId}`,
  EVENT_LOCATIONS: `${BASE_URL}/locations/`,
  EVENT_BY_LOCATION: (locationId) =>
    `${BASE_URL}/events/locations/${locationId}`,

  ATTENDEES: `${BASE_URL}/attendees`,
  STATUS: `${BASE_URL}/status`,
};

export default apiEndpoints;
