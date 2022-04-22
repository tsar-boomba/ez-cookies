import { IncomingMessage, OutgoingMessage } from 'http';

export type CookieRequest = IncomingMessage & { cookies?: Record<string, string> };

export interface CookieOptions {
	/** Time in secs till expiration */
	maxAge?: number;
	/** Date when the cookie will expire */
	expires?: Date;
	/** Paths this cookie will be sent to, defaults to "/" (All paths) */
	path?: string;
	/** Which host the cookie will be sent to */
	domain?: string;
	/** Indicates that the cookie can only be sent over https */
	secure?: boolean;
	/** Indicates that JavaScript cannot access this cookie */
	httpOnly?: boolean;
	/** Indicates whether the cookie can be sent on cross-origin requests */
	sameSite?: 'Strict' | 'Lax' | 'None';
	/** When server side you must provide the request and response objects for cookie editing */
	req?: CookieRequest;
	/** When server side you must provide the request and response objects for cookie editing */
	res?: OutgoingMessage;
}

export type CookieSource = string | ({ cookie?: string } & { cookies?: Record<string, string> });

export interface GetCookieOptions {
	cookieSource?: CookieSource;
	req?: CookieRequest;
}
