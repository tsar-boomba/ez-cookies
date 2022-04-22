/* eslint-disable no-var */
import assert from 'assert';
import { removeCookie } from '../../src';
import { createDocument, DEFAULT_COOKIE_STRING } from '../mocks';

declare namespace global {
	var document: { cookie: string };
	var window: any;
}

describe('removeCookie (client)', () => {
	beforeAll(() => {
		global.document = createDocument();
		global.window = {};
	});

	afterAll(() => {
		//@ts-expect-error
		global.document = undefined;
		global.window = undefined;
	});

	it('Should do nothing', () => {
		assert.strictEqual(removeCookie('sus'), void 0);
		assert.equal(document.cookie, DEFAULT_COOKIE_STRING);
	});
});
