import assert from 'assert';
import { constructCookie } from '../src';

const KEY = 'test';
const VALUE = 'construct';
const PATH_DEFAULT = '; Path=/';
const compare = (opts?: string) => `${KEY}=${VALUE}${opts}`;

describe('constructCookie (util)', () => {
	it('Should set Path to "/" by default', () => {
		assert.equal(constructCookie(KEY, VALUE), compare(PATH_DEFAULT));
	});

	it('Should set Path to opts.path', () => {
		assert.equal(constructCookie(KEY, VALUE, { path: '/test' }), compare('; Path=/test'));
	});

	it('Should set Expires to opts.expires', () => {
		const now = new Date();
		assert.equal(
			constructCookie(KEY, VALUE, { expires: now }),
			compare(PATH_DEFAULT + `; Expires=${now.toUTCString()}`),
		);
	});

	it('Should set Max-Age to opts.maxAge', () => {
		assert.equal(
			constructCookie(KEY, VALUE, { maxAge: 100 }),
			compare(PATH_DEFAULT + '; Max-Age=100'),
		);
	});

	it('Should set Domain to opts.domain', () => {
		assert.equal(
			constructCookie(KEY, VALUE, { domain: 'www.amongus.com' }),
			compare(PATH_DEFAULT + '; Domain=www.amongus.com'),
		);
	});

	it('Should set Secure to opts.secure', () => {
		assert.equal(
			constructCookie(KEY, VALUE, { secure: true }),
			compare(PATH_DEFAULT + '; Secure'),
		);
	});

	it('Should set HttpOnly to opts.httpsOnly', () => {
		assert.equal(
			constructCookie(KEY, VALUE, { httpOnly: true }),
			compare(PATH_DEFAULT + '; HttpOnly'),
		);
	});

	it('Should set SameSite to opts.sameSite', () => {
		assert.equal(
			constructCookie(KEY, VALUE, { sameSite: 'Strict' }),
			compare(PATH_DEFAULT + '; SameSite=Strict'),
		);
	});

	it('Should set multiple options', () => {
		const now = new Date();
		assert.equal(
			constructCookie(KEY, VALUE, {
				expires: now,
				maxAge: 100,
				domain: 'www.amongus.com',
				httpOnly: true,
				sameSite: 'Strict',
				secure: true,
			}),
			compare(
				PATH_DEFAULT +
					`; Expires=${now.toUTCString()}; Max-Age=100; Domain=www.amongus.com; Secure; HttpOnly; SameSite=Strict`,
			),
		);
	});
});
