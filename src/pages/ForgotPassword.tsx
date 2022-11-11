import React, { Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../helper';

const ForgotPassword = () => {
	const emailRef: React.MutableRefObject<HTMLInputElement | null> =
		useRef(null);
	const navigate = useNavigate();

	const sendEmail = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const email: string = emailRef.current?.value ?? '';
		if (!(email?.trim().length > 0)) return;

		api.sendPasswordResetEmail(email).then((res) => {
			if (res.ok) {
				alert(res.message);
				navigate('/login', { replace: true });
			} else {
				alert(res.error);
			}
		});
	};
	return (
		<Fragment>
			<form style={{ width: '100%' }} onSubmit={sendEmail}>
				<h3 style={{ margin: 4 }}>Auth Service </h3>

				<div className='form-group'>
					<label htmlFor='email'>
						Enter your registered email id to get the password reset link
					</label>
					<input
						placeholder='Johndoe@example.com'
						type='email'
						className='form-control'
						id='email'
						ref={emailRef}
						required
					/>
				</div>

				<button type='submit'>Verify Email</button>
			</form>
		</Fragment>
	);
};

export default ForgotPassword;
