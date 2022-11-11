import { api, setUserData } from '../helper';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ILoginData, ISignupData } from 'types';
import { useAuth } from './../store';

type AuthFormProps = {
	isSignup?: boolean;
};

const AuthForm = (props: AuthFormProps) => {
	const { setIsAuthenticated } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState<ISignupData>({
		username: '',
		email: '',
		password: '',
	});

	const login = async (data: ILoginData): Promise<void> => {
		const res = await api.login(data);
		if (res.ok) {
			setIsAuthenticated(true);
			navigate('/content');
			setUserData(res.data.username, res.data.token);
		} else alert(res.error);
	};
	const signup = async (data: ISignupData): Promise<void> => {
		const res = await api.signup(data);
		if (res.ok) {
			alert(res.message);
			navigate('/login');
		} else alert(res.error);
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.SyntheticEvent): void => {
		e.preventDefault();
		props.isSignup
			? signup(formData)
			: login({ email: formData.email, password: formData.password });
	};

	return (
		<form onSubmit={handleSubmit}>
			{props.isSignup ? (
				<div className='form-group'>
					<label htmlFor='username'>Username</label>
					<input
						placeholder='Johndoe'
						type='text'
						className='form-control'
						id='username'
						name='username'
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</div>
			) : null}

			<div className='form-group'>
				<label htmlFor='email'>Email</label>
				<input
					placeholder='Johndoe@example.com'
					type='text'
					className='form-control'
					id='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					required
				/>
			</div>

			<div className='form-group'>
				<label htmlFor='password'>Password</label>
				<input
					placeholder='Password'
					type='password'
					className='form-control'
					id='password'
					name='password'
					value={formData.password}
					onChange={handleChange}
					required
				/>
			</div>

			{!props.isSignup && (
				<Link to='/forgot-password' className='forgot-password'>
					Forgot Password?
				</Link>
			)}

			<button
				style={{ marginTop: props.isSignup ? 4 : '' }}
				className='login-btn'
				type='submit'
			>
				{props.isSignup ? 'Signup' : 'Login'}
			</button>

			{!props.isSignup ? (
				<p className='signup-link'>
					Don't have an account? Signup <Link to='/signup'>Here</Link>
				</p>
			) : (
				<p className='signup-link'>
					{' '}
					Already have an account? Login <Link to='/login'>Here</Link>
				</p>
			)}
		</form>
	);
};

export default AuthForm;
