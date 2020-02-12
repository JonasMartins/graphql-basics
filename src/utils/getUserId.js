import jwt from 'jsonwebtoken';

const getUserId = (req, requireAuth = true) => {
	// http and web sockets for mutations and queries or
	// Subscriptions resplectively
	const header = req.request
		? req.request.headers.authorization
		: req.connection.context.Authorization;
	if (header) {
		const token = header.replace('Bearer ', '');
		const auth = jwt.verify(token, 'secret');
		return auth.userId;
	}
	if (requireAuth) throw new Error('Authentication required');
	return null;
};

export { getUserId as default };
