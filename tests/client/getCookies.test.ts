/* eslint-disable no-var */
import assert from 'assert';
import { getCookies } from '../../src';
import { createDocument, PARSED_DEFAULT_COOKIES } from '../mocks';

declare namespace global {
	var document: { cookie: string };
	var window: any;
}

describe('getCookies (client)', () => {
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
		assert.deepEqual(getCookies(), PARSED_DEFAULT_COOKIES);
	});

	it('Should use cookieSource if one is provided', () => {
		const cookieSource = 'custom=source';
		assert.deepEqual(getCookies({ cookieSource }), { custom: 'source' });
	});

	it('Should work with object with cookie property', () => {
		const cookieSource = { cookie: 'custom=source' };
		assert.deepEqual(getCookies({ cookieSource }), { custom: 'source' });
	});
});
