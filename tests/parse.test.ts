import assert from 'assert';
import { parse } from '../src';
import { DEFAULT_COOKIE_STRING, PARSED_DEFAULT_COOKIES } from './mocks';

describe('parse (util)', () => {
	it('Should correctly parse cookie strings', () => {
		assert.deepEqual(parse(DEFAULT_COOKIE_STRING), PARSED_DEFAULT_COOKIES);

		const exampleString = 'example=this; string=yes; cookies=parsed';
		const exampleParsed = { example: 'this', string: 'yes', cookies: 'parsed' };
		assert.deepEqual(parse(exampleString), exampleParsed);
	});

	it('Should return empty object for undefined', () => {
		assert.deepEqual(parse(undefined), {});
	});
});
