import { useEffect, useState } from 'react';
import { useAuth } from '../store';
import { api, clearUserData } from './../helper';
import { useNavigate } from 'react-router-dom';

const Content: React.FC = () => {
	const { username, setIsAuthenticated } = useAuth();
	const navigate = useNavigate();
	const [content, setContent] = useState<string>('');

	const logout = () => {
		setIsAuthenticated(false);
		clearUserData();
		navigate('/login');
	};

	useEffect(() => {
		api.getContent().then((res) => {
			if (res.ok) {
				setContent(res.message);
			} else {
				clearUserData();
				navigate('/login');
			}
		});
	}, []);
	return (
		<div className='content'>
			<h4>Hey {username}!</h4>
			<p>{content}</p>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default Content;
