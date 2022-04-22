import { GetCookieOptions } from './types';
import { parse } from './utils/parse';

/**
 * Gets the value of cookie with name `key`.
 * On server side you must provide the second parameter which is a source for your cookie string or it will return `undefined`.
 * @param key Name of cookie you want the value of
 * @param cookieSource Source of cookies (string or object with a cookie or cookies property)
 * @returns Value of cookie with name `key` or `undefined` if `key` isn't found
 */
export const getCookies = ({ cookieSource, req }: GetCookieOptions = {}): Record<
	string,
	string
> => {
	if (cookieSource) {
		if (typeof cookieSource !== 'string' && cookieSource?.cookies) {
			return cookieSource.cookies;
		} else if (typeof cookieSource === 'string' || cookieSource?.cookie) {
			const cookies =
				typeof cookieSource === 'string' ? cookieSource : (cookieSource?.cookie as string);
			return parse(cookies);
		}
	}

	if (req) {
		if (req.cookies) {
			return req.cookies;
		} else {
			return parse(req.headers.cookie);
		}
	}

	if (typeof window === 'undefined') {
		return {};
	} else {
		return parse(document.cookie);
	}
};
