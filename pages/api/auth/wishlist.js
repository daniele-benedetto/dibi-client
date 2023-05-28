import axios from '@/app/lib/api';
import cookie from 'cookie';

export default async (req, res) => {
    if (req.method === 'PUT') {
        const { token } = cookie.parse(req.headers.cookie);
        if (!token) {
            res.status(403).json({ message: 'not authorized' });
        }
        await axios.put(`/api/users/${req.body.id}`,{
            "products": req.body.products
        }, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            res.status(200).json({
                products: response.data.products,
            });
        }).catch((error) => {
            res.status(403).json({ message: 'not authorized', body: req.body });
        });
    }
};