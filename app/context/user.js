import { useState, createContext } from 'react';
export const UserContext = createContext(null);
import { linstance } from '@/app/lib/api';

const UserProvider = ({ children }) => {

  async function doLogin(values) {
    try {
      const resp = await linstance.post('/api/auth/login', values);
      return resp.data;
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  async function doReset(values) {
    try {
      const resp = await linstance.post('/api/auth/reset', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  async function doRemind(values) {
    try {
      const resp = await linstance.post('/api/auth/reminder', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  async function doGoogleCallback(values) {
    try {
      const resp = await linstance.post('/api/auth/google', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  async function doFacebookCallback(values) {
    try {
      const resp = await linstance.post('/api/auth/facebook', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  async function doRegister(values) {
    var ret = ['niente'];
    try {
      const resp = await linstance.post('/api/auth/register', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  const doLogout = async () => {
    const resp = await linstance.post('/api/auth/logout', {
      method: 'POST',
    });
    if (resp.data.message == 'success') {
      setUser('');
      setEmail('');
      setId('');
    }
  };

  const doUpdate = async (values) => {
    const resp = await linstance.put('/api/auth/update', values, {
      method: 'PUT',
      });
    if (resp.data.message == 'success') {
      console.log('update success');
    }
  };

  async function checkLogin() {
    try {
      const resp = await linstance.get('/api/auth/user');
      setUser(resp.data.user);
      setEmail(resp.data.email);
      setId(resp.data.id);
      setUserWishList(resp.data.products);
      return resp;
    } catch (error) {
      return error.response;
    }
  }

  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [jwt, setJwt] = useState();
  const [userWishlist, setUserWishList] = useState();
  const [loggingIn, setLoggingIn] = useState(false);
  const useract = {
    user: user,
    setUser: setUser,
    userWishlist: userWishlist,
    setUserWishList: setUserWishList,
    loggingIn: loggingIn,
    doLogout: doLogout,
    doLogin: doLogin,
    doUpdate: doUpdate,
    setLoggingIn: setLoggingIn,
    checkLogin: checkLogin,
    jwt: jwt,
    setJwt: setJwt,
    email: email,
    setEmail: setEmail,
    id: id,
    setId: setId,
    doRegister: doRegister,
    doGoogleCallback: doGoogleCallback,
    doFacebookCallback: doFacebookCallback,
    doRemind: doRemind,
    doReset: doReset,
  };

  return (<UserContext.Provider value={useract}>{children}</UserContext.Provider>);
};

export default UserProvider;