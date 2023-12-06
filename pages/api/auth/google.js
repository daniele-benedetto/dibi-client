import cookie from 'cookie';
import axios from '@/app/lib/api';

export default async (req, res) => {
  if (req.method === 'POST') {
    await axios
      .get(`/api/auth/google/callback?access_token=${req.body.access_token}`)
      .then((response) => {
        const jwt = response.data.jwt;
        const id = response.data.user.id;
        res.json({ message: response.data.user, jwt: jwt, id: id });
      })
      .catch((error) => {
        res.status(405).json({ message: ' Utente già registrato con un altro provider' });
      });
  }
};