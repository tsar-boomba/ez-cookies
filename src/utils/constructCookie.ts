import { CookieOptions } from '../types';

/**
 * Constructs a full cookie string
 * @param key Name of cookie
 * @param value Value of cookie
 * @param opts Cookie options (Expires, HttpOnly, etc...)
 * @returns Full cookie string with key, value, and options
 */
export const constructCookie = (key: string, value: string, opts?: CookieOptions | undefined) => {
	const path = opts?.path ? `; Path=${opts.path}` : '; Path=/';
	const expires = opts?.expires ? `; Expires=${opts.expires.toUTCString()}` : '';
	const maxAge = opts?.maxAge ? `; Max-Age=${opts.maxAge}` : '';
	const domain = opts?.domain ? `; Domain=${opts.domain}` : '';
	const secure = opts?.secure ? `; Secure` : '';
	const httpOnly = opts?.httpOnly ? '; HttpOnly' : '';
	const sameSite = opts?.sameSite ? `; SameSite=${opts.sameSite}` : '';
	return (
		key + '=' + String(value) + path + expires + maxAge + domain + secure + httpOnly + sameSite
	);
};
