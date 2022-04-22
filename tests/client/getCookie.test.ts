/* eslint-disable no-var */
import assert from 'assert';
import { getCookie } from '../../src';
import { createDocument, PARSED_DEFAULT_COOKIES } from '../mocks';

declare namespace global {
	var document: { cookie: string };
	var window: any;
}

describe('getCookie (client)', () => {
	beforeAll(() => {
		global.document = createDocument();
		global.window = {};
	});

	afterAll(() => {
		//@ts-expect-error
		global.document = undefined;
		global.window = undefined;
	});

	it('Should parse document cookies and return correct value', () => {
		assert.equal(getCookie('sus'), PARSED_DEFAULT_COOKIES.sus);
		assert.equal(getCookie('ezcookie'), PARSED_DEFAULT_COOKIES.ezcookie);
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
