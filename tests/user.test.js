import { getFirstName } from '../src/utils/user';

test('Should return first name from full name', () => {
	const firstName = getFirstName('John Doe');
	expect(firstName).toBe('John');
});
