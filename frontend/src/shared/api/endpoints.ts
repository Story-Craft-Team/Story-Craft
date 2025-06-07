export const API_ROUTES = {
  auth: {
    login: "/users/auth/login",
    register: "/users/auth/register",
    logout: "/users/auth/logout",
    me: "/users/auth/me",
    updateUserJwt: "/users/auth/update-user-jwt",
  },
  users: {
    findUser: "/users/",
    updateMe: "/users/me",
  },
};