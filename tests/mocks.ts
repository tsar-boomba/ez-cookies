import { OutgoingMessage } from 'http';
import { CookieRequest } from '../src';

export const DEFAULT_COOKIE_STRING = 'sus=amongus; ezcookie=cool';
export const createDocument = () =>
	new Proxy(
		{
			cookie: DEFAULT_COOKIE_STRING,
		},
		{
			set: (target, prop, value) => {
				if (prop !== 'cookie') return false;

				if (value.toString().includes('='))
					target[prop] = target[prop].trim() + '; ' + value.split(';')[0].trim();

				return true;
			},
		},
	);

export const PARSED_DEFAULT_COOKIES = {
	sus: 'amongus',
	ezcookie: 'cool',
};

export const mockReq = (parsed?: boolean): CookieRequest =>
	({
		headers: {
			cookie: DEFAULT_COOKIE_STRING,
		},
		cookies: parsed ? PARSED_DEFAULT_COOKIES : undefined,
	} as CookieRequest);

export const mockRes = (defaultSetCookies?: string[]): OutgoingMessage => {
	const res: any = {
		headers: {
			['Set-Cookie']: defaultSetCookies,
		},
	};
	const getHeader = (name: string): string[] | undefined => res.headers[name];
	const setHeader = (name: string, value: string) => (res.headers[name] = value);

	res.getHeader = getHeader;
	res.setHeader = setHeader;

	return res;
};

export const mockHandler = (
	handler: (req: CookieRequest, res: OutgoingMessage) => void,
	headerValidator: (req: CookieRequest, res: OutgoingMessage) => void,
	parsedValidator?: (req: CookieRequest, res: OutgoingMessage) => void,
): Promise<any> => {
	return Promise.all([
		new Promise((resolve) => {
			const req = mockReq();
			const res = mockRes();
			handler(req, res);
			resolve(headerValidator(req, res));
		}),
		new Promise((resolve) => {
			const req = mockReq(true);
			const res = mockRes();
			handler(req, res);
			resolve(parsedValidator ? parsedValidator(req, res) : headerValidator(req, res));
		}),
	]);
};
