import validateArray from './index';

describe('validateArray', () => {
	describe('return false', () => {
		test('with param string', () => {
			const emptyString = validateArray('');
			const string = validateArray('Crehana');
			expect(emptyString).toBe(false);
			expect(string).toBe(false);
		});

		test('with param object', () => {
			const emptyObj = validateArray({});
			const obj = validateArray({ name: 'Crehana' });
			expect(emptyObj).toBe(false);
			expect(obj).toBe(false);
		});

		test('with param number', () => {
			const nan = validateArray(NaN);
			const numb = validateArray(8);
			expect(nan).toBe(false);
			expect(numb).toBe(false);
		});

		test('with param null', () => {
			const emptyArg = validateArray();
			expect(emptyArg).toBe(false);
		});

		test('with param empty array', () => {
			const emptyArray = validateArray([]);
			expect(emptyArray).toBe(false);
		});
	});

	describe('return true', () => {
		test('with param array', () => {
			const validArray = validateArray(['Crehana', 'Hugo']);
			expect(validArray).toBe(true);
		});
	});
});
