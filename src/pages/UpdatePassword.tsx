import React, { Fragment, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../helper';

const UpdatePassword = () => {
	const passwordRef: React.MutableRefObject<HTMLInputElement | null> =
		useRef(null);
	const cnfPasswordRef: React.MutableRefObject<HTMLInputElement | null> =
		useRef(null);

	const navigate = useNavigate();

	const token: string = useSearchParams()[0].get('u') ?? '';

	const updatePassword = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const password = passwordRef.current?.value ?? '';
		const cnfPassword = cnfPasswordRef.current?.value ?? '';
		if (!(password?.trim().length > 0) || password !== cnfPassword) {
			alert('Cannot reset password');
			return;
		}

		api.updatePassword(password, token).then((res) => {
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
			<form style={{ width: '100%' }} onSubmit={updatePassword}>
				<h3 style={{ margin: 4 }}>Auth Service </h3>

				<div className='form-group'>
					<label htmlFor='password'>New password</label>
					<input
						placeholder='Password'
						type='password'
						className='form-control'
						id='password'
						ref={passwordRef}
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='cnfpassword'>Confirm password</label>
					<input
						placeholder='Password'
						type='password'
						className='form-control'
						id='cnfpassword'
						ref={cnfPasswordRef}
						required
					/>
				</div>

				<button type='submit'>Update password</button>
			</form>
		</Fragment>
	);
};
export default UpdatePassword;
