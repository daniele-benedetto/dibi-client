import axios from '@/app/lib/api';
export default async (req, res) => {
  if (req.method === 'POST') {
    var resp = {};
    resp = await axios
      .post('/api/auth/local', req.body)
      .then((response) => {
        const jwt = response.data.jwt;
        const id = response.data.user.id;

        res.json({ message: response.data.user, jwt: jwt, id: id });
      })
      .catch((error) => {
        if (!error.response.data.error.message) {
          return res.status(500).json({ message: "Errore, riprovare più tardi o contattare l'assistenza" });
        } else {
          const messages = error.response.data.error.message;
          return res.status(403).json({ message: messages });
        }
      });
  }
};