/* eslint-disable consistent-return */
export default defineNuxtRouteMiddleware((to) => {
  const loggedin = useLogin();
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (loggedin.value === false) {
    return navigateTo(`/login?redirect=${to.fullPath}`);
  }
});
