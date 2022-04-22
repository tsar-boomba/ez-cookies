import { constructCookie } from './constructCookie';
import { CookieOptions } from '../types';

/**
 * @internal
 */
export const clientCookieSetter = (key: string, value: string, opts?: CookieOptions) => {
	document.cookie = constructCookie(key, value, opts);
};
