import UserProfile from '../components/profile/user-profile';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useState, useEffect } from 'react';

function ProfilePage() {
	// const router = useRouter();
	// const [ isLoading, setIsLoading ] = useState(true);

	// useEffect(() => {
	// 	getSession().then((session) => {
	// 		if (!session) {
	// 			router.push('/auth');
	// 		} else {
	// 			setIsLoading(false);
	// 		}
	// 	});
	// }, []);

	// if (isLoading) {
	// 	return <p>Loading...</p>;
	// }

	return <UserProfile />;
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false
			}
		};
	}
	return {
		props: {
			session
		}
	};
}

export default ProfilePage;
