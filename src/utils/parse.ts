export const parse = (cookies: string | undefined) => {
	const result: Record<string, string> = {};
	if (!cookies) return result;
	cookies.split(';').forEach((cookie) => {
		const separator = cookie.indexOf('=');
		const key = cookie.substring(0, separator).trim();
		const rawValue = cookie.substring(separator + 1);
		result[key] = decodeURIComponent(rawValue);
	});
	return result;
};
