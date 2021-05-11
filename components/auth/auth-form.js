import { useEffect, useState } from 'react';
import classes from './auth-form.module.css';
import { signIn, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const createUser = async (email, password) => {
	const res = await fetch('/api/auth/signup', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: { 'Content-Type': 'application/json' }
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || 'something went wrong!');
	}

	return data;
};

function AuthForm() {
	const router = useRouter();
	const [ isLogin, setIsLogin ] = useState(true);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ isLoading, setIsLoading ] = useState(true);

	function switchAuthModeHandler() {
		setIsLogin((prevState) => !prevState);
	}

	useEffect(() => {
		getSession().then((session) => {
			if (session) {
				router.push('/profile');
			} else {
				setIsLoading(false);
			}
		});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isLogin) {
			// Login
			const res = await signIn('credentials', {
				redirect: false,
				email: email,
				password: password
			});

			if (!res.error) {
				router.push('/profile');
			}
		} else {
			// signup
			try {
				const result = await createUser(email, password);
				if (result.ok) {
					router.push('/profile');
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	if (isLoading) {
		return <p className={classes.auth}>Loading...</p>;
	}

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={handleSubmit}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className={classes.actions}>
					<button>{isLogin ? 'Login' : 'Create Account'}</button>
					<button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
}

export default AuthForm;
