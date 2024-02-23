const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem('token') as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem('token', token);
  },
  clearToken: () => {
    window.localStorage.removeItem('token');
  },
};

export default storage;
