import { setCookie } from './setCookie';
import { CookieOptions } from './types';

/**
 * Sets cookie with name `key` to be removed and removes it from parsed cookies or cookie string.
 * This function only works on the server side.
 * @param key Name of cookie you want to delete
 * @param opts Cookie options, be sure to provide req and res
 */
export const removeCookie = (key: string, opts?: CookieOptions) => {
	if (key.length <= 0) throw new Error('Cookie names of 0 length are not allowed.');
	// null signifies we are deleting the cookie
	if (typeof window === 'undefined') setCookie(key, null as any, { ...opts, maxAge: -1 });
};
