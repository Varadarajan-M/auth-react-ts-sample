import {
	contentUrl,
	loginUrl,
	resetPasswordUrl,
	signupUrl,
	updatePasswordUrl,
} from './constants';
import { ILoginData, ISignupData } from './types';

export const getLoggedInUser = (): string =>
	localStorage.getItem('authUser') ?? '';

const _setLoggedInUser = (u: string): void =>
	localStorage.setItem('authUser', u);

export const getUserToken = (): string => localStorage.getItem('token') ?? '';

const _setUserToken = (t: string): void => localStorage.setItem('token', t);

export const setUserData = (user: string, token: string) => {
	_setLoggedInUser(user);
	_setUserToken(token);
};

export const clearUserData = (): void => {
	localStorage.removeItem('token');
	localStorage.removeItem('authUser');
};

export const api = {
	async login(creds: ILoginData) {
		try {
			const res = await fetch(loginUrl, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(creds),
			});
			const data = await res.json();
			return data;
		} catch (e: any) {
			console.log(e.message);
		}
	},

	async signup(details: ISignupData) {
		try {
			const res = await fetch(signupUrl, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(details),
			});
			const data = await res.json();
			return data;
		} catch (e: any) {
			console.log(e.message);
		}
	},

	async getContent() {
		try {
			const res = await fetch(contentUrl, {
				headers: { Authorization: `Bearer ${getUserToken()}` },
			});
			const data = await res.json();
			return data;
		} catch (e: any) {
			console.log(e.message);
		}
	},

	async sendPasswordResetEmail(email: string) {
		try {
			const res = await fetch(resetPasswordUrl, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});
			return await res.json();
		} catch (e: any) {
			console.log(e.message);
		}
	},

	async updatePassword(password: string, token: string) {
		try {
			const res = await fetch(updatePasswordUrl, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ password }),
			});
			return await res.json();
		} catch (e: any) {
			console.log(e.message);
		}
	},
};
