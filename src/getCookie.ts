import { getCookies } from './getCookies';
import { GetCookieOptions } from './types';

export const getCookie = (key: string, { cookieSource, req }: GetCookieOptions = {}): string => {
	if (key.length <= 0) throw new Error('Cookie names of 0 length are not allowed.');
	return getCookies({ cookieSource, req })[key];
};
