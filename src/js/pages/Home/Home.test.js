import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
	beforeEach(() => {
		render(<Home />);
	});

	test('renders without error', () => {
		const view = screen.getByTestId('home');
		expect(view).toBeInTheDocument();
	});
});
