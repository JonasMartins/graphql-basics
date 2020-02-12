import jwt from 'jsonwebtoken';

const generateToken = id => {
	return jwt.sign({ userId: id }, 'secret', { expiresIn: '7 days' });
};

export { generateToken as default };
