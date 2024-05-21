export const getErrorMessage = (error) => {
  if (error) {
    const data = error.data;
    if (data.error) {
      return data.error;
    } else if (data.detail) {
      return data.detail;
    } else if (data.username) {
      return data.username;
    } else if (data.password) {
      return data.password;
    }
  }
  return;
};
