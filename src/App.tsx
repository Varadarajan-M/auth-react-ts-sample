import './styles/App.css';
import Layout from './components/Layout';
import Login from './pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import Content from './pages/Content';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/update-password' element={<UpdatePassword />} />

				<Route path='/content' element={<PrivateRoute />}>
					<Route index element={<Content />} />
				</Route>
				<Route path='*' element={<Navigate to='/login' />} />
			</Routes>
		</Layout>
	);
}

export default App;
