export const breakpoints = {
  tablet: 768,
  desktop: 1024,
};

export const columns = [
  {
    title: "To Do",
  },
  {
    title: "In Progress",
  },
  {
    title: "In Review",
  },
  {
    title: "Done",
  },
  {
    title: "Blocked",
  },
];

export const {
  API_URL,
  VITE_AWS_AUTHORITY,
  VITE_AWS_CLIENT_ID,
  VITE_AWS_REDIRECT_URI,
  VITE_AWS_RESPONSE_TYPE,
  VITE_AWS_SCOPE,
  VITE_AWS_COGNITO_DOMAIN,
  VITE_AWS_LOGOUT_REDIRECT_URI,
} = import.meta.env;
