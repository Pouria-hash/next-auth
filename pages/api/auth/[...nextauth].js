import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { comparePassword } from '../../../lib/auth';
import connectToDataBase from '../../../lib/db';

export default NextAuth({
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				const client = await connectToDataBase();
				const userCollection = client.db().collection('users');
				const findUser = await userCollection.findOne({ email: credentials.email });

				if (!findUser) {
					client.close();
					throw new Error('user not found!');
				}

				const checkpass = await comparePassword(credentials.password, findUser.password);

				if (!checkpass) {
					client.close();
					throw new Error('email or password is incorrect!');
				}
				client.close();
				return { email: credentials.email };
			}
		})
	]
});
