import { MongoClient } from 'mongodb';

export default async function connectToDataBase() {
	const client = await MongoClient.connect(
		'mongodb+srv://pa-portfolio:nPjtqLVnUeAgIiFV@cluster0.bhfeh.mongodb.net/PA-Portfolio?retryWrites=true&w=majority'
	);

	return client;
}
