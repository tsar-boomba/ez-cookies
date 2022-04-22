/* eslint-disable no-var */
import assert from 'assert';
import { setCookie } from '../../src';
import { createDocument, DEFAULT_COOKIE_STRING } from '../mocks';

declare namespace global {
	var document: { cookie: string };
	var window: any;
}

describe('setCookie (client)', () => {
	beforeAll(() => {
		global.document = createDocument();
		global.window = {};
	});

	afterAll(() => {
		//@ts-expect-error
		global.document = undefined;
		global.window = undefined;
	});

	it('Should edit document cookies', () => {
		const key = 'nextjs';
		const value = 'awesome';

		setCookie(key, value);
		assert.equal(global.document.cookie, DEFAULT_COOKIE_STRING + `; ${key}=${value}`);
	});

	it('Will throw if empty key', () => {
		assert.throws(() => setCookie('', 'sus name'), {
			name: 'Error',
			message: 'Cookie names of 0 length are not allowed.',
		});
	});
});
