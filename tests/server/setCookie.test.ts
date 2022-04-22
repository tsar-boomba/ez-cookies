/* eslint-disable no-var */
import assert from 'assert';
import { setCookie } from '../../src';
import { DEFAULT_COOKIE_STRING, mockHandler, mockReq, PARSED_DEFAULT_COOKIES } from '../mocks';

describe('setCookie (server)', () => {
	beforeAll(() => {
		//@ts-expect-error
		global.window = undefined;
	});

	it('Should edit cookies in req, parsed or not, and add set-cookie header', () => {
		const key = 'nextjs';
		const value = 'awesome';

		mockHandler(
			(req, res) => {
				setCookie(key, value, { req, res });
			},
			(req, res) => {
				assert.equal(req.headers.cookie, DEFAULT_COOKIE_STRING + `; ${key}=${value}`);
				assert.deepEqual(res.getHeader('Set-Cookie'), [`${key}=${value}; Path=/`]);
			},
			(req, res) => {
				assert.deepEqual(req.cookies, { ...PARSED_DEFAULT_COOKIES, nextjs: 'awesome' });
				assert.deepEqual(res.getHeader('Set-Cookie'), [`${key}=${value}; Path=/`]);
			},
		);
	});

	it('Will throw if empty key', () => {
		assert.throws(() => setCookie('', 'sus name'), {
			name: 'Error',
			message: 'Cookie names of 0 length are not allowed.',
		});
	});

	it('Will throw if no req is provided', () => {
		assert.throws(() => setCookie('next', 'js'), {
			name: 'Error',
			message: 'opts.req is required for setting cookies on the server side.',
		});
	});

	it('Will throw if no res is provided', () => {
		const req = mockReq();
		assert.throws(() => setCookie('next', 'js', { req }), {
			name: 'Error',
			message: 'opts.res is required for setting cookies on the server side.',
		});
	});
});
