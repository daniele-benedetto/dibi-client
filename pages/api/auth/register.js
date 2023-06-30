import axios from '@/app/lib/api';
export default async (req, res) => {
    if (req.method === 'POST') {
        const resp = await axios.post('/api/auth/local/register', req.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            return res.status(200).json({
                message: `Ti abbiamo inviato una mail all'indirizzo ${req.body.email} per confermare la tua registrazione, clicca sul link per attivare il tuo account.`,
            });
        })
        .catch((error) => {
            if (!error.response.data.error.message) {
                return res.status(500).json({ message: 'Internal server error' });
            } else {
            const messages = error.response.data.error.message;
                return res.status(403).json({ message: messages });
            }
        });
    }
};