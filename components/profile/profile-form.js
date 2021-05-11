import classes from './profile-form.module.css';
import { useState } from 'react';

function ProfileForm() {
	const [ newPassword, setNewPassword ] = useState('');
	const [ oldPassword, setOldPassword ] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch('/api/user/change-password', {
			method: 'PUT',
			body: JSON.stringify({ newPassword, oldPassword }),
			headers: { 'Content-Type': 'application/json' }
		});

		const data = await res.json();
		console.log(data);
	};
	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input
					type="password"
					id="new-password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
			</div>
			<div className={classes.control}>
				<label htmlFor="old-password">Old Password</label>
				<input
					type="password"
					id="old-password"
					value={oldPassword}
					onChange={(e) => setOldPassword(e.target.value)}
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
}

export default ProfileForm;
