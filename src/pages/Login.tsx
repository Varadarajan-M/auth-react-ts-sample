import AuthForm from '../components/AuthForm';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../store';

const Login: React.FC = () => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		isAuthenticated ? navigate('/content', { replace: true }) : '';
	}, [isAuthenticated]);
	return (
		<div>
			<h3 style={{ margin: 4 }}>Auth Service </h3>
			<AuthForm />
		</div>
	);
};

export default Login;
