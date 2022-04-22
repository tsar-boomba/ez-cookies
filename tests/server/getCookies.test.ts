import assert from 'assert';
import { getCookies } from '../../src';
import { mockHandler, PARSED_DEFAULT_COOKIES } from '../mocks';

describe('getCookies (server)', () => {
	beforeAll(() => {
		//@ts-expect-error
		global.window = undefined;
	});

	it('Should parse request cookies, parsed or not and return correct value', () => {
		mockHandler(
			() => {},
			(req) => assert.deepEqual(getCookies({ req }), PARSED_DEFAULT_COOKIES),
		);
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
