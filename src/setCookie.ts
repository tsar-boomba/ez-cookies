import { clientCookieSetter } from './utils/clientCookieSetter';
import { serverCookieSetter } from './utils/serverCookieSetter';
import { CookieOptions } from './types';

/**
 * Set a cookie with name `key` to the value of `value` using options `opts`
 * @param key Name of the cookie to set
 * @param value Value you wish the cookie with name `key` to have
 * @param opts Options for the cookie you are setting (Expires, HttpOnly, etc...)
 */
export const setCookie = (key: string, value: string, opts?: CookieOptions) => {
	if (key.length <= 0) throw new Error('Cookie names of 0 length are not allowed.');
	if (typeof window === 'undefined') {
		serverCookieSetter(key, value, opts);
	} else {
		clientCookieSetter(key, value, opts);
	}
};
