import bcrypt from 'bcryptjs';

const hashPassword = password => {
  // password length validation on front
  return await bcrypt.hash(password, 10);
};

export { hashPassword as default };
