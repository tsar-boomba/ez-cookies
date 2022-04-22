import { constructCookie } from './constructCookie';
import { CookieOptions } from '../types';

/**
 * @internal
 */
export const serverCookieSetter = (key: string, value: string, opts?: CookieOptions) => {
	const req = opts?.req;
	if (!req) throw new Error('opts.req is required for setting cookies on the server side.');

	const res = opts?.res;
	if (!res) throw new Error('opts.res is required for setting cookies on the server side.');

	const currCookies = res.getHeader('Set-Cookie') as string[];

	// This will set the cookie on the client side
	res.setHeader(
		'Set-Cookie',
		!currCookies
			? [constructCookie(key, value, opts)]
			: currCookies.push(constructCookie(key, value, opts)),
	);

	// remove cookie if value if null otherwise update it
	if (req.cookies) {
		value === null ? delete req.cookies[key] : (req.cookies[key] = value);
	} else if (req.headers.cookie) {
		if (value === null) {
			req.headers.cookie = req.headers.cookie.replace(new RegExp(` ?${key}=.*?;`), '').trim();
		} else {
			req.headers.cookie = req.headers.cookie.includes(`${key}=`)
				? req.headers.cookie.replace(new RegExp(`(?<=${key}=).*?(?=;)`), value)
				: req.headers.cookie.concat(`; ${key}=${value}`);
		}
	}
};
