
import axios from '@/app/lib/api';
export default async (req, res) => {
  if (req.method === 'POST') {
    var resp = {};
    resp = await axios
      .post('/api/auth/forgot-password', req.body)
      .then((response) => {
        return res.status(200).json({ message: response.data.user });
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