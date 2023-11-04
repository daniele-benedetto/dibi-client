import axios from '@/app/lib/api';

export default async (req, res) => {
    if(req.method === "PUT") {
        const token = req.headers.authorization;
        if (!token) {
            res.status(403).json({ message: 'not authorized' });
        }
        await axios.put('/api/users/'+req.body.id, req.body, {
            headers: {
                Authorization: token,
            },
        }).then((response) => {
            res.status(200).json({ message: response.data.message });
        }).catch((error) => {
            res.status(403).json({ message: error.response.data.message });
        });
    }
};