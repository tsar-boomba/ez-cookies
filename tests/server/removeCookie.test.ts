/* eslint-disable no-var */
import assert from 'assert';
import { removeCookie } from '../../src';
import { mockHandler, mockReq } from '../mocks';

describe('removeCookie (server)', () => {
	beforeAll(() => {
		//@ts-expect-error
		global.window = undefined;
	});

	it('Should remove cookie in req, parsed or not, and add set-cookie header with Max-Age=-1', () => {
		const key = 'sus';
		const value = 'null';

		mockHandler(
			(req, res) => {
				removeCookie(key, { req, res });
			},
			(req, res) => {
				assert.equal(req.headers.cookie, 'ezcookie=cool');
				assert.deepEqual(res.getHeader('Set-Cookie'), [
					`${key}=${value}; Path=/; Max-Age=-1`,
				]);
			},
			(req, res) => {
				assert.deepEqual(req.cookies, { ezcookie: 'cool' });
				assert.deepEqual(res.getHeader('Set-Cookie'), [
					`${key}=${value}; Path=/; Max-Age=-1`,
				]);
			},
		);
	});

	it('Will throw if empty key', () => {
		assert.throws(() => removeCookie(''), {
			name: 'Error',
			message: 'Cookie names of 0 length are not allowed.',
		});
	});

	it('Will throw if no req is provided', () => {
		assert.throws(() => removeCookie('next'), {
			name: 'Error',
			message: 'opts.req is required for setting cookies on the server side.',
		});
	});

	it('Will throw if no res is provided', () => {
		const req = mockReq();
		assert.throws(() => removeCookie('next', { req }), {
			name: 'Error',
			message: 'opts.res is required for setting cookies on the server side.',
		});
	});
});
