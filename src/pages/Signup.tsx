import AuthForm from '../components/AuthForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../store';
const Signup = () => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		isAuthenticated ? navigate('/content', { replace: true }) : '';
	}, [isAuthenticated]);

	return (
		<div>
			<h3 style={{ margin: 4 }}>Auth Service </h3>
			<AuthForm isSignup />
		</div>
	);
};

export default Signup;
