import { getSession } from 'next-auth/client';
import { comparePassword, hashPassword } from '../../../lib/auth';
import connectToDataBase from '../../../lib/db';

export default async function(req, res) {
	if (req.method !== 'PUT') {
		return;
	}

	const session = await getSession({ req });
	if (!session) {
		res.status(401).json({ message: 'Not authenticated!!!' });
		return;
	}

	const email = session.user.email;
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;

	const client = await connectToDataBase();
	const userCollection = await client.db().collection('users');
	const user = await userCollection.findOne({ email });

	if (!user) {
		res.status(404).json({ message: 'User not found!' });
		client.close();
		return;
	}

	const passwordsAreEqual = await comparePassword(oldPassword, user.password);

	if (!passwordsAreEqual) {
		res.status(403).json({ message: 'Invalid password!' });
		client.close();
		return;
	}

	const hashNewPassword = await hashPassword(newPassword);

	const result = await userCollection.updateOne({ email: email }, { $set: { password: hashNewPassword } });

	client.close();
	res.status(200).json({ message: 'Password updated.' });
}
