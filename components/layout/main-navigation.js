import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import classes from './main-navigation.module.css';

function MainNavigation() {
	const [ session, loading ] = useSession();

	return (
		<header className={classes.header}>
			<Link href="/">
				<a>
					<div className={classes.logo}>Next Auth</div>
				</a>
			</Link>
			<nav>
				<ul>
					{!session &&
					!loading && (
						<li>
							<Link href="/auth">Login</Link>
						</li>
					)}
					{session && (
						<ul>
							<li>
								<Link href="/profile">Profile</Link>
							</li>
							<li>
								<button onClick={() => signOut()}>Logout</button>
							</li>
						</ul>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;