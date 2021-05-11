import connectToDataBase from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

export default async (req, res) => {
	const { email, password } = req.body;

	if (req.method === 'POST') {
		if (!email || !email.includes('@') || !password || password.trim().length < 4) {
			res.status(422).json({ message: 'Invalid input' });
		}

		const client = await connectToDataBase();

		const db = client.db();

		const existingUser = await db.collection('users').findOne({ email: email });

		if (existingUser) {
			res.status(422).json({ message: 'user existing!' });
			client.close();
			return;
		}
		const hashPass = await hashPassword(password);

		const result = await db.collection('users').insertOne({ email, password: hashPass });

		res.status(201).json({ message: 'User created!' });
	} else {
		req.setHeader('Allow', [ 'POST' ]);
		res.status(402).json({ message: `Method ${req.method} is not allow!` });
	}
};
