import { createContext } from 'react';

const boom = () => {};

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: boom,
  logout: boom,
  isAuthenticated: false
})