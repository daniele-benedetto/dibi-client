import axios from '@/app/lib/api';
import cookie from 'cookie';

export default async (req, res) => {
    if (req.method === 'GET') {
        const { token } = cookie.parse(req.headers.cookie);
        if (!token) {
            res.status(403).json({ message: 'not authorized' });
        }
        await axios.get('/api/users/me?populate[products][populate][0]=image&populate=orders', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            res.status(200).json({
            user: response.data.username,
            email: response.data.email,
            id: response.data.id,
            products: response.data.products,
            orders: response.data.orders,
            });
        })
        .catch((error) => {
            res.status(403).json({ message: 'not authorized' });
        });
    }
};