import jwt from 'jsonwebtoken';

const getUserId = (req, requireAuth = true) => {
	const header = req.request.headers.authorization;
	if (header) {
		const token = header.replace('Bearer ', '');
		const auth = jwt.verify(token, 'secret');
		return auth.userId;
	}
	if (requireAuth) throw new Error('Authentication required');
	return null;
};

export { getUserId as default };
