/* eslint-disable no-var */
import assert from 'assert';
import { getCookie } from '../../src';
import { mockHandler, PARSED_DEFAULT_COOKIES } from '../mocks';

describe('getCookie (server)', () => {
	beforeAll(() => {
		//@ts-expect-error
		global.window = undefined;
	});

	it('Should parse req cookies, parsed or not and return correct value', () => {
		mockHandler(
			() => {},
			(req) => {
				assert.equal(getCookie('sus', { req }), PARSED_DEFAULT_COOKIES.sus);
				assert.equal(getCookie('ezcookie', { req }), PARSED_DEFAULT_COOKIES.ezcookie);
			},
		);
	});

	it('Should use cookieSource if one is provided', () => {
		const cookieSource = 'custom=source';
		assert.equal(getCookie('custom', { cookieSource }), 'source');
	});

	it('Should work with object with cookie property', () => {
		const cookieSource = { cookie: 'custom=source' };
		assert.equal(getCookie('custom', { cookieSource }), 'source');
	});

	it('Will throw if empty key', () => {
		assert.throws(() => getCookie(''), {
			name: 'Error',
			message: 'Cookie names of 0 length are not allowed.',
		});
	});
});
