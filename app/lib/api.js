import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
const linstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENT_URL,
});

export default instance;
export { linstance };