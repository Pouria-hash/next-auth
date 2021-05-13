import { hash, compare } from 'bcryptjs';

export const hashPassword = async (password) => {
	const hashpassword = await hash(password, 12);

	return hashpassword;
};

export const comparePassword = async (password, hashedPassword) => {
	const isValid = await compare(password, hashedPassword);
	return isValid;
};
